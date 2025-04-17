<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import MenuBar from "../components/MenuBar.vue";
import { useDate } from 'vuetify';
import studentEagleTaskServices from '../services/studentEagleTaskServices';
import studentEagleExperienceServices from '../services/studentEagleExperienceServices';
import eagleTaskServices from '../services/eagleTaskServices';
import Utils from "../config/utils.js";
import categoryServices from '../services/categoryServices';
import eagleExperienceServices from '../services/eagleExperienceServices.js';
import eagleFlightPlanServices from '../services/eagleFlightPlanServices.js';
import semesterServices from '../services/semesterServices.js';
import { year } from 'vue-cal/dist/i18n/ar.es.js';


const router = useRouter();
const user = ref({});

const goToResume = () => {
  router.push({ name: 'ResumeListStudents' });
};

const goToInfo = () => {
  router.push({ name: 'StudentInfo' });
};

const currentFlightPlan = ref({});
const otherTasks = ref([]);
const otherExperiences = ref([]);
const studentTasks = ref({});
const studentExperiences = ref({});
const categories = ref([]);
const eagleFlightPlans = ref([]);
const semesters = ref([]);

const dialog = ref(false);
const currentItem = ref(0);
const dialogIsTask = ref(false);
//if the dialog should be the completed variant, otherwise is submittable version
const dialogIsComplete = ref(false);

const todoTaskItems = ref([]);

  const todoExperienceItems = ref([]);

  const doneTaskItems = ref([]);

  const doneExperienceItems = ref([]);


  const convertStudentTasks = () => {

    //todo tasks
    todoTaskItems.value = studentTasks.value.filter(n => 
      n.approvalState == 0 && (n.eagleFlightPlanId == currentFlightPlan.value.id)
    ).map((n) => {
      for(let i = 0; i < otherTasks.value.length; i++){
        if(otherTasks.value[i].id == n.eagleTaskId){
          //grabbing category
          console.log("categoryId:", otherTasks.value[i].categoryId);
          var myCategory = ''; //default category
          for(let i = 0; i < categories.value.length; i++){
          if(categories.value[i].id == otherTasks.value[i].categoryId){
           myCategory = categories.value[i].name;
          }
      }
          return {
            type: "Task",
            name: otherTasks.value[i].name,
            description: otherTasks.value[i].description,
            points: otherTasks.value[i].points,
            rationale: otherTasks.value[i].rationale,
            category: myCategory,
           canUpload: otherTasks.value[i].canUpload, 
            hyperLink: otherTasks.value[i].hyperLink ?? "", 
            reflectionReq: otherTasks.value[i].reflectionReq,
        }
      }
      }
      return{}
    });

        //done tasks
        doneTaskItems.value = studentTasks.value.filter(n => 
      (n.approvalState == 1 || n.approvalState == 2) && (n.eagleFlightPlanId == currentFlightPlan.value.id)
    ).map((n) => {
      for(let i = 0; i < otherTasks.value.length; i++){
        if(otherTasks.value[i].id == n.eagleTaskId){
          //grabbing category
          console.log("categoryId:", otherTasks.value[i].categoryId);
          var myCategory = ''; //default category
          for(let i = 0; i < categories.value.length; i++){
          if(categories.value[i].id == otherTasks.value[i].categoryId){
           myCategory = categories.value[i].name;
          }
      }
          return {
            type: "Task 5",
            name: otherTasks.value[i].name,
            description: otherTasks.value[i].description,
            points: otherTasks.value[i].points,
            reflection: n.Reflection ?? "",
            approvalState: n.approvalState, 
            submissionDate: n.submissionDate, 
            completionDate: n.completionDate,
        }
      }
      }
      return{}
    });

    console.log("todo tasks list: ", todoTaskItems.value);
    console.log("done tasks list: ", doneTaskItems.value);
  }
    
//convert experiences
  const convertStudentExperiences = () => {

//todo experiences
todoExperienceItems.value = studentExperiences.value.filter(n => 
  n.approvalState == 0 && (n.eagleFlightPlanId == currentFlightPlan.value.id)
).map((n) => {
  for(let i = 0; i < otherExperiences.value.length; i++){
    if(otherExperiences.value[i].id == n.eagleExperienceId){
      //grabbing category
      console.log("categoryId:", otherExperiences.value[i].categoryId);
      var myCategory = ''; //default category
      for(let i = 0; i < categories.value.length; i++){
      if(categories.value[i].id == otherExperiences.value[i].categoryId){
       myCategory = categories.value[i].name;
      }
  }
      return {
        type: "Experience",
        name: otherExperiences.value[i].name,
        description: otherExperiences.value[i].description,
        points: otherExperiences.value[i].points,
        category: myCategory,
        reflectionReq: otherExperiences.value[i].reflectionReq,
    }
  }
  }
  return{}
  
});

    //done tasks
    doneExperienceItems.value = studentExperiences.value.filter(n => 
  (n.approvalState == 1 || n.approvalState == 2) && (n.eagleFlightPlanId == currentFlightPlan.value.id)
).map((n) => {
  for(let i = 0; i < otherExperiences.value.length; i++){
    if(otherExperiences.value[i].id == n.eagleExperienceId){
      //grabbing category
      console.log("categoryId:", otherExperiences.value[i].categoryId);
      var myCategory = ''; //default category
      for(let i = 0; i < categories.value.length; i++){
      if(categories.value[i].id == otherExperiences.value[i].categoryId){
       myCategory = categories.value[i].name;
      }
  }
      return {
        type: "Experience",
        name: otherExperiences.value[i].name,
        description: otherExperiences.value[i].description,
        points: otherExperiences.value[i].points,
        reflection: n.reflection ?? "",
        category: myCategory,
        approvalState: n.approvalState, 
        submissionDate: n.submissionDate, 
        completionDate: n.completionDate,
    }
  }
  }
  return{}
});

console.log("todo Experiences list: ", todoExperienceItems.value);
console.log("done Experiences list: ", doneExperienceItems.value);
}



  const fetchCategories = () => {
  categoryServices.getAllCategories()
    .then((response) => {
      categories.value = response.data; // Assuming the backend returns an array of tasks
      console.log("Fetched categories:", categories.value);
      fetchEagleTasks();
      fetchEagleExperiences();
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
    
  };

  const fetchEagleExperiences = () => {
  eagleExperienceServices.getAllEagleExperiences()
    .then((response) => {
      otherExperiences.value = response.data; // Assuming the backend returns an array of tasks
      console.log("Fetched experiences:", otherExperiences.value);
      fetchStudentEagleExperiences();
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
    
  };

  const fetchEagleTasks = () => {
  eagleTaskServices.getAllEagleTasks()
    .then((response) => {
      otherTasks.value = response.data; // Assuming the backend returns an array of tasks
      console.log("Fetched tasks:", otherTasks.value);
      fetchStudentEagleTasks();
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
    
  };

  const fetchStudentEagleTasks = () => {
  studentEagleTaskServices.getAllStudentEagleTasksForStudent(user.value.studentId, currentFlightPlan.value.id)
    .then((response) => {
      studentTasks.value = response.data; // Assuming the backend returns an array of tasks
      console.log("Fetched Student tasks:", studentTasks.value);
      convertStudentTasks();
    })
    .catch((error) => {
      console.error("Error fetching student tasks:", error);
    });
    
  };

  const fetchStudentEagleExperiences = () => {
  studentEagleExperienceServices.getAllStudentEagleExperiencesForStudent(user.value.studentId, currentFlightPlan.value.id)
    .then((response) => {
      studentExperiences.value = response.data; // Assuming the backend returns an array of tasks
      console.log("Fetched Student Experiences:", studentExperiences.value);
      convertStudentExperiences();
    })
    .catch((error) => {
      console.error("Error fetching student tasks:", error);
    });
    
  };

  // after june = the name will be fall and then the year
  // after new years but before june, it will be spring

  const fetchCurrentFlightPlan = () => {
    let currentDate = new Date();
    let currentYear = new Date().getFullYear();
    let semesterTitle = '';
    console.log(currentYear);
    console.log(new Date(currentYear+'-06-01'));
    let june = new Date(currentYear+'-06-01');
    if(currentDate >= june ){
      semesterTitle = 'Fall '+currentYear;
    }else{
      semesterTitle = 'Spring '+currentYear;
    }
    for(let i = 0; i <eagleFlightPlans.value.length; i++){
      for(let j = 0; j <semesters.value.length; j++){
        if(semesters.value[j].id == eagleFlightPlans.value[i].semesterId){
          if(semesterTitle == semesters.value[j].name){
            currentFlightPlan.value = eagleFlightPlans.value[i];
            console.log("current flight plan: ", currentFlightPlan.value);
            fetchCategories();
          }

        }
      }

    }

  }

  const fetchSemesters = () => {
    semesterServices.getAllSemesters()
    .then((response) => {
      semesters.value = response.data; // Assuming the backend returns an array of tasks
      console.log("Fetched semesters:", semesters.value);
      fetchCurrentFlightPlan();
    })
    .catch((error) => {
      console.error("Error fetching flight plans tasks:", error);
    });
    
  }

  const fetchEagleFlightPlans = () => {
    eagleFlightPlanServices.getAllEagleFlightPlansForStudent(user.value.studentId)
    .then((response) => {
      eagleFlightPlans.value = response.data; // Assuming the backend returns an array of tasks
      console.log("Fetched flight plans:", eagleFlightPlans.value);
      fetchSemesters();
    })
    .catch((error) => {
      console.error("Error fetching flight plans tasks:", error);
    });
    
  }

onMounted(() => {
  user.value = Utils.getStore('user')
  console.log(user.value)
  fetchEagleFlightPlans();
})
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
                Event 1
              </v-col>
              <v-col class="text-right">
                1/19
              </v-col>
            </v-row>
          </v-list-item>

          <v-list-item class="card-list-item">
            <v-row no-gutters >
              <v-col>
                Event 2
              </v-col>
              <v-col class="text-right">
                2/1
              </v-col>
            </v-row>
          </v-list-item>

          <v-list-item class="card-list-item">
            <v-row no-gutters>
              <v-col>
                Event 3
              </v-col>
              <v-col class="text-right">
                2/11
              </v-col>
            </v-row>
          </v-list-item>

          <v-card-text class="card-link-text-wrapper">
            <a href="Calendar" class="card-link-text">See full calendar</a>
          </v-card-text>

          </v-card>
          <v-list-item></v-list-item> <!-- SPACE IN BETWEEN CARDS -->

          <!--              EXPERIENCES CARD               -->
          <v-card variant="tonal">
            <v-card-title class="text-center">Experiences</v-card-title>
            <v-list-item class="card-list-item">
              <v-row no-gutters >
                <v-col>
                  Experience 1
                </v-col>
                <v-col class="text-right">
                  1/19
                </v-col>
              </v-row>
            </v-list-item>
  
            <v-list-item class="card-list-item">
              <v-row no-gutters >
                <v-col>
                  Experience 2
                </v-col>
                <v-col class="text-right">
                  2/1
                </v-col>
              </v-row>
            </v-list-item>
  
            <v-list-item class="card-list-item">
              <v-row no-gutters>
                <v-col>
                  Experience 3
                </v-col>
                <v-col class="text-right">
                  2/11
                </v-col>
              </v-row>
            </v-list-item>
            
            <v-card-text class="card-link-text-wrapper">
              <a href="www.google.com/" class="card-link-text">See all</a>
            </v-card-text>
  
            </v-card>
          
        </v-list>
      </v-navigation-drawer>
            <!-- RIGHT DRAWER -->
      <v-navigation-drawer location="right" permanent class="navigation-drawer">
        <v-list style="margin: 10px;">
          <v-list-item></v-list-item>
           <!-- POINTS CARD -->
            <v-card variant="tonal">
            <v-card-title class="text-center">Your Points</v-card-title>
          <v-card-text class="points-text">
            500
          </v-card-text>

          <v-card-text class="card-link-text-wrapper">
            <a href="StudentShop" class="card-link-text">See Shop</a>
          </v-card-text>

          </v-card>
          <v-list-item></v-list-item> <!-- SPACE IN BETWEEN CARDS -->

          <!--              BADGES CARD               -->
          <v-card variant="tonal">
            <v-card-title class="text-center">Badges</v-card-title>
            <v-list-item >
              <v-row no-gutters>
                <v-col class="d-flex child-flex">
                  <v-img src="../src/assets/badge-placeholder.png" cover></v-img>
                </v-col>
                <v-col class="d-flex child-flex">
                  <v-img src="../src/assets/badge-placeholder.png" cover></v-img>
                </v-col>
                <v-col class="d-flex child-flex">
                  <v-img src="../src/assets/badge-placeholder.png" cover></v-img>
                </v-col>
                
              </v-row>
            </v-list-item>
  
            
            
            <v-card-text class="card-link-text-wrapper">
              <a href="www.google.com/" class="card-link-text">See all</a>
            </v-card-text>
            </v-card>
        </v-list>
      </v-navigation-drawer>

      <v-main> <!--            MAIN            -->
        <v-list-item></v-list-item><!-- SPACE ABOVE TIMELINE -->
        <v-card-title class="page-title">To-do</v-card-title>
        <v-card class="main-tasks" variant="tonal">
          <!-- TIMELINES -->
          <v-timeline density="compact" align-start style="padding-left: 5%; padding-right: 5%;" line-thickness="7" >
            <!-- Tasks -->
            <v-timeline-item 
              v-for="(item, index) in todoTaskItems"
              :key="item.type"
              style="width: 100%;"
              @click="dialog = true; currentItem = index; dialogIsTask=true; dialogIsComplete=false"
              class="cursor-pointer"
              dot-color="#ed6e13"
            >
              {{ item.name }}
              <!-- {{ item.name }}  -->
              <v-spacer></v-spacer>
              {{ item.points }} pts.

            </v-timeline-item>

            <!-- EXPERIENCES TIMELINE -->
            <v-timeline-item 
              v-for="(item, index) in todoExperienceItems"
              :key="item.type"
              style="width: 100%;"
              @click="dialog = true; currentItem = index; dialogIsTask=false; dialogIsComplete=false"
              class="cursor-pointer"
              dot-color="niceBlue"
            >
              {{ item.name }}
              <!-- {{ item.name }}  -->
              <v-spacer></v-spacer>
              {{ item.points }} pts.

            </v-timeline-item>

          </v-timeline>


        <!-- COMPLETED TASKS TIMELINE -->
         <p class="text-h5" style="margin-left: 5%;">Completed</p>
        <v-timeline density="compact" align-start style="padding-left: 5%; padding-right: 5%;" line-thickness="7" >
            <v-timeline-item 
              v-for="(item, index) in doneTaskItems"
              :key="item.type"
              dot-color="green"
              icon="mdi-check"
              class="text-disabled cursor-pointer"
              @click="dialog = true; currentItem = index; dialogIsTask=true; dialogIsComplete=true"
              
            >
            {{ item.name }}
            <v-spacer></v-spacer>
            {{ item.points }} pts.

            </v-timeline-item>
          </v-timeline>
          <!-- COMPLETED EXPERIENCES TIMELINE -->
          <v-timeline density="compact" align-start style="padding-left: 5%; padding-right: 5%;" line-thickness="7" >
            <v-timeline-item 
              v-for="(item, index) in doneExperienceItems"
              :key="item.type"
              dot-color="green"
              icon="mdi-check"
              class="text-disabled cursor-pointer"
              @click="dialog = true; currentItem = index; dialogIsTask=false; dialogIsComplete=true"
              
            >
            {{ item.name }}
            <v-spacer></v-spacer>
            {{ item.points }} pts.

            </v-timeline-item>
          </v-timeline>
        </v-card>

        <!-- DIALOG -->
        <v-dialog v-model="dialog" width="auto">
          <!-- INCOMPLETE TASKS -->
          <v-card v-if="!dialogIsComplete && dialogIsTask" 
            min-width="400"
          >
            <v-card-title class="text-center">
              {{todoTaskItems[currentItem].name}}
            </v-card-title>
            <v-card-subtitle class="text-center">
              {{todoTaskItems[currentItem].points}} pts.
            </v-card-subtitle>
            <v-card-text class="pa-4">
              {{todoTaskItems[currentItem].description}}
            </v-card-text>
            <v-card-text class="pa-4">
              {{todoTaskItems[currentItem].rationale}}
            </v-card-text>

            <v-card-text v-if="todoTaskItems[currentItem].reflectionReq">
              <v-textarea label="Reflection" hint="Reflect on how this task helped you grow">
              </v-textarea>
            </v-card-text>

            <v-card-text v-if="todoTaskItems[currentItem].canUpload">
              <v-file-input clearable label="File input" density="compact"></v-file-input>
            </v-card-text>

            <v-card-text v-if="todoTaskItems[currentItem].hyperLink.length > 0" class="text-center btn-alt">
              <v-btn prepend-icon="mdi-open-in-new"
              :href="todoTaskItems[currentItem].hyperLink"
              target="_blank"
              >Link</v-btn>
            </v-card-text>
          
            <template v-slot:actions>
              <v-btn class="ms-auto" text="Cancel" @click="dialog = false"></v-btn>
              <v-btn v-if="todoTaskItems[currentItem].reflectionReq"
              class="ms-auto" text="Submit" @click="SubmitReflection()"></v-btn>
            </template>
      </v-card>

      <!-- INCOMPLETE EXPERIENCES -->
      <v-card v-if="!dialogIsComplete && !dialogIsTask"
            
            min-width="400"
          >
            <v-card-title class="text-center">
              {{todoExperienceItems[currentItem].name}}
            </v-card-title>
            <v-card-subtitle class="text-center">
              {{todoExperienceItems[currentItem].points}} pts.
            </v-card-subtitle>
            
            <v-card-text class="pa-4">
              {{todoExperienceItems[currentItem].description}}
            </v-card-text>
            <v-card-subtitle class="" style="padding: 5px 15px;">
              <v-icon icon="mdi-shape"/>
              {{todoExperienceItems[currentItem].category}}
            </v-card-subtitle>
            
            <v-card-text v-if="todoExperienceItems[currentItem].reflectionReq">
              <v-textarea label="Reflection" hint="Reflect on how this experience helped you grow"></v-textarea>
            </v-card-text>

            <template v-slot:actions>
              <v-btn class="ms-auto" text="Cancel" @click="dialog = false"></v-btn>
              <v-btn v-if="todoExperienceItems[currentItem].reflectionReq"
              class="ms-auto" text="Submit" @click="SubmitReflection()"></v-btn>
            </template>
      </v-card>
            <!-- COMPLETE VERSIONS - for a dialog of a task that has been submitted -->
      <!-- COMPLETE TASKS -->
      <v-card v-if="dialogIsComplete && dialogIsTask" 
            min-width="400"
          >
             <v-card-title class="text-center">
              {{doneTaskItems[currentItem].name}}
            </v-card-title>
          
            <v-card-text class="text-center" v-if="doneTaskItems[currentItem].approvalState == 0" style="color: red;">
              This task is not complete and should not be here.
            </v-card-text>
            <v-card-subtitle class="text-center" v-if="doneTaskItems[currentItem].approvalState == 1">
              This task has been submitted for completion.
            </v-card-subtitle>

            <v-card-subtitle class="text-center">
              {{doneTaskItems[currentItem].points}} pts.
            </v-card-subtitle>


            <v-card-text class="pa-4">
              {{doneTaskItems[currentItem].description}}
            </v-card-text>
            

            <v-card-text v-if="doneTaskItems[currentItem].reflection.length > 0">
              <v-textarea label="Reflection" readonly v-model="doneTaskItems[currentItem].reflection">
                {{ doneTaskItems[currentItem].reflection }}
              </v-textarea>
            </v-card-text>

            
            <template v-slot:actions>
              <v-card-subtitle v-if="doneTaskItems[currentItem].approvalState == 1">
                Submitted on:
                {{ useDate().format(doneTaskItems[currentItem].submissionDate, 'fullDate')  }}
              </v-card-subtitle>
              <v-card-subtitle v-if="doneTaskItems[currentItem].approvalState == 2">
                Completed on:
                {{ useDate().format(doneTaskItems[currentItem].completionDate, 'fullDate')  }}
              </v-card-subtitle>
              <v-btn class="ms-auto" text="Close" @click="dialog = false"></v-btn>
            </template>
      </v-card>

      <!-- COMPLETE EXPERIENCES -->
      <v-card v-if="dialogIsComplete && !dialogIsTask" 
            min-width="400"
          >
             <v-card-title class="text-center">
              {{doneExperienceItems[currentItem].name}}
            </v-card-title>
          
            <v-card-text class="text-center" v-if="doneExperienceItems[currentItem].approvalState == 0" style="color: red;">
              This task is not complete and should not be here.
            </v-card-text>
            <v-card-subtitle class="text-center" v-if="doneExperienceItems[currentItem].approvalState == 1">
              This task has been submitted for completion.
            </v-card-subtitle>

            <v-card-subtitle class="text-center">
              {{doneExperienceItems[currentItem].points}} pts.
            </v-card-subtitle>


            <v-card-text class="pa-4">
              {{doneExperienceItems[currentItem].description}}
            </v-card-text>
            <v-card-subtitle v-if="doneExperienceItems[currentItem].category.length > 0" style="padding: 5px 15px;">
              <v-icon icon="mdi-shape"/>
              {{doneExperienceItems[currentItem].category}}
            </v-card-subtitle>
            

            <v-card-text v-if="doneExperienceItems[currentItem].reflection.length > 0">
              <v-textarea label="Reflection" readonly v-model="doneExperienceItems[currentItem].reflection">
                {{ doneExperienceItems[currentItem].reflection }}
              </v-textarea>
            </v-card-text>

            
            <template v-slot:actions>
              <v-card-subtitle v-if="doneTaskItems[currentItem].approvalState == 1">
                Submitted on:
                {{ useDate().format(doneTaskItems[currentItem].submissionDate, 'fullDate')  }}
              </v-card-subtitle>
              <v-card-subtitle v-if="doneTaskItems[currentItem].approvalState == 2">
                Completed on:
                {{ useDate().format(doneTaskItems[currentItem].completionDate, 'fullDate')  }}
              </v-card-subtitle>
              <v-btn class="ms-auto" text="Close" @click="dialog = false"></v-btn>
            </template>
      </v-card>
    </v-dialog>

      </v-main>

      
    </v-app>
  </template>

  

<style scoped>
.fill-height {
  background-color: #f5e7d0;
  min-height: 100vh;
}
.v-btn {
  width: 150px;
}
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
  /* padding-left: 2%;
  padding-right: 2%; */
}
.points-text{
  text-align: center;
  font-size: 3rem;
  font-weight:bold;
  line-height: 0.7;
  padding-top: 3%;
}
.badge-image{
  max-height:10%;
}
.complete-task{
  opacity: 0.5;
  
}


</style>
