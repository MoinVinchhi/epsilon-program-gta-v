import express from 'express';
import { login, register } from '../controllers/authController.js';
import { donationByUsername, totalDonations, userDonation } from '../controllers/donationController.js';
import { getEvents, addEvents, deleteEvent, updateEvent, eventRegister } from '../controllers/eventController.js';
import { addInquiry, getInquiries } from '../controllers/inquiryController.js';
import { cancelMembership, quizPoints } from '../controllers/membershipController.js';
import { addNews, getNews, updateNews, deleteNews } from '../controllers/newsController.js';
import { getStories, addStory, removeStory } from '../controllers/storyController.js';
import { getAllUsers, getUserByEmail, updateUserByEmail } from '../controllers/userController.js';
import { checkToken } from '../middlewares/Auth.js';
import { getVolunteers, addVolunteer, deleteVolunteer, approveVolunteer, rejectVolunteer, VolunteerRequests } from '../controllers/volunteerController.js';
import { checkHealth } from '../controllers/healthController.js';
const router = express.Router();

router.post("/register", register);
router.get("/api/me", checkToken);
router.post("/login", login);

router.get("/getallusers", getAllUsers);
router.get("/getalluser/:email", getUserByEmail);
router.put("/updateuser/:email", updateUserByEmail);

router.put("/donate/:username", donationByUsername);
router.get("/total-donations", totalDonations);
router.get("/user-donations", userDonation);

router.post("/cancel", cancelMembership);
router.post("/quizPoints", quizPoints);

router.get("/api/events", getEvents);
router.post("/api/events", addEvents);
router.delete("/api/events/:id", deleteEvent);
router.put("/api/events/:id", updateEvent);

router.post("/api/eventRegister", eventRegister);

router.get("/stories", getStories);
router.post("/stories", addStory);
router.delete('/stories/:id', removeStory);

router.post("/api/inquiries", addInquiry);
router.get("/admin/inquiries", getInquiries);

router.post("/news", addNews);
router.get("/news", getNews);
router.put("/news/:id", updateNews);
router.delete("/news/:id", deleteNews);

router.get('/api/volunteers', getVolunteers);
router.post('/api/volunteers', addVolunteer);
router.delete('/api/volunteers/:id', deleteVolunteer);
router.post('/api/volunteers/:id/reject', rejectVolunteer);
router.post('/api/volunteers/:id/approve', approveVolunteer);
router.get('/VolunteerRequests', VolunteerRequests);

router.get('/health', checkHealth);



export default router;
