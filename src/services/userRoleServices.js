import apiClient from "./services.js";

export default {
  editUserRole(userId,id) {
    return apiClient.put(`/user/${userId}/userRole/${id}`);
  },
  getUserRole(userId) {
    return apiClient.get(`/user/${userId}/userRoles/`);
  },
  createUserRole(userId,roleId) {
    return apiClient.post(`/user/${userId}/userRole/${roleId}`);
  },
};