import apiClient from "./services.js";

export default {
  getAllMajors() {
    return apiClient.get(`/majors`);
  },
  getMajor(id) {
    return apiClient.get(`/majors/${id}`);
  },
  createMajor(data) {
    return apiClient.post(`/majors`, data);
  },
  updateMajor(id, data) {
    return apiClient.put(`/majors/${id}`, data);
  },
  deleteMajor(id) {
    return apiClient.delete(`/majors/${id}`);
  },
};


