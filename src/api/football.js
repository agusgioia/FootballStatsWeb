import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

export const getCompetitions = async () => {
  const response = await api.get("/competitions");
  return response.data;
};

export const getMatches = async (code) => {
  const response = await api.get(`/competitions/${code}/matches`);
  return response.data;
};

export const getLiveMatches = async () => {
  const response = await api.get("/matches/live");
  return response.data;
};

export const getPositions = async (code) => {
  const response = await api.get(`/competitions/${code}/standings`);
  return response.data;
};

export const getScorers = async (code) => {
  const response = await api.get(`/competitions/${code}/scorers`);
  return response.data;
};

export const getTeam = async (teamId) => {
  const response = await api.get(`/teams/${teamId}`);
  return response.data;
};

export const getTeamMatches = async (teamId) => {
  const response = await api.get(`/teams/${teamId}/matches`);
  return response.data;
};
