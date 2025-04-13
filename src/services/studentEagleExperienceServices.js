import apiClient from "./services.js";

export default {
  getAllStudentEagleExperiences(studentId, eagleFlightPlanId) {
    return apiClient.get(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleExperiences/`);
  },
  getStudentEagleExperiences(studentId, eagleFlightPlanId,id) {
    return apiClient.get(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleExperiences/${id}`);
  },
  createStudentEagleExperience(studentId, eagleFlightPlanId,data) {
    return apiClient.post(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleExperiences/`, data);
  },
  updateStudentEagleExperience(studentId, eagleFlightPlanId,id, data) {
    return apiClient.put(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleExperiences/${id}`, data);
  },
  deleteStudentEagleExperience(studentId, eagleFlightPlanId,id) {
    return apiClient.delete(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleExperiences/${id}`);
  },
};

//in the controller for experience
//get a function for getting a student from a user id
//when you log in, use the user id to get the student 
//login { student = studentservices.getstudent for user
// user.studentId = studentId}
//add user to store