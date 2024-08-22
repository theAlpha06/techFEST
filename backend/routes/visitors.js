import {visitor, visitorCount} from '../controllers/visitors.js';
import Express from "express";

const router = Express.Router();

router.post('/count', visitor);
router.get('/count', visitorCount);

export default router;