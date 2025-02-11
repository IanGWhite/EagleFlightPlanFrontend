import apiClient from "./services.js";

export default {
  getAllResumeSkills(studentId, resumeId) {
    return apiClient.get(`/students/${studentId}/${resumeId}/resumeSkills`);
  },
  getResumeSkills(studentId, id) {
    return apiClient.get(`/students/${studentId}/skills/${id}`);
  },
  createResumeSkill(studentId, resumeId, skillId) {
    return apiClient.post(`/students/${studentId}/${resumeId}/resumeSkills/${skillId}`);
  },
  updateResumeSkill(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/skills/${id}`, data);
  },
  deleteResumeSkill(studentId, resumeId, id) {
    return apiClient.delete(`/students/${studentId}/${resumeId}/resumeSkills/${id}`);
  },
};