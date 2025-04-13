import apiClient from "./services.js";

export default {
  getAllEagleTasks() {
    return apiClient.get(`/eagleTasks`);
  },
  getEagleTasks(id) {
    return apiClient.get(`/eagleTasks/${id}`);
  },
  createEagleTask(data) {
    return apiClient.post(`/eagleTasks`, data);
  },
  updateEagleTask(id, data) {
    return apiClient.put(`/eagleTasks/${id}`, data);
  },
  deleteEagleTask(id) {
    return apiClient.delete(`/eagleTasks/${id}`);
  },
};

//in the controller for experience
//get a function for getting a student from a user id
//when you log in, use the user id to get the student 
//login { student = studentservices.getstudent for user
// user.studentId = studentId}
//add user to store