<script setup>
import { ref,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import AwardServices from "../services/awardServices"; // hypothetical service for managing award data
import MenuBar from "../components/MenuBar.vue";
import Utils from "../config/utils.js";

const router = useRouter();

const route = useRoute();
const user = ref({});


const award = ref({
  organization: "",
  title: "",
  startDate: "",
  endDate: "",
  description: ""
});
const message = ref("");

const saveAward = (id) => {
  AwardServices.updateAward(user.value.studentId, id ,award.value)
    .then(() => {
      message.value = "Award saved successfully";
      router.push({ name: "StudentInfo" }); // hypothetical route name for award list
    })
    .catch((e) => {
      message.value = "An error occurred";
    });
};

const cancel = () => {
  router.push({ name: "StudentInfo" }); // hypothetical route for cancel action
};

const getAwards = async (id) => {
      try {
        const response = await AwardServices.getAwards(user.value.studentId, id);
        award.value = response.data;
      } catch (error) {
        console.error('Failed to retrieve award data:');
      }
    };

onMounted(() => {
  user.value = Utils.getStore('user')
  console.log(user.value)
  const awardId = route.params.id;
      if (awardId) {
        getAwards(awardId);
      } else {
        console.error('No Award ID provided in route');
      }
})
</script>

<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title class="text-center">
          Award
        </v-card-title>
        <v-card-text>
          <p>{{ message }}</p>
          <v-form @submit.prevent="saveAward">
            <v-text-field
              v-model="award.organization"
              label="Organization Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="award.title"
              label="Award Title"
              required
            ></v-text-field>

            <div class="row">
              <v-text-field
                v-model="award.startDate"
                label="Start Month"
                class="mr-2"
                required
              ></v-text-field>
              <v-text-field
                v-model="award.endDate"
                label="End Month"
                required
              ></v-text-field>
            </div>

            <v-textarea
              v-model="award.description"
              label="Description"
              rows="4"
            ></v-textarea>

            <div class="buttons">
              <v-btn color="red" @click="saveAward(route.params.id)">Save</v-btn>
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
