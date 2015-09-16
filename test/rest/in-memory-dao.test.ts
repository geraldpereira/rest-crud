/// <reference path="../../src/rest/in-memory-dao.ts" />
/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />

import DAO = require('../../src/rest/in-memory-dao');
import chai = require('chai');

const expect = chai.expect;
const userDAO:DAO.InMemoryUserDAO = new DAO.InMemoryUserDAO();


describe("In Memory User DAO", () => {
    it("should return user", () => {
        const user = userDAO.read(0);
        console.log(user);
        expect(user).to.eql({id: 0, firstname: 'first', lastname: 'last', age: 42});
    });
});