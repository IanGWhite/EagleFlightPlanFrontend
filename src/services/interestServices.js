import apiClient from "./services.js";

export default {
  getAllInterests(studentId) {
    return apiClient.get(`/students/${studentId}/interests`);
  },
  getInterests(studentId, id) {
    return apiClient.get(`/students/${studentId}/interests/${id}`);
  },
  createInterest(studentId, data) {
    return apiClient.post(`/students/${studentId}/interests`, data);
  },
  updateInterest(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/interests/${id}`, data);
  },
  deleteInterest(studentId, id) {
    return apiClient.delete(`/students/${studentId}/interests/${id}`);
  },
};