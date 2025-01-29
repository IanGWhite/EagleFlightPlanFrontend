<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import ExperienceServices from "../services/experienceServices"; // hypothetical service for managing experience data
import MenuBar from "../components/MenuBar.vue";
import Utils from "../config/utils.js";
import StudentServices from "../services/studentServices.js";

const route = useRoute();

const router = useRouter();
const user = ref({});
const experience = ref({
  name: "",
  position: "",
  state: "",
  startDate: "",
  endDate: "",
  description: ""
});
const message = ref("");

const saveExperience = (id) => {
  ExperienceServices.updateExperience(user.value.studentId, id ,experience.value)
    .then(() => {
      message.value = "Experience saved successfully";
      router.push({ name: "StudentInfo" }); // hypothetical route name for experience list
    })
    .catch((e) => {
      message.value = "An error occurred";
    });
};

const cancel = () => {
  router.push({ name: "StudentInfo" }); // hypothetical route for cancel action
};

const getExperience = async (id) => {
      try {
        const response = await ExperienceServices.getExperiences(user.value.studentId, id);
        experience.value = response.data;
      } catch (error) {
        console.error('Failed to retrieve experience data:');
      }
    };

onMounted(() => {
  user.value = Utils.getStore('user')
  console.log(user.value)
  const experienceId = route.params.id;
      if (experienceId) {
        getExperience(experienceId);
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
          Experience
        </v-card-title>
        <v-card-text>
          <p>{{ message }}</p>
          <v-form>
            <v-text-field
              v-model="experience.name"
              label="Organization Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="experience.position"
              label="Position Title"
              required
            ></v-text-field>

            <v-text-field
              v-model="experience.state"
              label="State"
              required
            ></v-text-field>

            <div class="row">
              <v-text-field
                v-model="experience.startDate"
                label="Start Month"
                class="mr-2"
                required
              ></v-text-field>
              <v-text-field
                v-model="experience.endDate"
                label="End Month"
                required
              ></v-text-field>
            </div>

            <v-textarea
              v-model="experience.description"
              label="Description"
              rows="4"
            ></v-textarea>

            <div class="buttons">
              <v-btn color="primary" @click="saveExperience(route.params.id)">Save</v-btn>
              <v-btn color="error" @click="cancel">Cancel</v-btn>
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
