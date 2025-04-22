<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Utils from "../config/utils.js";
import eventServices from "../services/eventServices.js";

const router = useRouter();
const route = useRoute();
const user = ref({});
const search = ref("");
const eventList = ref([]);

const headers = [
  { title: "Event Name", key: "name", align: "start" },
  { title: "Date", key: "date", align: "start" },
  { title: "", key: "attends", sortable: false },
  { title: "", key: "edit", sortable: false },
  { title: "", key: "delete", sortable: false },
];

const editEvent = (eventId) => router.push({ name: 'EditEvent', params: { id: eventId } });
const addEvent = () => router.push('addEvent');
const EventAttendance = (eventId) => router.push({ name: 'ViewEventAttendance', params: { id: eventId } });


const deleteEvent = async (eventId) => {
  try {
    const response = await eventServices.deleteEvent(eventId);
    console.log(`event ${eventId} deleted`, response);
    // Refresh the task list after deletion
    getAllevents();

  } catch (error) {
    console.error("Error deleting event:", error);
  }
};

const getAllevents = async () => {
  try {
    const response = await eventServices.getAllEvents();
    eventList.value = response.data;
    console.log("Fetched events :", eventList.value);
    eventList.value = eventList.value.map((event) => {
      const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

      event.date = formattedDate;
      return {
        ...event
      };
    });
  } catch (error) {
    console.error("Error fetching event:", error);
  }
};

onMounted(async () => {
  user.value = Utils.getStore("user");
  getAllevents();
});
</script>

<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title class="page-title">Events</v-card-title>

        <!-- Search bar and Upload button in a row -->
        <v-row>
          <v-col>
            <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="solo-filled"
              single-line
            ></v-text-field>
            <v-col cols="auto">
            <v-btn color="red" @click="addEvent" style="margin-right: 5px;">
              Add Event 
            </v-btn>
          </v-col>
          </v-col>
        </v-row>

        <!-- Table showing the tasks -->
        <v-container>
          <v-data-table
            :headers="headers"
            :items="eventList"
            v-model:search="search"
            :filter-keys="['name','date']"
          >
          <template v-slot:item.attends="{ item }">
              <v-btn
                color="red"
                class="alt-btn"
                rounded="0"
                append-icon="mdi-pencil"
                @click="EventAttendance(item.id)"
              >
                Attendance
              </v-btn>
            </template>

            <template v-slot:item.edit="{ item }">
              <v-btn
                color="red"
                class="alt-btn"
                rounded="0"
                append-icon="mdi-pencil"
                @click="editEvent(item.id)"
              >
                Edit
              </v-btn>
            </template>

            <template v-slot:item.delete="{ item }">
              <v-btn
                color="red"
                class="alt-btn"
                rounded="0"
                append-icon="mdi-delete"
                @click="deleteEvent(item.id)"
              >
                Delete
              </v-btn>
            </template>
          </v-data-table>
        </v-container>
      </v-card>
    </v-container>
  </v-app>
</template>

<style scoped>
.container {
  width: 300px;
  padding: 20px;
  text-align: center;
  background-color: #f5e4d7;
}
.row {
  display: flex;
  justify-content: space-between;
}
</style>