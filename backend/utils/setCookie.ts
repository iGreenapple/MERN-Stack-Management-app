import { Response } from "express"; //

export const setCookie = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true, // cookie cannot be accessed by client site via JS
    secure: process.env.NODE_ENV === "production", // only true in production for HTTPS, during development false
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
