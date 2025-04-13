<script setup>
import { ref,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import pointLogServices from "../services/pointLogServices.js";
import majorsServices from "../services/majorsServices.js";
import semesterServices from "../services/semesterServices.js";
import studentServices from "../services/studentServices.js";
import studentStrengthsServices from "../services/studentStrengthsServices.js";
import strengthsServices from  "../services/strengthsServices.js"
import studentMajorsServices from "../services/studentMajorsServices.js";
import userRoleServices from "../services/userRoleServices.js";
import roleServices from "../services/roleServices.js";
import Utils from "../config/utils.js";
import userServices from "../services/userServices.js";

const router = useRouter();

const route = useRoute();
const user = ref({});

const studentId = ref({});
const student = ref({});
const tab = ref('option-1');

const userRole = ref({});
const userRoleId = ref({});

const roles = ref([]);

const majors = ref([]);
const studentmajorIdNo = ref({});

const gradSemesterIdNo = ref({});
const gradSemesters = ref([]);

const studentStrengths = ref([]);
const strengths = ref([]);
const pointLogList = ref([]);



// * * * F L I G H T   P L A N  * * *
const semesters = ref([{ semestersLeft: 8, semesterNormalized: "Freshman 1" },
{ semestersLeft: 7, semesterNormalized: "Freshman 2" },
{ semestersLeft: 6, semesterNormalized: "Sophomore 1" }, { semestersLeft: 5, semesterNormalized: "Sophomore 2" },
{ semestersLeft: 4, semesterNormalized: "Junior 1" }, { semestersLeft: 3, semesterNormalized: "Junior 2" },
{ semestersLeft: 2, semesterNormalized: "Senior 1" }, { semestersLeft: 1, semesterNormalized: "Senior 2" }
]);
const selectedSemestersLeft = ref(8);
//tasks
//list of all tasks that the admin can choose from
const allTasks = ref(
  [{ name: "Make a resume", points: "30", description: "blah blah blah description", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
  { name: "Make a cover letter", points: "20", description: "Task 2 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:false, hyperLink:"", reflectionReq:true },
  { name: "This is a task", points: "40", description: "Task 3 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
  { name: "Task Tuah", points: "40", description: "Task 4 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
  { name: "Task 2ah", points: "50000", description: "Job on that thang", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
]);
// the list of tasks that are currently being displayed
const currentStudentEagleTasks = ref(
  [{ name: "", points: "", description: "", semesterFromGrad: 0 },
]);
// all tasks that are assigned to a specific student
const allStudentEagleTasks = ref(
  [{ name: "Make a resume", points: "30", description: "blah blah blah description", semesterFromGrad: 8 },
  { name: "Make a cover letter", points: "20", description: "Task 2 desc. this is describing", semesterFromGrad: 8 },
  { name: "This is a task", points: "40", description: "Task 3 desc. this is describing", semesterFromGrad: 7 },
  { name: "Task tuah", points: "70", description: "Task 4 desc. this is describing", semesterFromGrad: 7 },
  { name: "Task tuah 2", points: "70", description: "Task 4 desc. this is describing", semesterFromGrad: 7 },
]);

//experiences
const allExperiences = ref(
  [{ name: "Go to career fair", points: "30", description: "blah blah blah description", reflectionReq:false },
  { name: "Go to Job whatever", points: "30", description: "Go to a job whatever to experience jobs or whatever", reflectionReq:false },
  { name: "Experience ego death", points: "100", description: "Go to a job whatever to experience death jobs or whatever", reflectionReq:false },
]);
// the list of tasks that are currently being displayed
const currentStudentEagleExperiences = ref(
  [{ name: "", points: "", description: "", semesterFromGrad: 0 },
]);
// all tasks that are assigned to a specific student
const allStudentEagleExperiences = ref(
  [{ name: "Go to career fair", points: "30", description: "blah blah blah description", reflectionReq:false, semesterFromGrad: 8},
  { name: "Go to Job whatever", points: "30", description: "Go to a job whatever to experience jobs or whatever", reflectionReq:false, semesterFromGrad: 8},
  { name: "Experience ego death", points: "100", description: "Go to a job whatever to death jobs or whatever", reflectionReq:false, semesterFromGrad: 6},
]);


// * * * R E S U M E S * * *
//headers for the resume list table
const headers = ref([
      { key: 'name', title: 'Name', align: 'start', width:'33%' },
      { key: 'button', title: '', align: 'end', width:'33%' },
    ]
  );

  const studentResumes = ref([
  {
    name: 'Resume 1',
    resumeId: '0',
  },
  {
    name: 'Resume 2',
    resumeId: '1',
  },
]);
const message = ref("test");


// * * * P O I N T L O G * * *
//headers for the point Log list table

const pointLogHeaders = [
  { title: "Type", key: "name", align: "start", sortable: false },
  { title: "pointDifference", key: "pointDifference", sortable: false },
  { title: "Appoved By:", key: "approvedBy"},
  { title: "Date", key: "date"},
];

const getPointLog = async () => {
  try {
    const response = await pointLogServices.getAllPointLogs(studentId.value);
    
    if (response && response.data) {
      pointLogList.value = response.data;

      pointLogList.value.forEach(log => {
        if (log.date) {
          log.date = new Date(log.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          });
        } else {
          log.date = "Unknown";
        }
      });

      console.log("Point log gotten successfully:", pointLogList.value);
    } else {
      console.error("Invalid response structure:", response);
    }
  } catch (e) {
    message.value = "An error occurred: " + e.message;
    console.error("Error fetching point logs:", e);
  }
};


//tab 1 student info
const getStudentMajor =  async () => {
  try {
    const response =  await studentMajorsServices.getStudentMajor(studentId.value);
    studentmajorIdNo.value = response.data[0];
    console.log("major Id " + studentmajorIdNo.value.studentMajorId);
  } catch (error) {
    console.error('Failed to retrieve major data:');
  }
};

const getMajors = async () => {
  try {
    const response =  await majorsServices.getAllMajors();
    majors.value = response.data;
    console.log("major list " + majors.value);
  } catch (error) {
    console.error('Failed to retrieve major data:');
  }
}

const getGradSemester =  async () => {
  try {
    const response = await studentServices.getStudent(studentId.value);
    //console.log(response.data);
    student.value = response.data;
    console.log("Student info: ");
    console.log(student.value);
    const reply = await semesterServices.getSemester(student.value.estimatedGradSemester)
    gradSemesterIdNo.value = reply.data.id;
    console.log("gradSemester date " + gradSemesterIdNo.value);
  } catch (error) {
    console.error('Failed to retrieve grad semster date data:');
  }
};

const getSemesters = async () => {
  try {
    const reply = await semesterServices.getAllSemesters();
    gradSemesters.value = reply.data;
    console.log("Semester data:", gradSemesters.value);

    gradSemesters.value = gradSemesters.value.map(semes => {
      const formattedDate = new Date(semes.dateEnd).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      return {
        ...semes,
        dateEnd: formattedDate, // update the dateEnd field
      };
    });
  } catch (error) {
    console.error('Failed to retrieve semesters data:', error);
  }
};

const getStudentStrenghs =  async () => {
  try {
    const response =  await studentStrengthsServices.getAllStudentStrengthsForStudent(studentId.value);
    studentStrengths.value = response.data.map((strength) => ({
      studentId: strength.studentId,
      strengthId: strength.strengthId,
      id: strength.id,
      name: "", // Initially empty, will be updated later
    }));
    const reply = await strengthsServices.getAllStrengths();
    strengths.value = reply.data;

    studentStrengths.value = studentStrengths.value.map((studentStrength) => {
      console.log(`Checking strength slot for studentStrength ID: ${studentStrength.strengthId} with Strength ID:`, studentStrength.strengthId);

      const matchingStrength = strengths.value.find(
        (strength) => Number(strength.id) === Number(studentStrength.strengthId)
      );

      if (matchingStrength) {
        console.log(`Match found! Strength ID: ${matchingStrength.id}, Name: ${matchingStrength.name}`);

        // Add strength name to the studentStrength object
        studentStrength.name = matchingStrength.name;
      } else {
        console.log(`No match found for strength ID: ${studentStrength.strengthId}`);
        studentStrength.name = "Unknown"; // If no match, set to "Unknown"
      }

      return studentStrength; // Ensure the object is returned with updated strengthName
    });

    console.log("student strengh info " + studentStrengths.value);
  } catch (error) {
    console.error('Failed to retrieve strength data:');
  }
};

const getUserRole = async () => {
  try {
    const comeback = await userServices.getUser(student.value.userId);
    user.value = comeback.data;
    const response = await userRoleServices.getUserRole(student.value.userId);
    console.log("user Id:"+ student.value.userId);
    userRoleId.value = response.data[0];
    console.log("RoleId:"+userRoleId.value.id);
    const reply = await roleServices.getRole(userRoleId.value.roleId);
    console.log("role: "+reply.data.id);
    userRole.value = reply.data;
    
  } catch (e) {
    message.value = "An error occurred: " + e.message;
    console.error("Error fetching userRole:", e);
  }
};

const getRoles = async () => {
  try {
    const response = await roleServices.getAllRoles();
    console.log("roles:"+ response.data);
    roles.value = response.data;
    console.log(roles.value[0]);
  } catch (e) {
    message.value = "An error occurred: " + e.message;
    console.error("Error fetching Roles:", e);
  }
};


onMounted(async () => {
  studentId.value = route.params.id;
  console.log("Student ID:", studentId.value);

  await getMajors();
  await getStudentMajor();
  await getSemesters();
  await getGradSemester();
  await getStudentStrenghs();
  await getPointLog();
  await getUserRole();
  await getRoles();
});

const savePermissions = () => {
  try{ 
  const userPayload = {
    admin: user.value.admin 
  };
  userServices.updateUser(user.value.id, userPayload);
  console.log("is admin.1: "+user.value.admin);
  console.log("is admin.2: "+userPayload.admin);

  // userRole saving AHHHHHHHH!!!!!!!!

  const match = roles.value.find(role =>
    role.canEditPoints === userRole.value.canEditPoints &&
    role.canAddEvents === userRole.value.canAddEvents &&
    role.canMarkAttendance === userRole.value.canMarkAttendance
  );

  const userRolePayload = {
    roleId: match.id
  };
  console.log("Userid: " + user.value.id);
  console.log("UserRoleId: "+ userRole.value.id);
  console.log("RoleId: "+ match.id)

  userRoleServices.updateUserRole(user.value.id,userRoleId.value.id,userRolePayload);

  } catch (error) {
    console.error("Error saving data:", error);
    alert("Failed to save user/userRole date.");
  }
};

const saveStudent = async () => {
  try {
    // Save Major
    const majorPayload = {
      majorId: studentmajorIdNo.value.studentMajorId,
      studentMajorId: studentmajorIdNo.value.studentMajorId
    };

    console.log("Saving major:", majorPayload);
    await studentMajorsServices.updateStudentMajor(studentId.value, studentmajorIdNo.value.id, majorPayload);

    // Save Graduation Date
    const gradDatePayload = {
      estimatedGradSemester: gradSemesterIdNo.value.toString()
    };

    console.log("Saving graduation date:", gradDatePayload);
    await studentServices.updateStudent(studentId.value, gradDatePayload);

    alert("Major and Graduation Date saved successfully!");
  } catch (error) {
    console.error("Error saving data:", error);
    alert("Failed to save major or graduation date.");
  }
};

const loadCurrentTasks = (semester) => {
  var myIndex = 0;
  currentStudentEagleTasks.value = [];
  //tasks
 for(let i = 0; i < allStudentEagleTasks.value.length; i++) {
  if(allStudentEagleTasks.value[i].semesterFromGrad == semester)
  {
    currentStudentEagleTasks.value[myIndex] = allStudentEagleTasks.value[i];
    myIndex++;
  }
 }
 
 //experiences
 myIndex = 0;
  currentStudentEagleExperiences.value = [];
  //tasks
 for(let i = 0; i < allStudentEagleExperiences.value.length; i++) {
  if(allStudentEagleExperiences.value[i].semesterFromGrad == semester)
  {
    currentStudentEagleExperiences.value[myIndex] = allStudentEagleExperiences.value[i];
    myIndex++;
  }
 }
 console.log("experiences: ", currentStudentEagleExperiences.value);
};

</script>

<template>
  <v-app>
    <v-container>
      <p class="page-title">Student Name</p>
      <v-card>
        
      <v-tabs v-model="tab">
        <v-tab 
          text="Info"
          value="option-1"
        ></v-tab>
        <v-tab 
          text="Badges" 
          value="option-2"
          ></v-tab>
        <v-tab 
          text="Points"
          value="option-3"
        ></v-tab>
        <v-tab 
          text="Flight Plan"
          value="option-4"
          @click="loadCurrentTasks(selectedSemestersLeft)"
        ></v-tab>
        <v-tab 
          text="Resumes"
          value="option-5"
        ></v-tab>
        <v-tab 
          text="Permissions"
          value="option-6"
        ></v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <!-- PERSONAL INFO -->
        <v-tabs-window-item value="option-1">
          <v-sheet class="pa-3">
              <v-form>
                <v-row>
                  <v-col>
                    <!-- add v-models to autocomplete forms to attatch them to a student info ref-->
                    <v-sheet>
                      <v-label>Student Id</v-label>
                      <v-chip 
                      class="pa-2"
                      color="lightblue" 
                      >
                        {{ student.studentIdNo }} <!-- Display the student major text -->
                      </v-chip>
                    </v-sheet>
                      
                    <v-sheet>
                      <v-label>Major</v-label> 
                      <v-select 
                        v-model="studentmajorIdNo.studentMajorId"
                        :items="majors"
                        item-title="name"
                        item-value="id"
                        label="Select Major"
                        variant="solo"
                        hide-details
                        dense
                        style="margin-bottom: 10px;"
                      >
                        <template #prepend-inner="{ item }">
                          <!-- Only render item.name if item is defined -->
                          {{ item ? item.name : '' }} 
                        </template>
                      </v-select>


                    </v-sheet>

                      
                      <v-sheet>
                        <v-label>Graduation Date</v-label> 
                        <v-select 
                        :key="gradSemesterIdNo"
                        v-model="gradSemesterIdNo"
                        :items="gradSemesters"
                        item-title="dateEnd"
                        item-value="id"
                        label="Select Semester"
                        variant="solo"
                        hide-details
                        dense
                        style="margin-bottom: 10px;"
                      >
                        <template #prepend-inner>
                          {{ gradSemesters.dateEnd }}.
                        </template>
                      </v-select>
                      </v-sheet>
                  </v-col>
                  
                  <v-col>
                    <v-card>
                      <v-card-title>Top 5 Clifton Strengths</v-card-title>
                      <v-card-text>
                        <v-row dense>
                          <v-col
                            v-for="(strength, index) in studentStrengths"
                            :key="index"
                            cols="12"
                          >
                            <v-label class="text-h6 font-weight-bold">
                              {{ index + 1 }}. {{ strength.name }}
                            </v-label>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                  </v-col>


                    
                  </v-row>
                    <div class="buttons">
                      <v-btn color="red" @click="saveStudent()">Save</v-btn> <!-- EDIT BUTTON -->
                    </div>
          
              
            </v-form>
          </v-sheet>
      </v-tabs-window-item>
      <!--        BADGES         -->
      <v-tabs-window-item value="option-2">
        <v-card-text>
          WIP
        </v-card-text>
      </v-tabs-window-item>
      <!--        POINT TRANSACTION HISTORY         -->
      <v-tabs-window-item value="option-3">
        <v-container>
          <v-row justify="space-between" align="center">
            <v-col>
              <v-card variant="tonal text-center" class="pa-2 text-h6" >
                Points: 250
              </v-card>
            </v-col>

            <v-col></v-col>
            <v-col></v-col>

            <v-col>
              <v-btn @click="" rounded="0" class="alt-btn">New Transaction</v-btn>
            </v-col>
          </v-row>
          <v-data-table :headers="pointLogHeaders"
           :items="pointLogList"
            :filter-keys="['Date']"></v-data-table>
        </v-container>

      </v-tabs-window-item>
      <!--        FLIGHT PLAN         -->
      <v-tabs-window-item value="option-4">
        <v-container>
          <v-row justify="space-between">
            <v-col>
              <v-select dense
                v-model="selectedSemestersLeft"
                :items="semesters"
                label="Semester"
                item-value="semestersLeft"
                item-title="semesterNormalized"
                @update:modelValue="loadCurrentTasks(selectedSemestersLeft)"
              >
              
              </v-select>
              <!-- {{selectedSemestersLeft}} -->
            </v-col>

            <v-col></v-col>
            <v-col></v-col>

            <v-col cols="auto">
              <v-btn @click="" rounded="0" class="alt-btn" justify-end="true">Save</v-btn>
            </v-col>
          </v-row>

          <v-container class="border bg-surface-variant" style="padding: 0;">
            <v-sheet color="grey" class="pa-5">

              <!-- T A S K S -->
              <v-row >
                <v-col v-for="task in currentStudentEagleTasks" density="compact">
                  <v-card v-if="task.semesterFromGrad == selectedSemestersLeft" class="flightPlanCard">
                    <v-card-title class="">
                      {{ task.name }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ task.description }}
                    </v-card-subtitle>
                    <v-card-actions class="font-weight-regular">
                      <v-btn variant="tonal" class="border-md rounded remove-btn" density="compact" @click="RemoveTaskFromPlan()">
                        <v-icon icon="mdi-close"/>
                        remove
                      </v-btn>
                    </v-card-actions>
                </v-card>
                </v-col>
                <!-- add one button -->
                <v-col density="compact">
                  <v-card class="flightPlanCard">
                    <v-card-title>
                      New Task
                    </v-card-title>
                    <v-card-text style="padding-bottom: 0;">

                    
                      <v-select density="compact"
                      style="padding-left: 5px; padding-right: 5px; margin: 0%;"
                      :items="allTasks"
                      label="Task"
                      item-title="name"
                      hide-details
                      >
                      </v-select>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn variant="tonal" class="alt-btn"  @click="AddTaskToPlan()">
                        add
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
                
              </v-row>

              <!-- E X P E R I E N C E S -->
              <v-row >
                <v-col v-for="experience in currentStudentEagleExperiences" density="compact">
                  <v-card v-if="experience.semesterFromGrad == selectedSemestersLeft" class="flightPlanCard">
                    <v-card-title class="">
                      {{ experience.name }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ experience.description }}
                    </v-card-subtitle>
                    <v-card-actions class="font-weight-regular">
                      <v-btn variant="tonal" class="border-md rounded remove-btn" density="compact" @click="RemoveExperienceFromPlan()">
                        <v-icon icon="mdi-close"/>
                        remove
                      </v-btn>
                    </v-card-actions>
                </v-card>
                </v-col>
                <!-- add one button -->
                <v-col density="compact">
                  <v-card class="flightPlanCard">
                    <v-card-title>
                      New Experience
                    </v-card-title>
                    <v-card-text style="padding-bottom: 0;">

                    
                      <v-select density="compact"
                      style="padding-left: 5px; padding-right: 5px; margin: 0%;"
                      :items="allExperiences"
                      label="Experience"
                      item-title="name"
                      hide-details
                      >
                      </v-select>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn variant="tonal" class="alt-btn"  @click="AddExperienceToPlan()">
                        add
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
                
              </v-row>
            </v-sheet>
            
          </v-container>

        </v-container>
      </v-tabs-window-item>

      <!--        RESUMES         -->
      <v-tabs-window-item value="option-5">
        <v-container>
          

          <v-data-table 
          hide-default-header
          :items="studentResumes"
          :headers="headers"
          >
          <template v-slot:item.button="{ item }" >
            <v-btn class="alt-btn"
             rounded="0"
             append-icon="mdi-arrow-right"
             @click="ViewStudentResume()"
            >View</v-btn>
          </template>
          </v-data-table>
        </v-container>
      </v-tabs-window-item>

      <!--        PERMISSIONS         -->
      <v-tabs-window-item value="option-6">
        <v-sheet class="pa-5">
          <v-form class="pa-3">
            <v-switch
              v-model="user.admin"
              color="blue"
              label="Admin"
              persistent-hint
              hint="Is the user an admin?"
            ></v-switch>
   
            <v-switch v-model="userRole.canEditPoints" color="blue" label="Points" persistent-hint="true" hint="Ability to add or remove points from a student"></v-switch>
            <v-switch v-model="userRole.canAddEvents" color="blue" label="Events" persistent-hint="true" hint="Ability to add or remove event information"></v-switch>
            <v-switch v-model="userRole.canMarkAttendance" color="blue" label="Attendance" persistent-hint="true" hint="Ability to upload event attendance sheets"></v-switch>

            <div class="buttons">
              <v-btn color="red" @click="savePermissions()">Save</v-btn> <!-- EDIT BUTTON -->
            </div>
          </v-form>
        </v-sheet>
      </v-tabs-window-item>


      </v-tabs-window>
     
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
.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.remove-btn{
  display: auto;
  gap: auto;
  width: auto;
  padding: auto;
  height: auto;
}
.flightPlanCard{
  min-height: 160px;
}

</style>
