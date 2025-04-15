import apiClient from "./services.js";

export default {
  getAllShopItems() {
    return apiClient.get(`/shopItems`);
  },
  getShopItem(id) {
    return apiClient.get(`/shopItems/${id}`);
  },
  createShopItem(data) {
    return apiClient.post(`/shopItems`, data);
  },
  updateShopItem(id, data) {
    return apiClient.put(`/shopItems/${id}`, data);
  },
  deleteShopItem(id) {
    return apiClient.delete(`/shopItems/${id}`);
  },
};
