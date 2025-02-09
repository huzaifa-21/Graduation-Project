import jwt from "jsonwebtoken";
export function generateToken(payload,expiresIn = "1d") {
  return jwt.sign(payload, process.env.JSON_SECRET_KEY,{expiresIn});
}

