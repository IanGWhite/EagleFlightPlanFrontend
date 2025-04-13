import apiClient from "./services.js";

export default {
  getRole(roleId) {
    return apiClient.get(`/roles/${roleId}`);
  },
  createRole(data) {
    return apiClient.post(`/users/`, data);
  },
  updateRole(roleId,data) {
    return apiClient.put(`/roles/${roleId}`, data);
  },
  deleteRole(roleId) {
    return apiClient.delete(`/roles/${roleId}`);
  },
};


