import { check } from 'express-validator';
import Express from 'express';
import {getUserById, institutionCount, userCount, getUser, updateUser, addEvent, getUserByObjId, searchUserByName, checkVerification, getName, isMailVerified, registerworkshop, getpaiduser, pullEvent, getLeaderById} from '../controllers/user.js';
import {isAuth} from '../middleware/isAuth.js';
const router = Express.Router();

router.get("/getUserById", isAuth, getUserById);
router.get("/getleaderbyid/:leaderid", getLeaderById)
router.get('/count', userCount);
router.get('/count/institution', institutionCount)
router.get('/getusers', getUser);
router.post('/updateuser', updateUser);
router.post('/addevent',isAuth, addEvent);
router.post('/getuserbyobjid', getUserByObjId);
router.post('/searchByName', searchUserByName)
router.post('/checkVerication', checkVerification);
router.post('/getName', getName);
router.post('/checkVericationByMail',isAuth, isMailVerified);
router.post('/registerworkshop',isAuth, registerworkshop);
router.get('/getpaiduser', getpaiduser);
router.post('/pullevent', isAuth, pullEvent);

export default router;