<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import MenuBar from "../components/MenuBar.vue";
import { useDate } from 'vuetify';

const router = useRouter();

const goToResume = () => {
  router.push({ name: 'ResumeListStudents' });
};

const goToInfo = () => {
  router.push({ name: 'StudentInfo' });
};
const dialog = ref(false);
const currentItem = ref(0);
const dialogIsTask = ref(false);
//if the dialog should be the completed variant, otherwise is submittable version
const dialogIsComplete = ref(false);

const todoTaskItems = ref(
  [{ type: "Task", name: "Make a resume", points: "30", description: "blah blah blah description", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"", reflectionReq:false },
  { type: "Task", name: "Make a cover letter", points: "20", description: "Task 2 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:false, hyperLink:"", reflectionReq:true },
  { type: "Task", name: "This is the task", points: "40", description: "Task 3 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:false, hyperLink:"https://www.google.com", reflectionReq:false },
  ]);

  const todoExperienceItems = ref(
  [{ type: "Experience", name: "Job Fair", points: "50", description: "Go To a Job Fair to get a really cool job and have fun", reflectionReq:false, category:"Math" },
  { type: "Experience", name: "Career Fair", points: "50", description: "Go To a Job Fair to get a really cool job and have fun", reflectionReq:true, category:"Career Fair" },
  ]);

  const doneTaskItems = ref(
  [{ type: "Task 5", name: "Professional Wardrobe", points: "10", description: "Start building your professional attire for career fairs,interviews and events", reflection:"This helped me know how to dress for interviews", approvalState:1, submissionDate:new Date('Apr 1, 2025'), completionDate:new Date('Apr 2, 2025') },
  { type: "Task 5", name: "LinkedIn & Handshake", points: "30", description: "Build your online presence on these platforms. Career Services will guide you on how to network effectively and showcase your skills. Remember, LinkedIn is a prime hunting ground for employers", reflection:"", approvalState:2, submissionDate:new Date('Apr 5, 2025'), completionDate:new Date('Apr 10, 2025') },
  { type: "Task 5", name: "Career Path", points: "60", description: "If you have a vision, we'll help you refine your skills and gain relevant experience.", reflection:"", approvalState:1, submissionDate:new Date('Apr 5, 2025'), completionDate:new Date('Apr 10, 2025') },
  
  ]);

  const doneExperienceItems = ref(
  [{ type: "Experience", name: "Job Fair", points: "50", description: "Go To a Job Fair to get a really cool job and have fun", reflectionReq:false, category:"Math", reflection:"This helped me become a better person", approvalState:2, submissionDate:new Date('Apr 5, 2025'), completionDate:new Date('Apr 10, 2025') },
  { type: "Experience", name: "Career Fair", points: "50", description: "Go To a Career Fair to get a really cool job and have fun", reflectionReq:true, category:"Career Fair", reflection:"", approvalState:1, submissionDate:new Date('Apr 5, 2025'), completionDate:new Date('Apr 10, 2025') },
  { type: "Experience", name: "Volunteering", points: "50", description: "Give back to your community and gain valuable experience while building your resume and nurturing your spiritual growth.", reflectionReq:true, category:"", reflection:"fhjskhfjsdk", approvalState:1, submissionDate:new Date('Apr 5, 2025'), completionDate:new Date('Apr 10, 2025') },
  ]);
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
            max-width="600"
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
            max-width="600"
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
            max-width="600"
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
