import { validationResult } from "express-validator";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../utils/mail.js";
import crypto from "crypto";
import authverifyToken from "../models/verifyToken.js";
import shortid from "shortid";
import verifyRecaptcha from "../utils/recaptcha.js";

const maxAge = 7 * 24 * 60 * 60;
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

const signUp = async(req, res) => {
  // const errors = validationResult(req);
  // verifyRecaptcha(req.body.reCaptchaToken, req.headers['x-forwarded-for'] || req.socket.remoteAddress, async () => {
  // if (!errors.isEmpty()) {
  //   return res.status(201).send({
  //     title: "Error",
  //     message: errors.array(),
  //     isError: true,
  //   });
  // }

  if (await User.findOne({ email: req.body.email })) {
    return res.status(208).send({
      title: "Error",
      message: "The email is already registered. Redirecting to signin page!",
      isError: true,
    });
  }

  if (await User.findOne({ phone: req.body.phone })) {
    return res.status(208).send({
      title: "Error",
      message: "The phone number is already registered",
      isError: true,
    });
  }
  const refferalCode = req.body.referral;
  const eArr = req.body.email.split("@");
  const domain = eArr[1];
  const userId = `#TF23-${crypto.randomBytes(3).toString("hex")}`;
  const password = req.body.password;
  const referralCode = `#TF23-` + crypto.randomBytes(3).toString("hex");

  let payLoad;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    if (domain === "sliet.ac.in") {
      payLoad = {
        ...{
          email: req.body.email,
          name: req.body.name,
          password: encryptedPassword,
          collegeName: "Sant Longowal Institute of Engineering and Technology",
          userId: userId,
          regNo: eArr[0],
          institution: "sliet",
          referralCode: referralCode,
          role: 2,
          phone: req.body.phone,
          dob: req.body.dob,
        },
      };
    } else {
      payLoad = {
        email: req.body.email,
        name: req.body.name,
        userId: userId,
        collegeName: req.body.collegeName,
        password: encryptedPassword,
        institution: "other",
        referralCode: referralCode,
        role: 1,
        phone: req.body.phone,
        branch: req.body.branch,
        dob: req.body.dob,
      };
    }
  } catch (error) {
    return res
      .status(400)
      .send({ isError: true, title: "Error", message: "Something went wrong" });
  }

  // if (refferalCode) {
  //   console.log("true" + refferalCode)
  //   const isValidReferralCode = await User.findOne({
  //     referralCode: refferalCode,
  //   });
  //   console.log(isValidReferralCode)
  //   if (isValidReferralCode) {
  //     try {
  //       console.log("updating...")
  //       User.findOneAndUpdate(
  //         { referralCode: refferalCode },
  //         { $inc: { referrals: 1 } },
  //         (err, user) => {
  //           console.log(user);
  //           if (err) {
  //             return res.status(208).send({
  //               isError: true,
  //               title: "Error",
  //               message: "The referral code is invalid",
  //             });
  //           }
  //         }
  //       );
  //     } catch (error) {
  //       return res.status(208).send({
  //         title: "Error",
  //         message: "The referral code is invalid",
  //         isError: true,
  //       });
  //     }
  //   } else {
  //     return res.status(208).send({
  //       title: "Error",
  //       message: "Invalid referral code!",
  //     });
  //   }
  // }

  const user = new User(payLoad);

  try {
    const token = crypto.randomBytes(32).toString("hex");
    await authverifyToken({
      token: token,
      email: req.body.email,
    }).save();

    const uri = `http://localhost:4000/auth/verifyUser/${token}`;

    transporter.sendMail(
      {
        from: process.env.EMAIL_ID,
        to: req.body.email,
        subject: "VERIFY YOUR EMAIL ✔",
        html: `
          <body>
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
                                                                                    href="https://www.techfestsliet.com/"
                                                                                    style="
                                                                                      text-decoration: none;
                                                                                    "
                                                                                    target="_blank"
                                                                                    data-saferedirecturl="https://www.google.com/url?q=https://www.techfestsliet.com/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw0kGv2tuLr58D-lqkgXvqIw"
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
                                                                                  Hello! ${user.name}
                                                                                  <br><br />
                                                                                  Thank you for registering for techFEST'23. To complete your registration, we need to verify your email address. Please click on the button below. Verify your email:
          <a href=${uri} style="text-decoration: none;color:black;font-size: 20px;"><button
            style="
                    border-radius: 15px;
        background-color: #045b04;
        width: 112px;
        cursor: pointer;
        margin-left: 17px;
        margin-top: 10px;
        height: 28px;
        font-size: 17px;
        color: white;
            "
          >
            Verify Email!
          </button></a>                                                                   
                                                                                <br
                                                                              />
                                                                            <p>If the button above does not work, you can also copy and paste the following link into your web browser:${uri}</p>
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
                                                                href="https://www.techfestsliet.com/"
                                                                style="
                                                                  text-decoration: none;
                                                                  color: #fff;
                                                                "
                                                                target="_blank"
                                                                data-saferedirecturl="https://www.google.com/url?q=https://www.techfestsliet.com/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw0kGv2tuLr58D-lqkgXvqIw"
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
          </body>
        `,
      },
      (err) => {
        if (err) {
          return res.status(400).json({
            title: "Error",
            message: "Email not sent!",
          });
        }
      }
    );
  } catch (err) {
    return res.status(400).json({
      title: "Error",
      message: "Error in signUp",
    });
  }

  user.save((err) => {
    if (err) {
      return res.status(400).json({
        isError: true,
        title: "Error",
        message: err,
      });
    } else {
      return res.status(200).send({
        title: "Success",
        message: "Redirecting to gmail in 3s...",
      });
    }
  })
};

const signIn = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).json({
      message: errors.array(),
      isError: true,
    });
  }
  const { email, password } = req.body;
  User.findOne({ email }, async (err, user) => {
    if (err || !user) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "This email is not registered. Redirecting to Signup page!",
      });
    }

    if (!user.isVerified) {
      return res.status(206).send({
        isError: true,
        title: "Error",
        message: "Not verified! Please verify your mail",
      });
    }
    try {
      const condition = await bcrypt.compare(password, user.password);
      if (condition) {
        const token = createToken(user._id, user.role);
        return res.status(200).json({
          token: token,
          userId: user.userId,
          userRole: user.role,
        });
      } else {
        return res.status(208).send({
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

const verify = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(200).json({
      message: errors.array(),
      isError: true,
    });
  }

  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err || !user) {
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
      const uri = `http://localhost:4000/auth/verifyUser/${token}`;

      transporter.sendMail(
        {
          from: process.env.EMAIL_ID,
          to: req.body.email,
          subject: "VERIFY YOUR EMAIL ✔",
          html: `  <body>
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
                                                                                  href="https://www.techfestsliet.com/"
                                                                                  style="
                                                                                    text-decoration: none;
                                                                                  "
                                                                                  target="_blank"
                                                                                  data-saferedirecturl="https://www.google.com/url?q=https://www.techfestsliet.com/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw0kGv2tuLr58D-lqkgXvqIw"
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
                                                                                              href="https://www.techfestsliet.com/"
                                                                                              style="
                                                                                                text-decoration: none;
                                                                                                color: #fff;
                                                                                              "
                                                                                              target="_blank"
                                                                                              data-saferedirecturl="https://www.google.com/url?q=https://www.techfestsliet.com/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw0kGv2tuLr58D-lqkgXvqIw"
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
                                                                                Hello! ${user.name}
                                                                                <br><br />
                                                                                Thank you for registering for techFEST'23. To complete your registration, we need to verify your email address. Please click on the button below. Verify your email:
        <a href=${uri} style="text-decoration: none;color:black;font-size: 20px;"><button
          style="
                  border-radius: 15px;
      background-color: #045b04;
      width: 112px;
      cursor: pointer;
      margin-left: 17px;
      margin-top: 10px;
      height: 28px;
      font-size: 17px;
      color: white;
          "
        >
          Verify Email!
        </button></a>                                                                   
                                                                              <br
                                                                            />
                                                                          <p>If the button above does not work, you can also copy and paste the following link into your web browser:${uri}</p>
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
                                                              href="https://www.techfestsliet.com/"
                                                              style="
                                                                text-decoration: none;
                                                                color: #fff;
                                                              "
                                                              target="_blank"
                                                              data-saferedirecturl="https://www.google.com/url?q=https://www.techfestsliet.com/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw0kGv2tuLr58D-lqkgXvqIw"
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
  });
};

const verifyUser = async (req, res) => {
  const token = await req.params.token;
  if (token) {
    const verify = await authverifyToken.findOne({ token: token });
    if (verify) {
      let user = await User.findOne({ email: verify.email });
      user.isVerified = true;
      await user.save();
      await authverifyToken.findOneAndDelete({ token: token });
      await res.render("response", {
        title: "Success",
        message: "Successfully verified!",
      });
      // return res.status(200).json({
      //   isError: false,
      //   message: "The user is verified successfully!",
      // });
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

const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({
      title: "Error",
      message: errors.array(),
      isError: true,
    });
  }
  const { email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    User.findOneAndUpdate(
      { email: email },
      { $set: { password: encryptedPassword } },
      (err, user) => {
        if (err && !user) {
          console.log(err);
          return res.status(404).send({ message: "Cannot update password" });
        }
        return res.status(200).send({ message: "Password is changed" });
      }
    );
  } catch (err) {
    return res.status(201).json({ message: err });
  }
};

const forgotPassword = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(208).json({
      message: errors.array(),
      isError: true,
    });
  }

  const { email } = req.body;

  try {
    User.findOne({ email: email }, async (err, user) => {
      if (err || !user) {
        // res.render("response", { title: "Error!", message: "User not found" });
        return res
          .status(208)
          .json(JSON.stringify({ title: "Error", message: "User not found" }));
      } else {
        const secret = process.env.SECRET + user.password;
        const payLoad = {
          email: user.email,
          id: user._id,
        };
        let token = jwt.sign(payLoad, secret, { expiresIn: "2d" });
        const uri = `http://localhost:4000/auth/reset-password/${user._id}/${token.replace(/\./g, "-")}`;
        transporter.sendMail(
          {
            from: "techfest@sliet.ac.in",
            to: req.body.email,
            subject: "RESET PASSWORD LINK",
            html: `  <body>
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
                                                                                    href="https://www.techfestsliet.com/"
                                                                                    style="
                                                                                      text-decoration: none;
                                                                                    "
                                                                                    target="_blank"
                                                                                    data-saferedirecturl="https://www.google.com/url?q=https://www.techfestsliet.com/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw0kGv2tuLr58D-lqkgXvqIw"
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
                                                                                                href="https://www.techfestsliet.com/"
                                                                                                style="
                                                                                                  text-decoration: none;
                                                                                                  color: #fff;
                                                                                                "
                                                                                                target="_blank"
                                                                                                data-saferedirecturl="https://www.google.com/url?q=https://www.techfestsliet.com/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw0kGv2tuLr58D-lqkgXvqIw"
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
                                                                                 Forgot Password?
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
                                                                                  Hello! ${user.name}
                                                                                  <br><br />
                                                                                  Thank you for registering for techFEST'23. To reset your password, please click on the button below. Reset your password:
          <a href=${uri} style="text-decoration: none;color:black;font-size: 20px;"><button
            style="
                    border-radius: 15px;
        background-color: #045b04;
        width: 112px;
        cursor: pointer;
        margin-left: 17px;
        margin-top: 10px;
        height: 28px;
        font-size: 17px;
        color: white;
            "
          >
            Reset 
          </button></a>                                                                   
                                                                                <br
                                                                              />
                                                                            <p>If the button above does not work, you can also copy and paste the following link into your web browser:${uri}</p>
                                                                        <p> If you have any questions or concerns, please contact us at <a href="mailto:web.techfest@sliet.ac.in">web.techfest@sliet.ac.in</a></p>
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
                                                                href="https://www.techfestsliet.com/"
                                                                style="
                                                                  text-decoration: none;
                                                                  color: #fff;
                                                                "
                                                                target="_blank"
                                                                data-saferedirecturl="https://www.google.com/url?q=https://www.techfestsliet.com/&amp;source=gmail&amp;ust=1678964827666000&amp;usg=AOvVaw0kGv2tuLr58D-lqkgXvqIw"
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
              return res.status(208).send({
                title: "Error",
                message: "Email not sent!",
              });
            } else {
              // res.render('response', {title: "Email Sent", message: "Check your inbox to get the reset link!"})
              return res.status(200).send({
                title: "Success",
                message: "Reset password link has been sent successfully.",
              });
            }
          }
        );
      }
    });
  } catch (error) {
    // res.render("response", { title: "Error!", message: error });
    return res.status(208).send({
      title: "Error",
      message: "Error occured!" + " " + error,
    });
  }
};

const resetPassword = async (req, res) => {
  let { id, token } = req.params;
  token = token.replace(/\-/g, '.');
  User.findOne({ _id: id }, (err, user) => {
    if (err || !user) {
      return res.status(208).json({
        title: "Error",
        message: "Token has expired or not found! Please try again",
      });
    } else {
      const secret = process.env.SECRET + user.password;
      try {
        const payLoad = jwt.verify(token, secret);
        if(payLoad) {
          return res.render("resetPassword", { email: user.email });
        } else {
          return res.status(208).json({
            title: "Error",
            message: "Token has expired or not found! Please try again",
          });
        }
      } catch (error) {
        console.log(error);
        res.render("response", {
          title: "Expired!",
          message:
            "Token has expired at " +
            error.expiredAt,
        });
      }
    }
  });
};

const updatePassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(200).json({
      message: errors.array(),
      isError: true,
    });
  }

  const { id, token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  User.findOne({ _id: id }, async (err, user) => {
    if (err || !user) {
      res.render("response", { title: "Error!", message: "Invalid request" });
      // return res
      //   .status(208)
      //   .json({ title: "Error", message: "Invalid Request!" });
    } else {
      const secret = process.env.SECRET + user.password;
      try {
        const payLoad = jwt.verify(token, secret);
        bcrypt.hash(newPassword, 10, (err, encryptedPassword) => {
          console.log(newPassword);
          if (err) throw err;
          else {
            console.log(encryptedPassword);
            User.findOneAndUpdate(
              { email: payLoad.email },
              { $set: { password: encryptedPassword } },
              (err, user) => {
                if (err || !user) {
                  res.render("response", {
                    title: "Error!",
                    message: "Cannot update Password!",
                  });
                } else {
                  return res.status(200).json({
                    title: "Success",
                    message: "Password is changed",
                  });
                }
              }
            );
          }
        });
      } catch (error) {
        res.send(error.message);
      }
    }
  });
};

export {
  signUp,
  signIn,
  changePassword,
  verify,
  verifyUser,
  forgotPassword,
  resetPassword,
  updatePassword,
};
