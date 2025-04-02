import apiClient from "./services.js";

export default {
  getAllPointLogs(studentId) {
    return apiClient.get(`/students/${studentId}/pointLogs`);
  },
  getPointLog(studentId, id) {
    return apiClient.get(`/students/${studentId}/pointLogs/${id}`);
  },
  createPointLog(studentId, data) {
    return apiClient.post(`/students/${studentId}/pointLogs`, data);
  },
  updatePointLog(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/pointLogs/${id}`, data);
  },
  deletePointLog(studentId, id) {
    return apiClient.delete(`/students/${studentId}/pointLogs/${id}`);
  },
};
