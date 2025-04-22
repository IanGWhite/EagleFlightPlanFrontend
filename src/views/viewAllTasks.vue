<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Utils from "../config/utils.js";
import eagleTaskServices from "../services/eagleTaskServices.js";

const router = useRouter();
const route = useRoute();
const user = ref({});
const search = ref("");
const taskList = ref([]);

const headers = [
  { title: "Task Name", key: "name", align: "start" },
  { title: "", key: "edit", sortable: false },
  { title: "", key: "delete", sortable: false },
];

const editTasks = (taskId) => router.push({ name: 'EditTask', params: { id: taskId } });
const addTask = () => router.push('addTask');

const deleteTask = async (taskId) => {
  try {
    const response = await eagleTaskServices.deleteEagleTask(taskId);
    console.log(`Task ${taskId} deleted`, response);
    // Refresh the task list after deletion
    getAllTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

const getAllTasks = async () => {
  try {
    const response = await eagleTaskServices.getAllEagleTasks();
    taskList.value = response.data;
    console.log("Fetched tasks :", taskList.value);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

onMounted(async () => {
  user.value = Utils.getStore("user");
  getAllTasks();
});
</script>

<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title class="page-title">Tasks</v-card-title>

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
            <v-btn color="red" @click="addTask" style="margin-right: 5px;">
              add Task 
            </v-btn>
          </v-col>
          </v-col>
        </v-row>

        <!-- Table showing the tasks -->
        <v-container>
          <v-data-table
            :headers="headers"
            :items="taskList"
            v-model:search="search"
            :filter-keys="['name']"
          >
            <template v-slot:item.edit="{ item }">
              <v-btn
                color="red"
                class="alt-btn"
                rounded="0"
                append-icon="mdi-pencil"
                @click="editTasks(item.id)"
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
                @click="deleteTask(item.id)"
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
