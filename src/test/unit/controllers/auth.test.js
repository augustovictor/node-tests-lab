const authController = require('../../../controllers/auth');
const expect = require('chai').expect;
const should = require('chai').should();
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

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
    
    describe('isAuthorizedAsync', function() {
        this.timeout(3000);
        it('should return false if users is not authorized', function() {
            return authController.isAuthorizedAsync('manager')
                .should.eventually.be.false;
        });
    });

    describe.only('getIndex', function() {
        it('should render index', function() {
            const req = {};
            const res = {
                render: sinon.spy()
            };

            authController.getIndex(req, res);
            // console.log(res.render);
            res.render.calledOnce.should.be.true;
            res.render.firstCall.args[0].should.equal('index');
        });
    });
});