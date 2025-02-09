<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import ProjectServices from "../services/projectServices"; // hypothetical service for managing project data
import Utils from "../config/utils.js";

const router = useRouter();

const route = useRoute();
const user = ref({});

const project = ref({
  name: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  position: "",
  description: ""
});
const message = ref("");

const saveProject = (id) => {
  ProjectServices.updateProject(user.value.studentId, id ,project.value)
    .then(() => {
      message.value = "Project saved successfully";
      router.push({ name: "StudentInfo" }); // hypothetical route name for project list
    })
    .catch((e) => {
      message.value =  "An error occurred";
    });
};

const cancel = () => {
  router.push({ name: "StudentInfo" }); // hypothetical route for cancel action
};

const getProject = async (id) => {
  try {
    const response = await ProjectServices.getProjects(user.value.studentId, id);
    project.value = response.data;
  } catch (error) {
    console.error('Failed to retrieve project data:');
  }
};


onMounted(() => {
  user.value = Utils.getStore('user')
  console.log(user.value)
  const projectId = route.params.id;
    if (projectId) {
      getProject(projectId);
    } else {
      console.error('No course ID provided in route');
    }
})
</script>

<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title class="text-center">
          Project
        </v-card-title>
        <v-card-text>
          <p>{{ message }}</p>
          <v-form @submit.prevent="saveProject">
            <v-text-field
              v-model="project.name"
              label="Name"
              required
            ></v-text-field>

            <div class="row">
              <v-text-field
                v-model="project.city"
                label="City"
                class="mr-2"
                required
              ></v-text-field>
              <v-text-field
                v-model="project.state"
                label="State"
                required
              ></v-text-field>
            </div>

            <div class="row">
              <v-text-field
                v-model="project.startDate"
                label="Start Month"
                class="mr-2"
                required
              ></v-text-field>
              <v-text-field
                v-model="project.endDate"
                label="End Month"
                required
              ></v-text-field>
            </div>

            <v-text-field
              v-model="project.position"
              label="Position"
              required
            ></v-text-field>

            <v-textarea
              v-model="project.description"
              label="Description"
              rows="4"
            ></v-textarea>

            <div class="buttons">
              <v-btn color="red" @click="saveProject(route.params.id)">Save</v-btn>
              <v-btn color="grey" @click="cancel">Cancel</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<style scoped>
.container {
  width: 300px;
  padding: 20px;
  text-align: center;
  background-color: #f5e4d7;
}
.row {
  display: flex;
  justify-content: space-between;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
