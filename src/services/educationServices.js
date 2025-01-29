import apiClient from "./services.js";

export default {
  getAllEducations(studentId) {
    return apiClient.get(`/students/${studentId}/educations`);
  },
  getEducations(studentId, id) {
    return apiClient.get(`/students/${studentId}/educations/${id}`);
  },
  createEducation(studentId, data) {
    return apiClient.post(`/students/${studentId}/educations`, data);
  },
  updateEducation(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/educations/${id}`, data);
  },
  deleteEducation(studentId, id) {
    return apiClient.delete(`/students/${studentId}/educations/${id}`);
  },
};

//in the controller for experience
//get a function for getting a student from a user id
//when you log in, use the user id to get the student 
//login { student = studentservices.getstudent for user
// user.studentId = studentId}
//add user to store