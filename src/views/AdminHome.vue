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
const currentItemObj = ref([{}]);
const search = ref("");

const events = ref(
  [{ name: "Event 1", date: "3/4" },
  { name: "Event 2", date: "3/8" },
  { name: "Event 3", date: "3/10" },
  ]);


  const completedTasks = ref(
  [{ type: "Task 1", name: "Make a resume", points: "30", description: "blah blah blah description", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false, student:"Chandler Hurt" },
  { type: "Task 2", name: "Make a cover letter", points: "20", description: "Task 2 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:false, hyperLink:"", reflectionReq:true, student:"Ian White" },
  { type: "Task 3", name: "This is the task", points: "40", description: "Task 3 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false, student:"Samantha Wiggs" },
  ]);

  const headers = ref([
          { key: 'type', title: 'type', align: 'start', width:'33%' },
          { key: 'student', title: 'Student', align:'center', width:'33%' },
          { key: 'button', title: '', align: 'end', width:'33%' },
        ]
  )

  // The quick access buttons with their page links
  const quickAccess = ref( 
  [{ name: "Students", location: "/Home" },
  { name: "Tasks", location: "/Home" },
  { name: "Events", location: "/Home" },
  { name: "Shop", location: "/StudentShop" }, //change to admin shop when done
  { name: "Badges", location: "/Home" },
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
            <a href="www.google.com/" class="card-link-text">See full calendar</a>
          </v-card-text>

          </v-card>
          <v-list-item></v-list-item> <!-- SPACE IN BETWEEN CARDS -->

          <!--              EXPERIENCES CARD               -->
          
          
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
                class="quick-btn" block rounded="0" append-icon="mdi-arrow-right" :href="item.location">
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
            {{currentItemObj.description}}
          </v-card-text>
          <v-card-text>
            {{currentItemObj.rationale}}
          </v-card-text>

          <!-- <v-card-text v-if="completedTasks[currentItem].canUpload">
            <v-file-input clearable label="File input" density="compact"></v-file-input>
          </v-card-text> -->
          
      
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Cancel" @click="dialog = false"></v-btn>
          <v-btn class="quick-btn" text="Approve" @click=""></v-btn>
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

.list-btn{
  margin-left: 20%;
}

.v-input{
  margin-bottom: 0;
}


</style>
