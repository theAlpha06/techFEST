import { validationResult } from "express-validator";
import Coordinator from "../models/coordinator.js";
import User from "../models/user.js";
import authverifyToken from "../models/verifyToken.js";
import transporter from "../utils/mail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const maxAge = 7 * 24 * 60 * 60;
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

const Signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({
      title: "Error",
      message: "Validation failed",
      isError: true,
    });
  }
  const c = await Coordinator.findOne({ coordinatorEmail: req.body.email });
  if (c && c.isVerified) {
    return res.status(208).send({
      title: "Error",
      message: "The email is already registered.",
      isError: true,
    });
  } else {
    if (c && !c.isVerified) {
      await Coordinator.deleteOne({ coordinatorEmail: req.body.email });
    }
  }

  if (await Coordinator.findOne({ coordinatorPhone: req.body.phone })) {
    return res.status(208).send({
      title: "Error",
      message: "The phone number is already registered",
      isError: true,
    });
  }


  const coordinatorId = `#TF23-${crypto.randomBytes(3).toString("hex")}`;
  const password = req.body.password;
  const eArr = req.body.email.split("@");
  const organization = eArr[1];

  let payLoad;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    if (organization === "sliet.ac.in") {
      if (req.body.type === "Domain") {
        payLoad = {
          ...{
            coordinatorEmail: req.body.email,
            coordinatorName: req.body.name,
            coordinatorPhone: req.body.phone,
            coordinatorId: coordinatorId,
            coordinatorPassword: encryptedPassword,
            coordinatorBranch: req.body.branch,
            coordinatorType: req.body.type,
            coordinatorRole: process.env.COORDINATOR_ROLE,
            coordinatorDomain: req.body.domain,
          },
        };
      } else if( req.body.type === 'Event') {
        payLoad = {
          ...{
            coordinatorEmail: req.body.email,
            coordinatorName: req.body.name,
            coordinatorPhone: req.body.phone,
            coordinatorId: coordinatorId,
            coordinatorPassword: encryptedPassword,
            coordinatorBranch: req.body.branch,
            coordinatorType: req.body.type,
            coordinatorRole: process.env.EVENT_ROLE,
          },
        };
      } else {
        payLoad = {
          ... {
            coordinatorEmail: req.body.email,
            coordinatorName: req.body.name,
            coordinatorPhone: req.body.phone,
            coordinatorId: coordinatorId,
            coordinatorPassword: encryptedPassword,
            coordinatorBranch: req.body.branch,
            coordinatorType: req.body.type,
            coordinatorRole: process.env.FACULTY_ROLE,
          }
        }
      }
    } else {
      return res.status(208).send({
        message: "Unauthorized mail!",
        isError: "True",
      });
    }
  } catch {
    return res.status(400).send({
      message: "Error in hashing password!",
      isError: "True",
    });
  }

  const coordinator = new Coordinator(payLoad);
  console.log(coordinator);

  try {
    const token = crypto.randomBytes(32).toString("hex");
    await authverifyToken({
      token: token,
      email: req.body.email,
    }).save();

    const uri = `https://www.techfestsliet.org/api/coor/verifyUser/${token}`;
    // const uri = `http://localhost:4000/coor/verifyUser/${token}`;

    transporter.sendMail(
      {
        from: process.env.EMAIL_ID,
        to: req.body.email,
        subject: "VERIFY YOUR EMAIL ✔",
        html: ` <body>
        <tbody>
          <tr>
            <td style="vertical-align: top" valign="top">
              <table align="center" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                  <tr>
                    <td
                      width="600"
                      style="vertical-align: top; border-collapse: separate"
                      valign="top"
                    >
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td style="vertical-align: top" valign="top">
                              <table
                                align="center"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="600"
                                      bgcolor="#000000"
                                      style="
                                        vertical-align: top;
                                        border-radius: 8px 8px 0px 0px;
                                      "
                                      valign="top"
                                    >
                                      <table
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style="vertical-align: top"
                                              valign="top"
                                            >
                                              <div
                                                style="
                                                  height: 24px;
                                                  line-height: 24px;
                                                  font-size: 24px;
                                                "
                                              >
                                                &nbsp;
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style="
                                                vertical-align: top;
                                                padding-left: 24px;
                                                padding-right: 29px;
                                                width: 547px;
                                              "
                                              width="547"
                                              valign="top"
                                            >
                                              <table
                                                align="left"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      width="547"
                                                      style="
                                                        vertical-align: top;
                                                        border-collapse: separate;
                                                      "
                                                      valign="top"
                                                    >
                                                      <table
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                        width="100%"
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              width="400"
                                                              style="
                                                                vertical-align: top;
                                                              "
                                                              valign="top"
                                                            >
                                                              <table
                                                                width="100%"
                                                                cellspacing="0"
                                                                cellpadding="0"
                                                                border="0"
                                                              >
                                                                <tbody>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        vertical-align: top;
                                                                      "
                                                                      valign="top"
                                                                    >
                                                                      <table
                                                                        align="left"
                                                                        cellspacing="0"
                                                                        cellpadding="0"
                                                                        border="0"
                                                                      >
                                                                        <tbody>
                                                                          <tr>
                                                                            <td
                                                                              style="
                                                                                vertical-align: top;
                                                                              "
                                                                              valign="top"
                                                                            >
                                                                              <a
                                                                                href="https://www.techfestsliet.org/"
                                                                                style="
                                                                                  text-decoration: none;
                                                                                "
                                                                                target="_blank"
                                                                                data-saferedirecturl="https://www.google.com/url?q=https://www.techfestsliet.org/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw0kGv2tuLr58D-lqkgXvqIw"
                                                                                ><img
                                                                                  src="https://i.postimg.cc/CLpMG3PZ/SLIET-s-tech-FEST-23.webp"
                                                                                  width="120"
                                                                                  alt=""
                                                                                  border="0"
                                                                                  style="
                                                                                    max-width: 140px;
                                                                                    height: auto;
                                                                                    margin: auto;
                                                                                    display: block;
                                                                                  "
                                                                                  class="CToWUd"
                                                                                  data-bit="iit"
                                                                              /></a>
                                                                            </td>
                                                                          </tr>
                                                                        </tbody>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </td>
                                                            <td
                                                              style="
                                                                vertical-align: top;
                                                              "
                                                              valign="top"
                                                            >
                                                              <table
                                                                align="center"
                                                                cellspacing="0"
                                                                cellpadding="0"
                                                                border="0"
                                                              >
                                                                <tbody>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        vertical-align: top;
                                                                        border-collapse: separate;
                                                                      "
                                                                      valign="top"
                                                                    >
                                                                      <table
                                                                        cellspacing="0"
                                                                        cellpadding="0"
                                                                        border="0"
                                                                        width="100%"
                                                                      >
                                                                        <tbody>
                                                                          <tr>
                                                                            <td
                                                                              style="
                                                                                vertical-align: top;
                                                                              "
                                                                              valign="top"
                                                                            >
                                                                              <div
                                                                                style="
                                                                                  height: 2px;
                                                                                  line-height: 2px;
                                                                                  font-size: 2px;
                                                                                "
                                                                              >
                                                                                &nbsp;
                                                                              </div>
                                                                              <table
                                                                                cellspacing="0"
                                                                                cellpadding="0"
                                                                                border="0"
                                                                                width="100%"
                                                                              >
                                                                                <tbody>
                                                                                  <tr>
                                                                                    <td
                                                                                      style="
                                                                                        vertical-align: top;
                                                                                        text-align: left;
                                                                                      "
                                                                                      align="left"
                                                                                      valign="top"
                                                                                    >
                                                                                      <div
                                                                                        style="
                                                                                          line-height: normal;
                                                                                        "
                                                                                      >
                                                                                        <span
                                                                                          style="
                                                                                            color: #ffffff;
                                                                                            font-family: Exo,
                                                                                              Helvetica,
                                                                                              Arial,
                                                                                              sans-serif;
                                                                                            font-size: 12px;
                                                                                            text-align: left;
                                                                                            font-weight: 400;
                                                                                          "
                                                                                          ><a
                                                                                            href="https://www.techfestsliet.org/"
                                                                                            style="
                                                                                              text-decoration: none;
                                                                                              color: #fff;
                                                                                            "
                                                                                            target="_blank"
                                                                                            data-saferedirecturl="https://www.google.com/url?q=https://www.techfestsliet.org/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw0kGv2tuLr58D-lqkgXvqIw"
                                                                                            >Visit
                                                                                            Website</a
                                                                                          >
                                                                                        </span>
                                                                                      </div>
                                                                                    </td>
                                                                                  </tr>
                                                                                </tbody>
                                                                              </table>
                                                                            </td>
                                                                            <td
                                                                              style="
                                                                                vertical-align: top;
                                                                                padding-left: -2px;
                                                                              "
                                                                              valign="top"
                                                                            >
                                                                              <table
                                                                                cellspacing="0"
                                                                                cellpadding="0"
                                                                                border="0"
                                                                              >
                                                                                <tbody>
                                                                                  <tr>
                                                                                    <td
                                                                                      bgcolor="transparent"
                                                                                      style="
                                                                                        vertical-align: top;
                                                                                      "
                                                                                      valign="top"
                                                                                    >
                                                                                      <table
                                                                                        cellspacing="0"
                                                                                        cellpadding="0"
                                                                                        border="0"
                                                                                        width="100%"
                                                                                      >
                                                                                        <tbody>
                                                                                          <tr>
                                                                                            <td
                                                                                              style="
                                                                                                vertical-align: top;
                                                                                              "
                                                                                              valign="top"
                                                                                            >
                                                                                              <div
                                                                                                style="
                                                                                                  height: 0px;
                                                                                                  line-height: 5px;
                                                                                                  font-size: 5px;
                                                                                                "
                                                                                              >
                                                                                                &nbsp;
                                                                                              </div>
                                                                                              <table
                                                                                                width="100%"
                                                                                                cellspacing="0"
                                                                                                cellpadding="0"
                                                                                                border="0"
                                                                                              >
                                                                                                <tbody>
                                                                                                  <tr>
                                                                                                    <td
                                                                                                      style="
                                                                                                        vertical-align: top;
                                                                                                      "
                                                                                                      valign="top"
                                                                                                    >
                                                                                                      <table
                                                                                                        align="center"
                                                                                                        cellspacing="0"
                                                                                                        cellpadding="0"
                                                                                                        border="0"
                                                                                                      >
                                                                                                        <tbody>
                                                                                                          <tr>
                                                                                                            <td
                                                                                                              style="
                                                                                                                vertical-align: top;
                                                                                                                padding-left: 5px;
                                                                                                                padding-right: 4px;
                                                                                                              "
                                                                                                              valign="top"
                                                                                                            >
                                                                                                              <img
                                                                                                                src="https://ci4.googleusercontent.com/proxy/vnU54AnhdQvqOrEhiaT9zT0DAMcdXjbimtErmTd-OtKkIcaBPD0AhPoK3qn8rja3m_L7CBKYWLmxFBW2zgFVKk_JJggVnQR5ntVTQOI1cp2Nwx3Cm566HmqRi6sIWak=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1trpXR3aKJSRSVKb2nuuxzjLh8WHImVZW"
                                                                                                                width="9.499998092651367"
                                                                                                                alt=""
                                                                                                                border="0"
                                                                                                                style="
                                                                                                                  width: 100%;
                                                                                                                  height: auto;
                                                                                                                  margin: auto;
                                                                                                                  display: block;
                                                                                                                "
                                                                                                                class="CToWUd"
                                                                                                                data-bit="iit"
                                                                                                              />
                                                                                                            </td>
                                                                                                          </tr>
                                                                                                        </tbody>
                                                                                                      </table>
                                                                                                    </td>
                                                                                                  </tr>
                                                                                                </tbody>
                                                                                              </table>
                                                                                              <div
                                                                                                style="
                                                                                                  height: 5px;
                                                                                                  line-height: 5px;
                                                                                                  font-size: 5px;
                                                                                                "
                                                                                              >
                                                                                                &nbsp;
                                                                                              </div>
                                                                                            </td>
                                                                                          </tr>
                                                                                        </tbody>
                                                                                      </table>
                                                                                    </td>
                                                                                  </tr>
                                                                                </tbody>
                                                                              </table>
                                                                            </td>
                                                                          </tr>
                                                                        </tbody>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style="vertical-align: top"
                                              valign="top"
                                            >
                                              <div
                                                style="
                                                  height: 24px;
                                                  line-height: 24px;
                                                  font-size: 24px;
                                                "
                                              >
                                                &nbsp;
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="vertical-align: top" valign="top">
              <table align="center" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                  <tr>
                    <td
                      width="600"
                      background="https://i.postimg.cc/7ZHfrvyC/Instagram-story-1-11zon.jpg"
                      style="
                      vertical-align: top;
        height: 337px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        border-collapse: separate;
                      "
                      valign="top"
                    >
                      <div>
                        <table
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td style="vertical-align: top" valign="top">
                                <div
                                  style="
                                    height: 52px;
                                    line-height: 52px;
                                    font-size: 52px;
                                  "
                                >
                                  &nbsp;
                                </div>
                                <table
                                  width="100%"
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                ></table>
                                <div
                                  style="
                                    height: 58px;
                                    line-height: 58px;
                                    font-size: 58px;
                                  "
                                >
                                  &nbsp;
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="vertical-align: top" valign="top">
              <table align="center" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                  <tr>
                    <td
                      width="600"
                      bgcolor="#000000"
                      style="vertical-align: top"
                      valign="top"
                    >
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        width="100%"
                      ></table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <tr>
                <td style="vertical-align: top" valign="top">
                  <table align="center" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td
                          width="600"
                          bgcolor="#000000"
                          style="vertical-align: top"
                          valign="top"
                        >
                          <table
                            cellspacing="0"
                            cellpadding="0"
                            border="0"
                            width="100%"
                          >
                            <tbody>
                              <tr>
                                <td style="vertical-align: top" valign="top">
                                  <div
                                    style="
                                      height: 12px;
                                      line-height: 12px;
                                      font-size: 12px;
                                    "
                                  >
                                    &nbsp;
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style="
                                    vertical-align: top;
                                    padding-left: 16px;
                                    width: 584px;
                                  "
                                  width="584"
                                  valign="top"
                                >
                                  <table
                                    align="left"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          width="584"
                                          bgcolor="transparent"
                                          style="vertical-align: top"
                                          valign="top"
                                        >
                                          <table
                                            cellspacing="0"
                                            cellpadding="0"
                                            border="0"
                                            width="100%"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="vertical-align: top"
                                                  valign="top"
                                                >
                                                  <table
                                                    align="center"
                                                    cellspacing="0"
                                                    cellpadding="0"
                                                    border="0"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            vertical-align: top;
                                                            border-collapse: separate;
                                                          "
                                                          valign="top"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            width="100%"
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  style="
                                                                    vertical-align: top;
                                                                  "
                                                                  valign="top"
                                                                >
                                                                  <table
                                                                    cellspacing="0"
                                                                    cellpadding="0"
                                                                    border="0"
                                                                    width="100%"
                                                                  >
                                                                    <tbody>
                                                                      <tr>
                                                                        <td
                                                                          style="
                                                                            vertical-align: top;
                                                                            text-align: center;
                                                                          "
                                                                          align="center"
                                                                          valign="top"
                                                                        >
                                                                        
                                                                          <div
                                                                            style="
                                                                              line-height: normal;
                                                                            "
                                                                          >
                                                                          <br
                                                                          style="
                                                                            font-size: 200px;
                                                                            color: #fff;
                                                                          "
                                                                        /><br />
                                                                            <span
                                                                              style="
                                                                                color: #ffffff;
                                                                                font-family: Exo,
                                                                                  Helvetica,
                                                                                  Arial,
                                                                                  sans-serif;
                                                                                font-size: 33px;
                                                                                text-align: center;
                                                                                font-weight: 400;
                                                                              "
                                                                            >
                                                                              Verification for</span
                                                                            ><span
                                                                              style="
                                                                                color: #ffffff;
                                                                                font-family: Vipnagorgialla,
                                                                                  Helvetica,
                                                                                  Arial,
                                                                                  sans-serif;
                                                                                font-size: 33px;
                                                                                text-align: center;
                                                                                font-weight: 700;
                                                                              "
                                                                            >
                                                                              techFEST'23</span
                                                                            >
                                                                          </div>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  style="
                                                                    vertical-align: top;
                                                                  "
                                                                  valign="top"
                                                                >
                                                                  <div
                                                                    style="
                                                                      height: 25px;
                                                                      line-height: 25px;
                                                                      font-size: 25px;
                                                                    "
                                                                  >
                                                                    &nbsp;
                                                                  </div>
                                                                  <table
                                                                    cellspacing="0"
                                                                    cellpadding="0"
                                                                    border="0"
                                                                    width="100%"
                                                                  >
                                                                    <tbody>
                                                                      <tr>
                                                                        <td
                                                                          style="
                                                                            vertical-align: top;
                                                                            text-align: justified;
                                                                          "
                                                                          align="justified"
                                                                          valign="top"
                                                                        >
                                                                          <div
                                                                            style="
                                                                              line-height: normal;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                                color: #ffffff;
                                                                                font-family: Exo,
                                                                                  Helvetica,
                                                                                  Arial,
                                                                                  sans-serif;
                                                                                font-size: 18px;
                                                                                text-align: justified;
                                                                              "
                                                                              ><br><br />
                                                                              Hello!${coordinator.coordinatorName}
                                                                              <br><br />
                                                                              Thank you for registering for techFEST'23. To complete your registration, we need to verify your email address. Please click on the button below. verify your email:
                                                                            <a href=${uri} style="text-decoration: none;"><button
                                                                              style="
                                                                                      border-radius: 15px;
          background-color: #045b04;
          width: 112px;
          margin-left: 17px;
          margin-top: 10px;
          height: 28px;
          font-size: 17px;
          color: white;
                                                                              "
                                                                            >
                                                                              Verify Mail
                                                                            </button></a>
                                                                            <br
                                                                          />
                                                                        <p>If the button above does not work, you can also copy and paste the following link into your web browser:</p>
                                                                        <p>${uri}</p>
                                                                    <p>Please note that you will not be able to access certain features of techFEST'23 until you have verified your email address. If you have any questions or concerns, please contact us at <a href="mailto:web.techfest@sliet.ac.in">web.techfest@sliet.ac.in</a></p>
                                                                    </span>
                                                                          </div>
                                                                          <div
                                                                            style="
                                                                              line-height: normal;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                                color: #ffffff;
                                                                                font-family: Exo,
                                                                                  Helvetica,
                                                                                  Arial,
                                                                                  sans-serif;
                                                                                font-size: 18px;
                                                                                text-align: justified;
                                                                              "
                                                                              ><br
                                                                            /></span>
                                                                          </div>
                                                                          <div
                                                                            style="
                                                                              line-height: normal;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                                color: #ffffff;
                                                                                font-family: Exo,
                                                                                  Helvetica,
                                                                                  Arial,
                                                                                  sans-serif;
                                                                                font-size: 18px;
                                                                                text-align: justified;
                                                                              "
                                                                              >Thank you,</span
                                                                            >
                                                                          </div>
                                                                         
                                                                          <div
                                                                            style="
                                                                              line-height: normal;
                                                                            "
                                                                          >
                                                                            <font
                                                                              color="#ffffff"
                                                                              face="Exo, Helvetica, Arial, sans-serif"
                                                                              ><span
                                                                                style="
                                                                                  font-size: 18px;
                                                                                "
                                                                                >Team
                                                                                techFEST'23</span
                                                                              ></font
                                                                            >
                                                                          </div>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                  <div
                                                                    style="
                                                                      height: 25px;
                                                                      line-height: 25px;
                                                                      font-size: 25px;
                                                                    "
                                                                  >
                                                                    &nbsp;
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  style="vertical-align: top"
                                                  valign="top"
                                                >
                                                  <div
                                                    style="
                                                      height: 8px;
                                                      line-height: 8px;
                                                      font-size: 8px;
                                                    "
                                                  >
                                                    &nbsp;
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="vertical-align: top" valign="top">
                                  <div
                                    style="
                                      height: 12px;
                                      line-height: 12px;
                                      font-size: 12px;
                                    "
                                  >
                                    &nbsp;
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
          </tr>
          <tr>
            <td style="vertical-align: top" valign="top">
              <table align="center" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                  <tr>
                    <td
                      width="600"
                      bgcolor="#062b06"
                      style="vertical-align: top"
                      valign="top"
                    >
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td style="vertical-align: top" valign="top">
                              <div
                                style="
                                  height: 15px;
                                  line-height: 15px;
                                  font-size: 15px;
                                "
                              >
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                vertical-align: top;
                                padding-left: 20px;
                                width: 269px;
                              "
                              width="269"
                              valign="top"
                            >
                              <table
                                align="left"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="269"
                                      style="
                                        vertical-align: top;
                                        border-collapse: separate;
                                      "
                                      valign="top"
                                    >
                                      <table
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style="vertical-align: top"
                                              valign="top"
                                            >
                                              <table
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        vertical-align: top;
                                                        text-align: center;
                                                      "
                                                      align="center"
                                                      valign="top"
                                                    ></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                            <td
                                              style="vertical-align: top"
                                              valign="top"
                                            >
                                              <table
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        vertical-align: top;
                                                        padding-left: 27px;
                                                        text-align: center;
                                                      "
                                                      align="center"
                                                      valign="top"
                                                    ></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="vertical-align: top" valign="top">
                              <div
                                style="
                                  height: 12px;
                                  line-height: 12px;
                                  font-size: 12px;
                                "
                              >
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                vertical-align: top;
                                padding-left: 20px;
                                width: 270.97552490234375px;
                              "
                              width="270.97552490234375"
                              valign="top"
                            >
                              <table
                                align="left"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="270.97552490234375"
                                      style="
                                        vertical-align: top;
                                        border-collapse: separate;
                                      "
                                      valign="top"
                                    >
                                      <table
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style="vertical-align: top"
                                              valign="top"
                                            >
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="vertical-align: top"
                                                      valign="top"
                                                    >
                                                      <div
                                                        style="line-height: 24px"
                                                      >
                                                        <span
                                                          style="
                                                            color: #ffffff;
                                                            line-height: 24px;
                                                            font-family: Vipnagorgialla,
                                                              Helvetica, Arial,
                                                              sans-serif;
                                                            font-size: 15px;
                                                            text-align: center;
                                                            font-weight: 700;
                                                            font-size: 24px;
                                                            margin-right: 150px;
                                                          "
                                                          ><a
                                                            href="https://www.techfestsliet.org/"
                                                            style="
                                                              text-decoration: none;
                                                              color: #fff;
                                                            "
                                                            target="_blank"
                                                            data-saferedirecturl="https://www.google.com/url?q=https://www.techfestsliet.org/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw0kGv2tuLr58D-lqkgXvqIw"
                                                            >techFEST’23</a
                                                          ></span
                                                        >
                                                      </div>
                                                      <div
                                                        style="line-height: 25px"
                                                      >
                                                        <span
                                                          style="
                                                            color: #ffffff;
                                                            line-height: 25px;
                                                            font-family: Exo,
                                                              Helvetica, Arial,
                                                              sans-serif;
                                                            font-size: 15px;
                                                            text-align: center;
                                                            font-weight: 300;
                                                          "
                                                          >mail us at </span
                                                        ><span
                                                          style="
                                                            color: #ffffff;
                                                            line-height: 25px;
                                                            font-family: Exo,
                                                              Helvetica, Arial,
                                                              sans-serif;
                                                            font-size: 15px;
                                                            text-align: center;
                                                            font-weight: 700;
                                                          "
                                                          ><a
                                                            href="mailto:web.techfest@sliet.ac.in"
                                                            style="
                                                              text-decoration: none;
                                                              color: #fff;
                                                            "
                                                            target="_blank"
                                                            >web.techfest@sliet.ac.in</a
                                                          ></span
                                                        >
                                                      </div>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
    
                                            <td
                                              style="vertical-align: top"
                                              valign="top"
                                            >
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                style="margin-left: 100px"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="vertical-align: top"
                                                      valign="top"
                                                    >
                                                      <div style="display: flex">
                                                        <a
                                                          href="https://www.facebook.com/techfestsliet/"
                                                          style="
                                                            text-decoration: none;
                                                          "
                                                          target="_blank"
                                                          data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/techfestsliet/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw1DaBXxlGzbhFl4-jx3qlo8"
                                                          ><img
                                                            src="https://ci6.googleusercontent.com/proxy/TvtbbuARa2-B2C0Dj4Um29m-FYsIJpLc5tOuRveSE7r2DVOU09IRedK9Nja1jtTVsHD_rIpsZkjxxsQqMs1lu3yJbgF7SCdXCFVF1NMm6OG6kQ2ItfkfTKxobslExSQ=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=10HTM4ooEy_IlCBKxUR6c57qhVXpeOrC_"
                                                            alt=""
                                                            style="
                                                              width: 30px;
                                                              margin: 0 5px;
                                                              display: block;
                                                            "
                                                            width="30"
                                                            class="CToWUd"
                                                            data-bit="iit"
                                                        /></a>
                                                        <a
                                                          href="https://instagram.com/techfestsliet_"
                                                          style="
                                                            text-decoration: none;
                                                          "
                                                          target="_blank"
                                                          data-saferedirecturl="https://www.google.com/url?q=https://instagram.com/techfestsliet_&amp;source=gmail&amp;ust=1678964827667000&amp;usg=AOvVaw10k7KdbUN-kABA4eo-k9OX"
                                                          ><img
                                                            src="https://ci3.googleusercontent.com/proxy/hqSL0d0hHn2JJxzd9nHUVlHNq2czMBdaQY8qDz-Y_jsEIAqbF3bvl2TUHeeXP-Zm6WPeTEJvXWoWbl0epPJ2l6iHJJIyS98C8TxoiakcVSr0vO0CKmn7bJn29Mb80CE=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1ZQLrx3Zaq5ZfEdkIPQ-eC_-_XkyVfaAx"
                                                            alt=""
                                                            style="
                                                              width: 30px;
                                                              margin: 0 5px;
                                                              display: block;
                                                            "
                                                            width="30"
                                                            class="CToWUd"
                                                            data-bit="iit"
                                                        /></a>
                                                        <a
                                                          href="https://www.linkedin.com/company/techfest-sliet"
                                                          style="
                                                            text-decoration: none;
                                                          "
                                                          target="_blank"
                                                          data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/company/techfest-sliet&amp;source=gmail&amp;ust=1678964827667000&amp;usg=AOvVaw2qvJxj8yGAyOsYt1GpNaIs"
                                                          ><img
                                                            src="https://ci5.googleusercontent.com/proxy/SBijrq5VJ9RmBts9AWNRHGguGZLlnijMaxlzEOOiid7qabR-Yc_j1XAh5H2RDBbPsRnLP8GoSB2w7-hwdEEBsOJ7CAufM9gfJ25aCom7rQL_g2UdAk8NcIzltzDbqik=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1tNRvy6lAIBQEXwnStwO_B-y8o-iqnMvy"
                                                            alt=""
                                                            style="
                                                              width: 30px;
                                                              margin: 0 5px;
                                                              display: block;
                                                            "
                                                            width="30"
                                                            class="CToWUd"
                                                            data-bit="iit"
                                                        /></a>
                                                        <a
                                                          href="https://www.youtube.com/@techfestslietofficial"
                                                          style="
                                                            text-decoration: none;
                                                          "
                                                          target="_blank"
                                                          data-saferedirecturl="https://www.google.com/url?q=https://www.youtube.com/@techfestslietofficial&amp;source=gmail&amp;ust=1678964827667000&amp;usg=AOvVaw36-Y6egyhJvSHOywPHAei8"
                                                          ><img
                                                            src="https://ci3.googleusercontent.com/proxy/4pG2ssio-8BF-md8JinUHnKC_q0KGAS0c6uefKM1DOkDnP7xHicgzI0iclpJ6kOabDwCt16SFnRF6l6aZPNbzKT7Eu1R1_sX4kOVMsB0y9H8Uc0bEAAKSz4GYVvbSIo=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1WHggOiMTMcijpHqq9C9aPSSjj8Mrtvlb"
                                                            alt=""
                                                            style="
                                                              width: 30px;
                                                              margin: 0 5px;
                                                              display: block;
                                                            "
                                                            width="30"
                                                            class="CToWUd"
                                                            data-bit="iit"
                                                        /></a>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style="vertical-align: top"
                                              valign="top"
                                            >
                                              <div
                                                style="
                                                  height: 12px;
                                                  line-height: 12px;
                                                  font-size: 12px;
                                                "
                                              >
                                                &nbsp;
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div
                                style="
                                  height: 15px;
                                  line-height: 25px;
                                  font-size: 15px;
                                "
                              >
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </body>`,
      },
      (err) => {
        if (err) {
          return res.status(400).json({
            message: "Error in sending mail!",
            isError: "True",
          });
        }
      }
    );
    const url = `https://admin.techfestsliet.org/home`;
    transporter.sendMail(
      {
        from: process.env.EMAIL_ID,
        to: process.env.ADMIN_MAIL,
        subject: "New Coordinator",
        html: ` <body>
        <tbody>
          <tr>
            <td style="vertical-align: top" valign="top">
              <table align="center" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                  <tr>
                    <td
                      width="600"
                      style="vertical-align: top; border-collapse: separate"
                      valign="top"
                    >
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td style="vertical-align: top" valign="top">
                              <table
                                align="center"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="600"
                                      bgcolor="#000000"
                                      style="
                                        vertical-align: top;
                                        border-radius: 8px 8px 0px 0px;
                                      "
                                      valign="top"
                                    >
                                      <table
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style="vertical-align: top"
                                              valign="top"
                                            >
                                              <div
                                                style="
                                                  height: 24px;
                                                  line-height: 24px;
                                                  font-size: 24px;
                                                "
                                              >
                                                &nbsp;
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style="
                                                vertical-align: top;
                                                padding-left: 24px;
                                                padding-right: 29px;
                                                width: 547px;
                                              "
                                              width="547"
                                              valign="top"
                                            >
                                              <table
                                                align="left"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      width="547"
                                                      style="
                                                        vertical-align: top;
                                                        border-collapse: separate;
                                                      "
                                                      valign="top"
                                                    >
                                                      <table
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                        width="100%"
                                                      >
                                                        <tbody>
                                                          <tr>
                                                            <td
                                                              width="400"
                                                              style="
                                                                vertical-align: top;
                                                              "
                                                              valign="top"
                                                            >
                                                              <table
                                                                width="100%"
                                                                cellspacing="0"
                                                                cellpadding="0"
                                                                border="0"
                                                              >
                                                                <tbody>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        vertical-align: top;
                                                                      "
                                                                      valign="top"
                                                                    >
                                                                      <table
                                                                        align="left"
                                                                        cellspacing="0"
                                                                        cellpadding="0"
                                                                        border="0"
                                                                      >
                                                                        <tbody>
                                                                          <tr>
                                                                            <td
                                                                              style="
                                                                                vertical-align: top;
                                                                              "
                                                                              valign="top"
                                                                            >
                                                                              <a
                                                                                href="https://www.techfestsliet.org/"
                                                                                style="
                                                                                  text-decoration: none;
                                                                                "
                                                                                target="_blank"
                                                                                data-saferedirecturl="https://www.google.com/url?q=https://www.techfestsliet.org/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw0kGv2tuLr58D-lqkgXvqIw"
                                                                                ><img
                                                                                  src="https://i.postimg.cc/CLpMG3PZ/SLIET-s-tech-FEST-23.webp"
                                                                                  width="120"
                                                                                  alt=""
                                                                                  border="0"
                                                                                  style="
                                                                                    max-width: 140px;
                                                                                    height: auto;
                                                                                    margin: auto;
                                                                                    display: block;
                                                                                  "
                                                                                  class="CToWUd"
                                                                                  data-bit="iit"
                                                                              /></a>
                                                                            </td>
                                                                          </tr>
                                                                        </tbody>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </td>
                                                            <td
                                                              style="
                                                                vertical-align: top;
                                                              "
                                                              valign="top"
                                                            >
                                                              <table
                                                                align="center"
                                                                cellspacing="0"
                                                                cellpadding="0"
                                                                border="0"
                                                              >
                                                                <tbody>
                                                                  <tr>
                                                                    <td
                                                                      style="
                                                                        vertical-align: top;
                                                                        border-collapse: separate;
                                                                      "
                                                                      valign="top"
                                                                    >
                                                                      <table
                                                                        cellspacing="0"
                                                                        cellpadding="0"
                                                                        border="0"
                                                                        width="100%"
                                                                      >
                                                                        <tbody>
                                                                          <tr>
                                                                            <td
                                                                              style="
                                                                                vertical-align: top;
                                                                              "
                                                                              valign="top"
                                                                            >
                                                                              <div
                                                                                style="
                                                                                  height: 2px;
                                                                                  line-height: 2px;
                                                                                  font-size: 2px;
                                                                                "
                                                                              >
                                                                                &nbsp;
                                                                              </div>
                                                                              <table
                                                                                cellspacing="0"
                                                                                cellpadding="0"
                                                                                border="0"
                                                                                width="100%"
                                                                              >
                                                                                <tbody>
                                                                                  <tr>
                                                                                    <td
                                                                                      style="
                                                                                        vertical-align: top;
                                                                                        text-align: left;
                                                                                      "
                                                                                      align="left"
                                                                                      valign="top"
                                                                                    >
                                                                                      <div
                                                                                        style="
                                                                                          line-height: normal;
                                                                                        "
                                                                                      >
                                                                                        <span
                                                                                          style="
                                                                                            color: #ffffff;
                                                                                            font-family: Exo,
                                                                                              Helvetica,
                                                                                              Arial,
                                                                                              sans-serif;
                                                                                            font-size: 12px;
                                                                                            text-align: left;
                                                                                            font-weight: 400;
                                                                                          "
                                                                                          ><a
                                                                                            href="https://www.techfestsliet.org/"
                                                                                            style="
                                                                                              text-decoration: none;
                                                                                              color: #fff;
                                                                                            "
                                                                                            target="_blank"
                                                                                            data-saferedirecturl="https://www.google.com/url?q=https://www.techfestsliet.org/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw0kGv2tuLr58D-lqkgXvqIw"
                                                                                            >Visit
                                                                                            Website</a
                                                                                          >
                                                                                        </span>
                                                                                      </div>
                                                                                    </td>
                                                                                  </tr>
                                                                                </tbody>
                                                                              </table>
                                                                            </td>
                                                                            <td
                                                                              style="
                                                                                vertical-align: top;
                                                                                padding-left: -2px;
                                                                              "
                                                                              valign="top"
                                                                            >
                                                                              <table
                                                                                cellspacing="0"
                                                                                cellpadding="0"
                                                                                border="0"
                                                                              >
                                                                                <tbody>
                                                                                  <tr>
                                                                                    <td
                                                                                      bgcolor="transparent"
                                                                                      style="
                                                                                        vertical-align: top;
                                                                                      "
                                                                                      valign="top"
                                                                                    >
                                                                                      <table
                                                                                        cellspacing="0"
                                                                                        cellpadding="0"
                                                                                        border="0"
                                                                                        width="100%"
                                                                                      >
                                                                                        <tbody>
                                                                                          <tr>
                                                                                            <td
                                                                                              style="
                                                                                                vertical-align: top;
                                                                                              "
                                                                                              valign="top"
                                                                                            >
                                                                                              <div
                                                                                                style="
                                                                                                  height: 0px;
                                                                                                  line-height: 5px;
                                                                                                  font-size: 5px;
                                                                                                "
                                                                                              >
                                                                                                &nbsp;
                                                                                              </div>
                                                                                              <table
                                                                                                width="100%"
                                                                                                cellspacing="0"
                                                                                                cellpadding="0"
                                                                                                border="0"
                                                                                              >
                                                                                                <tbody>
                                                                                                  <tr>
                                                                                                    <td
                                                                                                      style="
                                                                                                        vertical-align: top;
                                                                                                      "
                                                                                                      valign="top"
                                                                                                    >
                                                                                                      <table
                                                                                                        align="center"
                                                                                                        cellspacing="0"
                                                                                                        cellpadding="0"
                                                                                                        border="0"
                                                                                                      >
                                                                                                        <tbody>
                                                                                                          <tr>
                                                                                                            <td
                                                                                                              style="
                                                                                                                vertical-align: top;
                                                                                                                padding-left: 5px;
                                                                                                                padding-right: 4px;
                                                                                                              "
                                                                                                              valign="top"
                                                                                                            >
                                                                                                              <img
                                                                                                                src="https://ci4.googleusercontent.com/proxy/vnU54AnhdQvqOrEhiaT9zT0DAMcdXjbimtErmTd-OtKkIcaBPD0AhPoK3qn8rja3m_L7CBKYWLmxFBW2zgFVKk_JJggVnQR5ntVTQOI1cp2Nwx3Cm566HmqRi6sIWak=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1trpXR3aKJSRSVKb2nuuxzjLh8WHImVZW"
                                                                                                                width="9.499998092651367"
                                                                                                                alt=""
                                                                                                                border="0"
                                                                                                                style="
                                                                                                                  width: 100%;
                                                                                                                  height: auto;
                                                                                                                  margin: auto;
                                                                                                                  display: block;
                                                                                                                "
                                                                                                                class="CToWUd"
                                                                                                                data-bit="iit"
                                                                                                              />
                                                                                                            </td>
                                                                                                          </tr>
                                                                                                        </tbody>
                                                                                                      </table>
                                                                                                    </td>
                                                                                                  </tr>
                                                                                                </tbody>
                                                                                              </table>
                                                                                              <div
                                                                                                style="
                                                                                                  height: 5px;
                                                                                                  line-height: 5px;
                                                                                                  font-size: 5px;
                                                                                                "
                                                                                              >
                                                                                                &nbsp;
                                                                                              </div>
                                                                                            </td>
                                                                                          </tr>
                                                                                        </tbody>
                                                                                      </table>
                                                                                    </td>
                                                                                  </tr>
                                                                                </tbody>
                                                                              </table>
                                                                            </td>
                                                                          </tr>
                                                                        </tbody>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style="vertical-align: top"
                                              valign="top"
                                            >
                                              <div
                                                style="
                                                  height: 24px;
                                                  line-height: 24px;
                                                  font-size: 24px;
                                                "
                                              >
                                                &nbsp;
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="vertical-align: top" valign="top">
              <table align="center" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                  <tr>
                    <td
                      width="600"
                      background="https://i.postimg.cc/7ZHfrvyC/Instagram-story-1-11zon.jpg"
                      style="
                      vertical-align: top;
        height: 337px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        border-collapse: separate;
                      "
                      valign="top"
                    >
                      <div>
                        <table
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          width="100%"
                        >
                          <tbody>
                            <tr>
                              <td style="vertical-align: top" valign="top">
                                <div
                                  style="
                                    height: 52px;
                                    line-height: 52px;
                                    font-size: 52px;
                                  "
                                >
                                  &nbsp;
                                </div>
                                <table
                                  width="100%"
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                ></table>
                                <div
                                  style="
                                    height: 58px;
                                    line-height: 58px;
                                    font-size: 58px;
                                  "
                                >
                                  &nbsp;
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="vertical-align: top" valign="top">
              <table align="center" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                  <tr>
                    <td
                      width="600"
                      bgcolor="#000000"
                      style="vertical-align: top"
                      valign="top"
                    >
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        width="100%"
                      ></table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <tr>
                <td style="vertical-align: top" valign="top">
                  <table align="center" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td
                          width="600"
                          bgcolor="#000000"
                          style="vertical-align: top"
                          valign="top"
                        >
                          <table
                            cellspacing="0"
                            cellpadding="0"
                            border="0"
                            width="100%"
                          >
                            <tbody>
                              <tr>
                                <td style="vertical-align: top" valign="top">
                                  <div
                                    style="
                                      height: 12px;
                                      line-height: 12px;
                                      font-size: 12px;
                                    "
                                  >
                                    &nbsp;
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style="
                                    vertical-align: top;
                                    padding-left: 16px;
                                    width: 584px;
                                  "
                                  width="584"
                                  valign="top"
                                >
                                  <table
                                    align="left"
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          width="584"
                                          bgcolor="transparent"
                                          style="vertical-align: top"
                                          valign="top"
                                        >
                                          <table
                                            cellspacing="0"
                                            cellpadding="0"
                                            border="0"
                                            width="100%"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="vertical-align: top"
                                                  valign="top"
                                                >
                                                  <table
                                                    align="center"
                                                    cellspacing="0"
                                                    cellpadding="0"
                                                    border="0"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          style="
                                                            vertical-align: top;
                                                            border-collapse: separate;
                                                          "
                                                          valign="top"
                                                        >
                                                          <table
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            border="0"
                                                            width="100%"
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  style="
                                                                    vertical-align: top;
                                                                  "
                                                                  valign="top"
                                                                >
                                                                  <table
                                                                    cellspacing="0"
                                                                    cellpadding="0"
                                                                    border="0"
                                                                    width="100%"
                                                                  >
                                                                    <tbody>
                                                                      <tr>
                                                                        <td
                                                                          style="
                                                                            vertical-align: top;
                                                                            text-align: center;
                                                                          "
                                                                          align="center"
                                                                          valign="top"
                                                                        >
                                                                        
                                                                          <div
                                                                            style="
                                                                              line-height: normal;
                                                                            "
                                                                          >
                                                                          <br
                                                                          style="
                                                                            font-size: 200px;
                                                                            color: #fff;
                                                                          "
                                                                        /><br />
                                                                            <span
                                                                              style="
                                                                                color: #ffffff;
                                                                                font-family: Exo,
                                                                                  Helvetica,
                                                                                  Arial,
                                                                                  sans-serif;
                                                                                font-size: 33px;
                                                                                text-align: center;
                                                                                font-weight: 400;
                                                                              "
                                                                            >
                                                                              Verification of</span
                                                                            ><span
                                                                              style="
                                                                                color: #ffffff;
                                                                                font-family: Vipnagorgialla,
                                                                                  Helvetica,
                                                                                  Arial,
                                                                                  sans-serif;
                                                                                font-size: 33px;
                                                                                text-align: center;
                                                                                font-weight: 700;
                                                                              "
                                                                            >
                                                                              Coordinator</span
                                                                            >
                                                                          </div>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  style="
                                                                    vertical-align: top;
                                                                  "
                                                                  valign="top"
                                                                >
                                                                  <div
                                                                    style="
                                                                      height: 25px;
                                                                      line-height: 25px;
                                                                      font-size: 25px;
                                                                    "
                                                                  >
                                                                    &nbsp;
                                                                  </div>
                                                                  <table
                                                                    cellspacing="0"
                                                                    cellpadding="0"
                                                                    border="0"
                                                                    width="100%"
                                                                  >
                                                                    <tbody>
                                                                      <tr>
                                                                        <td
                                                                          style="
                                                                            vertical-align: top;
                                                                            text-align: justified;
                                                                          "
                                                                          align="justified"
                                                                          valign="top"
                                                                        >
                                                                          <div
                                                                            style="
                                                                              line-height: normal;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                                color: #ffffff;
                                                                                font-family: Exo,
                                                                                  Helvetica,
                                                                                  Arial,
                                                                                  sans-serif;
                                                                                font-size: 18px;
                                                                                text-align: justified;
                                                                              "
                                                                              ><br><br />
                                                                              Hello! Super Admin
                                                                              <br><br />
                                                                            Please click on the button below to verify ${coordinator.coordinatorName}
                                                                            <a href=${url} style="text-decoration: none;"><button
                                                                              style="
                                                                                      border-radius: 15px;
          background-color: #045b04;
          width: 112px;
          margin-left: 17px;
          margin-top: 10px;
          height: 28px;
          font-size: 17px;
          color: white;
                                                                              "
                                                                            >
                                                                              Verify
                                                                            </button></a>
                                                                            <br
                                                                          />
                                                                        <p>If the button above does not work, you can also copy and paste the following link into your web browser:</p>
                                                                        <p>${url}</p>
                                                                    <p>Please note that you will not be able to access certain features of techFEST'23 until you have verified your email address. If you have any questions or concerns, please contact us at <a href="mailto:web.techfest@sliet.ac.in">web.techfest@sliet.ac.in</a></p>
                                                                    </span>
                                                                          </div>
                                                                          <div
                                                                            style="
                                                                              line-height: normal;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                                color: #ffffff;
                                                                                font-family: Exo,
                                                                                  Helvetica,
                                                                                  Arial,
                                                                                  sans-serif;
                                                                                font-size: 18px;
                                                                                text-align: justified;
                                                                              "
                                                                              ><br
                                                                            /></span>
                                                                          </div>
                                                                          <div
                                                                            style="
                                                                              line-height: normal;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                                color: #ffffff;
                                                                                font-family: Exo,
                                                                                  Helvetica,
                                                                                  Arial,
                                                                                  sans-serif;
                                                                                font-size: 18px;
                                                                                text-align: justified;
                                                                              "
                                                                              >Thank you,</span
                                                                            >
                                                                          </div>
                                                                         
                                                                          <div
                                                                            style="
                                                                              line-height: normal;
                                                                            "
                                                                          >
                                                                            <font
                                                                              color="#ffffff"
                                                                              face="Exo, Helvetica, Arial, sans-serif"
                                                                              ><span
                                                                                style="
                                                                                  font-size: 18px;
                                                                                "
                                                                                >Team
                                                                                techFEST'23</span
                                                                              ></font
                                                                            >
                                                                          </div>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                  <div
                                                                    style="
                                                                      height: 25px;
                                                                      line-height: 25px;
                                                                      font-size: 25px;
                                                                    "
                                                                  >
                                                                    &nbsp;
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  style="vertical-align: top"
                                                  valign="top"
                                                >
                                                  <div
                                                    style="
                                                      height: 8px;
                                                      line-height: 8px;
                                                      font-size: 8px;
                                                    "
                                                  >
                                                    &nbsp;
                                                  </div>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="vertical-align: top" valign="top">
                                  <div
                                    style="
                                      height: 12px;
                                      line-height: 12px;
                                      font-size: 12px;
                                    "
                                  >
                                    &nbsp;
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
          </tr>
          <tr>
            <td style="vertical-align: top" valign="top">
              <table align="center" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                  <tr>
                    <td
                      width="600"
                      bgcolor="#062b06"
                      style="vertical-align: top"
                      valign="top"
                    >
                      <table
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td style="vertical-align: top" valign="top">
                              <div
                                style="
                                  height: 15px;
                                  line-height: 15px;
                                  font-size: 15px;
                                "
                              >
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                vertical-align: top;
                                padding-left: 20px;
                                width: 269px;
                              "
                              width="269"
                              valign="top"
                            >
                              <table
                                align="left"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="269"
                                      style="
                                        vertical-align: top;
                                        border-collapse: separate;
                                      "
                                      valign="top"
                                    >
                                      <table
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style="vertical-align: top"
                                              valign="top"
                                            >
                                              <table
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        vertical-align: top;
                                                        text-align: center;
                                                      "
                                                      align="center"
                                                      valign="top"
                                                    ></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                            <td
                                              style="vertical-align: top"
                                              valign="top"
                                            >
                                              <table
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                width="100%"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        vertical-align: top;
                                                        padding-left: 27px;
                                                        text-align: center;
                                                      "
                                                      align="center"
                                                      valign="top"
                                                    ></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="vertical-align: top" valign="top">
                              <div
                                style="
                                  height: 12px;
                                  line-height: 12px;
                                  font-size: 12px;
                                "
                              >
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                vertical-align: top;
                                padding-left: 20px;
                                width: 270.97552490234375px;
                              "
                              width="270.97552490234375"
                              valign="top"
                            >
                              <table
                                align="left"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="270.97552490234375"
                                      style="
                                        vertical-align: top;
                                        border-collapse: separate;
                                      "
                                      valign="top"
                                    >
                                      <table
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style="vertical-align: top"
                                              valign="top"
                                            >
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="vertical-align: top"
                                                      valign="top"
                                                    >
                                                      <div
                                                        style="line-height: 24px"
                                                      >
                                                        <span
                                                          style="
                                                            color: #ffffff;
                                                            line-height: 24px;
                                                            font-family: Vipnagorgialla,
                                                              Helvetica, Arial,
                                                              sans-serif;
                                                            font-size: 15px;
                                                            text-align: center;
                                                            font-weight: 700;
                                                            font-size: 24px;
                                                            margin-right: 150px;
                                                          "
                                                          ><a
                                                            href="https://www.techfestsliet.org/"
                                                            style="
                                                              text-decoration: none;
                                                              color: #fff;
                                                            "
                                                            target="_blank"
                                                            data-saferedirecturl="https://www.google.com/url?q=https://www.techfestsliet.org/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw0kGv2tuLr58D-lqkgXvqIw"
                                                            >techFEST’23</a
                                                          ></span
                                                        >
                                                      </div>
                                                      <div
                                                        style="line-height: 25px"
                                                      >
                                                        <span
                                                          style="
                                                            color: #ffffff;
                                                            line-height: 25px;
                                                            font-family: Exo,
                                                              Helvetica, Arial,
                                                              sans-serif;
                                                            font-size: 15px;
                                                            text-align: center;
                                                            font-weight: 300;
                                                          "
                                                          >mail us at </span
                                                        ><span
                                                          style="
                                                            color: #ffffff;
                                                            line-height: 25px;
                                                            font-family: Exo,
                                                              Helvetica, Arial,
                                                              sans-serif;
                                                            font-size: 15px;
                                                            text-align: center;
                                                            font-weight: 700;
                                                          "
                                                          ><a
                                                            href="mailto:web.techfest@sliet.ac.in"
                                                            style="
                                                              text-decoration: none;
                                                              color: #fff;
                                                            "
                                                            target="_blank"
                                                            >web.techfest@sliet.ac.in</a
                                                          ></span
                                                        >
                                                      </div>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
    
                                            <td
                                              style="vertical-align: top"
                                              valign="top"
                                            >
                                              <table
                                                width="100%"
                                                cellspacing="0"
                                                cellpadding="0"
                                                border="0"
                                                style="margin-left: 100px"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="vertical-align: top"
                                                      valign="top"
                                                    >
                                                      <div style="display: flex">
                                                        <a
                                                          href="https://www.facebook.com/techfestsliet/"
                                                          style="
                                                            text-decoration: none;
                                                          "
                                                          target="_blank"
                                                          data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/techfestsliet/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw1DaBXxlGzbhFl4-jx3qlo8"
                                                          ><img
                                                            src="https://ci6.googleusercontent.com/proxy/TvtbbuARa2-B2C0Dj4Um29m-FYsIJpLc5tOuRveSE7r2DVOU09IRedK9Nja1jtTVsHD_rIpsZkjxxsQqMs1lu3yJbgF7SCdXCFVF1NMm6OG6kQ2ItfkfTKxobslExSQ=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=10HTM4ooEy_IlCBKxUR6c57qhVXpeOrC_"
                                                            alt=""
                                                            style="
                                                              width: 30px;
                                                              margin: 0 5px;
                                                              display: block;
                                                            "
                                                            width="30"
                                                            class="CToWUd"
                                                            data-bit="iit"
                                                        /></a>
                                                        <a
                                                          href="https://instagram.com/techfestsliet_"
                                                          style="
                                                            text-decoration: none;
                                                          "
                                                          target="_blank"
                                                          data-saferedirecturl="https://www.google.com/url?q=https://instagram.com/techfestsliet_&amp;source=gmail&amp;ust=1678964827667000&amp;usg=AOvVaw10k7KdbUN-kABA4eo-k9OX"
                                                          ><img
                                                            src="https://ci3.googleusercontent.com/proxy/hqSL0d0hHn2JJxzd9nHUVlHNq2czMBdaQY8qDz-Y_jsEIAqbF3bvl2TUHeeXP-Zm6WPeTEJvXWoWbl0epPJ2l6iHJJIyS98C8TxoiakcVSr0vO0CKmn7bJn29Mb80CE=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1ZQLrx3Zaq5ZfEdkIPQ-eC_-_XkyVfaAx"
                                                            alt=""
                                                            style="
                                                              width: 30px;
                                                              margin: 0 5px;
                                                              display: block;
                                                            "
                                                            width="30"
                                                            class="CToWUd"
                                                            data-bit="iit"
                                                        /></a>
                                                        <a
                                                          href="https://www.linkedin.com/company/techfest-sliet"
                                                          style="
                                                            text-decoration: none;
                                                          "
                                                          target="_blank"
                                                          data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/company/techfest-sliet&amp;source=gmail&amp;ust=1678964827667000&amp;usg=AOvVaw2qvJxj8yGAyOsYt1GpNaIs"
                                                          ><img
                                                            src="https://ci5.googleusercontent.com/proxy/SBijrq5VJ9RmBts9AWNRHGguGZLlnijMaxlzEOOiid7qabR-Yc_j1XAh5H2RDBbPsRnLP8GoSB2w7-hwdEEBsOJ7CAufM9gfJ25aCom7rQL_g2UdAk8NcIzltzDbqik=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1tNRvy6lAIBQEXwnStwO_B-y8o-iqnMvy"
                                                            alt=""
                                                            style="
                                                              width: 30px;
                                                              margin: 0 5px;
                                                              display: block;
                                                            "
                                                            width="30"
                                                            class="CToWUd"
                                                            data-bit="iit"
                                                        /></a>
                                                        <a
                                                          href="https://www.youtube.com/@techfestslietofficial"
                                                          style="
                                                            text-decoration: none;
                                                          "
                                                          target="_blank"
                                                          data-saferedirecturl="https://www.google.com/url?q=https://www.youtube.com/@techfestslietofficial&amp;source=gmail&amp;ust=1678964827667000&amp;usg=AOvVaw36-Y6egyhJvSHOywPHAei8"
                                                          ><img
                                                            src="https://ci3.googleusercontent.com/proxy/4pG2ssio-8BF-md8JinUHnKC_q0KGAS0c6uefKM1DOkDnP7xHicgzI0iclpJ6kOabDwCt16SFnRF6l6aZPNbzKT7Eu1R1_sX4kOVMsB0y9H8Uc0bEAAKSz4GYVvbSIo=s0-d-e1-ft#https://drive.google.com/uc?export=view&amp;id=1WHggOiMTMcijpHqq9C9aPSSjj8Mrtvlb"
                                                            alt=""
                                                            style="
                                                              width: 30px;
                                                              margin: 0 5px;
                                                              display: block;
                                                            "
                                                            width="30"
                                                            class="CToWUd"
                                                            data-bit="iit"
                                                        /></a>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style="vertical-align: top"
                                              valign="top"
                                            >
                                              <div
                                                style="
                                                  height: 12px;
                                                  line-height: 12px;
                                                  font-size: 12px;
                                                "
                                              >
                                                &nbsp;
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div
                                style="
                                  height: 15px;
                                  line-height: 25px;
                                  font-size: 15px;
                                "
                              >
                                &nbsp;
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </body>`,
      },
      (err) => {
        if (err) {
          return res.status(400).json({
            message: "Error in sending mail!",
            isError: "True",
          });
        }
      }
    );
  } catch {
    return res.status(400).send({
      message: "Error in signup",
      isError: "True",
    });
  }
  coordinator.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: err,
        isError: "True",
      });
    } else {
      return res.status(200).send({
        message: "Coordinator saved successfully!",
        isError: "False",
      });
    }
  });
};

const Signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).json({
      message: errors.array(),
      isError: true,
    });
  }

  // if( req.body.email === process.env.ADMIN_MAIL && req.body.password === process.env.ADMIN_PWD) {
  //   return res.status(208).send({
  //     title: "Boomb!",
  //     message: "You are the admin!",
  //     isError: false,
  //   })
  // }

  const { email, password } = req.body;

  Coordinator.findOne({ coordinatorEmail: email }, async (err, coordinator) => {
    if (err || !coordinator) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "This email is not registered. Redirecting to Signup page!",
      });
    }

    if (!coordinator.isVerified) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "This email is not verified. Please verify your email!",
      });
    }

    if (!coordinator.coordinatorStatus) {
      return res.status(208).send({
        isError: "true",
        title: "Error",
        message: "Your account has yet not been verified by Super-Admin!",
      });
    }

    try {
      if (await bcrypt.compare(password, coordinator.coordinatorPassword)) {
        const token = createToken(coordinator._id, coordinator.coordinatorRole);
        return res.status(200).json({
          token: token,
          coordinatorId: coordinator._id,
          coordinatorRole: coordinator.coordinatorRole,
          coordinatorDomain: coordinator.coordinatorDomain,
        });
      } else {
        return res.status(208).json({
          isError: true,
          title: "Error",
          message: "The credentials are wrong!",
        });
      }
    } catch (error) {
      return res.status(500);
    }
  });
};

const verify = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(200).json({
      message: errors.array(),
      isError: true,
    });
  }

  Coordinator.findOne(
    { coordinatorEmail: req.body.email },
    async (err, coordinator) => {
      if (err || !coordinator) {
        return res.status(208).send({
          isError: true,
          title: "Error",
          message: "This email is not registered. Redirecting to Signup page!",
        });
      }
      try {
        const token = crypto.randomBytes(32).toString("hex");

        await authverifyToken({
          token: token,
          email: req.body.email,
        }).save();
        const uri = `https://www.techfestsliet.org/api/coor/verifyUser/${token}`;

        transporter.sendMail(
          {
            from: process.env.EMAIL_ID,
            to: req.body.email,
            subject: "VERIFY YOUR EMAIL ✔",
            html: `<div style=
          padding: 1rem;
          margin: 0;
          color: white;
          height: auto;
        '>
        <div style='width: 70%;
        margin: 0 auto;'>
          <h2> Hi! ${coordinator.coordinatorName}, </h2>
          <p>Thank you, for joining with us! You recently tried to sign in to techFEST using ${coordinator.coordinatorEmail}. Click the button below to verify your email Id.</p>
         <button style='padding: 1em;
         border-radius: 0.5em;
         width:auto;
         margin: 0 auto;
         background-color: white;
         cursor: pointer;'><a href=${uri} style='text-decoration: none;
         color: black;
         font-size: 1rem;'>Verify Mail</a></button>
          <p>This verification link is only valid for the next 30 minutes.</p>
          For any query, write us at web.techfestsliet.org. Thank you for joining with techFEST!</p>
        </div>
        </div>`,
          },
          (err) => {
            if (err) {
              return res.status(208).send({
                title: "Error",
                message: "Email not sent!",
              });
            } else {
              return res.status(200).send({
                title: "Success",
                message: "Verification email sent successfully!",
              });
            }
          }
        );
      } catch (err) {
        return res.status(400).json({
          title: "Error",
          message: "Error in Verification",
        });
      }
    }
  );
};

const verifyUser = async (req, res) => {
  const token = await req.params.token;
  if (token) {
    const verify = await authverifyToken.findOne({ token: token });
    if (verify) {
      let coordinator = await Coordinator.findOne({
        coordinatorEmail: verify.email,
      });
      coordinator.isVerified = true;
      await coordinator.save();
      await authverifyToken.findOneAndDelete({ token: token });
      await res.render("response", {
        title: "Success",
        message: "Successfully verified!",
      });
    } else {
      return res.status(404).json({
        isError: true,
        message: "The token is expired!",
      });
    }
  } else {
    return res.staus(404).json({
      isError: true,
      message: "Cannot get token",
    });
  }
};

const getCoordinatorByObjId = async(req, res) => {
  console.log(req.body);
  Coordinator.findOne({_id: req.body._id})
  .exec((err, coordinator) => {
    console.log(coordinator)
    if (err || !coordinator) {
      return res.status(208).json({ isError: true, message: "Not auth" });
    }
    coordinator.password = null;
    return res
      .status(200)
      .send({ isError: false, isSuccess: true, coordinator: coordinator });
  });
}

export { Signup, Signin, verify, verifyUser, getCoordinatorByObjId };
