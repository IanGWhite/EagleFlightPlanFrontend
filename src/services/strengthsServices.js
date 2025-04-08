import apiClient from "./services.js";

export default {
  getAllStrengths() {
    return apiClient.get(`/strengths`);
  },
  getStrengths(id) {
    return apiClient.get(`/strengths/${id}`);
  },
  createStrength(data) {
    return apiClient.post(`/strengths`, data);
  },
  updateStrength(id, data) {
    return apiClient.put(`/strengths/${id}`, data);
  },
  deleteStrength(id) {
    return apiClient.delete(`/strengths/${id}`);
  },
};


