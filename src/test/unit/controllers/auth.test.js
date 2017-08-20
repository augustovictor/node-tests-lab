const authController = require('../../../controllers/auth');
const expect = require('chai').expect;
const should = require('chai').should();
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

// CHAI MIDDLEWARE
chai.use(chaiAsPromised);
chai.should(); // append should to chai

describe('AuthController', function() {
    describe('isAuthorized', function() {
        it('should return false if user not authorized', function() {
            const isAuth = authController.isAuthorized('manager');
            // expect(isAuth).to.be.true;
            isAuth.should.be.false;
        });
    });
    
    describe.only('isAuthorizedAsync', function() {
        this.timeout(3000);
        it('should return false if users is not authorized', function() {
            return authController.isAuthorizedAsync('manager')
                .should.eventually.be.false;
        });
    });
});