import apiClient from "./services.js";

export default {
  getAllResumes(studentId) {
    return apiClient.get(`/students/${studentId}/resumes`);
  },
  getResumes(studentId, id) {
    return apiClient.get(`/students/${studentId}/resumes/${id}`);
  },
  createResume(studentId, data) {
    return apiClient.post(`/students/${studentId}/resumes`, data);
  },
  updateResume(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/resumes/${id}`, data);
  },
  deleteResume(studentId, id) {
    return apiClient.delete(`/students/${studentId}/resumes/${id}`);
  },
};