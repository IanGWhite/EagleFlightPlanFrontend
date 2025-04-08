import apiClient from "./services.js";

export default {
  getAllEagleExperiences() {
    return apiClient.get(`/eagleExperiences`);
  },
  getEagleExperiences(id) {
    return apiClient.get(`/eagleExperiences/${id}`);
  },
  createEagleExperiences(data) {
    return apiClient.post(`/eagleExperiences`, data);
  },
  updateEagleExperiences(id, data) {
    return apiClient.put(`/eagleExperiences/${id}`, data);
  },
  deleteEagleExperiences(id) {
    return apiClient.delete(`/eagleExperiences/${id}`);
  },
};

//in the controller for experience
//get a function for getting a student from a user id
//when you log in, use the user id to get the student 
//login { student = studentservices.getstudent for user
// user.studentId = studentId}
//add user to store