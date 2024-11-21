import { ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Column, Entity, JoinColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { IsNotEmpty } from "class-validator";
import { Task } from "../../tasks/entities/task.entity";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "manager_id" })
    @IsNotEmpty()
    manager_id: number;

    @OneToMany(() => Task, (task) => task.project_id, { cascade: true })
    tasks: Task[];
}
