import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signup.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: Record<string, any>): Promise<{
        access_token: string;
    }>;
    signUp(signUpDto: SignUpDto): Promise<{
        username: string;
        email: string;
        id: number;
    }>;
    getProfile(req: any): any;
}
