import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user-dto";
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(user: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOneById(id: number): Promise<User | null>;
    findOneByUsername(username: string): Promise<User | null>;
    remove(id: number): Promise<void>;
}
