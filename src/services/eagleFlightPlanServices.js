import apiClient from "./services.js";

export default {
  getAllEagleFlightPlansForStudent(studentId,) {
    return apiClient.get(`/students/${studentId}/eagleFlightPlans/`);
  },
  getEagleFlightPlansForStudent(studentId,id) {
    return apiClient.get(`/students/${studentId}/eagleFlightPlans/${id}`);
  },
  createEagleFlightPlanForStudent(studentId,data) {
    return apiClient.post(`/students/${studentId}/eagleFlightPlans/`, data);
  },
  updateEagleFlightPlanForStudent(studentId, id, data) {
    return apiClient.put(`/students/${studentId}/eagleFlightPlans/${id}`, data);
  },
  deleteEagleFlightPlanForStudent(studentId,id) {
    return apiClient.delete(`/students/${studentId}/eagleFlightPlans/${id}`);
  },
};

//in the controller for experience
//get a function for getting a student from a user id
//when you log in, use the user id to get the student 
//login { student = studentservices.getstudent for user
// user.studentId = studentId}
//add user to store