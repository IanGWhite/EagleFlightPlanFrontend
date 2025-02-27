<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import TaskServices from "../services/eagleTaskServices";
import MenuBar from "../components/MenuBar.vue";
import Utils from "../config/utils.js";

const router = useRouter();
const user = ref({});

const dialog = ref(false);
const currentItem = ref(0);

const otherTasks = ref(['Make Resume', 'Take Clifton Strengths', 'Apply for a Job']);

const message = ref("");

const task = ref({
  category: "",
  name: "",
  description: "",
  semestersFromGrad: "",
  points: "",
  reflectionReq: false,
  rationale: "",
  canUpload: false,
  prereqName: "",
  hyperLink: "",
});


const saveTask = () => {
  TaskServices.createEagleTask(task.value)
    .then(() => {
      message.value = "Task saved successfully";
      router.push({ name: "Home" }); // hypothetical route name for education list
    })
    .catch((e) => {
      message.value =  "An error occurred";
    });
};


const cancel = () => {
  router.push({ name: "Home" }); // hypothetical route for cancel action
};

onMounted(() => {
  user.value = Utils.getStore('user')
  console.log(user.value)
})

</script>

<template>
    <v-app class="rounded rounded-md">
      <v-main> <!--            MAIN            -->
        <v-list-item></v-list-item><!-- SPACE ABOVE TIMELINE -->
        <v-card-title class="page-title">Task</v-card-title>
        <!-- <v-card > -->
          <v-container width="70%" fluid style="background: lightgrey; height:100%;">
            
            <v-row justify="left">
              <v-col>
                    <v-form>
                        <v-text-field
                        v-model="task.name"
                        label="Name"
                        required
                        bg-color = "white"
                        ></v-text-field>
                        <v-text-field
                        v-model="task.category"
                        label="Category"
                        required
                        bg-color = "white"
                        ></v-text-field>
                                <v-textarea
                                    v-model="task.description"
                                    label="Description"
                                    class="mr-2"
                                    required
                                    bg-color = "white"
                                ></v-textarea>
                                <div class="row">
                                    <v-text-field
                                    v-model="task.points"
                                    label="Points"
                                    required
                                    bg-color = "white"
                                ></v-text-field>
                                <v-text-field
                                    v-model="task.semestersFromGrad"
                                    label="Semesters from Graduation"
                                    class="mr-2"
                                    required
                                    bg-color = "white"
                                ></v-text-field>
                                </div>

                                <v-textarea
                                v-model="task.rationale"
                                label="Rationale"
                                rows="4"
                                bg-color = "white"
                                ></v-textarea>

                                <v-row>
                                <v-checkbox
                                v-model="task.reflectionReq"
                                label="Requires Reflection"
                                required
                                ></v-checkbox>
                                
                                <v-checkbox
                                v-model="task.canUpload"
                                label="Requires Upload"
                                ></v-checkbox>
                                </v-row>

                                <v-sheet>
                                <v-autocomplete 
                                v-model="task.prereqName"
                                label="Prerequisite"
                                :items=otherTasks
                                bg-color="white"
                                ></v-autocomplete>
                                </v-sheet>

                                <v-text-field
                                v-model="task.hyperLink"
                                label="Hyperlink"
                                bg-color = "white"
                                ></v-text-field>

                                <div class="buttons">
                                <v-btn color="error" @click="cancel">Cancel</v-btn>
                                <v-btn color="red" @click="saveTask">confirm</v-btn>
                                </div>
                    </v-form>
              </v-col>
            </v-row>
          </v-container>
          

        
        

        <!-- </v-card> -->


      </v-main>

      
    </v-app>
  </template>

  

<style scoped>
.fill-height {
  background-color: #f5e7d0;
  min-height: 100vh;
}
.v-btn {
  width: 150px;
}
.card-list-item{
  min-height: 10px;
}
.card-link-text{
  opacity: 0.5;
  color: black;
  text-decoration: none;
}

.card-link-text-wrapper{
  text-align: right;
  padding-top: 1%;
  padding-bottom: 3%;
}

.navigation-drawer{
  border: 0;
  /* padding-left: 2%;
  padding-right: 2%; */
}
.points-text{
  text-align: center;
  font-size: 3rem;
  font-weight:bold;
  line-height: 0.7;
  padding-top: 3%;
}
.badge-image{
  max-height:10%;
}
.main-tasks{
  
}

.check-row{
  display: inline-block;
}

.v-autocomplete{
  background-color: lightgray;
}


</style>
