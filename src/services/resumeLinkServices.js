import apiClient from "./services.js";

export default {
  getAllResumeLinks(studentId, resumeId) {
    return apiClient.get(`/students/${studentId}/${resumeId}/resumeLinks`);
  },
  getResumeLinks(studentId, id) {
    return apiClient.get(`/students/${studentId}/links/${id}`);
  },
  createResumeLink(studentId, resumeId, linkId) {
    return apiClient.post(`/students/${studentId}/${resumeId}/resumeLinks/${linkId}`);
  },
  updateResumeLink(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/links/${id}`, data);
  },
  deleteResumeLink(studentId, resumeId, id) {
    return apiClient.delete(`/students/${studentId}/${resumeId}/resumeLinks/${id}`);
  },
};