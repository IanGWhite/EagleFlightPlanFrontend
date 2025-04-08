<script setup>
import { ref,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import pointLogServices from "../services/pointLogServices.js";
import Utils from "../config/utils.js";

const router = useRouter();

const route = useRoute();
const user = ref({});

const studentId = ref({});
const tab = ref('option-1');

const majors = ref(['Computer Science', 'Art', 'English']);
const studentStrengths = ref([{ strength: 'One' }, { strength: 'Two' }, { strength: 'three' }, { strength: 'four' }, { strength: 'five' }]);
const pointLogList = ref([]);



// * * * F L I G H T   P L A N  * * *
const semesters = ref([{ semestersLeft: 8, semesterNormalized: "Freshman 1" },
{ semestersLeft: 7, semesterNormalized: "Freshman 2" },
{ semestersLeft: 6, semesterNormalized: "Sophomore 1" }, { semestersLeft: 5, semesterNormalized: "Sophomore 2" },
{ semestersLeft: 4, semesterNormalized: "Junior 1" }, { semestersLeft: 3, semesterNormalized: "Junior 2" },
{ semestersLeft: 2, semesterNormalized: "Senior 1" }, { semestersLeft: 1, semesterNormalized: "Senior 2" }
]);
const selectedSemestersLeft = ref(8);
//tasks
//list of all tasks that the admin can choose from
const allTasks = ref(
  [{ name: "Make a resume", points: "30", description: "blah blah blah description", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
  { name: "Make a cover letter", points: "20", description: "Task 2 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:false, hyperLink:"", reflectionReq:true },
  { name: "This is a task", points: "40", description: "Task 3 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
  { name: "Task Tuah", points: "40", description: "Task 4 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
  { name: "Task 2ah", points: "50000", description: "Job on that thang", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
]);
// the list of tasks that are currently being displayed
const currentStudentEagleTasks = ref(
  [{ name: "", points: "", description: "", semesterFromGrad: 0 },
]);
// all tasks that are assigned to a specific student
const allStudentEagleTasks = ref(
  [{ name: "Make a resume", points: "30", description: "blah blah blah description", semesterFromGrad: 8 },
  { name: "Make a cover letter", points: "20", description: "Task 2 desc. this is describing", semesterFromGrad: 8 },
  { name: "This is a task", points: "40", description: "Task 3 desc. this is describing", semesterFromGrad: 7 },
  { name: "Test Task", points: "70", description: "Task 4 desc. this is describing", semesterFromGrad: 7 },
  { name: "Test Task 2", points: "70", description: "Task 4 desc. this is describing", semesterFromGrad: 7 },
]);

//experiences
const allExperiences = ref(
  [{ name: "Go to career fair", points: "30", description: "blah blah blah description", reflectionReq:false },
  { name: "Go to Job whatever", points: "30", description: "Go to a job whatever to experience jobs or whatever", reflectionReq:false },
  { name: "Experience ego death", points: "100", description: "Go to a job whatever to experience death jobs or whatever", reflectionReq:false },
]);
// the list of tasks that are currently being displayed
const currentStudentEagleExperiences = ref(
  [{ name: "", points: "", description: "", semesterFromGrad: 0 },
]);
// all tasks that are assigned to a specific student
const allStudentEagleExperiences = ref(
  [{ name: "Go to career fair", points: "30", description: "blah blah blah description", reflectionReq:false, semesterFromGrad: 8},
  { name: "Go to Job whatever", points: "30", description: "Go to a job whatever to experience jobs or whatever", reflectionReq:false, semesterFromGrad: 8},
  { name: "Job Time", points: "100", description: "Go to a job whatever to death jobs or whatever", reflectionReq:false, semesterFromGrad: 6},
]);


// * * * R E S U M E S * * *
//headers for the resume list table
const headers = ref([
      { key: 'name', title: 'Name', align: 'start', width:'33%' },
      { key: 'button', title: '', align: 'end', width:'33%' },
    ]
  );

  const studentResumes = ref([
  {
    name: 'Resume 1',
    resumeId: '0',
  },
  {
    name: 'Resume 2',
    resumeId: '1',
  },
]);
const message = ref("test");


// * * * P O I N T L O G * * *
//headers for the point Log list table

const pointLogHeaders = [
  { title: "Type", key: "name", align: "start", sortable: false },
  { title: "pointDifference", key: "pointDifference", sortable: false },
  { title: "Appoved By:", key: "approvedBy"},
  { title: "Date", key: "date"},
];

const getPointLog = async () => {
  try {
    const response = await pointLogServices.getAllPointLogs(studentId.value);
    
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

onMounted(() => {
  studentId.value = route.params.id;
  console.log(studentId.value);
  getPointLog();
})

const savePermissions = () => {
  
};

const saveStudent = () => {
 
};

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
      <p class="page-title">Student Name</p>
      <v-card>
        
      <v-tabs v-model="tab">
        <v-tab 
          text="Info"
          value="option-1"
        ></v-tab>
        <v-tab 
          text="Badges" 
          value="option-2"
          ></v-tab>
        <v-tab 
          text="Points"
          value="option-3"
        ></v-tab>
        <v-tab 
          text="Flight Plan"
          value="option-4"
          @click="loadCurrentTasks(selectedSemestersLeft)"
        ></v-tab>
        <v-tab 
          text="Resumes"
          value="option-5"
        ></v-tab>
        <v-tab 
          text="Permissions"
          value="option-6"
        ></v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <!-- PERSONAL INFO -->
        <v-tabs-window-item value="option-1">
          <v-sheet class="pa-3">
              <v-form>
                <v-row>
                  <v-col>
                    <!-- add v-models to autocomplete forms to attatch them to a student info ref-->
                    <v-sheet>
                      <v-text-field 
                      label="e-mail">
                      </v-text-field>

                      <v-text-field 
                      label="Student id">
                      </v-text-field>

                      <v-autocomplete 
                        
                        label="Major"
                        :items=majors
                      ></v-autocomplete>
                    </v-sheet>
                      
                      <v-sheet>
                        <v-autocomplete 
                        
                          label="Estimated Grad Semester"
                          :items=semesters
                        ></v-autocomplete>
                      </v-sheet>
                  </v-col>
                  
                  <v-col>
                    <v-card>
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
                  </v-col>


                    
                  </v-row>
                    <div class="buttons">
                      <v-btn color="red" @click="saveStudent(route.params.id)">Save</v-btn> <!-- EDIT BUTTON -->
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
          <v-row justify="space-between" align="center">
            <v-col>
              <v-card variant="tonal text-center" class="pa-2 text-h6" >
                Points: 250
              </v-card>
            </v-col>

            <v-col></v-col>
            <v-col></v-col>

            <v-col>
              <v-btn @click="" rounded="0" class="alt-btn">New Transaction</v-btn>
            </v-col>
          </v-row>
          <v-data-table :headers="pointLogHeaders"
           :items="pointLogList"
            :filter-keys="['Date']"></v-data-table>
        </v-container>

      </v-tabs-window-item>
      <!--        FLIGHT PLAN         -->
      <v-tabs-window-item value="option-4">
        <v-container>
          <v-row justify="space-between">
            <v-col>
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
      </v-tabs-window-item>

      <!--        RESUMES         -->
      <v-tabs-window-item value="option-5">
        <v-container>
          

          <v-data-table 
          hide-default-header
          :items="studentResumes"
          :headers="headers"
          >
          <template v-slot:item.button="{ item }" >
            <v-btn class="alt-btn"
             rounded="0"
             append-icon="mdi-arrow-right"
             @click="ViewStudentResume()"
            >View</v-btn>
          </template>
          </v-data-table>
        </v-container>
      </v-tabs-window-item>

      <!--        PERMISSIONS         -->
      <v-tabs-window-item value="option-6">
        <v-sheet class="pa-5">
          <v-form class="pa-3">
            <v-switch color="blue" label="Admin" persistent-hint="true" hint="Is the user an admin?"></v-switch>
            <v-switch color="blue" label="Points" persistent-hint="true" hint="Ability to add or remove points from a student"></v-switch>
            <v-switch color="blue" label="Events" persistent-hint="true" hint="Ability to add or remove event information"></v-switch>
            <v-switch color="blue" label="Attendance" persistent-hint="true" hint="Ability to upload event attendance sheets"></v-switch>

            <div class="buttons">
              <v-btn color="red" @click="savePermissions()">Save</v-btn> <!-- EDIT BUTTON -->
            </div>
          </v-form>
        </v-sheet>
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
