import Express from "express";
import multer from 'multer';
import { createSponser } from "../controllers/sponser.js";

const upload = multer({dest: 'upload/images'});

const router = Express.Router();

router.post(
    '/create',
    upload.single('sponserPicture'),
    createSponser,
);

export default router;