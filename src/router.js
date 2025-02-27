import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";

import AddAward from "./views/AddAward.vue";
import EditAward from "./views/EditAward.vue";
import AddEducation from "./views/AddEducation.vue";
import EditEducation from "./views/EditEducation.vue";
import AddExperience from "./views/AddExperience.vue";
import EditExperience from "./views/EditExperience.vue";
import AddProject from "./views/AddProject.vue";
import EditProject from "./views/EditProject.vue"
import CreateResume from "./views/createResume.vue";
import EditResume from "./views/EditResume.vue";
import ChooseTemplete from "./views/chooseTemplete.vue";
import ItemList from "./views/itemList.vue";
import ResumeListStudents from "./views/resumeListStudents.vue";
import StudentHome from "./views/studentHome.vue";
import TeacherHome from "./views/teacherHome.vue";
import ViewStudentResume from "./views/viewStudentResumeList.vue";
import commentStudentResume from "./views/commentStudentResume.vue";
import ResumeListTeacher from "./views/resumeListTeacher.vue";
import studentViewCommentsResume from "./views/studentViewCommentsResume.vue";
import Home from "./views/Home.vue";
import StudentProfile from "./views/StudentProfile.vue";
import StudentShop from "./views/StudentShop.vue";
import Calendar from "./views/Calendar.vue";
import AddTask from "./views/AddTask.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/AddAward",
      name: "AddAward",
      component: AddAward,
    },
    {
      path: "/EditAward/:id",
      name: "EditAward",
      component: EditAward,
      props: true,
    },
    {
      path: "/addEducation",
      name: "addEducation",
      component: AddEducation,
    },
    {
      path: "/EditEducation/:id",
      name: "EditEducation",
      component: EditEducation,
      props: true,
    },
    {
      path: "/AddExperience",
      name: "AddExperience",
      component: AddExperience,
    },
    {
      path: "/EditExperience/:id",
      name: "EditExperience",
      component: EditExperience,
      props: true,
    },
    {
      path: "/AddProject",
      name: "AddProject",
      component: AddProject,
    },
    {
      path: "/EditProject/:id",
      name: "EditProject",
      component: EditProject,
      props: true,
    },
    {
      path: "/CreateResume",
      name: "CreateResume",
      component: CreateResume,
    },
    {
      path: "/EditResume/:id",
      name: "EditResume",
      component: EditResume,
      props: true,
    },
    {
      path: "/ChooseTemplete",
      name: "ChooseTemplete",
      component: ChooseTemplete,
    },
    {
      path: "/StudentInfo",
      name: "StudentInfo",
      component: ItemList,
      props: true,
    },
    {
      path: "/ResumeListStudents",
      name: "ResumeListStudents",
      component: ResumeListStudents,
    },
    {
      path: "/ResumeListTeacher",
      name: "ResumeListTeacher",
      component: ResumeListTeacher,
    },
    {
      path: "/StudentHome",
      name: "StudentHome",
      component: StudentHome,
    },
    {
      path: "/TeacherHome",
      name: "TeacherHome",
      component: TeacherHome,
    },
    {
      path: "/ViewStudentResume/:id",
      name: "ViewStudentResume",
      component: ViewStudentResume,
    },
    {
      path: "/commentStudentResume/:id",
      name: "commentStudentResume",
      component: commentStudentResume,
      props:true,
    },
    {
      path: "/studentViewCommentsResume/:id",
      name: "studentViewCommentsResume",
      component: studentViewCommentsResume,
      props: true
    },
    {
      path: "/Home",
      name: "Home",
      component: Home,
    },
    {
      path: "/StudentProfile",
      name: "StudentProfile",
      component: StudentProfile,
      props: true,
    },
    {
      path: "/StudentShop",
      name: "StudentShop",
      component: StudentShop,
      props: true,
    },
    {
      path: "/Calendar",
      name: "Calendar",
      component: Calendar,
      props: true,
    },
    {
      path: "/AddTask",
      name: "AddTask",
      component: AddTask,
      props: true,
    },
  ],
});

export default router;
