const co = require('co');
const assert = require('assert');
const {expect} = require('chai');

const Helper = require('hubot-test-helper');
const helper = new Helper('../scripts');
let room = undefined;

describe('Karmabot', () => {
  beforeEach(() => {
    room = helper.createRoom();
  });

  afterEach(() => {
   room.destroy();
  });
});
