import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinTable, JoinColumn } from 'typeorm';
import { Course } from './Course';
import { Question } from './Question';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Course, course => course.tasks)
    @JoinColumn()
    course: Course

    @OneToMany(type => Question, question => question.taskQuestion, {
        eager: true
    })
    questions: Question
}