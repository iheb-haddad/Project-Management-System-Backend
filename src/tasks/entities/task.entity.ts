import { IsNotEmpty } from "class-validator";
import { Entity, ManyToOne } from "typeorm";
import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../projects/entities/project.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    description: string;

    @Column()
    @IsNotEmpty()
    @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
    project_id: number;

    @Column()
    @IsNotEmpty()
    @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
    user_id: number;

    @Column()
    @IsNotEmpty()
    status: string;

    @Column()
    @IsNotEmpty()
    due_date: Date;
}
