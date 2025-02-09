<script setup>
import { ref } from "vue";
import MenuBar from "../components/MenuBar.vue";

const resumeName = ref("");
const personalLinks = ref([{ type: "", link: "" }]);
const professionalSummary = ref("");
const sections = ref({
  education: [{ name: "School 1", checked: false }],
  experience: [{ name: "Company 1", checked: false }],
  projects: [{ name: "Project 1", checked: false }],
  skills: [{ name: "Skill 1", checked: false }],
  interests: [{ name: "Interest 1", checked: false }],
  awards: [{ name: "Award 1", checked: false }],
});

const addPersonalLink = () => {
  personalLinks.value.push({ type: "", link: "" });
};

const addSectionItem = (sectionKey) => {
  sections.value[sectionKey].push({ name: "", checked: false });
};

const saveResume = () => {
  console.log("Resume saved:", {
    resumeName,
    personalLinks,
    professionalSummary,
    sections
  });
};
</script>

<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title class="text-center">
          Resume Name
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="resumeName"
            label="Resume Name"
            outlined
            dense
          ></v-text-field>
          <v-btn @click="saveResume" color="red">Save</v-btn>
        </v-card-text>
      </v-card>

      <!-- Personal Links Section -->
      <v-card class="mt-3">
        <v-card-title>Personal Links</v-card-title>
        <v-card-text>
          <div v-for="(link, index) in personalLinks" :key="index">
            <v-row>
              <v-col cols="5">
                <v-text-field
                  v-model="link.type"
                  label="Type (GitHub, Social)"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  v-model="link.link"
                  label="Link"
                  dense
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <v-btn @click="addPersonalLink" color="red">Add Link</v-btn>
        </v-card-text>
      </v-card>

      <!-- Professional Summary Section -->
      <v-card class="mt-3">
        <v-card-title>Professional Summary</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="professionalSummary"
            label="Professional Summary"
            outlined
            dense
          ></v-textarea>
        </v-card-text>
      </v-card>

      <!-- Sections with Checkboxes -->
      <template v-for="(sectionItems, sectionKey) in sections" :key="sectionKey">
        <v-card class="mt-3">
          <v-card-title>{{ sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1) }}</v-card-title>
          <v-card-text>
            <div v-for="(item, idx) in sectionItems" :key="idx">
              <v-row>
                <v-checkbox v-model="item.checked"></v-checkbox>
                <v-text-field
                  v-model="item.name"
                  :label="sectionKey.slice(0, -1).charAt(0).toUpperCase() + sectionKey.slice(1, -1) + ' Name'"
                  outlined
                  dense
                ></v-text-field>
              </v-row>
            </div>
            <v-btn @click="addSectionItem(sectionKey)" color="red">
              Add {{ sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1, -1) }}
            </v-btn>
          </v-card-text>
        </v-card>
      </template>

      <!-- Create Button -->
      <v-btn class="mt-4" color="red" @click="saveResume">Create</v-btn>
    </v-container>
  </v-app>
</template>

<style scoped>
.container {
  background-color: #f5e4d7;
}
</style>
