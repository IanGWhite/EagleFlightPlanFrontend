import apiClient from "./services.js";

export default {
  getAllComments(studentId, resumeId) {
    return apiClient.get(`/students/${studentId}/resumes/${resumeId}/comments`);
  },
  getCommentForResume(studentId, resumeId, id) {
    return apiClient.get(`/students/${studentId}/resumes/${resumeId}/comments/${id}`);
  },
    getComments(studentId, id) {
    return apiClient.get(`/students/${studentId}/comments/${id}`);
  },
  createComment(studentId,resumeId, data) {
    return apiClient.post(`/students/${studentId}/resumes/${resumeId}/comments`, data);
  },
  updateComment(studentId, resumeId, id, data) {
    return apiClient.put(`/students/${studentId}/resumes/${resumeId}/comments/${id}`, data);
  },
  deleteComment(studentId,resumeId, id) {
    return apiClient.delete(`/students/${studentId}/resumes/${resumeId}/comments/${id}`);
  },
};

