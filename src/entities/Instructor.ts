import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Course } from './Course';

@Entity()
export class Instructor {
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

    @OneToMany(type => Course, course => Instructor)
    courses: Course[]
}