<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import MenuBar from "../components/MenuBar.vue";

const router = useRouter();

const goToResume = () => {
  router.push({ name: 'ResumeListStudents' });
};

const goToInfo = () => {
  router.push({ name: 'StudentInfo' });
};

const goToPage = (link) => {
  router.push({ link });
};
const dialog = ref(false);
const currentItem = ref(0);
const points = ref(100);

const todoItems = ref(
  [{ type: "Declare a major", name: "Declare a major", points: "25", description: "Navigate to your student profile and select a major.", rationale:"This is reasoning for the the student to select a major", canUpload:false, hyperLink:"https://www.google.com", reflectionReq:false },
  { type: "Professional headshot", name: "Professional headshot", points: "25", description: "Get a professional headshot taken and upload it here. You can do this at many locations or here at OC.", rationale:"", canUpload:true, hyperLink:"", reflectionReq:true },
  { type: "Gallup strengths test", name: "Gallup strengths test", points: "50", description: "Take the Gallup strengths test and submit them to your student profile.", rationale:"This is reasoning for the task existsing", canUpload:false, hyperLink:"https://www.google.com", reflectionReq:false },
  
  ]);

  const doneItems = ref(
  [{ type: "Lunch and Learn event", name: "Lunch and Learn", points: "50" },
  { type: "Task 6", name: "Mock Interview", points: "50" }
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
              <a href="home" class="card-link-text">See all</a>
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
            {{points}}
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
              <a href="home" class="card-link-text">See all</a>
            </v-card-text>
            </v-card>
        </v-list>
      </v-navigation-drawer>

      <v-main> <!--            MAIN            -->
        <v-list-item></v-list-item><!-- SPACE ABOVE TIMELINE -->
        <v-card-title class="page-title">To-do</v-card-title>
        <v-card class="main-tasks" variant="tonal">
          <v-timeline density="compact" align-start style="padding-left: 5%; padding-right: 5%;" line-thickness="7" >
            
            <v-timeline-item 
              v-for="(item, index) in todoItems"
              :key="item.type"
              style="width: 100%;"
              @click="dialog = true; currentItem = index"
              class="cursor-pointer"
        >
        <!-- <v-row class="d-flex" justify="space-between" style="width: 100%;">
      <v-col>
        {{ item.name }}
      </v-col>
      <v-col class="text-right">
        {{ item.points }} pts.
      </v-col>
    </v-row> -->
    
    {{ item.name }}
    <!-- {{ item.name }}  -->
    <v-spacer></v-spacer>
    {{ item.points }} pts.

        </v-timeline-item>
          </v-timeline>


        <!-- COMPLETED TASKS -->
        <v-timeline density="compact" align-start style="padding-left: 5%; padding-right: 5%;" line-thickness="7" >
            <v-timeline-item 
          v-for="item in doneItems"
          :key="item.type"
          dot-color="green"
        >
    {{ item.name }}
    <v-spacer></v-spacer>
    {{ item.points }} pts.


        </v-timeline-item>
          </v-timeline>

        </v-card>

        
        <v-dialog v-model="dialog" width="auto">
      <v-card
        max-width="600"
        min-width="400"
      >
          <v-card-title class="text-center">
            {{todoItems[currentItem].name}}
          </v-card-title>
          <v-card-subtitle class="text-center">
            {{todoItems[currentItem].points}} pts.
          </v-card-subtitle>
          <v-card-text>
            {{todoItems[currentItem].description}}
          </v-card-text>
          <v-card-text v-if="todoItems[currentItem].rationale.length>1">
            {{todoItems[currentItem].rationale}}
          </v-card-text>

          <v-card-text class="text-center pa-0" v-if="todoItems[currentItem].hyperLink.length>1">
            <v-btn rounded="0" class="quick-btn">
              Here
            </v-btn>
          </v-card-text>

          <v-card-text v-if="todoItems[currentItem].canUpload">
            <v-file-input clearable label="File input" density="compact"></v-file-input>
          </v-card-text>
          
      
        <template v-slot:actions>
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


</style>
