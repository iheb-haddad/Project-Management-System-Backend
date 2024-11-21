import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";
import { ProjectsService } from "src/projects/projects.service";
import { UsersService } from "src/users/users.service";
export declare class TasksService {
    private tasksRepository;
    private projectsService;
    private usersService;
    constructor(tasksRepository: Repository<Task>, projectsService: ProjectsService, usersService: UsersService);
    create(createTaskDto: CreateTaskDto): Promise<{
        id: number;
        name: string;
        project: string;
        user: string;
    }>;
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task | null>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
    remove(id: number): Promise<void>;
}
