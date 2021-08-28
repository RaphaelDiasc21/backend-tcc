import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Question } from "src/entities/Question";
import { QuestionResponse } from "src/entities/QuestionResponse";
import { QuestionService } from "src/services/Question.service";
import { QuestionResponseService } from "src/services/QuestionResponse.service";

@Controller("questionResponses")
export class QuestionResponseController {
    constructor(private questionResponseService: QuestionResponseService) {}

    @Get()
    async questions() {
        return this.questionResponseService.getQuestionResponse()
    }

    @Get(":id")
    find(@Param() params) {
        return this.questionResponseService.getQuestionResponseId(params.id)
    }

    @Post()
    async create(@Body() questionResonse: QuestionResponse) {
        this.questionResponseService.create(questionResonse)
        return questionResonse
    }

    @Put(":id")
    async update(@Body() questionResponse: QuestionResponse, @Param() params) {
        return this.questionResponseService.update(questionResponse, params.id)
    }

    @Delete(":id")
    async delete(@Param() params) {
        return this.questionResponseService.delete(params.id)
    }
}