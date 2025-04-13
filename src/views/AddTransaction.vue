<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import Utils from "../config/utils.js";
import pointLogServices from '../services/pointLogServices.js';
import shopItemServices from '../services/shopItemServices.js';
import studentServices from '../services/studentServices.js';

const route = useRoute();
const router = useRouter();
const user = ref({});

const student =ref({ fName:"", lName:"", points:0 });
const studentId = ref({});

const shopItems = ref(
  [{ name: "Custom", points: "", description: "", index:0},
  ]);
const selectedShopItem = ref(shopItems[0]);

const message = ref("");

const pointLog = ref({
  name: null,
  pointDifference: 0,
  studentId: null,
  date: new Date(),
  approvedBy: "",
});
const rules = ref(
  {required: value => !!value || 'Field is required', required1: value => value != 0 || 'Cannot be 0 points'},
)

const setInputValues = (shopIndex) =>{
  //console.log("Set input values: ",pointLog.value.date)
  if(shopIndex == null)
{
  pointLog.value.name = "";
  pointLog.value.pointDifference = 0;
  return;
}
  pointLog.value.pointDifference = -shopItems.value[shopIndex].points;
  // if(shopIndex == 0)
  //   pointLog.value.name = "";
  // else
  pointLog.value.name = "Shop-" + shopItems.value[shopIndex].name;
}

// BACKEND FUNCTIONS
onMounted(() => {
  user.value = Utils.getStore('user');
  studentId.value = route.params.id;
  fetchStudent(studentId.value);
  //console.log(user.value)
  fetchShopItems()
})

const fetchShopItems = () => {
  var count = 0;
  shopItemServices.getAllShopItems()
    .then((response) => {
      shopItems.value = response.data.map((shopItem) => ({
        name: shopItem.name,
        points: shopItem.points + "",
        description: shopItem.description,
        index: count++,
      })); 
      // console.log("Fetched shop items:", shopItems);
    })
    .catch((error) => {
      console.error("Error fetching shop items:", error);
    });
};
const fetchStudent = (id) => {
  // console.log("studentId:", id)
  studentServices.getStudent(id)
    .then((response) => {
      student.value = response.data;
      // console.log("Fetched student:", student.value);
    })
    .catch((error) => {
      console.error("Error fetching student:", error);
    });
    
};

const validateTransaction = async (event) =>{
  var results = await event;
  if(results.valid)
  {
    saveTransaction();
  }
};

const saveTransaction = () => {
  pointLog.value.approvedBy = user.value.fName + " " + user.value.lName;
  pointLog.value.studentId = parseInt(studentId.value);

  pointLogServices.createPointLog(studentId.value, pointLog.value)
    .then(() => {
      message.value = "Point Log saved successfully";
      
      //student.value.points += pointLog.value.pointDifference;
      // student.value.points = 0;
      calculatePoints();
      console.log("Student points: ", student.value.points)
        studentServices.updateStudent(studentId.value, student.value)
          .then(() => {
            message.value = "Student points saved successfully";
            //router.push({ name: "AdminStudentProfile/", studentId.value }); // hypothetical route name for education list
          })
          .catch((e) => {
            message.value =  "Student unable to save";
            console.log(e);
            return;
          });



      cancel()
    })
    .catch((e) => {
      message.value =  "Please enter correct data for all fields";
      console.log(e)
    });

  
};

const calculatePoints =() => {
  var points1 = student.value.points;
  var points2 = pointLog.value.pointDifference;
  var answer = +points1 + +points2;
  var pointString = "points1: " + points1;
  pointString += "\n points2: " + points2;
  pointString += "\n answer: " + answer;
  // alert(pointString);
  student.value.points = answer;
}

const saveStudentPoints = () => {
  student.value.points += pointLog.value.pointDifference;
  studentServices.updateStudent(studentId.value, student.value)
    .then(() => {
      
      message.value = "Student points saved successfully";
      //router.push({ name: "AdminStudentProfile/", studentId.value }); // hypothetical route name for education list
    })
    .catch((e) => {
      message.value =  "Student unable to save";
      console.log(e)
    });
};

const cancel = () => {
  router.push({ name: 'AdminStudentProfile', params: { id: studentId.value } }); 
};

</script>

<template>
    <v-app class="rounded rounded-md">
      <v-main> <!--            MAIN            -->
        <v-list-item></v-list-item><!-- SPACE ABOVE TIMELINE -->
        <v-card-title class="page-title">New Transaction</v-card-title>
        <!-- <v-card > -->
          <v-container width="70%" fluid style="background: lightgrey; height:100%;">
            <p color="red">{{ message }}</p>
            <v-row justify="left">
              <v-col>
                <v-form validate-on="submit" @submit.prevent="validateTransaction">
                  <v-card-title class="text-center">{{ student.fName }} {{ student.lName }}</v-card-title>
                  <v-autocomplete 
                    v-model="selectedShopItem"
                    style=" padding-left: 30%; padding-right: 30%;"
                    label="Shop Item"
                    :items="shopItems"
                    item-title="name"
                    item-value="index"
                    @update:modelValue="setInputValues(selectedShopItem)"
                    bg-color="white"
                    clearable
                  ></v-autocomplete>

                  <v-text-field
                    label="Name"
                    placeholder="Task-Resume, Shop-Black Shirt"
                    v-model="pointLog.name" 
                    bg-color="white"
                    required
                    :rules="[rules.required]"
                    hint="Name of the reason for this transaction"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="pointLog.pointDifference"
                    label="Points*"
                    type = "number"
                    required
                    :rules="[rules.required1]"
                    bg-color = "white"
                    hint="Put a negative number to subtract points from the student"
                  ></v-text-field>

                  <div class="buttons">
                    <v-btn color="error" @click="cancel">Cancel</v-btn>
                    <v-btn color="red" type="submit" @click="">confirm</v-btn>
                  </div>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
          
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
.check-row{
  display: inline-block;
}



</style>
