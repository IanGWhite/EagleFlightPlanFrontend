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
    <v-app class="rounded rounded-md">
      <!-- <v-app-bar color="surface-variant" title="Application bar"></v-app-bar> -->
  
      <v-navigation-drawer>
        <v-list style="margin: 10px;">
          <v-list-item></v-list-item>
          <v-card title="Upcoming Events" variant="tonal">
            
          
        
          <v-list-item>
            <v-row no-gutters>
              <v-col>
                Event 1
              </v-col>
              <v-col class="text-right">
                1/19
              </v-col>
            </v-row>
          </v-list-item>

          <v-list-item>
            <v-row no-gutters>
              <v-col>
                Event 2
              </v-col>
              <v-col class="text-right">
                2/1
              </v-col>
            </v-row>
          </v-list-item>
          
          </v-card>
              <v-list-item></v-list-item>
            <v-card title="Experiences" variant="tonal">
            <v-row no-gutters align="center">
              <v-col>
                Left Text
              </v-col>
              <v-col class="text-right">
               Right Text
              </v-col>
            </v-row>
          </v-card>
        </v-list>
      </v-navigation-drawer>
  
      <v-navigation-drawer location="right">
        <v-list>
          <v-list-item title="Drawer right"></v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-main
        class="d-flex align-center justify-center"
        style="min-height: 300px"
      >
        Main Content
      </v-main>
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
