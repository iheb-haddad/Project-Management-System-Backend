import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { SignUpDto } from "./dto/signup.dto";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signup(signupDto: SignUpDto): Promise<{
        username: string;
        email: string;
        id: number;
    }>;
    signIn(username: string, pass: string): Promise<{
        access_token: string;
    }>;
}
