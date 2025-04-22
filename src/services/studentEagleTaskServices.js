import apiClient from "./services.js";

export default {
  getAllStudentEagleTasksForStudent(studentId, eagleFlightPlanId) {
    return apiClient.get(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleTasks/`);
  },
  getStudentEagleTasksForStudent(studentId, eagleFlightPlanId,id) {
    return apiClient.get(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleTasks/${id}`);
  },
  createStudentEagleTaskForStudent(studentId, eagleFlightPlanId,taskId,data) {
    return apiClient.post(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleTasks/${taskId}`, data);
  },
  updateStudentEagleTaskForStudent(studentId, eagleFlightPlanId,id, data) {
    return apiClient.put(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleTasks/${id}`, data);
  },
  deleteStudentEagleTaskForStudent(studentId, eagleFlightPlanId,id) {
    return apiClient.delete(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleTasks/${id}`);
  },
  submitStudentEagleTaskForStudent(studentId, eagleFlightPlanId, studentEagleTaskId) {
    return apiClient.put(`/students/${studentId}/eagleFlightPlans/${eagleFlightPlanId}/studentEagleTasks/${studentEagleTaskId}`, {
      approvalState: 1,
      Reflection: "Finshed",
      completionDate: new Date().toISOString(), // optional
    });
  },
  getAllEagleTasks() {
    return apiClient.get(`/studentEagleTasks`);
  },
  updateEagleTask(id, data) {
    return apiClient.put(`/studentEagleTasks/${id}`, data);
  },
};

//in the controller for experience
//get a function for getting a student from a user id
//when you log in, use the user id to get the student 
//login { student = studentservices.getstudent for user
// user.studentId = studentId}
//add user to store