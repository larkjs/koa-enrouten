'use strict';

const debug = require('debug')('lark-router.exampels.controllers');

exports.GET = * (ctx) => {
    debug("GET /:id/me");
    ctx.body = 'GET /:id/me';
};
