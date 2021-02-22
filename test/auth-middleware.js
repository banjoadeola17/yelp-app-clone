const authMiddleware = require('../middleware/is-auth');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

describe('auth-middleware', function() {
    it('should throw an error if no authorization header is present', function() {
        const req = {
            get: function() {
                return null;
            }
        }
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not authenticated.');
    }),
    
    it('should throw an error if authorization header contains one string', function() {
        const req = {
            get: function() {
                return 'abc';
            }
        }
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    });

    it('should throw an error if the token could not be verified', function() {
        const req = {
            get: function() {
                return 'Bearer xyz';
            }
        }
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    });

    it('should yield a userId after decoding the token', function() {
        const req = {
            get: function() {
                return 'Bearer rtyujhjk';
            }
        }
        sinon.stub(jwt, 'verify');
        jwt.verify.returns({ userId: 'abc' })
        authMiddleware(req, {}, () => {});
        expect(req).to.have.property('userId');
        expect(req).to.have.property('userId', 'abc');
        jwt.verify.restore()
    });
});

