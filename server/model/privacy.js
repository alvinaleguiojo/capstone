const ROLE = {
    ADMIN: "admin",
    BASIC: "basic",
  };
  
  module.exports = {
    ROLE: ROLE,
    User: [
      { name: "admin", role: ROLE.ADMIN },
      { name: "basic", role: ROLE.BASIC },
    ],
    projects: [
      { name: "admin projects", userId: 1 },
      { name: "guest projects", userId: 2 },
      { name: "client projects", userId: 3 },
    ],
  };
  