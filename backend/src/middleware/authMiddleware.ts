import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET; // Skrytý klíč pro ověření
if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // vytahujeme z request cookie token pro validaci 
  const token = req.cookies.token;
  // kontrola zda proměnná token existuje
  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }
  try {
    // ověření pomocí jwt a našeho secretKey
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    
    if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
    req.userToken = decoded; // Předpokládáme, že v tokenu je uložený uživatelský objekt
    // console.log(req.user);
    
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};

