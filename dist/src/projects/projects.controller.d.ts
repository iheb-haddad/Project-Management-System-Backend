import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<{
        status: string;
        message: string;
        data: {
            id: number;
            name: string;
            manager: string;
        };
    }>;
    findAll(): Promise<import("./entities/project.entity").Project[]>;
    findOne(id: number): Promise<import("./entities/project.entity").Project>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<import("./entities/project.entity").Project>;
    remove(id: number): Promise<{
        status: string;
        message: string;
    }>;
}
