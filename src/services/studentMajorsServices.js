import apiClient from "./services.js";

export default {
  getStudentMajor(studentId) {
    return apiClient.get(`/students/${studentId}/studentMajors/`);
  },
  createStudentMajor(studentId, majorId) {
    return apiClient.post(`/students/${studentId}/studentMajors/${majorId}`);
  },
  updateStudentMajor(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/studentMajors/${id}`, data);
  },
  deleteStudentMajor(studentId, id) {
    return apiClient.delete(`/students/${studentId}/studentMajors/${id}`);
  },
};


