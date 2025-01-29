<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import MenuBar from "../components/MenuBar.vue";

const router = useRouter();

const goToResume = () => {
  router.push({ name: 'ResumeListStudents' });
};

const goToInfo = () => {
  router.push({ name: 'StudentInfo' });
};

</script>

<template>
  <v-app>
    <!-- Main Content -->
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-btn @click="goToInfo" color="light-blue" class="mb-5">
          Info
        </v-btn>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn @click="goToResume" color="light-blue" class="mb-5">
          Resume
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
