import apiClient from "./services.js";

export default {
  getAllEagleTasks() {
    return apiClient.get(`/studentEagleTasks`);
  },
  getEagleTasks(id) {
    return apiClient.get(`/studentEagleTasks/${id}`);
  },
  createEagleTask(data) {
    return apiClient.post(`/studentEagleTasks`, data);
  },
  updateEagleTask(id, data) {
    return apiClient.put(`/studentEagleTasks/${id}`, data);
  },
  deleteEagleTask(id) {
    return apiClient.delete(`/studentEagleTasks/${id}`);
  },
};

//in the controller for experience
//get a function for getting a student from a user id
//when you log in, use the user id to get the student 
//login { student = studentservices.getstudent for user
// user.studentId = studentId}
//add user to store