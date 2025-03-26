<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import studentServices from "../services/studentServices.js";
import semesterServices from "../services/semesterServices.js";
import Utils from "../config/utils.js";

const router = useRouter();
const route = useRoute();
const user = ref({});
const dialog = ref(false);
const currentItemObj = ref(null);
const search = ref("");

const studentList = ref([]);
const semesterList = ref([]);

const headers = [
  { title: "Student Name", key: "StudentName", align: "start" },
  { title: "Id Number", key: "studentIdNo" },
  { title: "Graduation Date", key: "GraduationDate" },
  { title: "", key: "view", sortable: false },
];

const getStudents = async () => {
  try {
    const response = await studentServices.getAllStudents();
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid student data received");
    }
    studentList.value = response.data.map((student) => ({
      StudentName: `${student.fName} ${student.lName}`,
      studentIdNo: student.studentIdNo,
      GraduationDate: "", // Initially empty, will be updated later
      GraduationDateID: student.estimatedGradSemester,
    }));
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

const getSemesters = async () => {
  try {
    const response = await semesterServices.getAllSemesters();
    semesterList.value = response.data.map((semester) => ({
      semesterId: semester.id,
      endDate: semester.dateEnd,
    }));
    console.log("Fetched semesters:", semesterList.value);
  } catch (error) {
    console.error("Error fetching semesters:", error);
  }
};

const updateGradDates = () => {
  console.log("Semesters:", semesterList.value); // Log semester list to verify data

  studentList.value = studentList.value.map((student) => {
    console.log(`Checking student ${student.StudentName} with Grad ID:`, student.GraduationDateID);

    const matchingSemester = semesterList.value.find(
      (semester) => Number(semester.semesterId) === Number(student.GraduationDateID)
    );

    if (matchingSemester) {
      console.log(`Match found! Semester ID: ${matchingSemester.semesterId}, End Date: ${matchingSemester.endDate}`);

      if (matchingSemester.endDate) {
        // Convert ISO date string to MM/DD/YYYY format
        const formattedDate = new Date(matchingSemester.endDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        student.GraduationDate = formattedDate; // Update GraduationDate
      } else {
        console.warn(`No end date found for semester ID: ${matchingSemester.semesterId}`);
        student.GraduationDate = "Unknown";
      }
    } else {
      console.log(`No match found for student ${student.StudentName}`);
      student.GraduationDate = "Unknown"; // If no match, set to "Unknown"
    }

    return student; // Ensure the student object is returned with updated GraduationDate
  });
};





onMounted(async () => {
  user.value = Utils.getStore("user");

  // Fetch both students and semesters before updating graduation dates
  await Promise.all([getStudents(), getSemesters()]);

  // Ensure the state is updated before modifying studentList
  await nextTick();
  updateGradDates(); // Now safe to call
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
          <v-data-table
            v-model:search="search"
            :filter-keys="['StudentName', 'studentIdNo']"
            :headers="headers"
            :items="studentList"
          >
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
