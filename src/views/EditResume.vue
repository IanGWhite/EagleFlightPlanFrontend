<script setup>
import { ref,onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import linkServices from "../services/linkServices";
import skillServices from "../services/skillServices.js";
import educationServices from "../services/educationServices";
import experienceServices from "../services/experienceServices";
import contactServices from "../services/contactServices.js";
import interestServices from "../services/interestServices.js";
import projectServices from "../services/projectServices.js";
import awardServices from "../services/awardServices.js";
import jsPDF from 'jspdf';
import Utils from "../config/utils.js";
import resumeExperienceServices from "../services/resumeExperienceServices.js";
import resumeEducationServices from "../services/resumeEducationServices.js";
import resumeLinkServices from "../services/resumeLinkServices.js";
import resumeAwardServices from "../services/resumeAwardServices.js";
import resumeInterestServices from "../services/resumeInterestServices.js";
import resumeProjectServices from "../services/resumeProjectServices.js";
import resumeSkillServices from "../services/resumeSkillServices.js";
import resumeService from "../services/resumeService.js";

const user = ref({});
const thisResumeId = ref({});
const router = useRouter();
const route = useRoute();
const resumeData = ref({
  name: "",
  summary: "",
});
const personalLinks = ref({ type: "", link: "" });
const contactInfo = ref({
  firstName: "",
  lastName: "",
  city: "",
  state: "",
  email: ""
});
//const professionalSummary = ref("");
const skills = ref([{description :""}]);
const interests = ref([{description :""}]);
const educations = ref({
  name: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  degree: "",
  gpa: "",
  coursework: ""
});
const experiences = ref({
  name: "",
  position: "",
  monthStart: "",
  monthEnd: "",
  description: ""
});
const awards = ref({
  organization: "",
  title: "",
  monthStart: "",
  monthEnd: "",
  description: ""
});
const projects = ref({
  name: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  position: "",
  description: ""
});


const sections = ref({
  personalLink: [{ name: "link 1",  begChecked: false, checked: false, id: null, linkId: null }],
  education: [{ name: "School 1", begChecked: true, checked: false, id: null, educationId: null }],
  experience: [{ name: "Company 1", begChecked: true, checked: false, id: null, experienceId: null }],
  projects: [{ name: "Project 1", begChecked: true, checked: false }],
  skills: [{ name: "Skill 1", begChecked: true, checked: false, id: null, skillId: null }],
  interests: [{ name: "Interest 1", begChecked: true, checked: false }],
  awards: [{ name: "Award 1", begChecked: true, checked: false }],
});


onMounted(() => {
  user.value = Utils.getStore('user')
  thisResumeId.value = route.params.id;
  //console.log(user.value)
  fetchLinks();
  fetchResumeInfo();
  fetchContact();
  fetchSkills();
  fetchEducation();
  fetchExperiences();
  fetchInterests();
  fetchProject();
  fetchAward();
})

const fetchContact = () => {
  contactServices.getAllContacts(user.value.studentId)
    .then((response) => {
      if (response.data && response.data.length > 0) {
        contactInfo.value = response.data[0]; // Assuming only one contact entry per user
      } else {
        console.log("No contact info found.");
      }
      console.log("Fetched Contact Info:", contactInfo.value);
    })
    .catch((error) => {
      console.error("Error fetching contact info:", error);
    });
};

const fetchResumeInfo = async () => {
  try {
    const response = await resumeService.getResumes(user.value.studentId, thisResumeId.value);
    resumeData.value = response.data;
      } catch (error) {
        console.error('Failed to retrieve resume data:');
      }
}

const fetchLinks = async () => {
  try {
    // Step 1: Fetch personal links
    const personalResponse = await linkServices.getAllLinks(user.value.studentId);
    sections.value.personalLink = personalResponse.data.map(link => ({
      name: link.link,
      linkId: link.id,
      begChecked: false,
      checked: false, // Default unchecked
    }));

    const resumeResponse = await resumeLinkServices.getAllResumeLinks(user.value.studentId, thisResumeId.value);
    const resumeLinks = resumeResponse.data.map(link => ({
      name: link.link,
      linkId: link.linkId,
      id: link.id
    }));
   
    sections.value.personalLink.forEach(link => {
      console.log("check link:", link.linkId);

      // Correcting the comparison: Ensure you're comparing `linkId` properly
      const matchingResumeLink = resumeLinks.find(resumeLink => resumeLink.linkId === link.linkId);
      
      if (matchingResumeLink) {
        link.checked = true; // Mark as checked if it exists in resumeLinks
        link.begChecked = true; // Save the initial checked state
        link.id = matchingResumeLink.id; // Assign the correct ID from resumeLink
        console.log("checked link:", link.name);
      }
    });

    // Step 4: Store reactive and initial values
    personalLinks.value = personalResponse.data;


    // Step 5: Manually update sections.value.personalLink (trigger reactivity)

    console.log("Fetched and initialized personalLinks:", personalLinks.value);
  } catch (error) {
    console.error("Error fetching links:", error);
  }
};
const fetchSkills = async () => {
  try {
    // Step 1: Fetch personal skills
    const personalResponse = await skillServices.getAllSkills(user.value.studentId);
    sections.value.skills = personalResponse.data.map(skill => ({
      name: skill.description,
      skillId: skill.id,
      begChecked: false,
      checked: false, // Default unchecked
    }));

    const resumeResponse = await resumeSkillServices.getAllResumeSkills(user.value.studentId, thisResumeId.value);
    const resumeSkills = resumeResponse.data.map(skill => ({
      name: skill.description,
      skillId: skill.skillId,
      id: skill.id
    }));
   
    sections.value.skills.forEach(skill => {
      console.log("check skill:", skill.skillId);

      // Correcting the comparison: Ensure you're comparing `skillId` properly
      const matchingResumeSkill = resumeSkills.find(resumeSkill => resumeSkill.skillId === skill.skillId);
      
      if (matchingResumeSkill) {
        skill.checked = true; // Mark as checked if it exists in resumeSkills
        skill.begChecked = true; // Save the initial checked state
        skill.id = matchingResumeSkill.id; // Assign the correct ID from resumeSkill
        console.log("checked skill:", skill.name);
      }
    });

    // Step 4: Store reactive and initial values
    skills.value = personalResponse.data;


    // Step 5: Manually update sections.value.skills (trigger reactivity)

    console.log("Fetched and initialized skills:", skills.value);
  } catch (error) {
    console.error("Error fetching skills:", error);
  }
};
const fetchEducation = async () => {
  try {
    // Step 1: Fetch personal educations
    const personalResponse = await educationServices.getAllEducations(user.value.studentId);
    sections.value.education = personalResponse.data.map(education => ({
      name: education.name,
      educationId: education.id,
      begChecked: false,
      checked: false, // Default unchecked
    }));

    const resumeResponse = await resumeEducationServices.getAllResumeEducations(user.value.studentId, thisResumeId.value);
    const resumeEducations = resumeResponse.data.map(education => ({
      name: education.name,
      educationId: education.educationId,
      id: education.id
    }));
   
    sections.value.education.forEach(education => {
      console.log("check education:", education.educationId);

      // Correcting the comparison: Ensure you're comparing `educationId` properly
      const matchingResumeEducation = resumeEducations.find(resumeEducation => resumeEducation.educationId === education.educationId);
      
      if (matchingResumeEducation) {
        education.checked = true; // Mark as checked if it exists in resumeEducations
        education.begChecked = true; // Save the initial checked state
        education.id = matchingResumeEducation.id; // Assign the correct ID from resumeEducation
        console.log("checked education:", education.name);
      }
    });

    // Step 4: Store reactive and initial values
    educations.value = personalResponse.data;


    // Step 5: Manually update sections.value.education (trigger reactivity)

    console.log("Fetched and initialized educations:", educations.value);
  } catch (error) {
    console.error("Error fetching educations:", error);
  }
};
const fetchExperiences = async () => {
    try {
      // Step 1: Fetch personal experiences
      const personalResponse = await experienceServices.getAllExperiences(user.value.studentId);
      sections.value.experience = personalResponse.data.map(experience => ({
        name: experience.name,
        experienceId: experience.id,
        begChecked: false,
        checked: false, // Default unchecked
      }));
  
      const resumeResponse = await resumeExperienceServices.getAllResumeExperiences(user.value.studentId, thisResumeId.value);
      const resumeExperiences = resumeResponse.data.map(experience => ({
        name: experience.name,
        experienceId: experience.experienceId,
        id: experience.id
      }));
     
      sections.value.experience.forEach(experience => {
        console.log("check experience:", experience.experienceId);
  
        // Correcting the comparison: Ensure you're comparing `experienceId` properly
        const matchingResumeExperience = resumeExperiences.find(resumeExperience => resumeExperience.experienceId === experience.experienceId);
        
        if (matchingResumeExperience) {
          experience.checked = true; // Mark as checked if it exists in resumeExperiences
          experience.begChecked = true; // Save the initial checked state
          experience.id = matchingResumeExperience.id; // Assign the correct ID from resumeExperience
          console.log("checked experience:", experience.name);
        }
      });
  
      // Step 4: Store reactive and initial values
      experiences.value = personalResponse.data;
  
  
      // Step 5: Manually update sections.value.experience (trigger reactivity)
  
      console.log("Fetched and initialized experiences:", experiences.value);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };
  const fetchInterests = async () => {
    try {
      // Step 1: Fetch personal interests
      const personalResponse = await interestServices.getAllInterests(user.value.studentId);
      sections.value.interests = personalResponse.data.map(interest => ({
        name: interest.description,
        interestId: interest.id,
        begChecked: false,
        checked: false, // Default unchecked
      }));
  
      const resumeResponse = await resumeInterestServices.getAllResumeInterests(user.value.studentId, thisResumeId.value);
      const resumeInterests = resumeResponse.data.map(interest => ({
        name: interest.description,
        interestId: interest.interestId,
        id: interest.id
      }));
     
      sections.value.interests.forEach(interest => {
        console.log("check interest:", interest.interestId);
  
        // Correcting the comparison: Ensure you're comparing `interestId` properly
        const matchingResumeInterest = resumeInterests.find(resumeInterest => resumeInterest.interestId === interest.interestId);
        
        if (matchingResumeInterest) {
          interest.checked = true; // Mark as checked if it exists in resumeInterests
          interest.begChecked = true; // Save the initial checked state
          interest.id = matchingResumeInterest.id; // Assign the correct ID from resumeInterest
          console.log("checked interest:", interest.name);
        }
      });
  
      // Step 4: Store reactive and initial values
      interests.value = personalResponse.data;
  
  
      // Step 5: Manually update sections.value.interests (trigger reactivity)
  
      console.log("Fetched and initialized interests:", interests.value);
    } catch (error) {
      console.error("Error fetching interests:", error);
    }
  };
const fetchProject = async () => {
    try {
      // Step 1: Fetch personal projects
      const personalResponse = await projectServices.getAllProjects(user.value.studentId);
      sections.value.projects = personalResponse.data.map(project => ({
        name: project.name,
        projectId: project.id,
        begChecked: false,
        checked: false, // Default unchecked
      }));
  
      const resumeResponse = await resumeProjectServices.getAllResumeProjects(user.value.studentId, thisResumeId.value);
      const resumeProjects = resumeResponse.data.map(project => ({
        name: project.name,
        projectId: project.projectId,
        id: project.id
      }));
     
      sections.value.projects.forEach(project => {
        console.log("check project:", project.projectId);
  
        // Correcting the comparison: Ensure you're comparing `projectId` properly
        const matchingResumeProject = resumeProjects.find(resumeProject => resumeProject.projectId === project.projectId);
        
        if (matchingResumeProject) {
          project.checked = true; // Mark as checked if it exists in resumeProjects
          project.begChecked = true; // Save the initial checked state
          project.id = matchingResumeProject.id; // Assign the correct ID from resumeProject
          console.log("checked project:", project.name);
        }
      });
  
      // Step 4: Store reactive and initial values
      projects.value = personalResponse.data;
  
  
      // Step 5: Manually update sections.value.projects (trigger reactivity)
  
      console.log("Fetched and initialized projects:", projects.value);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  const fetchAward = async () => {
    try {
      // Step 1: Fetch personal awards
      const personalResponse = await awardServices.getAllAwards(user.value.studentId);
      sections.value.awards = personalResponse.data.map(award => ({
        name: award.title,
        awardId: award.id,
        begChecked: false,
        checked: false, // Default unchecked
      }));
  
      const resumeResponse = await resumeAwardServices.getAllResumeAwards(user.value.studentId, thisResumeId.value);
      const resumeAwards = resumeResponse.data.map(award => ({
        name: award.title,
        awardId: award.awardId,
        id: award.id
      }));
     
      sections.value.awards.forEach(award => {
        console.log("check award:", award.awardId);
  
        // Correcting the comparison: Ensure you're comparing `awardId` properly
        const matchingResumeAward = resumeAwards.find(resumeAward => resumeAward.awardId === award.awardId);
        
        if (matchingResumeAward) {
          award.checked = true; // Mark as checked if it exists in resumeAwards
          award.begChecked = true; // Save the initial checked state
          award.id = matchingResumeAward.id; // Assign the correct ID from resumeAward
          console.log("checked award:", award.name);
        }
      });
  
      // Step 4: Store reactive and initial values
      awards.value = personalResponse.data;
  
  
      // Step 5: Manually update sections.value.awards (trigger reactivity)
  
      console.log("Fetched and initialized awards:", awards.value);
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
  };

const saveResume = () => {
  try {
    console.log("Resume data being saved:", {
      resumeData,
      personalLinks,
      sections,
    });
    saveResumeToDatabase();
    saveExperienceDatabase();
      saveEducationDatabase();
      saveProjectDatabase();
      saveLinkDatabase();
      saveAwardDatabase();
      saveInterestDatabase();
      saveSkillDatabase();
    // Generate resume logic
    generateResume1();
    router.push({ name: 'ResumeListStudents' });
  } catch (error) {
    console.error("Error occurred in saveResume:", error);
  }
};


const font = "times";
const generateResume1 = () => {
  var doc = new jsPDF();
  //console.log(doc.getFontList());
  var pageWidth = doc.internal.pageSize.getWidth(); 
  var pageHeight = doc.internal.pageSize.getHeight();
  var pageCenter = pageWidth/2
  var currentY = 25;

  doc.setFontSize(20);
  doc.setFont(font, "bold");
  var tempString = contactInfo.value.firstName + " " + contactInfo.value.lastName;
  doc.text(tempString, pageCenter, currentY, {align: "center"}); currentY += 6;
  doc.setFont(font, "normal");
  AddContactInfo(doc, currentY, pageCenter);
  currentY += 15;
  currentY = AddSummary(doc, currentY);
  
  
  currentY += 10;
  
  //education header
  
  currentY = AddEducationInfo(doc, currentY);
  currentY =  AddAwardInfo(doc, currentY);
  currentY += 5;
  currentY = AddExperienceInfo(doc, currentY);
  
  currentY = AddSkills(doc, currentY);
  
  doc.output('dataurlnewwindow');
  //doc.save("Resume");
};

const AddContactInfo = (doc, currentY, pageCenter) => {
  doc.setFontSize(11);
  var contactString = "";
  contactString = contactInfo.value.city + ", " + contactInfo.value.state + " | ";
  contactString += contactInfo.value.email;
  //if(sections.personalLink.checked.value)
  for(let i=0; i<sections.value.personalLink.length; i++)
  {
    var link = sections.value.personalLink[i];
    if(link.checked)
    {
      contactString += " | ";
      contactString += personalLinks.value[i].link;
      //contactString += link.name;
    }
  }
  doc.text(contactString, pageCenter, currentY, {align: "center"});
}

const AddSummary = (doc, currentY) => {
  currentY = AddHeader(doc, currentY, "SUMMARY");
  var pageWidth = doc.internal.pageSize.getWidth(); 
  doc.setFontSize(12);
  doc.setFont(font, "normal");
  var splitSummary = doc.splitTextToSize(resumeData.value.summary, pageWidth-20);
  doc.text(splitSummary, 10, currentY, {align: "left"});
  currentY += doc.getTextDimensions(splitSummary).h;
  return currentY;
}

const AddEducationInfo = (doc, currentY) => {

  currentY = AddHeader(doc, currentY, "EDUCATION");
  var pageWidth = doc.internal.pageSize.getWidth(); 
  var pageHeight = doc.internal.pageSize.getHeight();
  var pageCenter = pageWidth/2
  var lineHeight = 5;
  doc.setFontSize(11);
  
  for(let i=0; i<sections.value.education.length; i++)
  {
    var edu = sections.value.education[i];
    if(edu.checked)
    {
      // get school name and city and state
      doc.setFont(font, "bold");
  var workName = educations.value[i].name + ",";
  var temp = doc.text(workName, 10, currentY);
  
  doc.setFont(font, "normal");
  var cityState = educations.value[i].city + ", " + educations.value[i].state;
  doc.text(cityState, 10+(doc.getTextDimensions(workName).w * 1.1), currentY);

      var startEndDate = educations.value[i].startDate + " - " + educations.value[i].endDate;
      doc.text(startEndDate, pageWidth-10, currentY, {align:"right"});
      currentY += lineHeight;
      doc.setFont(font, "italic");
      doc.text(educations.value[i].degree, 10, currentY); currentY += lineHeight;
      doc.text("GPA: ", 10, currentY); 
      doc.text(educations.value[i].gpa, 20, currentY); currentY += lineHeight;
      doc.setFont(font, "normal");
      if(educations.value[i].coursework != "")
      {
        doc.text("Coursework: " + educations.value[i].coursework, 10, currentY); currentY+=lineHeight;
      }
    }
  }
  return currentY;
}

const AddAwardInfo = (doc, currentY) => {
  var pageWidth = doc.internal.pageSize.getWidth(); 
  if(sections.value.awards.length >= 1)
  {
    doc.setFont(font, "italic");
      doc.text("Awards: ", 10, currentY);
      doc.setFont(font, "normal");
  }
  for(let i=0; i<sections.value.awards.length; i++)
  {
    var award = sections.value.awards[i];
    if(award.checked)
    {
      doc.text(awards.value[i].title, 24, currentY);
      doc.text(awards.value[i].startDate, pageWidth-10, currentY, {align:"right"});
      currentY += 5;
      doc.text(awards.value[i].description, 15, currentY); currentY += 5;
      
    }
  }
  return currentY;
}

const AddExperienceInfo = (doc, currentY) => {
  currentY = AddHeader(doc, currentY, "PROFESSIONAL EXPERIENCE");
  var pageWidth = doc.internal.pageSize.getWidth(); 
  for(let i=0; i<sections.value.experience.length; i++)
  {
  var exp = sections.value.experience[i];
    if(exp.checked)
  {
  doc.setFontSize(11);
  doc.setFont(font, "bold");
  var workName = "Oklahoma Christian University";
  workName = experiences.value[i].name;
  workName += ",";
  var temp = doc.text(workName, 10, currentY);
  
  doc.setFont(font, "normal");
  temp = experiences.value[i].position + ", ";
  temp += experiences.value[i].state;
  doc.text(temp, 10+(doc.getTextDimensions(workName).w * 1.1), currentY);
  //console.log(doc.getTextDimensions(temp.text));
  temp = experiences.value[i].startDate + " - ";
  temp += experiences.value[i].endDate;
  doc.text(temp, pageWidth-10, currentY, {align:"right"});
  currentY += 5;
  temp = experiences.value[i].description;
  var splitSummary = doc.splitTextToSize(temp, pageWidth-40);
  doc.text(splitSummary, 20, currentY, {align: "left"});
  currentY += doc.getTextDimensions(splitSummary).h;
}
}
  return currentY + 5;
}

const AddSkills = (doc, currentY) => {
  currentY = AddHeader(doc, currentY, "SKILLS | INTERESTS");
  doc.setFont(font, "italic");
  doc.setFontSize(11);
  for(let i=0; i<sections.value.skills.length; i++)
  {
    var skill = sections.value.skills[i];
    if(skill.checked)
    {
      doc.setFont("Symbol");
      doc.setFontSize(20);
      doc.text('·', 15, currentY+1);
      doc.setFont(font, "italic");
      doc.setFontSize(11);
      doc.text(skills.value[i].description, 20, currentY);
      currentY += 5;

    }
  }
  for(let i=0; i<sections.value.interests.length; i++)
  {
    var interest = sections.value.interests[i];
    if(interest.checked)
    {
      doc.setFont("Symbol");
      doc.setFontSize(20);
      doc.text('·', 15, currentY+1);
      doc.setFont(font, "italic");
      doc.setFontSize(11);
      doc.text(interests.value[i].description, 20, currentY);
      currentY += 5;

    }
  }
}

const AddHeader = (doc, currentY, title) => {
  doc.setFontSize(13);
  doc.setFont(font, "bold");
  doc.text(title, 10, currentY, {});
  currentY += 5;
  doc.line(9, currentY, 200, currentY);
  currentY += 5;
  doc.setFont(font, "normal");
  return currentY;
}

const saveResumeToDatabase = () =>{
  resumeService.updateResume(user.value.studentId, thisResumeId.value ,resumeData.value)
    .then(() => {
      message.value = "resumeData saved successfully";
    })
    .catch((e) => {
      message.value = "An error occurred saving resumeData";
    });
}

const saveExperienceDatabase = () =>{
    console.log("it called the experience function");
    for(let i=0; i<sections.value.experience.length; i++)
      {
        var exp = sections.value.experience[i];
        if(exp.checked == true && exp.begChecked == false){
          resumeExperienceServices.createResumeExperience(user.value.studentId, thisResumeId.value, exp.experienceId ) 
            .then(() => {
              console.log("ResumeExperience created successfully: " + exp.experienceId);
            })
            .catch((e) => {
              console.log("An error occurred");
            });
        }
        if(!exp.checked && exp.begChecked == true){
          console.log("One was unchecked");
         
            resumeExperienceServices.deleteResumeExperience(user.value.studentId, thisResumeId.value, exp.id ) 
              .then(() => {
                console.log("ResumeExperience deleted successfully:", exp.id);
              })
              .catch((e) => {
                console.log("An error occurred with deleting");
              });
          
        }
      }
    
  };

const saveEducationDatabase = () =>{
  console.log("it called the education function");
  for(let i=0; i<sections.value.education.length; i++)
    {
      var exp = sections.value.education[i];
      if(exp.checked == true && exp.begChecked == false){
        resumeEducationServices.createResumeEducation(user.value.studentId, thisResumeId.value, exp.educationId ) 
          .then(() => {
            console.log("ResumeEducation created successfully: " + exp.educationId);
          })
          .catch((e) => {
            console.log("An error occurred");
          });
      }
      if(!exp.checked && exp.begChecked == true){
        console.log("One was unchecked");
       
          resumeEducationServices.deleteResumeEducation(user.value.studentId, thisResumeId.value, exp.id ) 
            .then(() => {
              console.log("ResumeEducation deleted successfully:", exp.id);
            })
            .catch((e) => {
              console.log("An error occurred with deleting");
            });
        
      }
    }
  
};

const saveProjectDatabase = () =>{
    console.log("it called the project function");
    for(let i=0; i<sections.value.projects.length; i++)
      {
        var exp = sections.value.projects[i];
        if(exp.checked == true && exp.begChecked == false){
          resumeProjectServices.createResumeProject(user.value.studentId, thisResumeId.value, exp.projectId ) 
            .then(() => {
              console.log("ResumeProject created successfully: " + exp.projectId);
            })
            .catch((e) => {
              console.log("An error occurred");
            });
        }
        if(!exp.checked && exp.begChecked == true){
          console.log("One was unchecked");
         
            resumeProjectServices.deleteResumeProject(user.value.studentId, thisResumeId.value, exp.id ) 
              .then(() => {
                console.log("ResumeProject deleted successfully:", exp.id);
              })
              .catch((e) => {
                console.log("An error occurred with deleting");
              });
          
        }
      }
    
  };

const saveLinkDatabase = () =>{
  console.log("it called the link function");
  for(let i=0; i<sections.value.personalLink.length; i++)
    {
      var exp = sections.value.personalLink[i];
      if(exp.checked == true && exp.begChecked == false){
        resumeLinkServices.createResumeLink(user.value.studentId, thisResumeId.value, exp.linkId ) 
          .then(() => {
            console.log("ResumeLink created successfully: " + exp.linkId);
          })
          .catch((e) => {
            console.log("An error occurred");
          });
      }
      if(!exp.checked && exp.begChecked == true){
        console.log("One was unchecked");
       
          resumeLinkServices.deleteResumeLink(user.value.studentId, thisResumeId.value, exp.id ) 
            .then(() => {
              console.log("ResumeLink deleted successfully:", exp.id);
            })
            .catch((e) => {
              console.log("An error occurred with deleting");
            });
        
      }
    }
  
};

const saveAwardDatabase = () =>{
    console.log("it called the award function");
    for(let i=0; i<sections.value.awards.length; i++)
      {
        var exp = sections.value.awards[i];
        if(exp.checked == true && exp.begChecked == false){
          resumeAwardServices.createResumeAward(user.value.studentId, thisResumeId.value, exp.awardId ) 
            .then(() => {
              console.log("ResumeAward created successfully: " + exp.awardId);
            })
            .catch((e) => {
              console.log("An error occurred");
            });
        }
        if(!exp.checked && exp.begChecked == true){
          console.log("One was unchecked");
         
            resumeAwardServices.deleteResumeAward(user.value.studentId, thisResumeId.value, exp.id ) 
              .then(() => {
                console.log("ResumeAward deleted successfully:", exp.id);
              })
              .catch((e) => {
                console.log("An error occurred with deleting");
              });
          
        }
      }
    
  };

const saveInterestDatabase = () =>{
  console.log("it called the interest function");
  for(let i=0; i<sections.value.interests.length; i++)
    {
      var exp = sections.value.interests[i];
      if(exp.checked)
      {
        console.log("student id " + user.value.studentId);
        console.log("Resume id " + thisResumeId.value);
        console.log("interest id " + interests.value[i].id );
        resumeInterestServices.createResumeInterest(user.value.studentId, thisResumeId.value, interests.value[i].id ) 
        .then(() => {
          console.log("ResumeInterest created successfully");
        })
        .catch((e) => {
          console.log("An error occurred");
        });
      }
    }
};

const saveSkillDatabase = () =>{
    console.log("it called the skill function");
    for(let i=0; i<sections.value.skills.length; i++)
      {
        var exp = sections.value.skills[i];
        if(exp.checked == true && exp.begChecked == false){
          resumeSkillServices.createResumeSkill(user.value.studentId, thisResumeId.value, exp.skillId ) 
            .then(() => {
              console.log("ResumeSkill created successfully: " + exp.skillId);
            })
            .catch((e) => {
              console.log("An error occurred");
            });
        }
        if(!exp.checked && exp.begChecked == true){
          console.log("One was unchecked");
         
            resumeSkillServices.deleteResumeSkill(user.value.studentId, thisResumeId.value, exp.id ) 
              .then(() => {
                console.log("ResumeSkill deleted successfully:", exp.id);
              })
              .catch((e) => {
                console.log("An error occurred with deleting");
              });
          
        }
      }
    
  };
</script>

<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title>
          Resume Name
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="resumeData.name"
            label="name"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
      </v-card>

       <!-- Professional Summary Section -->
       <v-card class="mt-3">
        <v-card-title>Professional Summary</v-card-title>
        <v-card-text>
          <v-textarea
            v-model="resumeData.summary"
            label="summary"
            outlined
            dense
          ></v-textarea>
        </v-card-text>
      </v-card>

      <!-- Sections with Checkboxes -->
      <template v-for="(sectionItems, sectionKey) in sections" :key="sectionKey">
        <v-card class="mt-3">
          <v-card-title>{{ sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1) }}</v-card-title>
          <v-card-text>
            <div v-for="(item, idx) in sectionItems" :key="idx">
              <v-row>
                <v-checkbox v-model="item.checked"></v-checkbox>
                <v-text-field
                  v-model="item.name"
                  :label="sectionKey.slice(0, -1).charAt(0).toUpperCase() + sectionKey.slice(1, -1) + ' Name'"
                  outlined
                  dense
                ></v-text-field>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </template>

      <!-- Create Button -->
      <v-btn class="mt-4" color="red" @click="saveResume">Create</v-btn>
    </v-container>
  </v-app>
</template>

<style scoped>
.container {
  background-color: #f5e4d7;
}
</style>
