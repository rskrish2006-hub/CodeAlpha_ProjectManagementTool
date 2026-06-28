const members = [
  { name: "Krishna", role: "Full Stack Developer", initials: "KB" },
  { name: "Ravi", role: "UI Designer", initials: "RV" },
  { name: "Anu", role: "Tester", initials: "AN" },
];

const TeamMembers = () => {
  return (
    <section className="team-section">
      <h2>Team Members</h2>

      <div className="team-grid">
        {members.map((member, index) => (
          <div className="member-card" key={index}>
            <div className="member-avatar">{member.initials}</div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamMembers;