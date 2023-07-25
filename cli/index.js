#!/usr/bin/env node
/* eslint-disable no-unused-expressions */

const yargs = require('yargs');
const GLOBAL_OPTIONS = require('./options/global.json');

// eslint-disable-next-line no-unused-expressions
yargs.options(GLOBAL_OPTIONS).commandDir('commands').help().argv;
