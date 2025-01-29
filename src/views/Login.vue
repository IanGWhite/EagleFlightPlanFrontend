<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import MenuBar from "../components/MenuBar.vue";
import StudentServices from "../services/studentServices.js";
import Utils from "../config/utils.js";
import AuthServices from "../services/authServices";


const router = useRouter();
const fName = ref("");
const lName = ref("");
const user = ref({});

const loginWithGoogle = () => {
  window.handleCredentialResponse = handleCredentialResponse;
  const client = import.meta.env.VITE_APP_CLIENT_ID;
  console.log(client);
  window.google.accounts.id.initialize({
    client_id: client,
    cancel_on_tap_outside: false,
    auto_select: true,
    callback: window.handleCredentialResponse,
  });
  window.google.accounts.id.renderButton(document.getElementById("parent_id"), {
    type: "standard",
    theme: "outline",
    size: "large",
    text: "signup_with",
    width: 400,
  });
};

const handleCredentialResponse = async (response) => {
  let token = {
    credential: response.credential,
  };
  await AuthServices.loginUser(token)
    .then(async(response) => {
      user.value = response.data;
      console.log(user.value)
      Utils.setStore("user", user.value);
    
      fName.value = user.value.fName;
      lName.value = user.value.lName;
      router.push({ name: "StudentHome" });
      console.log(user.value)
    })
    .catch((error) => {
      console.log("error", error);
    });
};

onMounted(() => {
  loginWithGoogle();
});

const login = () => {
  console.log("Login clicked");
  // Logic for login action, e.g., router.push('/login')
};

const createAccount = () => {
  console.log("Create Account clicked");
  // Logic for create account action, e.g., router.push('/create-account')
};
</script>

<template>
  <v-app>
    <v-container>
      <v-container class="text-center mt-5 d-flex flex-column align-center">
        <!-- Vertical stack of buttons with spacing -->
         <v-spacer></v-spacer>
         <div class="signup-buttons">
          <v-row justify="center">
            <div display="flex" id="parent_id"><v-btn color="lightBlue" class="button-spacing" @click="loginWithGoogle">Login</v-btn></div>
          </v-row>
        </div>
      </v-container>
    </v-container>
  </v-app>
</template>

<style scoped>

.app-background {
  background-color: "lightBrown"; /* Replace with your desired color */
  min-height: 100vh; /* Ensures it covers the full viewport */
}


.v-toolbar {
  padding: 16px;
}

.v-container {
  background-color: "lightBrown";
}

.v-btn {
  width: 150px;
  font-size: 16px;
  border-radius: 20px;
}
.button-spacing {
  margin: 0 20px; /* Adjust margin as needed */
  margin-bottom: 15px;
}
</style>
