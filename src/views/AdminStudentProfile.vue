<script setup>
import { ref,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Utils from "../config/utils.js";

const router = useRouter();

const route = useRoute();
const user = ref({});

const tab = ref('option-1');

const majors = ref(['Computer Science', 'Art', 'English']);
//const semesters = ref(['Freshman 1', 'Freshman 2', 'Sophomore 1', 'Sophomore 2', 'Junior 1', 'Junior 2', 'Senior 1', 'Senior 2']);
const semesters = ref([{ semestersLeft: 8, semesterNormalized: "Freshman 1" },
{ semestersLeft: 7, semesterNormalized: "Freshman 2" },
{ semestersLeft: 6, semesterNormalized: "Sophomore 1" }, { semestersLeft: 5, semesterNormalized: "Sophomore 2" },
{ semestersLeft: 4, semesterNormalized: "Junior 1" }, { semestersLeft: 3, semesterNormalized: "Junior 2" },
{ semestersLeft: 2, semesterNormalized: "Senior 1" }, { semestersLeft: 1, semesterNormalized: "Senior 2" }

]);
const selectedSemestersLeft = ref(8);

const studentStrengths = ref([{ strength: 'Foo' }, { strength: 'two' }, { strength: 'three' }, { strength: 'for' }, { strength: 'fiv' }]);
const pointLog = ref([{
  type: 'Badge',
  approvedBy: 'David North',
  pointDifference: 10,
  date: '10-12-25',
},
{
  type: 'Shop',
  approvedBy: 'Admin name',
  pointDifference: -20,
  date: '10-12-25',
},
]);

const allTasks = ref(
  [{ name: "Make a resume", points: "30", description: "blah blah blah description", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
  { name: "Make a cover letter", points: "20", description: "Task 2 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:false, hyperLink:"", reflectionReq:true },
  { name: "This is a task", points: "40", description: "Task 3 desc. this is describing", rationale:"This is reasoning for the task existsing", canUpload:true, hyperLink:"https://www.google.com", reflectionReq:false },
]);

const currentStudentEagleTasks = ref(
  [{ name: "", points: "", description: "", semesterFromGrad: 0 },
]);

const allStudentEagleTasks = ref(
  [{ name: "Make a resume", points: "30", description: "blah blah blah description", semesterFromGrad: 8 },
  { name: "Make a cover letter", points: "20", description: "Task 2 desc. this is describing", semesterFromGrad: 8 },
  { name: "This is a task", points: "40", description: "Task 3 desc. this is describing", semesterFromGrad: 7 },
  { name: "Task tuah", points: "70", description: "Task 4 desc. this is describing", semesterFromGrad: 7 },
]);


const message = ref("test");



onMounted(() => {
  
})

const savePermissions = () => {
 
};

const saveStudent = () => {
 
};

const loadCurrentTasks = (semester) => {
  console.log("before: ", currentStudentEagleTasks);
  var myIndex = 0;
  currentStudentEagleTasks.value = [];
 for(let i = 0; i < allStudentEagleTasks.length; i++) {
  if(element.semesterFromGrad == semester)
  {
    currentStudentEagleTasks[myIndex] = element;
    myIndex++;
  }
 }
 console.log("after: ", currentStudentEagleTasks);
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
                      <v-text-field 
                      label="e-mail">
                      </v-text-field>

                      <v-text-field 
                      label="Student id">
                      </v-text-field>

                      <v-autocomplete 
                        
                        label="Major"
                        :items=majors
                      ></v-autocomplete>
                    </v-sheet>
                      
                      <v-sheet>
                        <v-autocomplete 
                        
                          label="Estimated Grad Semester"
                          :items=semesters
                        ></v-autocomplete>
                      </v-sheet>
                  </v-col>
                  
                  <v-col>
                    <v-card>
                      <v-card-title>Top 5 Clifton Strengths</v-card-title>
                      <v-text-field 
                        v-for="(strength, index) in studentStrengths"
                        :key="index"
                        v-model="studentStrengths[index].strength"
                        hide-details="auto"
                        style="margin-bottom: 0%;"
                        variant="solo"
                      >
                        {{ index + 1 }}. 
                      </v-text-field>
                    </v-card>
                  </v-col>


                    
                  </v-row>
                    <div class="buttons">
                      <v-btn color="red" @click="saveStudent(route.params.id)">Save</v-btn> <!-- EDIT BUTTON -->
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
          

          <v-data-table :items="pointLog"></v-data-table>
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
                @update:menu="loadCurrentTasks(selectedSemestersLeft)"
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

              <v-row >
                <v-col v-for="task in currentStudentEagleTasks">
                  <v-card v-if="task.semesterFromGrad == selectedSemestersLeft">
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
                
              </v-row>
              
            </v-sheet>
            
          </v-container>

        </v-container>
      </v-tabs-window-item>

      <!--        RESUMES         -->
      <v-tabs-window-item value="option-5">
        <v-card-text>
          WIP
        </v-card-text>
      </v-tabs-window-item>

      <!--        PERMISSIONS         -->
      <v-tabs-window-item value="option-6">
        <v-sheet class="pa-5">
          <v-form class="pa-3">
            <v-switch color="blue" label="Admin" persistent-hint="true" hint="Is the user an admin?"></v-switch>
            <v-switch color="blue" label="Points" persistent-hint="true" hint="Ability to add or remove points from a student"></v-switch>
            <v-switch color="blue" label="Events" persistent-hint="true" hint="Ability to add or remove event information"></v-switch>
            <v-switch color="blue" label="Attendance" persistent-hint="true" hint="Ability to upload event attendance sheets"></v-switch>

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

</style>
