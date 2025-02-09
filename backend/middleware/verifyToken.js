import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeadr = req.headers.authorization || req.headers.Authorization;
  try {
    if (!authHeadr) {
      return res
        .status(401)
        .send({ success: false, message: "Token required" });
    }
    const token = authHeadr.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: error.message });
  }
};

export default verifyToken;
