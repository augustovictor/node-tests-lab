const chai = require('chai');
const sinon = require('sinon');
const https = require('https');
const PassThrough = require('stream').PassThrough; // Mock out a stream since we're usong .on in our code

chai.should(); // Add 'should' to prototype
const gitService = require('../../services/gitService')();

const gitJson = {
    login: "augustovictor",
    id: 938051,
    avatar_url: "https://avatars2.githubusercontent.com/u/938051?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/augustovictor",
    html_url: "https://github.com/augustovictor",
    followers_url: "https://api.github.com/users/augustovictor/followers",
    following_url: "https://api.github.com/users/augustovictor/following{/other_user}",
    gists_url: "https://api.github.com/users/augustovictor/gists{/gist_id}",
    starred_url: "https://api.github.com/users/augustovictor/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/augustovictor/subscriptions",
    organizations_url: "https://api.github.com/users/augustovictor/orgs",
    repos_url: "https://api.github.com/users/augustovictor/repos",
    events_url: "https://api.github.com/users/augustovictor/events{/privacy}",
    received_events_url: "https://api.github.com/users/augustovictor/received_events",
    type: "User",
    site_admin: false,
    name: "Victor Augusto",
    company: null,
    blog: "",
    location: null,
    email: null,
    hireable: true,
    bio: null,
    public_repos: 121,
    public_gists: 140,
    followers: 15,
    following: 4,
    created_at: "2011-07-25T19:24:10Z",
    updated_at: "2017-08-12T04:10:15Z"
}

describe.only('GitService', function () {

    beforeEach('modify https request behavior', function () {
        this.request = sinon.stub(https, 'request'); // Stubbing https#request method
    });

    describe('GetUser', function () {
        it('should return user and repos', function () {
            this.timeout(5000);

            const gitResponse = new PassThrough();
            gitResponse.write(JSON.stringify(gitJson));
            gitResponse.end();

            this.request.callsArgWith(1, gitResponse).returns(new PassThrough());

            return gitService.getUser('augustovictor')
                .then(user => {
                    user.login.should.equal('augustovictor');
                    // user.should.have.property('repos');
                })
        });
    });

    afterEach(function () {
        this.request.restore();
    });
});