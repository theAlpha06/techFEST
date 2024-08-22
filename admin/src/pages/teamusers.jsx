import React from 'react';

const TeamUsers = React.forwardRef((props, ref) => {
    const user1 = props.teams;
    return (
        <div
        style={{
          // border: "2px solid green",
          padding: "0.75em",
          color: "white",
          borderRadius: "15px",
          background: "black",
          fontSize: "40px",
        }}
        ref={ref}
      >
        <div className="teamregistration">
          <table className="team_table">
            <tr>
              <th>Team Name</th>
              <th>Leader Name</th>
              <th>Members</th>
            </tr>
            {user1?.map((team) => {
              return (
                <tr>
                  <td>{team.teamName}</td>
                  <td>{team.leaderName}</td>
                  <td>
                    {team.members.map((member) => {
                      return (
                        <div>
                          Email: {member.email}
                          <br />
                          Phone: {member.phone}
                        </div>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    )
})

export default TeamUsers;