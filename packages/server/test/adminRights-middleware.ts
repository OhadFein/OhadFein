import { expect } from 'chai';
import { } from 'mocha';

import { checkAdminRights } from '../middleware/checkAdminRights';
import User from '../models/User';
import { EnumRole } from '../shared/enums';

const getUser = (role: EnumRole) => {
    return new User({
        "_id": "5f53e610c57684288918a92d",
        "profile": {
            "birthDate": "1992-12-31T00:00:00.000Z",
            "name": { "given_name": "roy", "family_name": "roy" },
            "language": "en"
        },
        "emailVerified": false,
        "tokens": [],
        "role": role,
        "email": "ohad2121@gmail.com",
        "password": "$2b$10$..IxTSeyHB5RvZkTHYFDt.Y/d.f52cH3vkzqkOaii5xkUeC3KJPhC",
        "emailVerificationToken": "5f53b898a8ee00bc3ee2b3ca21ff78a4"
    });
}

describe('adminRights middleware', () => {

    it('should return 401 status if there is no admin rights for a regular user,', () => {
        const req: any = {
            user: getUser(EnumRole.user)
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

        checkAdminRights(req, res, () => { });
        expect(res.status).to.be.equal(401);
        expect(res.message).to.be.equal('Invalid permissions!');
    });

    it('should call next if for admins,', () => {
        const req: any = {
            user: getUser(EnumRole.admin)
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
        checkAdminRights(req, res, () => { nextIsCalled = true });
        expect(nextIsCalled).to.be.equal(true);
    });

});