import Express from "express";
import multer from "multer";
import { createWorkshop, getAllWorkshop, getWorkshopById, toggleRegistration } from "../controllers/workshop.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'_'+ file.originalname)
    }
  })
  const upload = multer({ storage: storage })


const router = Express.Router();

router.post(
    '/create',
    upload.single('workshopPhoto'),
    createWorkshop,
);

router.get(
    '/workshops',
    getAllWorkshop,
)

router.get(
    '/workshop/:id',
    getWorkshopById,
)

router.post(
  '/toggleregistration',
  toggleRegistration,
)


export default router;