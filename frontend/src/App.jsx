import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import EvidenceModal from "./components/EvidenceModal";
import LandingView from "./views/LandingView";
import SummonView from "./views/SummonView";
import DashboardView from "./views/DashboardView";
import SeanceChatView from "./views/SeanceChatView";
import GhostTimelineView from "./views/GhostTimelineView";
import UnfinishedView from "./views/UnfinishedView";
import ReportView from "./views/ReportView";
import { checkHealth, listRepositories, getRepository } from "./api/client";

export default function App() {
  const [activeTab, setActiveTab] = useState("landing");
  const [currentRepo, setCurrentRepo] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [ollamaStatus, setOllamaStatus] = useState(null);
  const [inspectedEvidence, setInspectedEvidence] = useState(null);

  // Poll health and repo list on mount
  const refreshState = async () => {
    try {
      const health = await checkHealth();
      setOllamaStatus(health.ai_inference);
    } catch (e) {
      setOllamaStatus({ ollama_status: "offline" });
    }

    try {
      const reposData = await listRepositories();
      const list = reposData.repositories || [];
      setRepositories(list);

      // Pre-load current repo data if available, but do NOT force tab change away from landing
      if (list.length > 0 && !currentRepo) {
        try {
          const data = await getRepository(list[0].id);
          setCurrentRepo(data.repository);
        } catch (_) {}
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refreshState();
  }, []);

  const selectRepository = async (repoId) => {
    try {
      const data = await getRepository(repoId);
      setCurrentRepo(data.repository);
      setActiveTab("dashboard");
    } catch (err) {
      console.error("Failed to load repo:", err);
    }
  };

  const handleAnalysisComplete = async (newRepoId) => {
    await refreshState();
    await selectRepository(newRepoId);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRepo={currentRepo}
        ollamaStatus={ollamaStatus}
        onOpenSummon={() => setActiveTab("summon")}
        onGoHome={() => setActiveTab("landing")}
      />

      {/* Main View Area */}
      <main style={{ flex: 1 }}>
        {activeTab === "landing" && (
          <LandingView
            onGoToSummon={() => setActiveTab("summon")}
            repositories={repositories}
            currentRepo={currentRepo}
            onSelectRepo={selectRepository}
            ollamaStatus={ollamaStatus}
          />
        )}

        {activeTab === "summon" && (
          <SummonView
            repositories={repositories}
            onSelectRepo={selectRepository}
            onAnalysisComplete={handleAnalysisComplete}
          />
        )}

        {currentRepo && activeTab === "dashboard" && (
          <DashboardView
            repository={currentRepo}
            setActiveTab={setActiveTab}
          />
        )}

        {currentRepo && activeTab === "chat" && (
          <SeanceChatView
            repository={currentRepo}
            onInspectEvidence={(ev) => setInspectedEvidence(ev)}
          />
        )}

        {currentRepo && activeTab === "timeline" && (
          <GhostTimelineView
            repository={currentRepo}
            onInspectEvidence={(ev) => setInspectedEvidence(ev)}
          />
        )}

        {currentRepo && activeTab === "unfinished" && (
          <UnfinishedView
            repository={currentRepo}
            onInspectEvidence={(ev) => setInspectedEvidence(ev)}
          />
        )}

        {currentRepo && activeTab === "report" && (
          <ReportView
            repository={currentRepo}
            onInspectEvidence={(ev) => setInspectedEvidence(ev)}
          />
        )}
      </main>

      {/* Modal Inspector */}
      {inspectedEvidence && (
        <EvidenceModal
          evidence={inspectedEvidence}
          onClose={() => setInspectedEvidence(null)}
        />
      )}
    </div>
  );
}
