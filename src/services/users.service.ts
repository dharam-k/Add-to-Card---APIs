import User from "../models/users.model";

interface User {
  name: string;
  email: string;
  password: string;
}

class UserService {
  public static async findUserByEmail(email: string): Promise<User | null> {
    return User.findOne({ email });
  }

  public static async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
  }
}

export default UserService;
