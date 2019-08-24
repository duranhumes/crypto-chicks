import { Router } from 'express';

import StudentSchema from '../schemas/Student';
import * as httpMessages from '../../utils/httpMessages';
import { StudentRepository } from '../repositories/Student';
import { pick, promiseWrapper, escapeString } from '../../utils';

class Controller {
    constructor() {
        this.studentRepo = new StudentRepository();
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', this.getStudents.bind(this));
        this.router.get('/:id', this.getStudent.bind(this));
        this.router.post('/', this.createStudent.bind(this));
    }

    async createStudent(req, res) {
        /**
         * Remove all unwanted fields from request body
         * based on the student schema.
         */
        const filteredBody = pick(req.body, StudentSchema);
        const studentData = {};
        for (const key in filteredBody) {
            if (filteredBody.hasOwnProperty(key)) {
                studentData[key] = escapeString(filteredBody[key]);
            }
        }

        const [newStudent, newStudentErr] = await promiseWrapper(
            this.studentRepo.create(studentData)
        );
        if (newStudentErr) {
            return res.status(500).json(httpMessages.code500());
        }

        const successMessage = 'Student successfully created!';
        return res
            .status(201)
            .json(httpMessages.code201(newStudent, successMessage));
    }

    async getStudents(_, res) {
        const [student, studentErr] = await promiseWrapper(
            this.studentRepo.findQuery()
        );
        if (studentErr) {
            return res.status(500).json(httpMessages.code500());
        }

        return res.status(200).json(httpMessages.code200(student));
    }

    async getStudent(req, res) {
        const studentId = escapeString(req.params.id);
        const [student, studentErr] = await promiseWrapper(
            this.studentRepo.findOneQuery({ id: studentId })
        );
        if (studentErr) {
            if (studentErr.code === 404) {
                return res.status(404).json(httpMessages.code404());
            }

            return res.status(500).json(httpMessages.code500());
        }

        return res.status(200).json(httpMessages.code200(student));
    }
}

export const StudentController = new Controller().router;
