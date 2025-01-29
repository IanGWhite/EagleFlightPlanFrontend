import { createStore } from "vuex";
import Utils from "../config/utils";

const user = Utils.getStore("user");

const store = createStore({
  state: {
    loginUser: user,
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user;
      Utils.setStore("user", user);
    },
  },
  actions: {},
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser;
    },
  },
});

export default store;
