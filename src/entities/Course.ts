import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Instructor } from './Instructor';
import { Student } from './Student';
import { Task } from './Task';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    category: CategoryType;

    @Column()
    dateTime: Date;
    
    @Column()
    link: string;

    @ManyToOne(type => Instructor, instructor => instructor.courses,{
        eager: true
    })
    instructor: Instructor

    @ManyToMany(type => Student,{
        eager: true
    })
    @JoinTable()
    students: Student[]

    @OneToMany(type => Task, task => task.course,{
        eager: true
    })
    tasks: Task

}