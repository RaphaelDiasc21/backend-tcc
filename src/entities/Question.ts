import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { QuestionResponse } from './QuestionResponse';
import { Task } from './Task';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    responseQuestion: string;

    @ManyToOne(type => Task, task => task.questions)
    taskQuestion: Task;

    @OneToMany(type => QuestionResponse, questionResponse => questionResponse.studentResponse)
    responses: QuestionResponse[]
}