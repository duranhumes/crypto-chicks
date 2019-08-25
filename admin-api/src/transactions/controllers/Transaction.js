import { Router } from 'express';

import TransactionSchema from '../schemas/Transaction';
import * as httpMessages from '../../utils/httpMessages';
import { pick, promiseWrapper, escapeString } from '../../utils';
import { TransactionRepository } from '../repositories/Transaction';

class Controller {
    constructor() {
        this.transactionRepo = new TransactionRepository();
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', this.getTransactions.bind(this));
        this.router.get(
            '/student/:studentId',
            this.getStudentTransactions.bind(this)
        );
        this.router.get(
            '/vendor/:vendorId',
            this.getVendorTransactions.bind(this)
        );
        this.router.get('/:id', this.getTransaction.bind(this));
        this.router.post('/', this.createTransaction.bind(this));
    }

    async createTransaction(req, res) {
        /**
         * Remove all unwanted fields from request body
         * based on the transaction schema.
         */
        const filteredBody = pick(req.body, TransactionSchema);
        const transactionData = {};
        for (const key in filteredBody) {
            if (filteredBody.hasOwnProperty(key)) {
                transactionData[key] = escapeString(filteredBody[key]);
            }
        }

        const [newTransaction, newTransactionErr] = await promiseWrapper(
            this.transactionRepo.create(transactionData)
        );
        if (newTransactionErr) {
            return res.status(500).json(httpMessages.code500());
        }

        const successMessage = 'Transaction successfully recorded!';
        return res
            .status(201)
            .json(httpMessages.code201(newTransaction, successMessage));
    }

    async getStudentTransactions(req, res) {
        const studentId = escapeString(req.params.studentId);
        const [transactions, transactionsErr] = await promiseWrapper(
            this.transactionRepo.findQuery({ student_id: studentId })
        );
        if (transactionsErr) {
            return res.status(500).json(httpMessages.code500());
        }

        return res.status(200).json(httpMessages.code200(transactions));
    }

    async getVendorTransactions(req, res) {
        const vendorId = escapeString(req.params.vendorId);
        const [transactions, transactionsErr] = await promiseWrapper(
            this.transactionRepo.findQuery({ vendor_id: vendorId })
        );
        if (transactionsErr) {
            return res.status(500).json(httpMessages.code500());
        }

        return res.status(200).json(httpMessages.code200(transactions));
    }

    async getTransactions(_, res) {
        const [transaction, transactionErr] = await promiseWrapper(
            this.transactionRepo.findQuery()
        );
        if (transactionErr) {
            return res.status(500).json(httpMessages.code500());
        }

        return res.status(200).json(httpMessages.code200(transaction));
    }

    async getTransaction(req, res) {
        const transactionId = escapeString(req.params.id);
        const [transaction, transactionErr] = await promiseWrapper(
            this.transactionRepo.findOneQuery({ id: transactionId })
        );
        if (transactionErr) {
            if (transactionErr.code === 404) {
                return res.status(404).json(httpMessages.code404());
            }

            return res.status(500).json(httpMessages.code500());
        }

        return res.status(200).json(httpMessages.code200(transaction));
    }
}

export const TransactionController = new Controller().router;
