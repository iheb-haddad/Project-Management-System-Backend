import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { SignUpDto } from "./dto/signup.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signup(signupDto: SignUpDto){
    try {
      const hashedPassword = await bcrypt.hash(signupDto.password, 10);
      const { password, ...user } = signupDto;
      const id = Math.floor(Math.random() * 1000);
      this.usersService.create({...user, password: hashedPassword });
      return { id, ...user };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async signIn(
    username: string,
    pass: string
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByUsername(username);
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!user || !isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
