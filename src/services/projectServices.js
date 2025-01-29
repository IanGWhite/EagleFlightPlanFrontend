import apiClient from "./services.js";

export default {
  getAllProjects(studentId) {
    return apiClient.get(`/students/${studentId}/projects`);
  },
  getProjects(studentId, id) {
    return apiClient.get(`/students/${studentId}/projects/${id}`);
  },
  createProject(studentId, data) {
    return apiClient.post(`/students/${studentId}/projects`, data);
  },
  updateProject(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/projects/${id}`, data);
  },
  deleteProject(studentId, id) {
    return apiClient.delete(`/students/${studentId}/projects/${id}`);
  },
};