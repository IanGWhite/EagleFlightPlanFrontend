import apiClient from "./services.js";

export default {
  getAllSkills(studentId) {
    return apiClient.get(`/students/${studentId}/skills`);
  },
  getSkills(studentId, id) {
    return apiClient.get(`/students/${studentId}/skills/${id}`);
  },
  createSkill(studentId, data) {
    return apiClient.post(`/students/${studentId}/skills`, data);
  },
  updateSkill(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/skills/${id}`, data);
  },
  deleteSkill(studentId, id) {
    return apiClient.delete(`/students/${studentId}/skills/${id}`);
  },
};


