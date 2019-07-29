//const expect = require('chai').expect;
const assert = require('chai').assert;
const expect = require('chai').expect;
const {sendmessge} = require('../../../../app/modules/login/service/smsServise');
const mobileNo = '+94711307355';

describe('send sms to user', function() {
    it('sendmessge() should have sender phone no', function() {
        sendmessge(mobileNo, function(status, response, pin) {
            assert.isObject(response);
        });
    });
});
