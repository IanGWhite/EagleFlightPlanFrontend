import apiClient from "./services.js";

export default {
  editUserRole(userId,id) {
    return apiClient.put(`/users/${userId}/userRoles/${id}`);
  },
  getUserRole(userId) {
    return apiClient.get(`/users/${userId}/userRoles/`);
  },
  createUserRole(userId,roleId) {
    return apiClient.post(`/users/${userId}/userRoles/${roleId}`);
  },
};