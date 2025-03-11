<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import MenuBar from "./components/MenuBar.vue";
</script>

<template>
  <v-app>
    <MenuBar :key="$route.fullPath" />
    <v-main class="padded-content">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
.padded-content {
  padding-top: 90px
}
</style>
