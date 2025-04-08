<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import studentServices from "../services/studentServices.js";
import semesterServices from "../services/semesterServices.js";
import userServices from "../services/userServices.js";
import Utils from "../config/utils.js";

const router = useRouter();
const route = useRoute();
const user = ref({});
const dialog = ref(false);
const currentItemObj = ref(null);
const search = ref("");

const studentList = ref([]);
const semesterList = ref([]);
const uploadedStudents = ref([]);


const headers = [
  { title: "Student Name", key: "StudentName", align: "start" },
  { title: "Id Number", key: "studentIdNo" },
  { title: "Graduation Date", key: "GraduationDate" },
  { title: "", key: "view", sortable: false },
];

const goToStudent = (stId) => router.push({ name: 'AdminStudentProfile', params: { id: stId } });

const getStudents = async () => {
  try {
    const response = await studentServices.getAllStudents();
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid student data received");
    }
    studentList.value = response.data.map((student) => ({
      StudentName: `${student.fName} ${student.lName}`,
      studentIdNo: student.studentIdNo,
      id: student.id,
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
    uploadedStudents.value = parseCSV(csvData) || []; // Ensure it returns an array

    console.log("Parsed students:", uploadedStudents.value);

    saveStudents();
  };
  reader.readAsText(file);
};


const saveStudents = async () => {
  if (!Array.isArray(uploadedStudents.value) || uploadedStudents.value.length === 0) {
    console.error("No students to save.");
    return;
  }

  try {
    for (const student of uploadedStudents.value) {
      console.log("Creating student and user:", student);

      const userResponse = await userServices.createUser(student);
      console.log("User Response:", userResponse.data.id);
      const userID = userResponse.data.id;

      await studentServices.createStudent(userID, student);
      console.log("Successfully saved student:", student);
    }

    // After all students are created, reload the page
    getStudents();
  } catch (error) {
    console.error("Error saving student:", error);
  }
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
            :items="studentList"
            v-model:search="search"
            :filter-keys="['StudentName', 'studentIdNo']"
            >
            <template v-slot:item.view="{ item }">
              <!-- Need to change to send to a student profile -->
              <v-btn
                color="red"
                class="alt-btn"
                rounded="0"
                append-icon="mdi-arrow-right"
                @click="goToStudent(item.id)"
              >
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
