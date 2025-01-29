import apiClient from "./services.js";

export default {
  getAllAwards(studentId) {
    return apiClient.get(`/students/${studentId}/awards`);
  },
  getAwards(studentId, id) {
    return apiClient.get(`/students/${studentId}/awards/${id}`);
  },
  createAward(studentId, data) {
    return apiClient.post(`/students/${studentId}/awards`, data);
  },
  updateAward(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/awards/${id}`, data);
  },
  deleteAward(studentId, id) {
    return apiClient.delete(`/students/${studentId}/awards/${id}`);
  },
};
