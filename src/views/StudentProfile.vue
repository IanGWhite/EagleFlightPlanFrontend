<script setup>
import { ref,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import pointLogServices from "../services/pointLogServices.js";
import studentStrengthsServices from "../services/studentStrengthsServices.js";
import strengthsServices from  "../services/strengthsServices.js"
import studentMajorsServices from "../services/studentMajorsServices.js";
import Utils from "../config/utils.js";
import majorsServices from "../services/majorsServices.js";
import semesterServices from "../services/semesterServices.js";
import studentServices from "../services/studentServices.js";

const router = useRouter();

const route = useRoute();
const user = ref({});
const student = ref({});

const tab = ref('option-1');

const studentMajor = ref([]);
const studentmajorIdNo = ref({});

const gradDate = ref([]);

const gradSemesters = ref([]);

const allStrengths = ref([
]);

const selectedStrengthIds = ref([]);


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

const getStudentMajor =  async () => {
  try {
    const response =  await studentMajorsServices.getStudentMajor(user.value.studentId);
    studentmajorIdNo.value = response.data[0];
    console.log("major Id " + studentmajorIdNo.value.studentMajorId);
    const reply = await majorsServices.getMajor(studentmajorIdNo.value.studentMajorId);
    studentMajor.value = reply.data;
    console.log("major:");
    console.log(studentMajor.value.name);
  } catch (error) {
    console.error('Failed to retrieve major data:');
  }
};

const getGradDate =  async () => {
  try {
    const response = await studentServices.getStudentForUser(user.value.studentId);
    console.log(response.data);
    student.value = response.data[0];
    console.log("Student info: ");
    console.log(student.value);
    const reply = await semesterServices.getSemester(student.value.estimatedGradSemester)
    gradSemesters.value = reply.data;
    console.log("gradSemester date " + gradSemesters.value.dateStart);

    const formattedDate = new Date(gradSemesters.value.dateEnd).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      gradDate.value = formattedDate; // Update GraduationDate
  } catch (error) {
    console.error('Failed to retrieve grad semster date data:');
  }
};

const getStrenghs =  async () => {
  try {
    const response =  await strengthsServices.getAllStrengths();
    allStrengths.value = response.data;
    console.log("all strengh info " + allStrengths.value);
  } catch (error) {
    console.error('Failed to retrieve all strengh data:');
  }
};

const getStudentStrenghs =  async () => {
  try {
    const response =  await studentStrengthsServices.getAllStudentStrengthsForStudent(user.value.studentId);
    selectedStrengthIds.value = response.data;
    console.log("student strengh info " + selectedStrengthIds.value);
  } catch (error) {
    console.error('Failed to retrieve major data:');
  }
};

const saveStrengths = async () => {
  const ids = selectedStrengthIds.value.map(s => s.strengthId);
  const dataId = selectedStrengthIds.value.map(s => s.id);

  // Check all 5 are selected
  if (ids.length !== 5 || ids.includes(null) || ids.includes(undefined)) {
    alert("Please select all 5 strengths.");
    return;
  }

  // Check for duplicates
  const uniqueIds = new Set(ids);
  if (uniqueIds.size !== ids.length) {
    alert("Each strength must be unique. Please remove duplicates.");
    return;
  }

  try {
    for (let i = 0; i < ids.length; i++) {
      const payload = {
        strengthId: ids[i]
      };

      console.log(`Updating strength slot ${i + 1}:`, {
        studentId: user.value.studentId,
        strengthRecordId: dataId[i],
        payload
      });

      const res = await studentStrengthsServices.updateStudentStrength(user.value.studentId, dataId[i], payload);
      console.log("Response:", res);
    }

    console.log("Strengths saved successfully!");
  } catch (error) {
    console.error("Error saving strengths:", error);
    alert("Failed to save strengths.");
  }
};


onMounted(() => {
  user.value = Utils.getStore('user')
  // console.log(user.value)
  getPointLog();
  getStudentMajor();
  getGradDate();
  getStrenghs();
  getStudentStrenghs();
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
                      color="lightblue"
                    >
                      {{ studentMajor.name }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-sheet>
                
              <v-sheet>
                <v-row>
                  <v-col>
                    <v-label>Graduation Date</v-label> <!-- Label for Major -->
                    <v-chip 
                      class="pa-2"
                      color="lightblue" 
                    >
                      {{ gradDate }} <!-- Display the student major text -->
                    </v-chip>
                  </v-col>
                </v-row>
              </v-sheet>
              <v-card style="width: 40%;">
                <v-card-title>Top 5 Clifton Strengths</v-card-title>
                <v-select
                  v-for="(strength, index) in selectedStrengthIds"
                  :key="index"
                  v-model="selectedStrengthIds[index].strengthId"
                  :items="allStrengths"
                  item-title="name"
                  item-value="id"
                  label="Select Strength"
                  variant="solo"
                  hide-details
                  dense
                  style="margin-bottom: 10px;"
                >
                  <template #prepend-inner>
                    {{ index + 1 }}.
                  </template>
                </v-select>

                <v-btn color="red" @click="saveStrengths">Save</v-btn>
              </v-card>
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
