import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Course } from './entities/Course';
import { Instructor } from './entities/Instructor';
import { Question } from './entities/Question';
import { QuestionResponse } from './entities/QuestionResponse';
import { Student } from './entities/Student';
import { Task } from './entities/Task';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 5050,
      database: "tcc",
      username: "root",
      password: "none",
      entities: [
        Instructor,
        Course,
        Student,
        Task,
        Question,
        QuestionResponse
      ],
      synchronize: true,
   })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
