import apiClient from "./services.js";

export default {
  getAllContacts(studentId) {
    return apiClient.get(`/students/${studentId}/contacts`);
  },
  getContact(studentId, id) {
    return apiClient.get(`/students/${studentId}/contacts/${id}`);
  },
  createContact(studentId, data) {
    return apiClient.post(`/students/${studentId}/contacts`, data);
  },
  updateContact(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/contacts/${id}`, data);
  },
  deleteContact(studentId, id) {
    return apiClient.delete(`/students/${studentId}/contacts/${id}`);
  },
};
