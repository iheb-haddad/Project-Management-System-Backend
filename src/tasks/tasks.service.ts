import { Injectable , HttpException, HttpStatus} from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";
import { ProjectsService } from "src/projects/projects.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private projectsService: ProjectsService,
    private usersService: UsersService
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const existingTask = await this.tasksRepository.findOneBy({ name: createTaskDto.name });
    if (existingTask) {
      throw new HttpException('Task already exists', HttpStatus.BAD_REQUEST);
    }
    const existProject = await this.projectsService.findOne(createTaskDto.project_id);
    if (!existProject) {
      throw new HttpException('Project does not exist', HttpStatus.BAD_REQUEST);
    }
    const existUser = await this.usersService.findOneById(createTaskDto.user_id);
    if (!existUser) {
      throw new HttpException('Manager does not exist', HttpStatus.BAD_REQUEST);
    }
    const newTask = await this.tasksRepository.save(createTaskDto);
    return {
      id: newTask.id,
      name: newTask.name,
      project: existProject.name,
      user: existUser.username
    }
  }

  async findAll() : Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async findOne(id: number) : Promise<Task | null> {
    return this.tasksRepository.findOneBy({ id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) : Promise<Task> {
    await this.tasksRepository.update(id, updateTaskDto);
    return this.tasksRepository.findOneBy({ id});
  }

  async remove(id: number) : Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
