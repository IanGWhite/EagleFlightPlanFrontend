<script setup>
import Utils from "../config/utils.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import MenuBar from "../components/MenuBar.vue";

const router = useRouter();
const user = Utils.getStore("user");

// Sample data with image URLs for templates
const templates = ref([
  { id: 1, name: "Template 1", imageUrl: "path/to/template1.jpg" },
  { id: 2, name: "Template 2", imageUrl: "path/to/template2.jpg" },
  { id: 3, name: "Template 3", imageUrl: "path/to/template3.jpg" },
  { id: 4, name: "Template 4", imageUrl: "path/to/template4.jpg" }
]);

const selectedTemplate = ref(null);
const message = ref("Please choose a template to create");

const selectTemplate = (template) => {
  selectedTemplate.value = template;
};

const createTemplate = () => {
  if (selectedTemplate.value) {
    router.push({ name: "create", params: { templateId: selectedTemplate.value.id } });
  } else {
    message.value = "Please select a template before proceeding";
  }
};
</script>

<template>
  <v-app>
    <v-container>
      <v-toolbar>
        <v-toolbar-title>
          Hello, {{ user.fName }} {{ user.lName }}!
        </v-toolbar-title>
      </v-toolbar>
      <br />
      <v-card>
        <v-card-title class="text-center">{{ message }}</v-card-title>
        <v-divider></v-divider>
        <v-row class="my-4" justify="center">
          <v-col v-for="template in templates" :key="template.id" cols="6" sm="3">
            <v-card
              :class="{ 'selected-template': selectedTemplate && selectedTemplate.id === template.id }"
              @click="selectTemplate(template)"
              class="text-center"
              outlined
            >
              <v-img :src="template.imageUrl" aspect-ratio="3/4" alt="Template image" />
              <v-card-text>{{ template.name }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <div class="text-center my-4">
          <v-btn color="red" rounded @click="createTemplate">Create</v-btn>
        </div>
      </v-card>
    </v-container>
  </v-app>
</template>

<style scoped>
.selected-template {
  border: 2px solid #000;
  transition: border 0.3s ease;
}
</style>
