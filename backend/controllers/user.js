import User from "../models/user.js";
import Event from "../models/events.js";
import Team from "../models/teams.js";
import { validationResult } from "express-validator";
import Workshop from "../models/workshop.js";

const getUserById = (req, res) => {
  const _id = req.userId;
  User.findOne({ _id: _id })
    // .populate("events", ["name", "endDate"])
    .populate("workshops")
    .populate("teamMembers")
    .populate('events')
    .exec((err, user) => {
      if (err || !user) {
        return res.status(208).json({ isError: true, user: "Not auth" });
      }
      user.password = null;
      return res
        .status(200)
        .send({ isError: false, isSuccess: true, user: user });
    });
};

const getLeaderById = async(req, res) => {
  const id = req.params.leaderid;
  console.log('aaya')
  User.findOne({ _id: id })
    .exec((err, user) => {
      if (err || !user) {
        return res.status(208).json({ isError: true, user: "Not found" });
      }
      user.password = null;
      return res
        .status(200)
        .send({ isError: false, isSuccess: true, user: user });
    }
)}


const userCount = (req, res) => {
  User.countDocuments({}, (err, count) => {
    if (err) {
      return res.status(208).json({ isError: true, message: "Not auth" });
    }
    return res
      .status(200)
      .send({ isError: false, isSuccess: true, count: count });
  });
};

const institutionCount = (req, res) => {
  User.countDocuments({ institution: "sliet" }, (err, count) => {
    if (err) {
      return res.status(208).json({ isError: true, message: "Not auth" });
    }
    return res
      .status(200)
      .send({ isError: false, isSuccess: true, count: count });
  });
};

const getUser = async (req, res) => {
  User.find().exec((err, user) => {
    if (err || !user) {
      return res.status(208).json({ isError: true, message: "Not auth" });
    }
    user.password = null;
    return res
      .status(200)
      .send({ isError: false, isSuccess: true, user: user });
  });
};

const updateUser = async (req, res) => {
  // const user_email = req.body.email;
  // console.log("ema",user_email);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(208).json({ isError: true, message: "User not found" });
  } else {
    const updatedUser = {
      // ...user,
      name: req.body.name,
      whatsappPhoneNumber: req.body.whatsappPhoneNumber,
      //  dob:req.body.dob,
      phone: req.body.phone,
      collegeName: req.body.collegeName,
      branch: req.body.branch,
    };
    User.updateOne({ email: req.body.email }, updatedUser)
      .then(() => {
        // const upuser = await User.findOne({email:req.body.email});
        // console.log()
        res.status(201).json({
          message: "user updated successfully!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  }
};

const addEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { eventId, type } = req.body;
  const userId = req.userId;
  const user = await User.findById(userId);
  const event = await Event.findById(eventId);
  const userEventRegistered = user.events.map((e) => {
    return e.toString();
  });

  if (userEventRegistered.includes(eventId)) {
    return res.status(208).send({
      title: "Already Registered",
      message: "Event already registered",
    });
  }
  if (type === "Individual") {
    if (user.role == 2 || (user.role == 1 && user.payment.paymentStatus)) {
      //slietian
      User.findByIdAndUpdate(user._id, { $push: { events: event } }).exec();
      Event.findByIdAndUpdate(eventId, {
        $push: { individual: user },
      }).exec();
    } else {
      return res.status(208).send({
        title: "Pay registration fee",
        message: "Your payment has not been done yet.",
      });
    }
  } else {
    const team = await Team.findById(type);
    const teamEventRegistered = team.events.map((e) => {
      return e.toString();
    });
    if (teamEventRegistered.includes(eventId)) {
      return res.status(208).send({
        title: "Already Registered",
        message: "Event already registered",
      });
    }
    for(const member of team.members) {
      const m = await User.findByIdAndUpdate(member.memberId, { $push: { events: event } }).exec();
    }
    User.findByIdAndUpdate(user._id, { $push: { events: event } }).exec();
    Event.findByIdAndUpdate(eventId, {
      $push: { teams: team },
    }).exec();
    Team.findByIdAndUpdate(type, { $push: { events: event } }).exec();
  }
  res.status(200).send({
    title: "Registered",
    message: "Check dashboard for whatsapp link of the event registered.",
  });
};

const getUserByObjId = async (req, res) => {
  User.findOne({ _id: req.body._id }).exec((err, user) => {
    if (err || !user) {
      return res.status(208).json({ isError: true, message: "Not auth" });
    }
    user.password = null;
    return res
      .status(200)
      .send({ isError: false, isSuccess: true, user: user });
  });
};

const searchUserByName = async (req, res) => {
  if (req.body.name) {
    return res.send(
      await User.find(
        { name: { $regex: req.body.name, $options: "i" } },
        {
          name: 1,
          email: 1,
        }
      )
    );
  }
  return res.status(400).send({ error: "Empty request" });
};

const checkVerification = async (req, res) => {
  if (req.body.id) {
    const user = await User.findById(req.body.id);
    if (user) {
      return res.send(user.isVerified && user.payment.paymentStatus);
    } else {
      return res.status(401).send({ error: "Cant find the user" });
    }
  }
  return res.status(400).send({ error: "Empty request" });
};

const getName = async (req, res) => {
  if (req.body.id) {
    const user = await User.findById(req.body.id);
    if (user) {
      return res.send(user.name);
    } else {
      return res.status(401).send({ error: "Can't find the user" });
    }
  }
  return res.status(400).send({ error: "Empty request" });
};

const isMailVerified = async (req, res) => {
  const email = req.body.email;
  const leaderId = req.userId;
  const leader = await User.findById(leaderId);
  if (req.body.email === leader.email) {
    return res.status(203).send({
      isError: true,
      title: "Can't add yourself",
      message: "Can't add yourself",
    });
  }
  if (email.length < 1) {
    return res.statue(203).send({
      isError: true,
      title: "Empty mail",
      message: "Please enter your mail",
    });
  }
  const member = await User.findOne({ email });
  if (!member) {
    return res.status(203).send({
      isError: true,
      title: "User doesn't exist",
      isVerified: false,
    });
  }

  let payment;
  if (member.role == 2) {
    payment = {
      ...member.payment,
      paymentStatus: true,
    };
    return res.status(200).send({
      isError: false,
      isVerified: member.isVerified,
      member: member,
      payment: payment,
    });
  }
  res.send({
    isError: false,
    isVerified: member.isVerified,
  });
};

const getIdByEmail = async (email) => {
  if (email) {
    return await User.find(
      {
        email: email,
      },
      {
        _id: 1,
      }
    );
  }
};

const registerworkshop = async (req, res) => {
  const userId = req.userId;
  const workshopId = req.body.workshopId;
  const userWorkshopRegistered = await User.findById(userId);
  if (userWorkshopRegistered.workshops.includes(workshopId)) {
    return res.status(208).send({
      title: "Already Registered",
      message: "Workshop already registered",
    });
  }
  const workshop = await Workshop.findById(workshopId);
  User.findByIdAndUpdate(userId, { $push: { workshops: workshop } }).exec();
  Workshop.findByIdAndUpdate(workshopId, {
    $push: { user: userWorkshopRegistered },
  }).exec();
  res.status(200).send({
    title: "Registered",
    message: "Check dashboard for whatsapp link of the workshop registered.",
  });
};

const getpaiduser = async (req, res) => {
  const users =  await User.find();
  const nonslietians = [];
  const paidUsers = [];
  const nonslietian = users.map((user) => {
    if(user.role === 1){
      nonslietians.push(user);
    }
  });
  const user = nonslietians.map((nonslietian) => {
    if(nonslietian.payment.paymentId) {
      paidUsers.push(nonslietian);
    }
  })
  return res.status(200).json({
    isError: false,
    paidUsers: paidUsers,
  })
}

const pullEvent = async(req, res) => {
  const user = req.userId;
  const eventId = req.body.id;
  await User.findByIdAndUpdate(user, { $pull: { events: eventId } }).exec();
  Event.findByIdAndUpdate(eventId, {
    $pull: { individual: user },
  }).exec((err) => {
    if(err) {
      return res.status(400).json({
        isError: true,
        message: "Error removing event",
      });
    }
  })
  return res.status(200).json({
    isError: false,
    message: "Event removed",
  });
}

export {
  addEvent,
  checkVerification,
  getIdByEmail,
  getName,
  getUser,
  getUserById,
  getUserByObjId,
  institutionCount,
  isMailVerified,
  registerworkshop,
  searchUserByName,
  updateUser,
  userCount,
  getpaiduser,
  pullEvent,
  getLeaderById,
};
