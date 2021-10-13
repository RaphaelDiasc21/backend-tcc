import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/Auth.controller';
import { CourseController } from './controllers/Course.controller';
import { InstructorController } from './controllers/Instructor.controller';
import { QuestionController } from './controllers/Question.controller';
import { QuestionResponseController } from './controllers/QuestionResponse.controller';
import { StudentController } from './controllers/Student.controller';
import { TaskController } from './controllers/Task.controller';
import { Course } from './entities/Course';
import { Instructor } from './entities/Instructor';
import { Question } from './entities/Question';
import { QuestionResponse } from './entities/QuestionResponse';
import { Student } from './entities/Student';
import { Task } from './entities/Task';
import { LoggingMiddleware } from './middlewares/authorization.middleware';
import { AuthService } from './services/Auth.service';
import { CourseService } from './services/Course.service';
import { InstructorService } from './services/Instructor.service';
import { QuestionService } from './services/Question.service';
import { QuestionResponseService } from './services/QuestionResponse.service';
import { StudentService } from './services/Student.service';
import { TaskService } from './services/Task.service';


@Module({
  imports: [
    JwtModule.register({secret:'secret'}),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db",
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
  controllers: [
    AppController,
    StudentController,
    InstructorController,
    CourseController,
    QuestionController,
    QuestionResponseController,
    TaskController,
    AuthController
  ],
  providers: [
    AppService, 
    StudentService,
    InstructorService,
    CourseService,
    TaskService,
    QuestionService,
    QuestionResponseService,
    AuthService
  ],
})
export class AppModule implements NestModule{
   configure(consumer: MiddlewareConsumer) {
     consumer.apply(LoggingMiddleware).forRoutes("/students")
   }
}
