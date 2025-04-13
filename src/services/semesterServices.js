import apiClient from "./services.js";

export default {
  getAllSemesters() {
    return apiClient.get(`/semesters`);
  },
  getSemester(id){
    return apiClient.get(`/semesters/${id}`);
  },
  createSemester(data) {
    return apiClient.post(`/semesters/`, data);
  },
  updateSemester(id, data) {
    return apiClient.put(`/semesters/${id}`, data);
  },
  deleteSemester(id) {
    return apiClient.delete(`/semesters/${id}`);
  },
};