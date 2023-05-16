import { Request, Response } from "express";
import UserService from "../services/users.service";
import generateToken from "../auth/generateToken.auth";

class UserController {
  public static async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const existingUser = await UserService.findUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ error: "User already exists" });
        return;
      }

      await UserService.createUser(name, email, password);

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await UserService.findUserByEmail(email);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      if (password !== user.password) {
        res.status(401).json({ error: "Invalid password" });
        return;
      }

      const token = generateToken({ email });
      // Send the token in the headers of the response
      res.setHeader("Authorization", `Bearer ${token}`);

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default UserController;
