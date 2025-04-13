import apiClient from "./services.js";

export default {
  getUserRole(userId) {
    return apiClient.get(`/users/${userId}/userRoles/`);
  },
  createUserRole(userId, roleId, data) {
    return apiClient.post(`/users/${userId}/userRoles/${roleId}`, data);
  },
  updateUserRole(userId, id, data) {
    return apiClient.put(`/users/${userId}/userRoles/${id}`, data);
  },
  deleteUserRole(userId, id) {
    return apiClient.delete(`/users/${userId}/userRoles/${id}`);
  },
};


