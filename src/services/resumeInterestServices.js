import apiClient from "./services.js";

export default {
  getAllResumeInterests(studentId, resumeId) {
    return apiClient.get(`/students/${studentId}/${resumeId}/resumeInterest`);
  },
  getResumeInterests(studentId, id) {
    return apiClient.get(`/students/${studentId}/interests/${id}`);
  },
  createResumeInterest(studentId, resumeId, interestId) {
    return apiClient.post(`/students/${studentId}/${resumeId}/resumeInterest/${interestId}`);
  },
  updateResumeInterest(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/interests/${id}`, data);
  },
  deleteResumeInterest(studentId, resumeId, id) {
    return apiClient.delete(`/students/${studentId}/${resumeId}/interests/${id}`);
  },
};