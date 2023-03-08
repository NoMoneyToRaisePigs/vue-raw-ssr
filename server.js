import koa from 'koa'
import koaRouter from 'koa-router'
import koaStatic from 'koa-static'

import { createApp } from './app.js'
import { renderToString } from 'vue/server-renderer'
// const koa = require('koa')
// const koaRouter = require('koa-router')()

const router = koaRouter()
const server = new koa()
const port = 8080

server.use(koaStatic('./'))
server.use(router.routes())

//what's the difference between createSSRApp and createApp??


router.get('/', async (ctx) => {  
   const html = await renderToString(createApp())
   ctx.body = `
         <!DOCTYPE html>      
         <html lang="en">
           <head>
             <title>Vue Raw SSR</title>
           </head>
           <script type="importmap">
            {
               "imports": {
                  "vue": "/node_modules/vue/dist/vue.esm-browser.js"
               }
            }
            </script>
           <body>
            <div id="app">${html}</div>
           </body>
           <script type="module" src="/client.js"></script>
         </html>
   `
})

server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
})