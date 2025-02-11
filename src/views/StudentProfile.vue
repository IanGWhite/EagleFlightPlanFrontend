<script setup>
import { ref,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import AwardServices from "../services/awardServices.js"; // hypothetical service for managing award data
import MenuBar from "../components/MenuBar.vue";
import Utils from "../config/utils.js";

const router = useRouter();

const route = useRoute();
const user = ref({});

const tab = ref('option-1');

const majors = ref(['Computer Science', 'Art', 'English']);

const award = ref({
  organization: "",
  title: "",
  startDate: "",
  endDate: "",
  description: ""
});
const message = ref("test");

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
        <div class="flex-row">
      <v-tabs v-model="tab">
        <v-tab
          text="Personal Info"
          value="option-1"
        ></v-tab>
        <v-tab text="Badges" value="option-2"></v-tab>
        <v-tab
          text="History"
          value="option-3"
        ></v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="option-1">
        <v-card-text>
          <!-- <v-form @submit.prevent="saveAward"> -->
            <v-form>
            <!-- add v-model -->
            <v-autocomplete
              
              label="Major"
              :items=majors
            ></v-autocomplete>

            <v-text-field
              v-model="award.title"
              label="Award Title"
              required
            ></v-text-field>

            <v-container>
              <v-date-picker view-mode="months"></v-date-picker>
            </v-container>

            <v-textarea
              v-model="award.description"
              label="Description"
              rows="4"
            ></v-textarea>

            <div class="buttons">
              <v-btn color="red" @click="saveAward(route.params.id)">Save</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-tabs-window-item>
      <v-tabs-window-item value="option-2">
        <p >hello</p>
      </v-tabs-window-item>
      <v-tabs-window-item value="option-3">
        <p >history</p>
      </v-tabs-window-item>
      </v-tabs-window>
      </div>
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
