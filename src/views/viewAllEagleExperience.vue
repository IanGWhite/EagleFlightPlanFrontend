<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Utils from "../config/utils.js";
import eagleExperienceServices from "../services/eagleExperienceservices.js";

const router = useRouter();
const route = useRoute();
const user = ref({});
const search = ref("");
const eagleExperienceList = ref([]);

const headers = [
  { title: "Experience Name", key: "name", align: "start" },
  { title: "", key: "edit", sortable: false },
  { title: "", key: "delete", sortable: false },
];

const editEagleExperiences = (EagleExperienceId) => router.push({ name: 'EditEagleExperience', params: { id: EagleExperienceId } });
const addEagleExperience = () => router.push('addEagleExperience');

const deleteEagleExperience = async (EagleExperienceId) => {
  try {
    const response = await eagleExperienceServices.deleteEagleExperiences(EagleExperienceId);
    console.log(`EagleExperience ${EagleExperienceId} deleted`, response);
    // Refresh the EagleExperience list after deletion
    getAllEagleExperiences();
  } catch (error) {
    console.error("Error deleting EagleExperience:", error);
  }
};

const getAllEagleExperiences = async () => {
  try {
    const response = await eagleExperienceServices.getAllEagleExperiences();
    eagleExperienceList.value = response.data;
    console.log("Fetched EagleExperiences :", eagleExperienceList.value);
  } catch (error) {
    console.error("Error fetching EagleExperiences:", error);
  }
};

onMounted(async () => {
  user.value = Utils.getStore("user");
  getAllEagleExperiences();
});
</script>

<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title class="page-title">Experiences</v-card-title>

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
            <v-btn color="red" width = auto @click="addEagleExperience" style="margin-right: 5px;">
              add Experience 
            </v-btn>
          </v-col>
          </v-col>
        </v-row>

        <!-- Table showing the EagleExperiences -->
        <v-container>
          <v-data-table
            :headers="headers"
            :items="eagleExperienceList"
            v-model:search="search"
            :filter-keys="['name']"
          >
            <template v-slot:item.edit="{ item }">
              <v-btn
                color="red"
                class="alt-btn"
                rounded="0"
                append-icon="mdi-pencil"
                @click="editEagleExperiences(item.id)"
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
                @click="deleteEagleExperience(item.id)"
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