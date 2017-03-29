#!/usr/bin/env node
require('babel-polyfill');
const Console = require('better-console');
const GPWcrawl = require('../dist/index').default;

Console.log('Fetching companies');

GPWcrawl()
.then((array) => {
  Console.log(array);
})
.catch((gpwError, ncError) => {
  Console.log(gpwError, ncError);
});
