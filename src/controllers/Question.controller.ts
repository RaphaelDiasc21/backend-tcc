import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Question } from "src/entities/Question";
import { QuestionService } from "src/services/Question.service";

@Controller("questions")
export class QuestionController {
    constructor(private questionService: QuestionService) {}

    @Get()
    async questions() {
        return this.questionService.getQuestions()
    }

    @Get(":id")
    find(@Param() params) {
        return this.questionService.getQuestionId(params.id)
    }

    @Post()
    async create(@Body() question: Question) {
        this.questionService.create(question)
        return question
    }

    @Put(":id")
    async update(@Body() question: Question, @Param() params) {
        return this.questionService.update(question, params.id)
    }

    @Delete(":id")
    async delete(@Param() params) {
        return this.questionService.delete(params.id)
    }
}