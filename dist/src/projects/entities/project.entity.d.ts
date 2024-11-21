import { Task } from "../../tasks/entities/task.entity";
export declare class Project {
    id: number;
    name: string;
    description: string;
    manager_id: number;
    tasks: Task[];
}
