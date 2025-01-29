import apiClient from "./services.js";

export default {
  getAllStudents() {
    return apiClient.get(`/students`);
  },
  getStudentForUser(userId) {
    return apiClient.get(`/students/userStudent/${userId}`);
  },
  createStudent(userId, data) {
    return apiClient.post(`/students/${userId}`, data);
  },
  updateStudent(id, data) {
    return apiClient.put(`/students/${id}`, data);
  },
  deleteStudent(id) {
    return apiClient.delete(`/students/${id}`);
  },
};