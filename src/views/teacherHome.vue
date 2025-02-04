<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import MenuBar from "../components/MenuBar.vue";

const router = useRouter();

const goToResume = () => {
  router.push({ name: 'ResumeListTeacher' });
};

const goToInfo = () => {
  router.push({ name: 'info' });
};

const goToAdmin = () => {
  router.push({ name: 'admin' });
};
</script>

<template>
  <v-app>

    <!-- Main Content -->
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-btn @click="goToResume" color="light-grey" class="mb-5">
          Resume List
        </v-btn>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn @click="goToAdmin" color="light-grey"  class="mb-5">
          Admin
        </v-btn>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.fill-height {
  background-color: #f5e7d0;
  min-height: 100vh;
}
.v-btn {
  width: 150px;
}
</style>
