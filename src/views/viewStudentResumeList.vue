<script setup>
import { ref } from "vue";
import { VExpansionPanels, VExpansionPanel, VExpansionPanelText, VExpansionPanelTitle } from 'vuetify/components';
import MenuBar from "../components/MenuBar.vue";

const resumes = ref([]);

const addResume = () => {
  resumes.value.push({
    title: `Resume ${resumes.value.length + 1}`,
    comment: `Comment from teacher on Resume ${resumes.value.length + 1}`
  });
};

const deleteResume = (index) => {
  resumes.value.splice(index, 1);
};

const editResume = (resume) => {
  console.log("Edit Resume:", resume.title);
};

</script>

<template>
  <v-container>
    <v-card class="mb-6">
      <v-card-title>Resumes</v-card-title>
      <v-card-text>
        <div v-if="resumes.length === 0" class="text-center">
          <p>No resumes available. Click "Add" to create a new resume.</p>
        </div>
        <v-expansion-panels v-else>
          <v-expansion-panel v-for="(resume, index) in resumes" :key="index">
            <v-expansion-panel-title>
              {{ resume.title }}
              <v-spacer></v-spacer>
              <v-btn icon @click.stop="editResume(resume)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click.stop="deleteResume(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-textarea
                v-model="resume.comment"
                label="Comment from teacher"
                readonly
              />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="addResume">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  max-width: 600px;
  margin: auto;
}
.text-center {
  text-align: center;
  color: gray;
}
</style>
