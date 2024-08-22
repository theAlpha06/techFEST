import { getCoordinators,createCoordinator, validateCoordinator, deleteCoordinator, getCoordinatorById, updateCoordinator, updatePhoto } from "../controllers/coordinator.js";
import { Router } from "express";
import multer from "multer";
import { isAuth } from "../middleware/isAuth.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'_'+ file.originalname)
    }
  })
  const upload = multer({ storage: storage })

const router = Router();
router.post(
    "/create",
    upload.single("coordinator"),
   createCoordinator
  );
router.get(
    "/get",getCoordinators
  );

router.post("/validate", validateCoordinator);

router.post('/delete', deleteCoordinator);

router.get('/getById/:id', getCoordinatorById);
router.post('/update', updateCoordinator);
router.post('/updatephoto/:id', upload.single('coordinatorPhoto'), updatePhoto);

export default router;
