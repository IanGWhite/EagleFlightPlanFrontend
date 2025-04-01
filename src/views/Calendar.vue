<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
// import MenuBar from "../components/MenuBar.vue";
import { VCalendar } from 'vuetify/labs/VCalendar';
import { useDate } from 'vuetify';
import VueCal from 'vue-cal'
import EventServices from "../services/eventServices";
import Utils from "../config/utils.js";
import CategoryServices from "../services/categoryServices";


const router = useRouter();

const user = ref({});

const calDialog = ref(false);
const selectedEvent = ref({});

const isAdmin = ref(true);

const categories = ref([]);
const events = ref([
  { name: "Birthday", description: "celebrate this wonderful day",
    title: "birthday",
    start: new Date('Apr 3, 2025 12:00 PM'),
    end: new Date('Apr 3, 2025 4:00 PM'),
    class: 'leisure',
    backgroundColor: '#0e002e',
    color: '#0e002e',
  }
]);
const databaseEvents = ref([]);

const eventNames = ref([]);

const eventPlaceholder = ref(  
{ name: "",
 description: "",
    title: "",
    start: new Date('Mar 27, 2025 12:00 PM'),
    end: new Date('Mar 27, 2025 12:00 PM'),
    class: "health",
    location: "",
    background: "true",
    color: '#0e002e',
  }); //used to transfer data from database events to events

  const OnEventClick = (event, e) => {
    selectedEvent.value = event;
    calDialog.value = true;

    // Prevent navigating to narrower view (default vue-cal behavior).
    e.stopPropagation()
  }
  
  const AddEventPage = () => {
    router.push({ name: "AddEvent" }); // hypothetical route name for education list
  }

  const fetchEagleEvents = () => {
  EventServices.getAllEvents()
    .then((response) => {
      databaseEvents.value = response.data; // Assuming the backend returns an array of events
      console.log("Fetched database events:", databaseEvents.value);
      fetchCategories();
    })
    .catch((error) => {
      console.error("Error fetching database events:", error);
    });
    
};

const convertEvents = () => {
    events.value = databaseEvents.value.map((n) => {
      console.log("categoryId:", n.categoryId);
      var myCategory = 'hello';
      for(let i = 0; i < categories.value.length; i++){
        if(categories.value[i].id == n.categoryId){
          myCategory = categories.value[i].name;
        }
      }
      console.log("category:", myCategory);
      return{
      name: n.name,
      description: n.description,
      start: new Date(n.date.substring(0,10)+', '+n.startTime+':00'),
      end: new Date(n.date.substring(0,10)+', '+n.endTime+':00'),
      location: n.location,
      category: myCategory,
      class: 'health',
      backgroundColor: '#0e002e',
      color: '#0e002e',
    }
    });
    console.log("events list: ", events.value);
  
  /*
  for (let i = 0; i <= databaseEvents.value.length; i++){
    events.value.push({ name: databaseEvents.value[i].name,
 description: "",
    title: "",
    start: new Date('Mar 27, 2025 12:00 PM'),
    end: new Date('Mar 27, 2025 12:00 PM'),
    class: "",
    location: "",
  })
  }
  */

}

const fetchCategories = () => {
  CategoryServices.getAllCategories()
    .then((response) => {
      categories.value = response.data; // Assuming the backend returns an array of events
      console.log("Fetched categories:", categories.value);
      convertEvents();
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
    
};



onMounted(() => {
  user.value = Utils.getStore('user')
  console.log(user.value)
  fetchEagleEvents();
})


</script>

<template>
    <v-app>
      <v-main> <!--            MAIN            -->
        <v-card-title class="page-title">Event Calendar</v-card-title>
        <!-- <v-card > -->
          <v-container width="90%" fluid style="background: lightgray;">
            <v-row class="fill-height">
              <v-col>
                <v-sheet height="600">

                <vue-cal
                :events="events"
                :todayButton="true"
                :startWeekOnSunday="true"
                :disable-views="['years', 'year', 'day']"
                :on-event-click="OnEventClick"
                >
                </vue-cal>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
          

        
        

        
          <v-dialog v-model="calDialog" width="auto">
            <v-card
              max-width="600"
              min-width="400"
            >
                <v-card-title class="text-center text-h4">
                  {{selectedEvent.name}}
                </v-card-title>
                <v-card-text>
                  {{selectedEvent.description}}
                </v-card-text>
                <v-card-text>
                  <v-icon>mdi-calendar</v-icon>
                  {{ selectedEvent.title}},
                  {{ selectedEvent.start}} -
                  {{ selectedEvent.end}}
                  <!-- {{formatter.format(events[currentItem].end, 'fullTime12h')}} -->
                  
                  <v-spacer></v-spacer>
                  <v-icon>mdi-map-marker</v-icon>
                  {{selectedEvent.location}}
                  <v-spacer></v-spacer>
                  <v-icon>mdi-shape</v-icon>
                  {{selectedEvent.category}}
                </v-card-text>

                <v-card-actions >
                  <v-btn 
                v-if="isAdmin"
                class="popup" variant="tonal" text="Edit" @click="EditEvent"></v-btn>
                <v-btn class="popup" variant="tonal" text="Close" @click="calDialog = false"></v-btn>
                </v-card-actions>
            </v-card>
          </v-dialog>

      </v-main>

      <v-btn 
        v-if="isAdmin"
        class="position-sticky bottom-0 left-0 bg-primary rounded-lg ma-3" 
        text="Add Event"
        @click="AddEventPage"
        prepend-icon="mdi-plus"
        color="red"
        ></v-btn>
    </v-app>
  </template>

  

<style scoped>

.popup{
  width: auto;
}


.vuecal__event.health {background-color: #57cea9cc;}



</style>
