<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
// import MenuBar from "../components/MenuBar.vue";
import { VCalendar } from 'vuetify/labs/VCalendar';
import { useDate } from 'vuetify';
import VueCal from 'vue-cal'


const router = useRouter();

const calDialog = ref(false);
const selectedEvent = ref({});

const isAdmin = ref(true);

const events = ref(
  [{ name: "Birthday", description: "Celebrate this months birthday", category:"Math", location: "Garvey Center",
      title: "birthday",
      start: new Date('Feb 27, 2025 12:00 PM'),
      end: new Date('Feb 27, 2025 4:30 PM'),
      class: 'leisure',
  },
  
  
  ]);

  const OnEventClick = (event, e) => {
    selectedEvent.value = event;
    calDialog.value = true;

    // Prevent navigating to narrower view (default vue-cal behavior).
    e.stopPropagation()
  }

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
                  {{ selectedEvent.start.format("MMM D") }},
                  {{ selectedEvent.start.formatTime("h:mm{am}") }} -
                  {{ selectedEvent.end.formatTime("h:mm{am}") }}
                  <!-- {{formatter.format(events[currentItem].end, 'fullTime12h')}} -->
                  
                  <v-spacer></v-spacer>
                  <v-icon>mdi-map-marker</v-icon>
                  {{selectedEvent.location}}
                  <v-spacer></v-spacer>
                  <v-icon>mdi-shape</v-icon>
                  {{selectedEvent.category}}
                </v-card-text>
              <template v-slot:actions>

                <v-btn 
                v-if="isAdmin"
                class="ms-auto" text="Edit" @click="EditEvent"></v-btn>
                <v-btn class="ms-auto" text="Close" @click="calDialog = false"></v-btn>
              </template>
            </v-card>
          </v-dialog>

      </v-main>

      <v-btn 
        v-if="isAdmin"
        class="position-sticky bottom-0 left-0 bg-primary rounded-lg ma-3" 
        text="Add Event"
        @click="EditEvent"
        prepend-icon="mdi-plus"
        ></v-btn>
    </v-app>
  </template>

  

<style scoped>








</style>
