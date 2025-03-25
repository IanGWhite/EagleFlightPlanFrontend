<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import EventServices from "../services/eventServices";
import CategoryServices from "../services/categoryServices";
import MenuBar from "../components/MenuBar.vue";
import Utils from "../config/utils.js";
import { VTimePicker } from 'vuetify/labs/components';


const router = useRouter();
const user = ref({});

const dialog = ref(false);
const currentItem = ref(0);

const otherEvents = ref([]);
const otherEventsNames = ref([]);

const categories = ref([]);
const categoryNames = ref([]);

const message = ref("");

const eventCategoryName = ref({name: ""});

const timeselection = ref(['AM', 'PM'])

const event = ref({
  name: null,
  categoryId: 0,
  description: null,
  date: "",
  location: null,
  startTime: null,
  endTime: null,
  hyperLink: "",
});

const getEagleEventNames = () => {
  for(let i = 0; i < otherEvents.value.length; i++){
    otherEventsNames.value.push(otherEvents.value[i].name);
  }
  console.log("Event Name:", otherEventsNames.value);
}

const getCategoryNames = () => {
  for(let i = 0; i < categories.value.length; i++){
    categoryNames.value.push(categories.value[i].name);
  }
  console.log("Category Name:", categoryNames.value);
}

const fetchEagleEvents = () => {
  EventServices.getAllEvents()
    .then((response) => {
      otherEvents.value = response.data; // Assuming the backend returns an array of events
      console.log("Fetched events:", otherEvents.value);
      getEagleEventNames();
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
    });
    
};

const fetchCategories = () => {
  CategoryServices.getAllCategories()
    .then((response) => {
      categories.value = response.data; // Assuming the backend returns an array of events
      console.log("Fetched categories:", categories.value);
      getCategoryNames();
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
    
};

const saveEvent = () => {
  for(let i = 0; i < categories.value.length; i++){
    console.log("first name: " + categories.value[i].name);
    console.log("second name: " + eventCategoryName.value.name);
    if(categories.value[i].name == eventCategoryName.value.name){
      event.value.categoryId = categories.value[i].id;
      console.log("id:" + categories.value[i].id);
    }

  }
  EventServices.createEvent(event.value)
    .then(() => {
      message.value = "Event saved successfully";
      router.push({ name: "AdminHome" }); // hypothetical route name for education list
    })
    .catch((e) => {
      message.value =  "Please enter correct data for all fields";
    });
};


const cancel = () => {
  router.push({ name: "Home" }); // hypothetical route for cancel action
};

onMounted(() => {
  user.value = Utils.getStore('user')
  console.log(user.value)
  fetchEagleEvents();
  fetchCategories();
})

</script>

<template>
    <v-app class="rounded rounded-md">
      <v-main> <!--            MAIN            -->
        <v-list-item></v-list-item><!-- SPACE ABOVE TIMELINE -->
        <v-card-title class="page-title">Event</v-card-title>
        <!-- <v-card > -->
          <v-container width="70%" fluid style="background: lightgrey; height:100%;">
            <p color="red">{{ message }}</p>
            <p>Required *</p>
            <v-row justify="left">
              <v-col>
                    <v-form>
                        <v-text-field
                        v-model="event.name"
                        label="Name*"
                        required
                        bg-color = "white"
                        ></v-text-field>

                        <v-sheet>
                        <v-autocomplete 
                        v-model="eventCategoryName.name"
                        label="Category"
                        :items=categoryNames
                        bg-color="white"
                         ></v-autocomplete>
                         </v-sheet>
                                <v-textarea
                                    v-model="event.description"
                                    label="Description*"
                                    class="mr-2"
                                    required
                                    bg-color = "white"
                                ></v-textarea>
                                <div class="row">
                                    <v-text-field
                                    v-model="event.location"
                                    label="Location*"
                                    class="mr-2"
                                    required
                                    bg-color = "white"
                                ></v-text-field>
                                    <v-text-field
                                    v-model="event.date"
                                    label="Date*"
                                    type = "date"
                                    required
                                    bg-color = "white"
                                ></v-text-field>
                                </div>

                                <div class="row">
                                  <!--
                                    <v-text-field
                                    v-model="event.startTime"
                                    label="startTime*"
                                    type = "time"
                                    required
                                    bg-color = "white"
                                ></v-text-field>
                                -->
                                <v-text-field
                                  v-model="event.startTime"
                                  label="startTime*"
                                  type="time"
                                  required
                                  bg-color = "white"
                                ></v-text-field>
                                <v-text-field
                                  v-model="event.endTime"
                                  label="endTime*"
                                  type="time"
                                  required
                                  bg-color = "white"
                                ></v-text-field>
                                <!--
                                <v-text-field
                                    v-model="event.endTime"
                                    label="endTime*"
                                    required
                                    bg-color = "white"
                                ></v-text-field>
                                -->
                                </div>



                                <v-text-field
                                v-model="event.hyperLink"
                                label="Hyperlink"
                                bg-color = "white"
                                ></v-text-field>
                                <p color="red">{{ message }}</p>
                                <div class="buttons">
                                <v-btn color="error" @click="cancel">Cancel</v-btn>
                                <v-btn color="red" @click="saveEvent">confirm</v-btn>
                                </div>
                    </v-form>
              </v-col>
            </v-row>
          </v-container>
          

        
        

        <!-- </v-card> -->


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
.main-events{
  
}

.check-row{
  display: inline-block;
}

.v-autocomplete{
  background-color: lightgray;
}


</style>
