import apiClient from "./services.js";

export default {
  getAllResumeEducations(studentId, resumeId) {
    return apiClient.get(`/students/${studentId}/${resumeId}/resumeEducations`);
  },
  getResumeEducations(studentId, id) {
    return apiClient.get(`/students/${studentId}/educations/${id}`);
  },
  createResumeEducation(studentId, resumeId, educationId) {
    return apiClient.post(`/students/${studentId}/${resumeId}/resumeEducations/${educationId}`);
  },
  updateResumeEducation(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/educations/${id}`, data);
  },
  deleteResumeEducation(studentId, resumeId, id) {
    return apiClient.delete(`/students/${studentId}/${resumeId}/educations/${id}`);
  },
};


