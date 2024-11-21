import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { UsersService } from 'src/users/users.service';
export declare class ProjectsService {
    private projectsRepository;
    private usersService;
    constructor(projectsRepository: Repository<Project>, usersService: UsersService);
    create(createProjectDto: CreateProjectDto): Promise<{
        id: number;
        name: string;
        manager: string;
    }>;
    findAll(): Promise<Project[]>;
    findOne(id: number): Promise<Project | null>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project>;
    remove(id: number): Promise<{
        status: string;
        message: string;
    }>;
}
