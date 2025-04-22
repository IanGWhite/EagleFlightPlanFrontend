import apiClient from "./services.js";

export default {
  getAllStudentEagleExperiencesForStudent(studentId, eagleFlightPlanId) {
    return apiClient.get(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleExperiences/`);
  },
  getStudentEagleExperiencesForStudent(studentId, eagleFlightPlanId,id) {
    return apiClient.get(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleExperiences/${id}`);
  },
  createStudentEagleExperienceForStudent(studentId, eagleFlightPlanId,data) {
    return apiClient.post(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleExperiences/`, data);
  },
  updateStudentEagleExperienceForStudent(studentId, eagleFlightPlanId,id, data) {
    return apiClient.put(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleExperiences/${id}`, data);
  },
  submitStudentEagleExperienceForStudent(studentId, eagleFlightPlanId, studentEagleExperinceId) {
    return apiClient.put(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleTasks/${studentEagleExperinceId}`, {
      approvalState: 2,
      Reflection: "Finshed",
      completionDate: new Date().toISOString(), // optional
    });
  },
  deleteStudentEagleExperienceForStudent(studentId, eagleFlightPlanId,id) {
    return apiClient.delete(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleExperiences/${id}`);
  },
};

//in the controller for experience
//get a function for getting a student from a user id
//when you log in, use the user id to get the student 
//login { student = studentservices.getstudent for user
// user.studentId = studentId}
//add user to store