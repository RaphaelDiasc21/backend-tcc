import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { QuestionResponse } from './QuestionResponse';
import { Task } from './Task';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    responseQuestion: string;

    @ManyToOne(type => Task, task => task.questions)
    @JoinColumn()
    taskQuestion: Task;

    @OneToMany(type => QuestionResponse, questionResponse => questionResponse.question,{
        eager: true
    })
    responses: QuestionResponse[]
}