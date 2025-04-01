import apiClient from "./services.js";

export default {
  getAllUsers() {
    return apiClient.get(`/user`);
  },
  getUser(userId) {
    return apiClient.get(`/user/${userId}`);
  },
  createUser(data) {
    return apiClient.post(`/user`, data);
  },
};