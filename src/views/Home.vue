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
const dialog = ref(false);
const currentItem = ref(0);

const todoItems = ref(
  [{ type: "Task 1", name: "Make a resume", points: "30", description: "blah blah blah description", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
  { type: "Task 2", name: "Make a cover letter", points: "20", description: "Task 2 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:false, hyperLink:"", reflectionReq:true },
  { type: "Task 3", name: "This is the task", points: "40", description: "Task 3 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
  
  ]);

  const doneItems = ref(
  [{ type: "Task 5", name: "Do a thing", points: "10" },
  { type: "Task 6", name: "Do another thing", points: "40" }
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
        <v-card-title class="text-center">To-do</v-card-title>
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
          <v-card-text>
            {{todoItems[currentItem].rationale}}
          </v-card-text>

          <v-card-text v-if="todoItems[currentItem].canUpload">
            <v-file-input clearable label="File input" density="compact"></v-file-input>
          </v-card-text>
          
      
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Cancel" @click="dialog = false"></v-btn>
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
.main-tasks{
  
}


</style>
