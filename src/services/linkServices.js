import apiClient from "./services.js";

export default {
  getAllLinks(studentId) {
    return apiClient.get(`/students/${studentId}/links`);
  },
  getLinks(studentId, id) {
    return apiClient.get(`/students/${studentId}/links/${id}`);
  },
  createLink(studentId, data) {
    return apiClient.post(`/students/${studentId}/links`, data);
  },
  updateLink(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/links/${id}`, data);
  },
  deleteLink(studentId, id) {
    return apiClient.delete(`/students/${studentId}/links/${id}`);
  },
};
