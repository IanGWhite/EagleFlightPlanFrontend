<script setup>
import { ref,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import EducationServices from "../services/educationServices"; // hypothetical service for managing education data
import MenuBar from "../components/MenuBar.vue";
import Utils from "../config/utils.js";
import StudentServices from "../services/studentServices.js";

const route = useRoute();

const router = useRouter();
const user = ref({}); // Assuming user info may be needed, similar to your previous example

const education = ref({
  name: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  degree: "",
  gpa: "",
  coursework: ""
});
const message = ref("");

const saveEducation = (id) => {
  EducationServices.updateEducation(user.value.studentId, id ,education.value)
    .then(() => {
      message.value = "Education saved successfully";
      router.push({ name: "StudentInfo" }); // hypothetical route name for education list
    })
    .catch((e) => {
      message.value =  "An error occurred";
    });
};

const cancel = () => {
  router.push({ name: "StudentInfo" }); // hypothetical route for cancel action
};

const getEducation = async (id) => {
      try {
        const response = await EducationServices.getEducations(user.value.studentId, id);
        education.value = response.data;
      } catch (error) {
        console.error('Failed to retrieve education data:');
      }
    };

onMounted(() => {
  user.value = Utils.getStore('user')
  console.log(user.value)
  const educationId = route.params.id;
      if (educationId) {
        getEducation(educationId);
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
          Education
        </v-card-title>
        <v-card-text>
          <p>{{ message }}</p>
          <v-form>
            <v-text-field
              v-model="education.name"
              label="Name"
              required
            ></v-text-field>

            <div class="row">
              <v-text-field
                v-model="education.city"
                label="City"
                class="mr-2"
                required
              ></v-text-field>
              <v-text-field
                v-model="education.state"
                label="State"
                required
              ></v-text-field>
            </div>

            <div class="row">
              <v-text-field
                v-model="education.startDate"
                label="Start Month"
                class="mr-2"
                required
              ></v-text-field>
              <v-text-field
                v-model="education.endDate"
                label="Graduation Month"
                required
              ></v-text-field>
            </div>

            <v-text-field
              v-model="education.degree"
              label="Degree"
              required
            ></v-text-field>

            <v-text-field
              v-model="education.gpa"
              label="GPA"
              type="number"
              step="0.01"
              max="4.0"
              min="0"
            ></v-text-field>

            <v-textarea
              v-model="education.coursework"
              label="CourseWork"
              rows="4"
            ></v-textarea>

            <div class="buttons">
              <v-btn color="primary" @click="saveEducation(route.params.id)">Save</v-btn>
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
