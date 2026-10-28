import requests
import json
from typing import Dict, Any, Optional, List
from backend.config import OLLAMA_BASE_URL, DEFAULT_GEMMA_MODEL

class OllamaClient:
    def __init__(self, base_url: str = OLLAMA_BASE_URL, model: str = DEFAULT_GEMMA_MODEL):
        self.base_url = base_url.rstrip("/")
        self.model = model

    def check_connection(self) -> Dict[str, Any]:
        """Checks if Ollama service is reachable and lists available models."""
        try:
            resp = requests.get(f"{self.base_url}/api/tags", timeout=2.0)
            if resp.status_code == 200:
                models = [m.get("name") for m in resp.json().get("models", [])]
                model_ready = any(self.model in m for m in models)
                return {
                    "connected": True,
                    "model_ready": model_ready,
                    "configured_model": self.model,
                    "available_models": models
                }
        except Exception as e:
            pass

        return {
            "connected": False,
            "model_ready": False,
            "configured_model": self.model,
            "available_models": []
        }

    def generate(self, prompt: str, system_prompt: Optional[str] = None,
                 temperature: float = 0.3, max_tokens: int = 1500) -> Dict[str, Any]:
        """Generates a completion using the local Gemma model with fallback if offline."""
        conn_status = self.check_connection()
        if not conn_status["connected"]:
            return self._simulate_ghost_response(prompt, is_offline=True)

        # Fallback to another installed model if configured gemma model is missing
        target_model = self.model
        if not conn_status["model_ready"] and conn_status["available_models"]:
            # Pick first available or gemma variation
            gemma_match = next((m for m in conn_status["available_models"] if "gemma" in m), None)
            target_model = gemma_match or conn_status["available_models"][0]

        payload = {
            "model": target_model,
            "prompt": prompt,
            "system": system_prompt or "",
            "stream": False,
            "options": {
                "temperature": temperature,
                "num_predict": max_tokens
            }
        }

        try:
            resp = requests.post(
                f"{self.base_url}/api/generate",
                json=payload,
                timeout=60
            )
            if resp.status_code == 200:
                result = resp.json()
                return {
                    "text": result.get("response", "").strip(),
                    "model": target_model,
                    "tokens_eval": result.get("eval_count", 0),
                    "total_duration_ms": int(result.get("total_duration", 0) / 1_000_000),
                    "simulated": False
                }
        except Exception as e:
            return self._simulate_ghost_response(prompt, is_offline=True, error_msg=str(e))

        return self._simulate_ghost_response(prompt, is_offline=True)

    def _simulate_ghost_response(self, prompt: str, is_offline: bool = True, error_msg: Optional[str] = None) -> Dict[str, Any]:
        """Provides a graceful offline fallback so the application stays operable without crashing."""
        offline_note = (
            "\n\n*(Note from the crypt: Local Ollama runtime was not reachable. "
            "Please ensure `ollama run gemma2:2b` is active for live neural séance generation.)*"
        )
        return {
            "text": (
                "The spirits whisper from the git logs... I sense the ancient commits and markers "
                "recorded in this repository, though the local Gemma oracle is currently resting. "
                "Review the retrieved evidence cards below to inspect the verifiable facts of this codebase."
                + (offline_note if is_offline else "")
            ),
            "model": "offline-fallback",
            "tokens_eval": 0,
            "total_duration_ms": 0,
            "simulated": True
        }
