import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Instructor } from "src/entities/Instructor";
import { InstructorService } from "src/services/Instructor.service";

@Controller("instructors")
export class InstructorController {

    constructor(private instructorService: InstructorService) {}

    @Get()
    async instructors() {
        return this.instructorService.getInstructors()
    }

    @Get(":id")
    find(@Param() params) {
        return this.instructorService.getInstructorById(params.id)
    }

    @Post()
    async create(@Body() instructor: Instructor) {
        console.log(instructor)
        this.instructorService.create(instructor)
        return instructor
    }

    @Put(":id")
    async update(@Body() instructor: Instructor, @Param() params) {
        return this.instructorService.update(instructor, params.id)
    }

    @Delete(":id")
    async delete(@Param() params) {
        return this.instructorService.delete(params.id)
    }

    
}
