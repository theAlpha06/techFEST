import { check } from 'express-validator';
import Express from 'express';
import {submitPayment, verifyPayment} from '../controllers/payments.js';
import {isAdmin} from '../middleware/isAdmin.js';
import {isAuth} from '../middleware/isAuth.js';
import multer from "multer";
const router = Express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'_'+ file.originalname)
    }
  })
  const upload = multer({ storage: storage })

router.post('/submit',isAuth, upload.single("paymentPhoto"), submitPayment);
router.post('/verify',isAuth, isAdmin, verifyPayment);

export default router;
