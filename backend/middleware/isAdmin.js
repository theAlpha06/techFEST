import Coordinator from "../models/coordinator.js";
const isAdmin = async (req, res, next) => {
  const adminId = req.userId;
  const admin = await Coordinator.findById(adminId);
  if (admin.coordinatorRole == process.env.ADMIN_ROLE) {
    next();
  } else {
    return res.json({
      isError: true,
      title: "Error",
      message: "Wrong",
    });
  }
};

export {isAdmin};
