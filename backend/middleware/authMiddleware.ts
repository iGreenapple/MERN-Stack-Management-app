import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

// https://www.linkedin.com/pulse/jwt-authentication-middleware-expressjs-building-secure-tamjid-ahmed/

if (!secretKey) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // vytahujeme z request headeru property Authorization obsahujícíc token
  const authHeader = req.headers.authorization;
  // kontrola zda proměnná token obsahuje
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Invalid authorization header' });
  }
  // vytažení čistého tokenu z řetězce Authorization (odebrání slova Bearer od tokenu)
  const token = authHeader.split(' ')[1]; // oddělení mezerou a bereme druhou část pole, tedy token
  if (!token) {
    return res.status(401).json({ message: 'Authorization token not found' });
  }

  try {
    const decoded = jwt.verify(token, secretKey as string);
    (req as any).user = decoded; // Předpokládáme, že v tokenu je uložený uživatelský objekt
    next();
  }
  catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: 'Invalid token' });
  }
};

// const validate = (req: Request, res: Response, next: NextFunction) => {
//   const errors = validationResult(req).formatWith(error => {
//     switch (error.type) {
//       case 'field':
//         return `Error on field ${error.path}`;
//       case 'alternative':
//         console.log(error.nestedErrors);
//         return error.msg;
//       case 'unknown_fields':
//         const fields = error.fields.map(field => field.path).join(', ');
//         return `Unknown fields found, please remove them: ${fields}`;
//       default:
//         throw new Error(`Not a known express-validator error: ${error.type}`);
//     }
//   })
//   if (!errors.isEmpty()) {
//     let error = {};
//     errors.array().map((err) => (error[err.param] = err.msg));
//     return res.status(422).json({ error });
//   }
//   next()
// };

export { authMiddleware, 
  // validate 
};