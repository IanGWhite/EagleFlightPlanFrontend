import apiClient from "./services.js";

export default {
  getAllResumeExperiences(studentId, resumeId) {
    return apiClient.get(`/students/${studentId}/${resumeId}/resumeExperiences`);
  },
  getResumeExperiences(studentId, id) {
    return apiClient.get(`/students/${studentId}/experiences/${id}`);
  },
  createResumeExperience(studentId, resumeId, experienceId) {
    return apiClient.post(`/students/${studentId}/${resumeId}/resumeExperiences/${experienceId}`);
  },
  updateResumeExperience(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/experiences/${id}`, data);
  },
  deleteResumeExperience(studentId, resumeId, id) {
    return apiClient.delete(`/students/${studentId}/${resumeId}/experiences/${id}`);
  },
};