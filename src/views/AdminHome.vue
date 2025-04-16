<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref,onMounted, hydrate } from "vue";
import MenuBar from "../components/MenuBar.vue";
import eagleTaskServices from "../services/eagleTaskServices";
import studentEagleTaskServices from "../services/studentEagleTaskServices";

import Utils from "../config/utils.js";

const user = ref({});
const router = useRouter();

const goToResume = () => {
  router.push({ name: 'ResumeListStudents' });
};

const goToPage = (pageName) => {
  router.push({ name: pageName });
};
const dialog = ref(false);
const currentItem = ref(0);
const currentItemObj = ref([{}]);
const search = ref("");

const events = ref(
  [{ name: "Event 1", date: "3/4" },
  { name: "Event 2", date: "3/8" },
  { name: "Event 3", date: "3/10" },
  ]);

  const sortBy= ref([{ key: 'submissionDate', order: 'asc' }])
  const completedTasks = ref(
  [
    { type: "Task 1", name: "Make a resume", points: "30", description: "blah blah blah description", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false, student:"Chandler Hurt", reflection: "This made me think about lots of things like where to look for a job or whatever.", submissionDate: '2021-05-13' },
  // { type: "Task 2", name: "Make a cover letter", points: "20", description: "Task 2 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:false, hyperLink:"", reflectionReq:true, student:"Ian White", reflection: "This made me think about lots of things like where to look for a job or whatever.", submissionDate: '2025-02-16' },
  // { type: "Task 3", name: "This is the task", points: "40", description: "Task 3 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false, student:"Samantha Wiggs", reflection:"", submissionDate: '2023-02-01'},
  // { type: "Task 3", name: "This is the task 2", points: "40", description: "Task 3 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false, student:"New Student", reflection:"hfjdskhjfkds", submissionDate: '2020-02-01'},
  // {
  //   name: "", 
  //   points: "", 
  //   description: "", 
  //   rationale:"", 
  //   canUpload:false, 
  //   hyperLink:"", 
  //   reflectionReq:false, 
  //   student:"", 
  //   reflection: "", 
  //   submissionDate: '',
  //   completionDate: new Date()
  // }
  ]);

  const toBeAddedTask = ref({
    name: "", 
    points: "", 
    description: "", 
    rationale:"", 
    canUpload:false, 
    hyperLink:"", 
    reflectionReq:false, 
    student:"", 
    reflection: "", 
    submissionDate: '',
    completionDate: new Date(),
    taskId: 0,
    studentTaskId: 0
  })

  const allTasks = ref([{approvalState: 0, eagleTaskId: 0, Reflection:""}]);

  //cols for the completed tasks table
  const headers = ref([
          { key: 'name', title: 'Name', align: 'start', width:'33%' },
          { key: 'student', title: 'Student', align:'center', width:'33%' },
          { key: 'button', title: '', align: 'end', width:'33%' },
        ]
  )

  // The quick access buttons with their page links
  const quickAccess = ref( 
  [{ name: "Students", location: "viewAllStudents" },
  { name: "Tasks", location: "AddTask" },
  { name: "Experiences", location: "AddEagleExperience" },
  { name: "Events", location: "AddEvent" },
  { name: "Shop", location: "StudentShop" }, //change to admin shop when done
  { name: "Badges", location: "Home" },
  ]);

onMounted(() => {
  user.value = Utils.getStore('user')
  // console.log(user.value)
  fetchStudentEagleTasks();
})

const fetchStudentEagleTasks = () => {
  studentEagleTaskServices.getAllEagleTasks()
    .then((response) => {
      allTasks.value = response.data;
      console.log("Fetched tasks:", allTasks.value);
      // console.log(response.data.reflection)
      sortEagleTasks(response.data.reflection);
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
    
};

const sortEagleTasks = ()  => {
for(let i=0; i< allTasks.value.length; i++)
{
  if (allTasks.value[i].approvalState == 1)
  {
    fetchOneTask(allTasks.value[i].eagleTaskId, i, allTasks.value[i].id)
  }
  fetchStudentNames();
}
};

const fetchOneTask = (taskId, allTaskIndex, studentTaskId) => {
  eagleTaskServices.getEagleTasks(taskId)
    .then((response) => {
      var data = response.data
      let task = {
        name: data.name,
        points: data.points,
        description: data.description,
        rationale: data.rationale,
        canUpload: data.canUpload,
        hyperLink: data.hyperLink,
        reflectionReq: data.reflectionReq,
        reflection: allTasks.value[allTaskIndex].Reflection,
        submissionDate: data.submissionDate,
        completionDate: data.completionDate,
        myTaskId: data.id,
        studentTaskId: studentTaskId
      };
      // console.log("my data",data)
      // console.log("Fetched one task here:", task);
      completedTasks.value.push(task); // Now pushing a unique object
      // console.log(completedTasks.value)
    })
    .catch((error) => {
      console.error("Error fetching single task:", error);
    });
    
};

const fetchStudentNames = () => {
  // for each task in completed tasks
  // use the student task id to find the flight plan (eagleFlightPlanId)
  // then find the student id from flight plan
  // then the student's first and last name
};

const UpdateStudentTaskApproval = (status) => {
  var newState = 0
  if (status) newState = 2
  console.log(currentItemObj.value.studentTaskId)
  studentEagleTaskServices.updateEagleTask(currentItemObj.value.studentTaskId, {'approvalState': newState})
  .then((response) => {
    console.log("updated correctly:", response.data)
  })
  .catch((error) => {
    console.error("Error updating task:", error);
  })
};

</script>

<template>
    <v-app class="rounded rounded-md">
      <!-- LEFT SIDE DRAWER -->
      <v-navigation-drawer permanent class="navigation-drawer">
        <v-list style="margin: 10px;">
          <v-list-item></v-list-item>
            <v-card variant="tonal">
            <v-card-title class="text-center">Upcoming Events</v-card-title>
          <v-list-item class="card-list-item">
            <v-row no-gutters >
              <v-col>
                {{ events[0].name }}
              </v-col>
              <v-col class="text-right">
                {{ events[0].date }}
              </v-col>
            </v-row>
          </v-list-item>

          <v-list-item class="card-list-item">
            <v-row no-gutters >
              <v-col>
                {{ events[1].name }}
              </v-col>
              <v-col class="text-right">
                {{ events[1].date }}
              </v-col>
            </v-row>
          </v-list-item>

          <v-list-item class="card-list-item">
            <v-row no-gutters>
              <v-col>
                {{ events[2].name }}
              </v-col>
              <v-col class="text-right">
                {{ events[2].date }}
              </v-col>
            </v-row>
          </v-list-item>

          <v-card-text class="card-link-text-wrapper">
            <a href="calendar" class="card-link-text">See full calendar</a>
          </v-card-text>

          </v-card>
        </v-list>
      </v-navigation-drawer>
            <!-- RIGHT DRAWER -->
      <v-navigation-drawer location="right" permanent class="navigation-drawer">
        <v-list style="margin: 10px;">
          <v-list-item></v-list-item>
           <!-- QUICK ACCESS -->
            <v-card variant="tonal">
              <v-card-title class="text-center font-weight-bold">
                Quick Access
              </v-card-title>
              <div class="ma-2">
                <v-btn 
                v-for="(item) in quickAccess"
                class="quick-btn" block rounded="0" append-icon="mdi-arrow-right"
                @click="goToPage(item.location)"
                >

                  {{ item.name }}
                </v-btn>
              </div>
              

            </v-card>
          

        </v-list>
      </v-navigation-drawer>

      <v-main> <!--            MAIN            -->
        <v-list-item></v-list-item><!-- SPACE ABOVE TIMELINE -->
        <v-card-title class="page-title">Completed Tasks</v-card-title>
        <v-card variant="tonal" style="margin-left: 5%; margin-right: 5%;">
          
          <v-text-field
            v-model="search"
            label=""
            prepend-inner-icon="mdi-magnify"
            variant=""
            hide-details
            single-line
            
          ></v-text-field>

          <v-data-table
            hide-default-header
            :headers="headers"
            :items="completedTasks"
            :search="search"
            :sort-by.sync="sortBy"
            hide-default-footer
            style="padding: 12px; padding-top: 0%; font-size: 17px;"
          >
          <template v-slot:item.button="{ item }" >
            <v-btn class="quick-btn"
             rounded="0"
             append-icon="mdi-arrow-right"
             @click="dialog=true; currentItemObj=item"
            >Approve</v-btn>
          </template>
        </v-data-table>

        </v-card>

        
        <v-dialog v-model="dialog" width="auto">
      <v-card
        max-width="600"
        min-width="400"
      >
          <v-card-title class="text-center">
            {{currentItemObj.name}}
          </v-card-title>
          <v-card-subtitle class="text-center">
            {{currentItemObj.points}} pts.
          </v-card-subtitle>
          <v-card-text>
            {{currentItemObj.description}} <br>
            {{currentItemObj.rationale}}
          </v-card-text>
          

          <v-card-text v-if="currentItemObj.reflectionReq"
          class="reflection-text border-md">
            <p
            >Student Response:</p>
            {{currentItemObj.reflection}}
          </v-card-text>
          <v-card-text v-else-if="currentItemObj.reflection.length > 0"
          class="reflection-text border-md">
            <p
            >Student Response:</p>
            {{currentItemObj.reflection}}
          </v-card-text>

          

          <!-- <v-card-text v-if="completedTasks[currentItem].canUpload">
            <v-file-input clearable label="File input" density="compact"></v-file-input>
          </v-card-text> -->
          
      
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Cancel" @click="dialog = false" style="width: auto;"></v-btn>
          <v-btn class="quick-btn decline" text="Decline" @click="UpdateStudentTaskApproval(false)"></v-btn>
          <v-btn class="quick-btn" text="Approve" @click="UpdateStudentTaskApproval(true)"></v-btn>
        </template>
      </v-card>
    </v-dialog>

      </v-main>

      
    </v-app>
  </template>

  

<style scoped>


.card-list-item{
  min-height: 10px;
}
.card-link-text{
  opacity: 0.5;
  color: black;
  text-decoration: none;
}

.card-link-text-wrapper{
  text-align: right;
  padding-top: 1%;
  padding-bottom: 3%;
}

.navigation-drawer{
  border: 0;
}
.quick-btn{
  width: auto;
  border-radius: auto;
  padding: auto;
  margin-bottom: 6px;
  margin-top: 6px;
  height: auto;
  background-color: rgb(63, 63, 63);
  color: white;
}

.decline{
  background-color: red;
  color: white;
}

.list-btn{
  margin-left: 20%;
}

.v-input{
  margin-bottom: 0;
}

.reflection-text{
  margin-right: 5%; 
  margin-left: 5%;
  border-width: 2px;
  padding: 8px;
}


</style>
