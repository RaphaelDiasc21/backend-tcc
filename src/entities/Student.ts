import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { Course } from './Course';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()    
    phone: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @ManyToMany(type => Course)
    @JoinTable()
    courses: Course[]
}