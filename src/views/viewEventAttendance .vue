<script setup>
import { ref, onMounted} from "vue";
import { useRouter, useRoute } from "vue-router";
import studentServices from "../services/studentServices.js";
import semesterServices from "../services/semesterServices.js";
import userServices from "../services/userServices.js";
import studentMajorsServices from "../services/studentMajorsServices.js";
import Utils from "../config/utils.js";
import studentStrengthsServices from "../services/studentStrengthsServices.js";
import eventServices from "../services/eventServices.js";
import eventAttendServices from "../services/eventAttendServices.js";

const router = useRouter();
const route = useRoute();
const user = ref({});
const search = ref("");

const eventId = ref('');

const studentList = ref([]);
const uploadedStudentAttends = ref([]);
const AttendList = ref ([]);
const studentAttendList= ref ([]);

const eventName = ref('');


const headers = [
  { title: "Student Name", key: "StudentName", align: "start" },
  { title: "Id Number", key: "studentIdNo" },
  { title: "", key: "delete", sortable: false },
];

// const goToStudent = (stId) => router.push({ name: 'AdminStudentProfile', params: { id: stId } });

const getStudents = async () => {
  try {
    const response = await studentServices.getAllStudents();
    studentList.value = response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};


const parseCSV = (csvText) => {
  const rows = csvText.split("\n").map(row => row.trim()).filter(row => row.length);
  if (rows.length < 2){ console.log("File is empty"); return [];}

  const headers = rows[0].split(",").map(header => header.trim());

  return rows.slice(1).map(row => {
    const values = row.split(",").map(value => value.trim());
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index] || "";
      return obj;
    }, {});
  });
};


// Trigger the file input dialog when the button is clicked
const triggerFileInput = () => {
  const fileInput = document.querySelector('input[type="file"]');
  fileInput.click();
};

// Handle the file upload
const handleFileUpload = (event) => {
  const file = event.target.files[0];

  if (!file) {
    console.error("No file selected.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const csvData = e.target.result;
    uploadedStudentAttends.value = parseCSV(csvData) || []; // Ensure it returns an array

    console.log("Parsed students:", uploadedStudentAttends.value);

    saveStudents();
  };
  reader.readAsText(file);
};


const saveStudents = async () => {
  if (!Array.isArray(uploadedStudentAttends.value) || uploadedStudentAttends.value.length === 0) {
    console.error("No students to save.");
    return;
  }

  try {
    for (const uploadedStudent of uploadedStudentAttends.value) {
      const matchedStudent = studentList.value.find(
        s => s.studentIdNo === Number(uploadedStudent.studentIdNo)
      );

      if (!matchedStudent) {
        console.warn(`Student not found: ${uploadedStudent.studentIdNo}`);
        continue;
      }

      const alreadyAttending = studentAttendList.value.find(
        s => s.studentIdNo === Number(matchedStudent.studentIdNo)
      );
      if (!alreadyAttending) {
        await eventAttendServices.createEventAttends(matchedStudent.id, eventId.value);
      }
    }

    // Refresh after all saves
    await getStudents();
    await getAttend();
    await getStudentAttends();
  } catch (error) {
    console.error("Error saving students:", error);
  }
};


const getEventName = async () => {
  const respone = await eventServices.getEvents(eventId.value);
  eventName.value = respone.data.name;
};

const getAttend = async () => {
  const responce = await eventAttendServices.getEventAttends(eventId.value);
  AttendList.value = responce.data;
};

const deleteStudentAttend = async (studentId) => {
  await eventAttendServices.deleteEventAttends(studentId,studentId);
      // Refresh after all saves
      await getStudents();
    await getAttend();
    await getStudentAttends();
};

const getStudentAttends = async () => {
  if (!Array.isArray(AttendList.value)) {
    console.error("AttendList is not an array:", AttendList.value);
    return;
  }

  studentAttendList.value = AttendList.value.map((attend) => {
    const student = studentList.value.find(s => Number(s.id) === attend.studentId);
    return {
      id: attend.id,
      StudentName: student ? `${student.fName} ${student.lName}` : "Unknown Student",
      studentIdNo: student ? student.studentIdNo : "Unknown ID"
    };
  });
  console.log("Students:", studentList.value);
  console.log("Attends:", AttendList.value);
};


onMounted(async () => {
  user.value = Utils.getStore("user");
  eventId.value = route.params.id;

  await getEventName();
  await getAttend();
  await getStudents();
  await getStudentAttends();
});


</script>

<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title class="page-title">Students</v-card-title>

        <!-- Search bar and Upload button in a row -->
        <v-row >
          <v-col>
            <v-text-field
          v-model="search"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          single-line
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn color="red" @click="triggerFileInput" style="margin-right: 5px;">
              Upload File
            </v-btn>
          </v-col>
        </v-row>

        <!-- Hidden file input -->
        <input 
          type="file" 
          @change="handleFileUpload" 
          ref="fileInput" 
          style="display:none" 
        />

        <!-- Table showing the uploaded student data -->
        <v-container>
          <v-data-table
            :headers="headers"
            :items="studentAttendList"
            v-model:search="search"
            :filter-keys="['StudentName', 'studentIdNo']"
            >
            <template v-slot:item.delete="{ item }">
              <!-- Need to change to send to a student profile -->
              <v-btn
                color="red"
                class="alt-btn"
                rounded="0"
                @click="deleteStudentAttend(item.id)"
              >
                delete
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