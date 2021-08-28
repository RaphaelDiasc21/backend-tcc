import { Injectable } from "@nestjs/common";
import { QuestionResponse } from "src/entities/QuestionResponse";
import { getRepository } from "typeorm";

@Injectable()
export class QuestionResponseService {
    create(questionResponse: QuestionResponse) {
        const questionResponseRepository = getRepository(QuestionResponse)
        questionResponseRepository.save(questionResponse);
    }

    getQuestionResponse() {
        const questionResponseRepository = getRepository(QuestionResponse)
        return questionResponseRepository.find()
    }

    getQuestionResponseId(questionId: number) {
        const questionResponseRepository = getRepository(QuestionResponse)
        return questionResponseRepository.findOne(questionId)
    }

    update(questionResponse: QuestionResponse, questionResponseId: number) {
        const questionResponseRepository = getRepository(QuestionResponse)
        return questionResponseRepository.update(questionResponseId,questionResponse)
    }

    delete(questionResponseId: number) {
        const questionResponseRepository = getRepository(QuestionResponse)
        return questionResponseRepository.delete(questionResponseId)
    }

}