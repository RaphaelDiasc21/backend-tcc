import { Injectable } from "@nestjs/common";
import { Question } from "src/entities/Question";
import { getRepository } from "typeorm";

@Injectable()
export class QuestionService {
    create(question: Question) {
        const questionRepository = getRepository(Question)
        questionRepository.save(question);
    }

    getQuestions() {
        const questionRepository = getRepository(Question)
        return questionRepository.find()
    }

    getQuestionId(questionId: number) {
        const questionRepository = getRepository(Question)
        return questionRepository.findOne(questionId)
    }

    update(question: Question, questionId: number) {
        const questionRepository = getRepository(Question)
        return questionRepository.update(questionId,question)
    }

    delete(questionId: number) {
        const questionRepository = getRepository(Question)
        return questionRepository.delete(questionId)
    }

}