import apiClient from "./services.js";

export default {
  getAllEventAttend() {
    return apiClient.get(`/students/${studentId}/eventAttended`);
  },
  getEventAttends( eventId) {
    return apiClient.get(`/eventAttended/${eventId}`);
  },
  createEventAttends(studentId, eventId) {
    return apiClient.post(`/students/${studentId}/eventAttended/${eventId}`);
  },
  updateEventAttends(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/eventAttended/${id}`, data);
  },
  deleteEventAttends(studentId, id) {
    return apiClient.delete(`/students/${studentId}/eventAttended/${id}`);
  },
};