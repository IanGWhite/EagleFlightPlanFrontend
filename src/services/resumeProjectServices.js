import apiClient from "./services.js";

export default {
  getAllResumeProjects(studentId, resumeId) {
    return apiClient.get(`/students/${studentId}/${resumeId}/resumeProjects`);
  },
  getResumeProjects(studentId, id) {
    return apiClient.get(`/students/${studentId}/projects/${id}`);
  },
  createResumeProject(studentId, resumeId, projectId) {
    return apiClient.post(`/students/${studentId}/${resumeId}/resumeProjects/${projectId}`);
  },
  updateResumeProject(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/projects/${id}`, data);
  },
  deleteResumeProject(studentId, resumeId, id) {
    return apiClient.delete(`/students/${studentId}/${resumeId}/projects/${id}`);
  },
};

