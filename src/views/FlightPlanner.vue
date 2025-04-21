<script setup>
import { ref,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import semesterServices from "../services/semesterServices.js";
import eagleFlightPlanServices from "../services/eagleFlightPlanServices.js";


import Utils from "../config/utils.js";
import userServices from "../services/userServices.js";

const router = useRouter();

const route = useRoute();
const user = ref({});

const tab = ref('option-1');

const studentmajorIdNo = ref({});

const gradSemesterIdNo = ref({});
const gradSemesters = ref([]);


// * * * F L I G H T   P L A N  * * *
const semesters = ref([{ semestersLeft: 8, semesterNormalized: "Freshman 1" },
]);
const selectedSemestersLeft = ref(1);
//tasks
//list of all tasks that the admin can choose from
const allTasks = ref(
  [{ name: "Make a resume", points: "30", description: "blah blah blah description", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
  { name: "Make a cover letter", points: "20", description: "Task 2 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:false, hyperLink:"", reflectionReq:true },
  { name: "This is a task", points: "40", description: "Task 3 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
  { name: "Task Tuah", points: "40", description: "Task 4 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
  { name: "Task 2ah", points: "50000", description: "Job on that thang", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
]);

//experiences
const allExperiences = ref(
  [{ name: "Go to career fair", points: "30", description: "blah blah blah description", reflectionReq:false },
  { name: "Go to Job whatever", points: "30", description: "Go to a job whatever to experience jobs or whatever", reflectionReq:false },
  { name: "Experience ego death", points: "100", description: "Go to a job whatever to experience death jobs or whatever", reflectionReq:false },
]);

const message = ref("test");

const fetchSemesters = () => {
  semesterServices.getAllSemesters()
  .then((response) => {
    semesters.value = response.data.map((semester) =>({
      semestersLeft: semester.id,
      semesterNormalized: semester.name,
    }));
  })
  .catch((error) =>{
    console.error(error);
  })
};

onMounted(() => {
  user.value = Utils.getStore('user');
  //console.log(user.value)
  fetchSemesters()
})



const loadCurrentTasks = (semester) => {
  var myIndex = 0;
  currentStudentEagleTasks.value = [];
  //tasks
 for(let i = 0; i < allStudentEagleTasks.value.length; i++) {
  if(allStudentEagleTasks.value[i].semesterFromGrad == semester)
  {
    currentStudentEagleTasks.value[myIndex] = allStudentEagleTasks.value[i];
    myIndex++;
  }
 }
 
 //experiences
 myIndex = 0;
  currentStudentEagleExperiences.value = [];
  //tasks
 for(let i = 0; i < allStudentEagleExperiences.value.length; i++) {
  if(allStudentEagleExperiences.value[i].semesterFromGrad == semester)
  {
    currentStudentEagleExperiences.value[myIndex] = allStudentEagleExperiences.value[i];
    myIndex++;
  }
 }
 console.log("experiences: ", currentStudentEagleExperiences.value);
};

</script>

<template>
  <v-app>
    <v-container>
      
      <v-card>
        <v-container>
          <v-row justify="space-between">
            <v-col>
              just do it by semester
              <v-select dense
                v-model="selectedSemestersLeft"
                :items="semesters"
                label="Semester"
                item-value="semestersLeft"
                item-title="semesterNormalized"
                @update:modelValue="loadCurrentTasks(selectedSemestersLeft)"
              >
              
              </v-select>
              <!-- {{selectedSemestersLeft}} -->
            </v-col>

            <v-col></v-col>
            <v-col></v-col>

            <v-col cols="auto">
              <v-btn @click="" rounded="0" class="alt-btn" justify-end="true">Save</v-btn>
            </v-col>
          </v-row>

          <v-container class="border bg-surface-variant" style="padding: 0;">
            <v-sheet color="grey" class="pa-5">

              <!-- T A S K S -->
              <v-row >
                <v-col v-for="task in currentStudentEagleTasks" density="compact">
                  <v-card v-if="task.semesterFromGrad == selectedSemestersLeft" class="flightPlanCard">
                    <v-card-title class="">
                      {{ task.name }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ task.description }}
                    </v-card-subtitle>
                    <v-card-actions class="font-weight-regular">
                      <v-btn variant="tonal" class="border-md rounded remove-btn" density="compact" @click="RemoveTaskFromPlan()">
                        <v-icon icon="mdi-close"/>
                        remove
                      </v-btn>
                    </v-card-actions>
                </v-card>
                </v-col>
                <!-- add one button -->
                <v-col density="compact">
                  <v-card class="flightPlanCard">
                    <v-card-title>
                      New Task
                    </v-card-title>
                    <v-card-text style="padding-bottom: 0;">

                    
                      <v-select density="compact"
                      style="padding-left: 5px; padding-right: 5px; margin: 0%;"
                      :items="allTasks"
                      label="Task"
                      item-title="name"
                      hide-details
                      >
                      </v-select>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn variant="tonal" class="alt-btn"  @click="AddTaskToPlan()">
                        add
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
                
              </v-row>

              <!-- E X P E R I E N C E S -->
              <v-row >
                <v-col v-for="experience in currentStudentEagleExperiences" density="compact">
                  <v-card v-if="experience.semesterFromGrad == selectedSemestersLeft" class="flightPlanCard">
                    <v-card-title class="">
                      {{ experience.name }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ experience.description }}
                    </v-card-subtitle>
                    <v-card-actions class="font-weight-regular">
                      <v-btn variant="tonal" class="border-md rounded remove-btn" density="compact" @click="RemoveExperienceFromPlan()">
                        <v-icon icon="mdi-close"/>
                        remove
                      </v-btn>
                    </v-card-actions>
                </v-card>
                </v-col>
                <!-- add one button -->
                <v-col density="compact">
                  <v-card class="flightPlanCard">
                    <v-card-title>
                      New Experience
                    </v-card-title>
                    <v-card-text style="padding-bottom: 0;">

                    
                      <v-select density="compact"
                      style="padding-left: 5px; padding-right: 5px; margin: 0%;"
                      :items="allExperiences"
                      label="Experience"
                      item-title="name"
                      hide-details
                      >
                      </v-select>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn variant="tonal" class="alt-btn"  @click="AddExperienceToPlan()">
                        add
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
                
              </v-row>
            </v-sheet>
            
          </v-container>

        </v-container>
      
     
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
.remove-btn{
  display: auto;
  gap: auto;
  width: auto;
  padding: auto;
  height: auto;
}
.flightPlanCard{
  min-height: 160px;
}

</style>
