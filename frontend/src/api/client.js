const API_BASE = "http://localhost:5000/api";

export async function checkHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error("Backend offline");
  return res.json();
}

export async function listRepositories() {
  const res = await fetch(`${API_BASE}/repositories`);
  if (!res.ok) throw new Error("Failed to load repositories");
  return res.json();
}

export async function getRepository(id) {
  const res = await fetch(`${API_BASE}/repositories/${id}`);
  if (!res.ok) throw new Error("Repository not found");
  return res.json();
}

export async function analyzeRepository(pathOrUrl) {
  const res = await fetch(`${API_BASE}/repositories/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path_or_url: pathOrUrl }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Analysis failed");
  return data;
}

export async function getTimeline(id, { onlySignificant = false, search = "", limit = 100 } = {}) {
  const params = new URLSearchParams({
    only_significant: onlySignificant.toString(),
    search,
    limit: limit.toString(),
  });
  const res = await fetch(`${API_BASE}/repositories/${id}/timeline?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch timeline");
  return res.json();
}

export async function getUnfinished(id, { category = "", severity = "" } = {}) {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (severity) params.append("severity", severity);
  const res = await fetch(`${API_BASE}/repositories/${id}/unfinished?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch unfinished work");
  return res.json();
}

export async function seanceChat(id, question, temperature = 0.3) {
  const res = await fetch(`${API_BASE}/repositories/${id}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, temperature }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Séance question failed");
  return data;
}

export async function generateReport(id) {
  const res = await fetch(`${API_BASE}/repositories/${id}/report`, {
    method: "POST",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Report generation failed");
  return data;
}

export async function getReport(id) {
  const res = await fetch(`${API_BASE}/repositories/${id}/report`);
  if (!res.ok) return null;
  return res.json();
}
