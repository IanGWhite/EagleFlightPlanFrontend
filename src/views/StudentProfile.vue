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

const studentStrengths = ref([{ strength: 'Foo' }, { strength: 'two' }, { strength: 'three' }, { strength: 'for' }, { strength: 'fiv' }]);

const award = ref({
  organization: "",
  title: "",
  startDate: "",
  endDate: "",
  description: ""
});

const pointLog = ref([{
  type: 'Badge',
  approvedBy: 'David North',
  pointDifference: 10,
  date: '10-12-25',
},
{
  type: 'Shop',
  approvedBy: 'Admin name',
  pointDifference: -20,
  date: '10-12-25',
},
]);
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
  // console.log(user.value)
  const awardId = route.params.id;
      if (awardId) {
        getAwards(awardId);
      } else {
        // console.error('No Award ID provided in route');
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
        <!-- PERSONAL INFO -->
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
              label="Estimated Graduation"
              type="date"
              required
            ></v-text-field>
            <!-- <v-container>
              <v-date-picker view-mode="months"></v-date-picker>
            </v-container> -->


            <v-card style="width: 40%;">
              <v-card-title>Top 5 Clifton Strengths</v-card-title>
              <v-text-field 
                v-for="(strength, index) in studentStrengths"
                :key="index"
                v-model="studentStrengths[index].strength"
                hide-details="auto"
                style="margin-bottom: 0%;"
                variant="solo"
              >
                {{ index + 1 }}. 
              </v-text-field>
            </v-card>

            <div class="buttons">
              <v-btn color="red" @click="saveAward(route.params.id)">Save</v-btn> <!-- EDIT BUTTON -->
            </div>
          </v-form>
        </v-card-text>
      </v-tabs-window-item>
      <!--        BADGES         -->
      <v-tabs-window-item value="option-2">
        <v-card-text>
          WIP
        </v-card-text>
      </v-tabs-window-item>
      <!--        POINT TRANSACTION HISTORY         -->
      <v-tabs-window-item value="option-3">
        <v-container>
          <v-data-table :items="pointLog"></v-data-table>
        </v-container>
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
