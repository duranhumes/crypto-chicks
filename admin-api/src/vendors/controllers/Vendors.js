import { Router } from 'express';

import VendorSchema from '../schemas/Vendor';
import * as httpMessages from '../../utils/httpMessages';
import { VendorRepository } from '../repositories/Vendor';
import { pick, promiseWrapper, escapeString } from '../../utils';

class Controller {
    constructor() {
        this.vendorRepo = new VendorRepository();
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', this.getVendors.bind(this));
        this.router.get('/:id', this.getVendor.bind(this));
        this.router.post('/', this.createVendor.bind(this));
    }

    async createVendor(req, res) {
        /**
         * Remove all unwanted fields from request body
         * based on the vendor schema.
         */
        const filteredBody = pick(req.body, VendorSchema);
        const vendorData = {};
        for (const key in filteredBody) {
            if (filteredBody.hasOwnProperty(key)) {
                vendorData[key] = escapeString(filteredBody[key]);
            }
        }

        const [newVendor, newVendorErr] = await promiseWrapper(
            this.vendorRepo.create({
                ...vendorData,
                photo_url:
                    'https://api.adorable.io/avatars/285/abott@adorable.png',
            })
        );
        if (newVendorErr) {
            return res.status(500).json(httpMessages.code500());
        }

        const successMessage = 'Vendor successfully created!';
        return res
            .status(201)
            .json(httpMessages.code201(newVendor, successMessage));
    }

    async getVendors(_, res) {
        const [vendor, vendorErr] = await promiseWrapper(
            this.vendorRepo.findQuery()
        );
        if (vendorErr) {
            return res.status(500).json(httpMessages.code500());
        }

        return res.status(200).json(httpMessages.code200(vendor));
    }

    async getVendor(req, res) {
        const vendorId = escapeString(req.params.id);
        const [vendor, vendorErr] = await promiseWrapper(
            this.vendorRepo.findOneQuery({ id: vendorId })
        );
        if (vendorErr) {
            if (vendorErr.code === 404) {
                return res.status(404).json(httpMessages.code404());
            }

            return res.status(500).json(httpMessages.code500());
        }

        return res.status(200).json(httpMessages.code200(vendor));
    }
}

export const VendorController = new Controller().router;
