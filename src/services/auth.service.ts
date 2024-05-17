import { UserExistsError, UserNotFoundError, ValidationError } from '../middleware/error/error.middleware';
import { User } from '../models/user.model';
import { hashToken, compareToken, generateAccessToken } from '../utils/tokens.utils';

interface User {
  username: string;
  email: string;
  password: string;
}


export class AuthService {
  async createUser(user: User): Promise<any> {
    const { username, email, password } = user;
    let the_user = await this.getUserByEmail(email);
    if (the_user) {
      throw new UserExistsError()
    }
    const hashedPassword = await hashToken(password);
    const newUser = User.create({
      username,
      email,
      password: hashedPassword
    });

    return "Account created successfully";

  }

  async getUserByUsername(username: string): Promise<any | null> {
    let user = await User.findOne({ where: { username } })
    // console.log({foundUser: user});

    return user?.dataValues;
  }
  async getUserByEmail(email: string): Promise<any | null> {
    let user = await User.findOne({ where: { email } })


    return user?.dataValues;
  }
  async login(email: string, password: string): Promise<any> {
    console.log({ email, password });

    let user = await this.getUserByEmail(email);
    if (!user) {
      throw new UserNotFoundError() 
    }


    const isPasswordValid = await compareToken(password, user.password);
    if (!isPasswordValid) {
      throw new ValidationError("INVALID CREDENTIALS")
    }

    const access_token = await generateAccessToken(user)
    
    return { access_token, ...user, password: null } 
  }
}



