<script setup>
import { ref,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import semesterServices from "../services/semesterServices.js";
import eagleFlightPlanServices from "../services/eagleFlightPlanServices.js";
import eagleTaskServices from "../services/eagleTaskServices.js";


import Utils from "../config/utils.js";
import userServices from "../services/userServices.js";
import eagleExperienceServices from "../services/eagleExperienceServices.js";

const router = useRouter();

const route = useRoute();
const user = ref({});

const studentmajorIdNo = ref({});

const gradSemesterIdNo = ref({});
const gradSemesters = ref([]);

const currentNewTask = ref();
const currentNewExperience = ref();


// * * * F L I G H T   P L A N  * * *
const semesters = ref([{ semestersLeft: 8, semesterNormalized: "Freshman 1" },
]);
const selectedSemesterId = ref(1);
//tasks
//list of all tasks that the admin can choose from
const allTasks = ref(
  [{ name: "Make a resume", points: "30", description: "blah blah blah description", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
  { name: "Make a cover letter", points: "20", description: "Task 2 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:false, hyperLink:"", reflectionReq:true },
  { name: "This is a task", points: "40", description: "Task 3 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
  { name: "Task Tuah", points: "40", description: "Task 4 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
  { name: "Task 2ah", points: "50000", description: "Job on that thang", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
]);


const thisSemestersTasks = ref(
  [
]);

const thisSemestersExperiences= ref(
  [
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

const fetchTasks = () => {
  eagleTaskServices.getAllEagleTasks()
  .then((response) => {
    allTasks.value = response.data
    console.log("All tasks:", allTasks.value)
    loadCurrentTasks()
  })
  .catch((error) =>{
    console.error(error);
  })
};

const fetchExperiences = () => {
  eagleExperienceServices.getAllEagleExperiences()
  .then((response) => {
    allExperiences.value = response.data
    console.log("All experiences:", allExperiences.value)
    loadCurrentExperiences()
  })
  .catch((error) =>{
    console.error(error);
  })
};


onMounted(() => {
  user.value = Utils.getStore('user');
  //console.log(user.value)
  fetchSemesters()
  fetchTasks()
  fetchExperiences()
  
})


const loadCurrentTasks = () => {
  
console.log("semester id ", selectedSemesterId.value)
  thisSemestersTasks.value = [];
  for(let i=0; i<allTasks.value.length; i++)
 {
  if(allTasks.value[i].flightPlanId == selectedSemesterId.value)
  {
    thisSemestersTasks.value.push(allTasks.value[i])
    console.log("push", thisSemestersTasks.value)
  }
 }
 
};

const loadCurrentExperiences = () => {
  
    thisSemestersExperiences.value = [];
    for(let i=0; i<allExperiences.value.length; i++)
   {
    if(allExperiences.value[i].flightPlanId == selectedSemesterId.value)
    {
      thisSemestersExperiences.value.push(allExperiences.value[i])
      console.log("push", thisSemestersExperiences.value)
    }
   }
   
  };

const AddTaskToPlan = () =>
{
  // console.log(currentNewTask.value)
  console.log("bruh", allTasks.value[currentNewTask.value-1])
  eagleTaskServices.updateEagleTask(currentNewTask.value, {"flightPlanId": selectedSemesterId.value})
  .then((response) => {
    fetchTasks()
    loadCurrentTasks()
    currentNewTask.value = null
  })
  .catch((error) => {
    console.error(error);
  })
}

const RemoveTaskFromPlan = (taskId) =>
{
  // console.log(currentNewTask.value)
  console.log("removing task", taskId)
  var myId = ref(0)
  eagleTaskServices.updateEagleTask(taskId, {"flightPlanId": null})
  .then((response) => {
    fetchTasks()
    loadCurrentTasks()
  })
  .catch((error) => {
    console.error("Error removing task", error);
  })
}

const AddExperienceToPlan = () =>
{
  console.log("current new experience", currentNewExperience.value)
  // console.log("bruh", allTasks.value[currentNewTask.value-1])
  eagleExperienceServices.updateEagleExperiences(currentNewExperience.value, {"flightPlanId": selectedSemesterId.value})
  .then((response) => {
    fetchExperiences()
    loadCurrentExperiences()
    currentNewExperience.value = null
  })
  .catch((error) => {
    console.error(error);
  })
}

const RemoveExperienceFromPlan = (experienceId) =>
{
  // console.log(currentNewTask.value)
  console.log("removing experience", experienceId)
  var myId = ref(0)
  eagleExperienceServices.updateEagleExperiences(experienceId, {"flightPlanId": null})
  .then((response) => {
    fetchExperiences()
    loadCurrentExperiences()
  })
  .catch((error) => {
    console.error("Error removing experience", error);
  })
}

</script>

<template>
  <v-app>
    <v-container>
      
      <v-card>
        <v-container>
          <v-row justify="space-between">
            <v-col>
              <v-select dense
                v-model="selectedSemesterId"
                :items="semesters"
                label="Semester"
                item-value="semestersLeft"
                item-title="semesterNormalized"
                @update:modelValue="loadCurrentTasks(); loadCurrentExperiences()"
              >
              
              </v-select>
              <!-- {{selectedSemestersLeft}} -->
            </v-col>

            <v-col></v-col>
            <v-col></v-col>

            <v-col cols="" justify-start>
              <v-btn @click="router.push('AddTask')" rounded="0" class="alt-btn" justify-end="true">New Task</v-btn>
              <v-btn @click="router.push('AddExperience')" rounded="0" class="alt-btn" justify-end="true">New Experience</v-btn>
            </v-col>
          </v-row>

          <v-container class="border bg-surface-variant" style="padding: 0;">
            <v-sheet color="grey" class="pa-5">

              <!-- T A S K S -->
              <v-row >
                <v-col v-for="task in thisSemestersTasks" density="compact">
                  <v-card  class="flightPlanCard">
                    <v-card-title class="">
                      {{ task.name }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ task.description }}
                    </v-card-subtitle>
                    <v-card-actions class="font-weight-regular">
                      <v-btn variant="tonal" class="border-md rounded remove-btn" density="compact" @click="RemoveTaskFromPlan(task.id)">
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
                      v-model="currentNewTask"
                      :items="allTasks"
                      label="Task"
                      item-title="name"
                      item-value="id"
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
                <v-col v-for="experience in thisSemestersExperiences" density="compact">
                  <v-card class="flightPlanCard">
                    <v-card-title class="">
                      {{ experience.name }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ experience.description }}
                    </v-card-subtitle>
                    <v-card-actions class="font-weight-regular">
                      <v-btn variant="tonal" class="border-md rounded remove-btn" density="compact" @click="RemoveExperienceFromPlan(experience.id)">
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
                      v-model="currentNewExperience"
                      :items="allExperiences"
                      label="Experience"
                      item-title="name"
                      item-value="id"
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
