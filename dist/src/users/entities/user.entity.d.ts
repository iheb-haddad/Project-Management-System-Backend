import { Task } from '../../tasks/entities/task.entity';
import { Project } from 'src/projects/entities/project.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    tasks: Task[];
    projects: Project[];
}
