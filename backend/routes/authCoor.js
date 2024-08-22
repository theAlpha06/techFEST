import Express from 'express';
import {Signup, Signin, verify, verifyUser, getCoordinatorByObjId} from '../controllers/authCoor.js';

const router = Express.Router();

router.post('/sign-up', Signup);
router.post('/sign-in', Signin);
router.post('/verify', verify);
router.get('/verifyUser/:token', verifyUser);
router.post('/getcoordinatorbyid', getCoordinatorByObjId)

export default router;