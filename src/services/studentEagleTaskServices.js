import apiClient from "./services.js";

export default {
  getAllStudentEagleTasks() {
    return apiClient.get(`/studentEagleTasks`);
  },
  getStudentEagleTasks(id) {
    return apiClient.get(`/studentEagleTasks/${id}`);
  },
  createStudentEagleTask(data) {
    return apiClient.post(`/studentEagleTasks`, data);
  },
  updateStudentEagleTask(id, data) {
    return apiClient.put(`/studentEagleTasks/${id}`, data);
  },
  deleteStudentEagleTask(id) {
    return apiClient.delete(`/studentEagleTasks/${id}`);
  },
};

//in the controller for experience
//get a function for getting a student from a user id
//when you log in, use the user id to get the student 
//login { student = studentservices.getstudent for user
// user.studentId = studentId}
//add user to store