import apiClient from "./services.js";

export default {
  getAllCategories() {
    return apiClient.get(`/category`);
  },
  getCategories(id) {
    return apiClient.get(`/category/${id}`);
  },
  createCategory(data) {
    return apiClient.post(`/category`, data);
  },
  updateCategory(id, data) {
    return apiClient.put(`/category/${id}`, data);
  },
  deleteCategory(id) {
    return apiClient.delete(`/category/${id}`);
  },
};

//in the controller for experience
//get a function for getting a student from a user id
//when you log in, use the user id to get the student 
//login { student = studentservices.getstudent for user
// user.studentId = studentId}
//add user to store