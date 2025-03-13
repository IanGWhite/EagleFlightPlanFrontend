import apiClient from "./services.js";

export default {
  getAllEvents() {
    return apiClient.get(`/events`);
  },
  getEvents(id) {
    return apiClient.get(`/events/${id}`);
  },
  createEvent(data) {
    return apiClient.post(`/events`, data);
  },
  updateEvent(id, data) {
    return apiClient.put(`/events/${id}`, data);
  },
  deleteEvent(id) {
    return apiClient.delete(`/events/${id}`);
  },
};

//in the controller for experience
//get a function for getting a student from a user id
//when you log in, use the user id to get the student 
//login { student = studentservices.getstudent for user
// user.studentId = studentId}
//add user to store