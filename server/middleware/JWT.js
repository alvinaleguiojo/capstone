const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

const createTokens = (user) => {
  const accessToken = sign(
    {
      _id: user[0].StaffID,
      Email: user[0].Email,
      FirstName: user[0].FirstName,
      LastName: user[0].LastName,
      Status: user[0].Status,
      Role: user[0].Role
    },
    process.env.JWT_SECRET
  );
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access_token"];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated" });

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

module.exports = { createTokens, validateToken };
