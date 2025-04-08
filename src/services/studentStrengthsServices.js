import apiClient from "./services.js";

export default {
  getAllStudentStrengthsForStudent(studentId) {
    return apiClient.get(`/students/${studentId}/studentStrengths`);
  },
  getStudentStrengths(studentId, id) {
    return apiClient.get(`/students/${studentId}/studentStrengths/${id}`);
  },
  createStudentStrength(studentId, strengthId) {
    return apiClient.post(`/students/${studentId}/studentStrengths/${strengthId}`);
  },
  updateStudentStrength(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/studentStrengths/${id}`, data);
  },
  deleteStudentStrength(studentId, id) {
    return apiClient.delete(`/students/${studentId}/studentStrengths/${id}`);
  },
};


