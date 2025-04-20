<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getLogoutToken } from "./SocialLogin.vue";

//import logout from "./SocialLogin.vue";
import Utils from "../config/utils.js";
import store from "../store/store.js";
import AuthServices from "../services/authServices";
import userServices from "../services/userServices.js";

const router = useRouter();
const drawer = ref(false); 
const user = ref(null)

const userService = ref([{ id: "", admin: 0 }]);
const isAdmin = ref(userService.value.admin);

const logoutToken = ref(getLogoutToken());

const navigateTo = (routeName) => {
  if(user.value != null)
  {
    router.push({ name: routeName });
  }
  drawer.value = false; //Close drawer after navigation
};




const logout = async () => {
  const token = logoutToken;
  console.log("attempting log out" + logoutToken);
  if (token) {
    console.log("log out 1");
    await AuthServices.logoutUser(token);  // Invalidate session
    console.log("logout 2")
    console.log("log out 3");
    router.push({ name: "login" });  // Redirect to login page
  }
};

onMounted(() => {
  user.value = store.getters.getLoginUserInfo;
  fetchUser();
  if(user.value == null)
{//put user to log in page if they try to access a page without logging in
  router.push('Login');
}
});

const fetchUser= () => {
  userServices.getUser(1)
  .then((response) => {
    userService.value = response.data;
    isAdmin.value = userService.value.admin;
  })
  .catch((error) => {
      console.error("Error fetching user:", error);
    });
};
</script>

<template>
  <v-app-bar color="red" flat>
    <v-container class="d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <router-link to="/Home">
          <v-img src="../src/assets/oc-logo.png" width="80" alt="Logo"></v-img>
        </router-link>
        
        
        <h1 class="title">Eagle Flight Plan</h1>
      </div>
      
      <div class="menu-buttons">
        <!-- <v-btn color="lightBlue" class="mx-2" @click="goToResume">Resume</v-btn> -->
        <v-btn color="white" class="mx-2" @click="navigateTo('ResumeListStudents')">Resume</v-btn>
        <v-btn color="white" class="mx-2" @click="navigateTo('StudentInfo')">Info</v-btn>
        

        <!-- <v-avatar color="brown" size="40px" class="mx-2" @click="toggleDrawer"></v-avatar> -->
      </div>
    </v-container>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon="$menu" v-bind="props"></v-btn>
      </template>
      <v-list>
        <v-list-item>
        <v-list-item-content style="width: auto; overflow: visible;">
          <v-btn  class="drop-btn" @click="navigateTo('Home')">Student Home</v-btn>
          <v-btn v-if="isAdmin"  class="drop-btn" @click="navigateTo('AdminHome')">Admin Home</v-btn>
          <v-btn class="drop-btn" @click="navigateTo('StudentProfile')">Profile</v-btn>
          <v-btn v-if="user" class="drop-btn" @click="logout">Sign Out</v-btn>
          <SocialLogin ref="socialLoginRef" />
        </v-list-item-content>
      </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.menu-buttons .v-btn {
  /* border-radius: 12px; */
  color: black;
  height: 100%;
  margin: 0;
  border:none;
}


.drop-btn
{
  border-radius: 0;
  box-sizing: border-box;
  margin: 0;
  border:none;
  display: block;
}
.v-list {
  padding: 0; /* Remove unnecessary padding from list */
}

.v-list-item-content {
  overflow: visible;
}

</style>

