const jwt = require("jsonwebtoken");
const User = require("../model/userModal");
const secret_key = "shivansh";
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      // console.log("hi");
      token = req.headers.authorization.split(" ")[1];
      console.log("hii", token);
      const decoded = jwt.verify(token, secret_key); // Define secret_key
      console.log("ppi", decoded);
      req.user = { id: decoded.userId };
      res.User = await User.findById(decoded.id);
      console.log("hh ", decoded.userId);

      return next();
    } catch (error) {
      // console.error("Not authorized, token failed", error);
      return res.status(400).send("Authorization failed");
    }
  }
  if (!token) {
    // console.error("Not authorized, no token");
    return res.status(400).send("Authorization failed");
  }
};

module.exports = protect;
