import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { Course } from './Course';
import { Question } from './Question';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Course, course => course.tasks)
    course: Course

    @ManyToOne(type => Question, question => question.taskQuestion)
    @JoinTable()
    questions: Question
}