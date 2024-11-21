import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Project } from 'src/projects/entities/project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.project_id, { cascade: true })
  tasks: Task[];

  @OneToMany(() => Project, (project) => project.manager_id, { cascade: true })
  projects: Project[];
}