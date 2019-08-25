import { Student } from '../entities/Student';
import { getDBConnection } from '../../database';
import { promiseWrapper, isEmpty, formattedUUID } from '../../utils';

export class StudentRepository {
    constructor() {
        this.tableName = 'students';
        this.db = getDBConnection()(this.tableName);

        const entity = new Student();
        entity.up();
    }

    findQuery(query = {}) {
        return new Promise(async (resolve, reject) => {
            const [students, studentsErr] = await promiseWrapper(
                getDBConnection()
                    .select('*')
                    .from(this.tableName)
            );

            if (studentsErr) {
                return reject(studentsErr);
            }

            if (!students || isEmpty(students)) {
                return resolve([]);
            }

            return resolve(students);
        });
    }

    findOneQuery(query = {}) {
        return new Promise(async (resolve, reject) => {
            const [students, studentsErr] = await promiseWrapper(
                this.db.where(query).first()
            );

            if (studentsErr) {
                return reject(studentsErr);
            }

            if (!students || isEmpty(students)) {
                return reject({ code: 404, message: 'Student not found' });
            }

            return resolve(students);
        });
    }

    create(student) {
        const id = formattedUUID();
        return new Promise(async (resolve, reject) => {
            const [, newStudentErr] = await promiseWrapper(
                this.db.insert({ ...student, id })
            );

            if (newStudentErr) {
                return reject(newStudentErr);
            }

            const [newStudent] = await promiseWrapper(
                getDBConnection()
                    .table(this.tableName)
                    .where({ id })
            );

            if (!newStudent || isEmpty(newStudent)) {
                return resolve(null);
            }

            return resolve(newStudent);
        });
    }
}
