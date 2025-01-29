<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import logoutUser from "../services/authServices";
import Utils from "../config/utils.js";
import store from "../store/store.js";
import AuthServices from "../services/authServices";
import userServices from "../services/userServices.js";

const router = useRouter();
const drawer = ref(false); 
const user = ref(null)

const userService = ref([{ id: "", admin: 0 }]);
const isAdmin = ref(userService.value.admin);



const logout = async (response) => {
  let token = {
    credential: response.credential,
  };
  await AuthServices.logoutUser(token)
    .then(() => {
      router.push({ name: "login" });
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const navigateTo = (routeName) => {
  if(user.value != null)
  {
    router.push({ name: routeName });
  }
  drawer.value = false; //Close drawer after navigation
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
  <v-app-bar color="darkBlue" dark flat>
    <v-container class="d-flex justify-space-between align-center">
      <div class="d-flex align-center">
        <img src="../assets/logo.png" alt="Logo" class="logo mr-2" />
        <h1 class="title">Resume Machine</h1>
      </div>
      
      <div class="menu-buttons">
        <!-- <v-btn color="lightBlue" class="mx-2" @click="goToResume">Resume</v-btn> -->
        <v-btn color="lightBlue" class="mx-2" @click="navigateTo('ResumeListStudents')">Resume</v-btn>
        <v-btn color="lightBlue" class="mx-2" @click="navigateTo('StudentInfo')">Info</v-btn>

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
          <v-btn  class="drop-btn" @click="navigateTo('StudentHome')">Student Home</v-btn>
          <v-btn v-if="isAdmin"  class="drop-btn" @click="navigateTo('TeacherHome')">Teacher Home</v-btn>
          
          <v-btn v-if="user" class="drop-btn" @click="logout">Sign Out</v-btn>
            
          
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

