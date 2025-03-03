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

const isAdmin = ref(false);

const events = ref(
  [{ name: "Birthday", description: "Celebrate this months birthday", category:"Math", location: "Garvey Center",
      title: "birthday",
      start: new Date('Feb 27, 2025 12:00 PM'),
      end: new Date('Feb 27, 2025 4:30 PM'),
      class: 'leisure',
  },
  
  { name: "Career Fair", description: "We believe you have been created with purpose and calling. OC's Career Services office is committed to walking beside you as you uncover your unique calling and embark on a fulfilling career journey.", category:"All", location: "Garvey Center",
      title: "Career Fair",
      start: new Date('Mar 5, 2025 10:00 AM'),
      end: new Date('Mar 5, 2025 5:30 PM'),
  },

  { name: "Lunch and Learn", description: "Knowing how hiring works is KEY to landing your dream job—learn what recruiters look for, how to stand out, and what NOT to do in the hiring process. Don't miss this chance to gain insider knowledge!", category:"All", location: "Duncan Room",
      title: "Lunch and Learn",
      start: new Date('Mar 6, 2025 11:40 AM'),
      end: new Date('Mar 6, 2025 12:30 PM'),
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
        @click="EditEvent"
        prepend-icon="mdi-plus"
        color="red"
        ></v-btn>
    </v-app>
  </template>

  

<style scoped>

.popup{
  width: auto;
}






</style>
