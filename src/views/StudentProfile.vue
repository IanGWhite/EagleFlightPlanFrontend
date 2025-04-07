<script setup>
import { ref,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import pointLogServices from "../services/pointLogServices.js";
import studentStrengthsServices from "../services/studentStrengthsServices.js";
import studentMajorsServices from "../services/studentMajorsServices.js";
import Utils from "../config/utils.js";
import majorsServices from "../services/majorsServices.js";

const router = useRouter();

const route = useRoute();
const user = ref({});

const tab = ref('option-1');

const studentMajor = ref([]);
const studentmajorId = ref({});
const semesters = ref(['Fall 2025', 'Spring 2026', 'Fall 2026', 'Spring 2026', 'Fall 2027', 'Spring 2027']);

const studentStrengths = ref([{ strength: 'Foo' }, { strength: 'two' }, { strength: 'three' }, { strength: 'for' }, { strength: 'fiv' }]);


const pointLogList = ref([]);

const headers = [
  { title: "Type", key: "name", align: "start", sortable: false },
  { title: "pointDifference", key: "pointDifference", sortable: false },
  { title: "Date", key: "date"},
];

const message = ref("test");

const getPointLog = async () => {
  try {
    const response = await pointLogServices.getAllPointLogs(user.value.studentId);
    
    if (response && response.data) {
      pointLogList.value = response.data;

      pointLogList.value.forEach(log => {
        if (log.date) {
          log.date = new Date(log.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          });
        } else {
          log.date = "Unknown";
        }
      });

      console.log("Point log gotten successfully:", pointLogList.value);
    } else {
      console.error("Invalid response structure:", response);
    }
  } catch (e) {
    message.value = "An error occurred: " + e.message;
    console.error("Error fetching point logs:", e);
  }
};

const getStudentMajor =  () => {
      try {
        const response =  studentMajorsServices.getStudentMajor(user.value.studentId);
        console.log(response.data);
        studentmajorId.value = response.data;
        console.log("hello");
        console.log("major Id " + studentmajorId.studentMajorId);
        const reply = majorsServices.getMajor(response.studentmajorId);
        studentMajor.value = reply.data;
        console.log("major:");
        console.log(studentMajor.name);
      } catch (error) {
        console.error('Failed to retrieve major data:');
      }
    };


onMounted(() => {
  user.value = Utils.getStore('user')
  // console.log(user.value)
  getPointLog();
  getStudentMajor();
})
</script>

<template>
  <v-app>
    <v-container>

      <v-card>
        
      <v-tabs v-model="tab">
        <v-tab 
          text="My Info"
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
          <v-sheet class="pa-3">
            <!-- <v-form @submit.prevent="saveAward"> -->
              <v-form>
              <!-- add v-models to autocomplete forms -->
              <v-sheet>
                <v-row>
                  <v-col>
                    <v-label>Major</v-label> <!-- Label for Major -->
                    <v-chip 
                      class="pa-2"
                      :label="studentMajor"
                      color="lightblue" 
                    >
                      {{ studentMajor.name }} <!-- Display the student major text -->
                    </v-chip>
                  </v-col>
                </v-row>
              </v-sheet>
                
                <v-sheet>
                  <v-autocomplete 
                  
                    label="Estimated Grad Semester"
                    :items=semesters
                  ></v-autocomplete>
                </v-sheet>
                


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
          </v-sheet>
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
          <v-data-table :headers="headers"
           :items="pointLogList"
            :filter-keys="['Date']"></v-data-table>
        </v-container>
      </v-tabs-window-item>
      </v-tabs-window>
     
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
