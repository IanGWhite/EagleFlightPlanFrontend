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
import studentServices from '../services/studentServices.js';
import semesterServices from '../services/semesterServices.js';
import eventServices from '../services/eventServices.js';
import eventAttendServices from '../services/eventAttendServices.js';
import { year } from 'vue-cal/dist/i18n/ar.es.js';
import flightPlanLoader from '../services/flightPlanLoader.js';

const router = useRouter();
const user = ref({});
const student = ref({});

const goToResume = () => {
  router.push({ name: 'ResumeListStudents' });
};

const goToInfo = () => {
  router.push({ name: 'StudentInfo' });
};
const eventList = ref([]);
const newEvents = ref([]);
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
          //console.log("categoryId:", otherTasks.value[i].categoryId);
          var myCategory = ''; //default category
          for(let j = 0; j < categories.value.length; j++){
          if(categories.value[j].id == otherTasks.value[i].categoryId){
           myCategory = categories.value[j].name;
          }
      }
          return {
            type: "Task",
            name: otherTasks.value[i].name,
            description: otherTasks.value[i].description,
            points: otherTasks.value[i].points,
            rationale: otherTasks.value[i].rationale ?? "",
            category: myCategory,
            categoryId: otherTasks.value[i].categoryId,
           canUpload: otherTasks.value[i].canUpload ?? "", 
            hyperLink: otherTasks.value[i].hyperLink ?? "", 
            reflectionReq: otherTasks.value[i].reflectionReq,
            id: n.id
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
          //console.log("categoryId:", otherTasks.value[i].categoryId);
          var myCategory = ''; //default category
          for(let j = 0; j < categories.value.length; j++){
          if(categories.value[j].id == otherTasks.value[i].categoryId){
           myCategory = categories.value[j].name;
          }
      }
          return {
            type: "Task 5",
            name: otherTasks.value[i].name,
            description: otherTasks.value[i].description,
            points: otherTasks.value[i].points,
            reflection: n.Reflection ?? "",
            approvalState: n.approvalState, 
            submissionDate: n.submissionDate ?? "", 
            completionDate: n.completionDate ?? "",
        }
      }
      }
      return{}
    });
    if(todoTaskItems.value.length == 0 && doneTaskItems.value.length == 0)
    {
      console.error("No tasks loaded. attempting to create student tasks.")
      //console.log(" Current flight plan", currentFlightPlan.value)
      flightPlanLoader.copyTasksFromFlightPlan(user.value.studentId, currentFlightPlan.value.id)
    }
    //console.log("todo tasks list: ", todoTaskItems.value);
    //console.log("done tasks list: ", doneTaskItems.value);
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
      //console.log("categoryId:", otherExperiences.value[i].categoryId);
      var myCategory = ''; //default category
      for(let j = 0; j < categories.value.length; j++){
      if(categories.value[j].id == otherExperiences.value[i].categoryId){
       myCategory = categories.value[j].name;
      }
  }
      return {
        type: "Experience",
        name: otherExperiences.value[i].name,
        description: otherExperiences.value[i].description,
        points: otherExperiences.value[i].points,
        category: myCategory,
        categoryId: otherExperiences.value[i].categoryId,
        reflectionReq: otherExperiences.value[i].reflectionReq,
        id: n.id
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
      //console.log("categoryId:", otherExperiences.value[i].categoryId);
      var myCategory = ''; //default category
      for(let j = 0; j < categories.value.length; j++){
      if(categories.value[j].id == otherExperiences.value[i].categoryId){
       myCategory = categories.value[j].name;
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
        submissionDate: n.submissionDate ?? "", 
        completionDate: n.completionDate ?? "",
        id: n.id
    }
  }
  }
  return{}
});


console.log("todo Experiences list: ", todoExperienceItems.value);
console.log("done Experiences list: ", doneExperienceItems.value);
checkForExperienceCompletion();

}



  const fetchCategories = () => {
  categoryServices.getAllCategories()
    .then((response) => {
      categories.value = response.data; // Assuming the backend returns an array of tasks
      //console.log("Fetched categories:", categories.value);
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
      //console.log("Fetched experiences:", otherExperiences.value);
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
      //console.log("Fetched tasks:", otherTasks.value);
      fetchStudentEagleTasks();
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
    
  };

  const fetchStudentEagleTasks  = async () => {
  await studentEagleTaskServices.getAllStudentEagleTasksForStudent(user.value.studentId, currentFlightPlan.value.id)
    .then((response) => {
      studentTasks.value = response.data; // Assuming the backend returns an array of tasks
      //console.log("Fetched Student tasks:", studentTasks.value);
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
      //console.log("Fetched Student Experiences:", studentExperiences.value);
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
    //console.log(currentYear);
    //console.log(new Date(currentYear+'-06-01'));
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
            //console.log("current flight plan: ", currentFlightPlan.value);
            fetchCategories();


            // if(todoTaskItems.value.length == 0 && doneTaskItems.value.length == 0)
            // {
            //   console.error("No tasks loaded. attempting to create student tasks.")
            //   //console.log(" Current flight plan", currentFlightPlan.value)
            //   flightPlanLoader.copyTasksFromFlightPlan(user.value.studentId, currentFlightPlan.value.id)
            // }

          }else{
            //console.log("couldnt find current flight plan: ", semesterTitle, semesters.value[j].name);
          }

        }
      }

    }

  }

  const fetchSemesters = () => {
    semesterServices.getAllSemesters()
    .then((response) => {
      semesters.value = response.data; // Assuming the backend returns an array of tasks
      //console.log("Fetched semesters:", semesters.value);
      fetchCurrentFlightPlan();
    })
    .catch((error) => {
      console.error("Error fetching flight plans tasks:", error);
    });
    
  }

  const convertEvents = () => {
    //convert events
    var futureDate = new Date();
    futureDate.setDate(futureDate.getDate() +10 );
    //console.log("future date",futureDate);
    eventList.value = newEvents.value.filter(n => 
    new Date(n.date.substring(0,10)+', '+n.startTime+':00') >= new Date() &&
    new Date(n.date.substring(0,10)+', '+n.startTime+':00') <= futureDate
    ).sort((a,b) => {return new Date(a.date.substring(0,10)+', '+a.startTime+':00') - new Date(b.date.substring(0,10)+', '+b.startTime+':00') 

    }).slice(0,3)
    .map((n) => {
      for(let i = 0; i < newEvents.value.length; i++){
          var eventDate = new Date(n.date.substring(0,10)+', '+n.startTime+':00');
          //console.log("event date",eventDate);
          var newDay = eventDate.getDate();
          var newMonth = eventDate.getMonth();
          var newDate = ""+newMonth+"/"+newDay;
          return {
            name: n.name,
            date: newDate,
      }
      }
      return{}
    });
    //console.log("events list: ", eventList.value);
  }

  const fetchEvents = async() => {
    await eventServices.getAllEvents()
    .then((response) => {
      newEvents.value = response.data; // Assuming the backend returns an array of tasks
      //console.log("Fetched events:", newEvents.value);
      convertEvents();
    })
    .catch((error) => {
      console.error("Error fetching flight plans tasks:", error);
    });
    
  }

  const fetchEagleFlightPlans = async() => {
    await eagleFlightPlanServices.getAllEagleFlightPlansForStudent(user.value.studentId)
    .then((response) => {
      eagleFlightPlans.value = response.data; // Assuming the backend returns an array of tasks
      //console.log("Fetched flight plans:", eagleFlightPlans.value);
      fetchSemesters();
    })
    .catch((error) => {
      console.error("Error fetching flight plans tasks:", error);
    });
    
  }

  const convertTexts = () => {
    
  var titleText = document.getElementById("myTitle");
  var newTitle = user.value.fName;
  titleText.innerHTML = newTitle+"'s To-do List";

  studentServices.getStudentForUser(user.value.userId)
    .then((response) => {
      student.value = response.data; // Assuming the backend returns an array of tasks
      //console.log("Fetched student:", student.value);
      var pointText = document.getElementById("myPoints");
      var newPoints = student.value[0].points;
      pointText.innerHTML = ""+newPoints;
    })
    .catch((error) => {
      console.error("Error fetching flight plans tasks:", error);
    });


  }

  const submitTask = (studentEagleTaskId) => {
  studentEagleTaskServices
    .submitStudentEagleTaskForStudent(user.value.studentId, 1, studentEagleTaskId)
    .then(() => {
      console.log("Submitted task:", studentEagleTaskId);
      fetchStudentEagleTasks(); // re-fetch updated list
    })
    .catch((error) => {
      console.error("Error submitting task:", error);
    });
    window.location.reload();
};

const checkForExperienceCompletion = async () => {
  try {
    // Get event attendance data
    const response = await eventAttendServices.getAllEventAttend(user.value.studentId);
    const eventAttended = response.data;
    console.log("eventAttended ", eventAttended);
    
    // Get all events for each attended event
    const eventPromises = eventAttended.map((e) => eventServices.getEvents(e.eventId));
    
    // Await all events to be fetched
    const events = await Promise.all(eventPromises);
    const Attendedevents = events.map(event => event.data);  // Assuming the response has 'data' field
    console.log("attededevent: ", Attendedevents);
    // Extract categories from the attended events
    const attendCategories = Attendedevents.map(e => e.categoryId);
    console.log("attendCategories:", attendCategories);
    console.log("todoExperienceItems:", todoExperienceItems.value);
    // Check for matching categories in todo experience items
    todoExperienceItems.value.forEach((toDo) => {
      console.log("toDo category:", toDo.categoryId);
      
      // Fix: Ensure category types are the same (number/strings)
      const matchingCategory = attendCategories.find((cat) => {
        console.log("Checking category:", cat);  // Debug log for each category
        return cat === toDo.categoryId;
      });
      
      if (matchingCategory) {
        console.log("todo experience id", toDo.id)
        studentEagleExperienceServices.updateStudentEagleExperienceForStudent(user.value.studentId, 1, toDo.id, {approvalState: 2});
        console.log("Matching category found:", toDo);
      }
    });


  } catch (error) {
    console.error("Error checking for experience completion:", error);
  }
};




onMounted(async () => {
  try {
    user.value = Utils.getStore('user');
    if (user.value != null) {
      convertTexts();
    }

    console.log("User data:", user.value);

    // Fetch events and eagle flight plans in parallel
    console.log("Fetching events and flight plans in parallel...");
    await Promise.all([fetchEvents(), fetchEagleFlightPlans()]);

    // Now, check experience completion
    console.log("Checking for experience completion...");
  } catch (error) {
    console.error("Error during onMounted:", error);
  }
});

</script>

<template>
    <v-app class="rounded rounded-md">
      <!-- LEFT SIDE DRAWER -->
      <v-navigation-drawer permanent class="navigation-drawer">
        <v-list style="margin: 10px;">
          <v-list-item></v-list-item>
            <v-card variant="tonal">
            <v-card-title class="text-center">Upcoming Events</v-card-title>
          <v-list-item
              v-for="(item, index) in eventList"
              :key="item.type"
              style="width: 100%;"
              @click="dialog = true; currentItem = index; dialogIsTask=true; dialogIsComplete=false"
              class="card-list-item"
              dot-color="#ed6e13"
            >
              
              <!-- {{ item.name }}  -->
              <v-spacer></v-spacer>
              
            <v-row no-gutters >
              <v-col>
                {{ item.name }}
              </v-col>
              <v-col class="text-right">
                {{ item.date }}
              </v-col>
            </v-row>
          </v-list-item>


          <v-card-text class="card-link-text-wrapper">
            <a href="Calendar" class="card-link-text">See full calendar</a>
          </v-card-text>

          </v-card>
          <v-list-item></v-list-item> <!-- SPACE IN BETWEEN CARDS -->
          
        </v-list>
      </v-navigation-drawer>
            <!-- RIGHT DRAWER -->
      <v-navigation-drawer location="right" permanent class="navigation-drawer">
        <v-list style="margin: 10px;">
          <v-list-item></v-list-item>
           <!-- POINTS CARD -->
            <v-card variant="tonal">
            <v-card-title class="text-center">Your Points</v-card-title>
          <v-card-text id="myPoints"class="points-text">
            
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
        <v-card-title id="myTitle" class="page-title">To-do</v-card-title>
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
              <v-btn 
              class="ms-auto" text="Submit" @click="submitTask(todoTaskItems[currentItem].id)"></v-btn>
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
