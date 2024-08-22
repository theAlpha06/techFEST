import multiparty from "multiparty";
import Team from "../models/teams.js";
import User from "../models/user.js";
import Event from "../models/events.js";
import transporter from "../utils/mail.js";
import { getIdByEmail } from "./user.js";

import { validate } from "../utils/parse.js";

function isEmpty(req) {
  return (
    req === {} || req === undefined || req === "" || req == [] || req == null
  );
}

const requiredFields = ["teamName", "members"];
const requiredMembersFields = [
  "memberId",
  "email",
];


export async function createTeam(req, res) {
  const leaderId = req.userId;
  const { teamName, members, eventType } = req.body;
  const leader = await User.findById(leaderId);
  if( leader.role == 1 && !leader.payment.paymentStatus) {
    return res.status(203).send({
      isError: true,
      title: "Payment not done",
      message: "Please pay the registration fee to create a team"
    });
  }
  const t = await Team.findOne({ teamName });
  if (t) {
    return res.status(208).send({
      isError: true,
      title: "Team name already taken",
    });
  }
  const membersData = [];

  for (const member of members) {
    const m = await User.findOne({ email: member.email });
    if (member.email.length != 0 && member.email != leader.email) {
      membersData.push({
        memberId: m._id,
        email: m.email,
        phone: m.phone,
      });
    }
  }


  const team = new Team({
    teamName,
    leaderId,
    members: membersData,
    eventType,
    leaderName: leader.name,
  });

  team.save().then((t) => {
    User.findByIdAndUpdate(leaderId, {
      teamMembers: [...leader.teamMembers, t._id],
    }).then((u) => {
      membersData.map((member) => {
        const uri = `https://www.techfestsliet.org/api/team/verifyteaminvitation/${member.memberId}/${t._id}`;
        transporter.sendMail({
          from: process.env.EMAIL_ID,
          to: member.email,
          subject: "Team Invitation Link",
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
                                                                            Invitation
                                                                            From </span
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
                                                                            techFEST’23</span
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
                                                                              font-size: 18px;
                                                                              text-align: justified;
                                                                            "
                                                                            >Hello!
                                                                            <br
                                                                              style="
                                                                                font-size: 200px;
                                                                                color: #fff;
                                                                              " /><p style="text-decoration: none;color: #fff;">${member.email}</p><br />
                                                                            <br
                                                                              style="
                                                                                font-size: 200px;
                                                                                color: #fff;
                                                                              " />Team
                                                                            Name :
                                                                            ${teamName}<br />
                                                                            <br
                                                                              style="
                                                                                font-size: 200px;
                                                                                color: #fff;
                                                                              " />Team
                                                                            Leader :
                                                                            ${leader.name}<br />
                                                                            <br
                                                                              style="
                                                                                font-size: 200px;
                                                                                color: #fff;
                                                                              " /><br
                                                                          /></span>
                                                                          <div
                                                                            style="
                                                                              margin-left: 100px;
                                                                            "
                                                                          >
                                                                          <a href=${uri} style="text-decoration: none;color: #fff;"><button
                                                                            style="
                                                                              border-radius: 15px;
                                                                              background-color: #062b06;
                                                                              width: 200px;
                                                                              height: 40px;
                                                                              font-size: 22px;
                                                                              color: white;
                                                                            "
                                                                          >
                                                                            Accept
                                                                            Invitation
                                                                          </button></a>
                                                                
                                                                          </div>
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
        });
      });
    });
  });

  return res.status(200).send({
    isError: false,
    title: "Team Created",
  });
}

export async function verifyteaminvitation(req, res) {
  const { memberid, teamid } = req.params;
  const team = await Team.findById(teamid);
  const member = await User.findById(memberid);

  if (!team || !member) {
    return res.status(208).send({
      isError: true,
      title: "Invalid link",
      message: "Invalid link",
    });
  }

  const userTeams = member.teamMembers.map((teamMember) => {
    return teamMember.toString();
  });

  if (userTeams.indexOf(teamid) != -1) {
    return res.status(208).send({
      isError: true,
      title: "Expired Link",
      message: "Expired Link",
    });
  }

  const teamMembers = [];
  for (const m of team.members) {
    if (m.memberId.toString() == memberid) {
      teamMembers.push({
        memberId: m.memberId,
        email: m.email,
        phone: m.phone,
        status: true,
      });
    } else {
      teamMembers.push(m);
    }
  }
  User.findByIdAndUpdate(memberid, {
    teamMembers: [...member.teamMembers, teamid],
  }).then((u) => {
    Team.findByIdAndUpdate(teamid, { members: teamMembers }).then((t) => {
      res.render("response", {
        title: "Verified Successfully!",
        message: "Your are successfully added to the team.",
      });
    });
  });
}

export function getTeam(req, res) {
  // Sanitizing the request
  const form = new multiparty.Form();
  form.parse(req, (err, fields) => {
    const errors = validate(fields, ["teamId"], []);
    if (errors != null) {
      return res.status(500).json(errors);
    }
    Team.findById(fields.teamId[0]).then((d) => {
      if (!d) {
        // console.log(err)
        return res.status(404).json({
          error: "Not Found!",
        });
      }

      res.status(200).json({
        message: "Team Successfully",
        d,
      });
    });
  });
}

export async function deleteTeam(req, res) {
  const teamId = req.body.id;
  const team = await Team.findById(teamId);
//pull team data from events
  for (const event of team.events) {
    await Event.findByIdAndUpdate(event, {
      $pull: { teams: team._id },
    }).exec()
    //pull event data from leader
    await User.findByIdAndUpdate(team.leaderId, {
      $pull: {events: event}
    }).exec();
    //pull event data from members
    for(const member of team.members) {
      await User.findByIdAndUpdate(member.memberId, {
        $pull: {events: event}
      }).exec()
    }
  }
//pull other member data from member
  for (const member of team.members) {
    await User.findByIdAndUpdate(member.memberId, {
      $pull: { teamMembers: team._id},
    }).exec()

  }
//pull member data from leader
  await User.findByIdAndUpdate(team.leaderId, {
    $pull: { teamMembers: team._id },
  }).exec()

  Team.findByIdAndRemove(teamId).then((result) => {
    return res.status(208).send({
      isError: false,
      title: "Team Deleted",
      message: "Team Deleted",
    });
  });
}

export function modifyTeam(req, res) {
  // Sanitizing the request
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    const errors = validate(fields, ["teamId"], []);
    if (errors != null) {
      return res.status(500).json(errors);
    }
    Team.findById(fields.teamId[0]).then((d) => {
      if (!d) {
        // console.log(err)
        return res.status(404).json({
          error: "Team Not Found!",
        });
      }
      if (isEmpty(fields)) {
        return res.status(400).json({
          error: "Malformed Request or Bad key",
        });
      }
      if (!isEmpty(fields.teamName)) {
        d.teamName = fields.teamName[0];
      }
      if (!isEmpty(fields.leaderId)) {
        d.leaderId = fields.leaderId[0];
      }
      if (!isEmpty(fields.leaderName)) {
        d.leaderName = fields.leaderName[0];
      }
      if (!isEmpty(fields.eventType)) {
        d.eventType = fields.eventType[0];
      }
      if (!isEmpty(fields.events)) {
        d.eventType = JSON.parse(fields.events);
      }
      if (!isEmpty(fields.members)) {
        const errors = validate(
          fields,
          ["teamId", "members"],
          ["memberId", "email", "status"]
        );
        if (errors != null) {
          return res.status(500).json(errors);
        }
        d.eventType = JSON.parse(fields.members);
      }
      d.save((err, team) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            error: "Error occurred, Can't save to database",
          });
        }
        res.json({
          message: "Team Edited successfully!",
          team,
        });
      });
    });
  });
}

export async function getByLeaderId(req, res) {
  if (req.body.id) {
    const user = await Team.find({ leaderId: req.body.id });
    if (user) {
      return res.send(user.name);
    } else {
      return res.status(401).send({ error: "Cant find the " });
    }
  }
  return res.status(400).send({ error: "Empty request" });
}


export async function properTeam (req, res) {
  const userId = req.userId;
  const teams = [];
  const user = await User.findById(userId)
    .populate('teamMembers')
    .exec();
  if(!user.teamMembers) {
    return res.status(208).send({
      isError: false,
      teams: []
    })
  }
  for(const team of user.teamMembers) {
    const t = await Team.findById(team._id);
    let isVerifiedMember = true;
    for(const member of t.members) {
      if(!member.status) {
        isVerifiedMember = false;
        break;
      }
    }
    if(isVerifiedMember && t.leaderId == userId) {
      teams.push(t);
    }
  }
  return res.status(200).send({
    isError: false,
    teams: teams
  })
}