const koa = require('koa')
const koaRouter = require('koa-router')()
const server = new koa()
const port = 8080

server.use(koaRouter.routes())


const createApp = require('vue').createApp
const renderToString = require('vue/server-renderer').renderToString

//what's the difference between createSSRApp and createApp??

const app = createApp({
   template: `
   <div id="app">
      <p>{{msg}}</p>
      <button @click="increaseCount">{{count}}</button>
   </div>`,
   data(){
      return {
       count: 1,
       msg: 'hello ssr!'
     }
   },
   methods: {
      increaseCount() { 
         this.count++
      }
   }
})

koaRouter.get('/', async (ctx) => {
   // ctx.body = `
   // <!DOCTYPE html>      
   // <html lang="en">
   //   <head>
   //     <title>Vue Raw SSR</title>
   //   </head>
   //   <body>
   //     <div>Hello Server !</div>
   //   </body>
   // </html>
   // `
   
   const html = await renderToString(app)
   ctx.body = `
         <!DOCTYPE html>      
         <html lang="en">
           <head>
             <title>Vue Raw SSR</title>
           </head>
           <body>
             ${html}
           </body>
         </html>
   `

   // renderer.renderToString(app, (err, html) => {   //渲染得到的字符串作为回调函数的第二个参数传入
   //    if (err) { 
   //       ctx.body = err
   //    } else { 
   //       ctx.body = `
   //       <!DOCTYPE html>      
   //       <html lang="en">
   //         <head>
   //           <title>Vue Raw SSR</title>
   //         </head>
   //         <body>
   //           ${html}
   //         </body>
   //       </html>
   //       `
   //    }
   //  })
})

server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
})