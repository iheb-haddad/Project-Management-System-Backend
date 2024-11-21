import { Injectable , HttpException, HttpStatus  } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private usersService : UsersService
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    // Check if the project already exists
    const existingProject = await this.projectsRepository.findOneBy({
      name: createProjectDto.name,
    });
    if (existingProject) {
      throw new HttpException(
        'Project already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Check if the manager exists
    const existManager = await this.usersService.findOneById(createProjectDto.manager_id);
    if (!existManager) {
      throw new HttpException(
        'Manager does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Save the project
    const newProject = await this.projectsRepository.save(createProjectDto);
    // Return the newly created project
    return {
      id: newProject.id,
      name: newProject.name,
      manager: existManager.username,
    };
  }

  async findAll() : Promise<Project[]>  {
    return this.projectsRepository.find();
  }

  async findOne(id: number) : Promise<Project | null> {
    return this.projectsRepository.findOneBy({ id });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) : Promise<Project> {
    await this.projectsRepository.update(id, updateProjectDto);
    return this.projectsRepository.findOneBy({ id });
  }

  async remove(id: number){
    await this.projectsRepository.delete(id);
    return {
      status: 'success',
      message: 'Project deleted successfully',
    };
  }
}
