'use strict';

jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;
defineTest(__dirname, 'sort-constructor', null, 'sort-constructor');
defineTest(__dirname, 'sort-constructor', null, 'WithNgInject');
