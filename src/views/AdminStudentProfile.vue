<script setup>
import { ref,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Utils from "../config/utils.js";

const router = useRouter();

const route = useRoute();
const user = ref({});

const tab = ref('option-1');

const majors = ref(['Computer Science', 'Art', 'English']);
const semesters = ref(['Fall 2025', 'Spring 2026', 'Fall 2026', 'Spring 2026', 'Fall 2027', 'Spring 2027']);

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
const message = ref("test");



onMounted(() => {
  
})

const savePermissions = () => {
 
};

const saveStudent = () => {
 
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
        <v-card-text>
          WIP
        </v-card-text>
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
</style>
