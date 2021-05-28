import { expect } from 'chai';
import { after, before } from 'mocha';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import sinon from 'sinon';
import User from '../models/User';

import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const sandbox = sinon.createSandbox();
const MONGODB_DEV_URI = (process.env.NODE_ENV === 'development') ?
    process.env.MONGODB_DEVELOPMENT_TEST_URI : process.env.MONGODB_PRODUCTION_TEST_URI;
import { checkAdminPermissions } from "../middleware/checkPermissions";
import { EnumRole } from '../shared/enums';

const regularUser = new User({
    "_id": "609185093c81fa77f81faf00",
    "roles": [EnumRole.user],
    "email": "ohad2121@gmail.com",
    "password": "$2b$10$3Yj2HBLGwbih4Xgc7wP/luMJRcsVXUX8KifzvuDYRir2H/ANrJTMC",
    "username": "ohad2121",
    "given_name": "Ohad",
    "family_name": "Fein",
});


const adminUser = new User({
    "_id": "609185093c81fa77f81faf01",
    "roles": [EnumRole.admin],
    "email": "ohad2121@gmail.com",
    "password": "$2b$10$3Yj2HBLGwbih4Xgc7wP/luMJRcsVXUX8KifzvuDYRir2H/ANrJTMC",
    "username": "ohad2121",
    "given_name": "Ohad",
    "family_name": "Fein",
});



describe('adminRights middleware', () => {

    before(async () => {
        await mongoose.connect(MONGODB_DEV_URI, {
            autoIndex: false, useCreateIndex: true,
            useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
        })

        await regularUser.save();
        await adminUser.save();
        return;
    });

    beforeEach(function () {
        // const data: any = { _id: new mongoose.mongo.ObjectId('5f53e610c57684288918a92d') };
        // sandbox.stub(jwt, 'verify').returns(data);
    });

    after(async () => {
        await User.deleteMany({})
        await mongoose.disconnect();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should return 401 status if there is no admin rights for a regular user,', async () => {
        const req: any = {
            user: regularUser
        };

        const res: any = {
            status: function (code: number) {
                this.status = code;
                return this;
            },
            json: function (data: any) {
                this.message = data.message;
            }
        };

        await checkAdminPermissions(req, res, () => { });
        expect(res.status).to.be.equal(401);
        expect(res.message).to.be.equal('Invalid permissions!');
    });

    it('should call next if for admins,', async () => {
        const req: any = {
            user: adminUser
        };
        const res: any = {
            status: function (code: number) {
                this.status = code;
                return this;
            },
            json: function (data: any) {
                this.message = data.message;
            }
        };

        let nextIsCalled = false;
        await checkAdminPermissions(req, res, () => { nextIsCalled = true });
        expect(nextIsCalled).to.be.equal(true);
    });

});