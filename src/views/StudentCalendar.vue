<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
// import MenuBar from "../components/MenuBar.vue";
import { VCalendar } from 'vuetify/labs/VCalendar';
import { useDate } from 'vuetify';

const router = useRouter();
const formatter = useDate();

const calDialog = ref(false);
const currentItem = ref(0);

const events = ref(
  [{ name: "Birthday", description: "Celebrate this months birthday", category:"Math", location: "Garvey Center",
      title: "birthday",
      start: new Date('Feb 1, 2025 12:00 PM'),
      end: new Date('Feb 1, 2025 12:10 PM'),
      color: 'blue',
      event: 'SelectDay()',
      href: '/google',
      link: true
  },
  
  
  ]);

  const SelectDay = () =>
  {
    calDialog.value = true;
  }

  const findElementIndex = (event) => {
      const clickedElement = event.target.closest('.v-chip__content');
      if (!clickedElement) {
        console.log('Clicked element is not a .v-chip__content element');
        return;
      }
      const allElements = Array.from(document.querySelectorAll('.v-chip__content'));
      const elementIndex = allElements.indexOf(clickedElement);
      console.log('Clicked .v-chip__content Element Index:', elementIndex);
      SelectDay();
    }

</script>

<template>
    <v-app>
      <v-main> <!--            MAIN            -->
        <v-card-title class="page-title">Event Calendar</v-card-title>
        <!-- <v-card > -->
          <v-container width="90%" fluid style="background: lightgray; height:100%;">
            <v-row class="fill-height">
              <v-col>
                <v-sheet height="600">
                  <v-calendar
                    ref="calendar"
                    :events="events"
                    type="month"
                    @click="findElementIndex(clickedElement)"
                    
                  >
                  <template v-slot:day="day" ref="day" class="cursor-pointer">
                    <div class="tw-h-full" @click="SelectDay()"></div>
                  </template>
                </v-calendar>
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
                  {{events[currentItem].name}}
                </v-card-title>
                <v-card-text>
                  {{events[currentItem].description}}
                </v-card-text>
                <v-card-text>
                  <v-icon>mdi-calendar</v-icon>
                  {{formatter.format(events[currentItem].start, 'shortDate')}}, 
                  {{formatter.format(events[currentItem].start, 'fullTime12h')}} - 
                  {{formatter.format(events[currentItem].end, 'fullTime12h')}}
                  <v-spacer></v-spacer>
                  <v-icon>mdi-map-marker</v-icon>
                  {{events[currentItem].location}}
                  <v-spacer></v-spacer>
                  <v-icon>mdi-shape</v-icon>
                  {{events[currentItem].category}}
                </v-card-text>
              <template v-slot:actions>
                <v-btn class="ms-auto" text="Close" @click="calDialog = false"></v-btn>
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




</style>
