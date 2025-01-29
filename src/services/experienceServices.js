import apiClient from "./services.js";

export default {
  getAllExperiences(studentId) {
    return apiClient.get(`/students/${studentId}/experiences`);
  },
  getExperiences(studentId, id) {
    return apiClient.get(`/students/${studentId}/experiences/${id}`);
  },
  createExperience(studentId, data) {
    return apiClient.post(`/students/${studentId}/experiences`, data);
  },
  updateExperience(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/experiences/${id}`, data);
  },
  deleteExperience(studentId, id) {
    return apiClient.delete(`/students/${studentId}/experiences/${id}`);
  },
};