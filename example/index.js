/**
 * The Example of Using Lark-Router in a Koa App
 **/
'use strict';
process.mainModule = module;

const Koa     = require('koa');
const Router  = require('lark-router');

const app     = new Koa();
const router  = new Router();

/**
 * Basic route example
 **/
router.get('/hello/world', async (ctx) => {
    ctx.body = 'Hello World!';
});

/**
 * Different methods
 **/
router.post('/how/are/you', async (ctx) => {
    ctx.body = 'Fine, thank you. And you ?';
});

router.delete('/good/bye', async (ctx) => {
    ctx.body = 'Oh, see you tomorrow.';
});

/**
 * Params
 **/
router.get('/my/name/is/:name', async (ctx) => {
    ctx.body = `Nice to meet you, ${ctx.params.name}`;
});

/**
 * Params with regexp as params type
 **/
router.get('/what/is/the/answer/of/:numberA(-?\\d+)/plus/:numberB(-?\\d+)', async (ctx) => {
    let a = parseInt(ctx.params.numberA, 10);
    let b = parseInt(ctx.params.numberB, 10);
    ctx.body = `The answer is ${a + b}`;
});

/**
 * Use regexp directly
 **/
router.get(/^\/([a-zA-Z]*)\/is\/(\d+)$/, async (ctx) => {
    let name = ctx.params[0];
    let age = ctx.params[1];
    ctx.body = `${name} is ${age} years old`;
});

/**
 * Nested Routers and anonymous params
 **/
const nextRouter = new Router();
let boyAge, girlAge;
nextRouter.get('/she/is/(\\d+)', async (ctx) => {
    boyAge  = parseInt(ctx.params[0], 10);
    girlAge = parseInt(ctx.params[1], 10);
    switch (true) {
    case boyAge > girlAge:
        ctx.body = 'The boy is elder than the girl';
        break;
    case boyAge === girlAge:
        ctx.body = 'The boy is the same age as the girl';
        break;
    case boyAge < girlAge:
        ctx.body = 'The boy is younger than the girl';
        break;
    }
});

router.get('/he/is/(\\d+)/and', nextRouter);

/**
 * Special methods
 **/
router.get('/foo/bar', async (ctx) => {
    ctx.body = '[GET]';
});
router.routed('/foo/:rest*', async (ctx) => {
    ctx.body += '[MARKED AS ROUTED]';
});
router.other('/foo/:rest*', async (ctx) => {
    ctx.body = '[MARKED AS NOT ROUTED]';
});
router.all(/.*/, async (ctx) => {});

app.on('error', error => console.log(error.stack));

module.exports = app.use(router.routes()).listen(3001);

