import apiClient from "./services.js";

export default {
  getAllFlightPlans(id) {
    return apiClient.get(`/flightPlans/`);
  },
  getFlightPlanForSemester(semesterId) {
    return apiClient.get(`/flightPlans/${semesterId}`);
  },
  // createEagleFlightPlanForStudent(studentId,data) {
  //   return apiClient.post(`/flightPlans/`, data);
  // },
  // updateEagleFlightPlanForStudent(studentId, id, data) {
  //   return apiClient.put(`/flightPlans/${id}`, data);
  // },
  // deleteEagleFlightPlanForStudent(studentId,id) {
  //   return apiClient.delete(`/flightPlans/${id}`);
  // },
};

//in the controller for experience
//get a function for getting a student from a user id
//when you log in, use the user id to get the student 
//login { student = studentservices.getstudent for user
// user.studentId = studentId}
//add user to store