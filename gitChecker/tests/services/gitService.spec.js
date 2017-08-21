const chai  = require('chai');
const sinon = require('sinon');

chai.should(); // Add 'should' to prototype
const gitService = require('../../services/gitService')();

describe.only('GitService', function() {
    describe('GetUser', function() {
        it('should return user and repos', function() {
            return gitService.getUser('augustovictor')
                .then(user => {
                    user.login.should.equal('augustovictor');
                    user.should.have.property('repos');
                })
        });
    });
});