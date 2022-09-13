const { sign, verify } = require("jsonwebtoken");
require("dotenv").config();

const createTokens = (user) => {
  const accessToken = sign(
    { email: user.email, _id: user._id },
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
