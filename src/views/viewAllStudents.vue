<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import AwardServices from "../services/awardServices.js";
import Utils from "../config/utils.js";

const router = useRouter();
const route = useRoute();
const user = ref({});
const dialog = ref(false);
const currentItemObj = ref(null);
const award = ref({});
const search = ref('');

const headers = [
  { title: "Student Name", key: "StudentName", align: "start" },
  { title: "Id Number", key: "IdNumber" },
  { title: "Graduation Date", key: "GraduationDate" },
  { title: "", key: "view", sortable: false },
];

const studentList = ref([
  {
    StudentName: "David North",
    IdNumber: "123123123",
    GraduationDate: "10-12-25",
  },
  {
    StudentName: "Samantha Wiggs",
    IdNumber: "1441067",
    GraduationDate: "5-02-25",
  },
]);

const saveAward = (id) => {
  AwardServices.updateAward(user.value.studentId, id, award.value)
    .then(() => {
      router.push({ name: "StudentInfo" });
    })
    .catch(() => {
      console.error("Error saving award.");
    });
};

onMounted(() => {
  user.value = Utils.getStore("user");
});
</script>

<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title class="page-title">Students</v-card-title>

        <v-text-field
          v-model="search"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          single-line
        ></v-text-field>

        <v-container>
          <v-data-table       v-model:search="search"
          :filter-keys="['StudentName', 'IdNumber']" :headers="headers" :items="studentList">
            <template v-slot:item.view="{ item }">
              <v-btn
                class="alt-btn"
                rounded="0"
                append-icon="mdi-arrow-right"
                @click="dialog = true; currentItemObj = item">
                View
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
