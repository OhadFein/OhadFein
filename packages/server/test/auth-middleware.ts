/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint no-use-before-define: 0 */

import { expect } from 'chai';
import { after, before } from 'mocha';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { checkAuth, checkRefreshToken } from '../middleware/checkAuth';
import sinon from 'sinon';
import User from '../models/User';
import { EnumRole } from '../shared/enums';

import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const sandbox = sinon.createSandbox();
const MONGODB_DEV_URI = (process.env.NODE_ENV === 'development') ?
  process.env.MONGODB_DEVELOPMENT_TEST_URI : process.env.MONGODB_PRODUCTION_TEST_URI;

describe('Auth middleware', () => {

  before(async () => {
    await mongoose.connect(MONGODB_DEV_URI, {
      autoIndex: false, useCreateIndex: true,
      useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
    })
    const user = new User({
      "_id": "5f53e610c57684288918a92d",
      "profile": {
        "birthDate": "1992-12-31T00:00:00.000Z",
        "name": { "given_name": "roy", "family_name": "roy" },
        "language": "en"
      },
      "role": EnumRole.admin,
      "emailVerified": false,
      "tokens": [],
      "email": "ohad2121@gmail.com",
      "password": "$2b$10$..IxTSeyHB5RvZkTHYFDt.Y/d.f52cH3vkzqkOaii5xkUeC3KJPhC",
      "emailVerificationToken": "5f53b898a8ee00bc3ee2b3ca21ff78a4"
    });
    return await user.save();
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

  it('should return 401 status and "Not authenticated!" message if header is not present', async () => {
    const req: any = {
      get: function () {
        return null;
      }
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
    await checkAuth(req, res, () => { });
    expect(res.status).to.be.equal(401);
    expect(res.message).to.be.equal('Not authenticated!');
  });

  it('should yield a user after decoding the token', async () => {
    const req: any = {
      get: function () {
        return 'Bearer abc';
      }
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

    const data: any = { _id: new mongoose.mongo.ObjectId('5f53e610c57684288918a92d') };
    sandbox.stub(jwt, 'verify').returns(data);
    let nextCallsCounter = 0;
    await checkAuth(req, res, () => { nextCallsCounter++; });
    expect(req).to.have.property('user');
    expect(req.user).to.have.property('email', 'ohad2121@gmail.com');
    expect((jwt.verify as any).called).to.be.true;
    expect(nextCallsCounter).to.be.equal(1);
  });

  it('should return 404 user not found', async () => {
    const req: any = {
      get: function () {
        return 'Bearer abc';
      }
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

    const data: any = { _id: new mongoose.mongo.ObjectId('111111111111111111111111') };
    sandbox.stub(jwt, 'verify').returns(data);
    await checkAuth(req, res, () => { });
    expect(res.status).to.be.equal(404);
  });

  it('should return 401, token is just one word', async () => {
    const req: any = {
      get: function () {
        return 'Bearer';
      }
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

    await checkAuth(req, res, () => { });
    expect(res.status).to.be.equal(401);
  });

  it('should throw 401 error if the token cannot be verified', async () => {
    const req: any = {
      get: function () {
        return 'Bearer abc';
      }
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
    await checkAuth(req, res, () => { });
    expect(res.status).to.be.equal(401);
  });

  it('should yield a user after decoding the refresh token', async () => {
    const req: any = {
      params: {
        refresh_token: "abc"
      }
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

    const data: any = { _id: new mongoose.mongo.ObjectId('5f53e610c57684288918a92d') };
    sandbox.stub(jwt, 'verify').returns(data);
    await checkRefreshToken(req, res, () => { });
    expect(req).to.have.property('user');
    expect(req.user).to.have.property('email', 'ohad2121@gmail.com');
    expect((jwt.verify as any).called).to.be.true;
  });

});