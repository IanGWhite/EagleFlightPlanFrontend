import apiClient from "./services.js";

export default {
  getAllResumeAwards(studentId, resumeId) {
    return apiClient.get(`/students/${studentId}/${resumeId}/resumeAwards`);
  },
  getResumeAwards(studentId, id) {
    return apiClient.get(`/students/${studentId}/awards/${id}`);
  },
  createResumeAward(studentId, resumeId, awardId) {
    return apiClient.post(`/students/${studentId}/${resumeId}/resumeAwards/${awardId}`);
  },
  updateResumeAward(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/awards/${id}`, data);
  },
  deleteResumeAward(studentId, resumeId, id) {
    return apiClient.delete(`/students/${studentId}/${resumeId}/awards/${id}`);
  },
};