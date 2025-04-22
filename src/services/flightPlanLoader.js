// import apiClient from "./services.js";
import eagleFlightPlanServices from "./eagleFlightPlanServices";
import eagleTaskServices from "./eagleTaskServices";
import flightPlanServices from "./flightPlanServices";
import studentEagleTaskServices from "./studentEagleTaskServices";

const allTasks = ([[]])
const myStudentId = {}
const mySemesterId = {}
const myEagleFlightPlanId = {}
const myStudentFlightPlanId = {}
// const eagleTask = {}

export default {
  testFunction(){
    // console.log("Test complete");
    flightPlanServices.getFlightPlanForSemester(1)
    .then((response) => {
      console.log("✅ Flight plan for semester 1", response.data)
    })
    .catch((error) => {
      console.error(error);
    })
  },

  copyTasksFromFlightPlan(studentId, semesterId)
  {
    myStudentId.value = studentId
    mySemesterId.value = semesterId
    myEagleFlightPlanId.value = semesterId

    eagleTaskServices.getAllEagleTasks()
    .then((response) => {
      allTasks.value = response.data
      console.log("✅ all tasks", allTasks.value);
      this.fetchStudentFlightPlan()
      // this.goThroughTasks();
    })
    .catch((error) => {
      console.error(error);
    })
  },

  fetchStudentFlightPlan(){
    eagleFlightPlanServices.getAllEagleFlightPlansForStudent(myStudentId.value)
    .then((response) => {
      myStudentFlightPlanId.value = response.data[0].id;
      console.log("✅ student flight plan", response.data[0].id)
      this.goThroughTasks();
    })
    .catch((error) => {
      console.error(error);
    })
  },

  goThroughTasks()
  {
    for(let i=0; i<allTasks.value.length; i++)
    {
      // console.clear();
      console.log("🚨looping FP", allTasks.value[i].flightPlanId, i)
      console.log("🚨looping SEM", mySemesterId.value, i)
      if(allTasks.value[i].flightPlanId == mySemesterId.value)
      {
        let eagleTask = {
          pointsAwarded: 0,
          approvedBy: 'none',
          completionDate: new Date(),
          approvalState: 0,
          Reflection: '',
          submissionDate:  new Date(),
          eagleFlightPlanId: myStudentFlightPlanId.value
        };
        
        console.log("✅ student id", myStudentId.value, i);
        console.log("✅ flightplan id", myStudentFlightPlanId.value, i);
        console.log("✅ eagle task", eagleTask, i);
        studentEagleTaskServices.createStudentEagleTaskForStudent(myStudentId.value, myStudentFlightPlanId.value, allTasks.value[i].id, eagleTask)
        // studentEagleTaskServices.createStudentEagleTaskForStudent(1, 1, eagleTask.value)
        .then((response) => {
          console.log("Created student flight plan:", response.data)
        })
        .catch((error) => {
          console.error("🚨",i, error);
        })
      }
    }
  }
};
