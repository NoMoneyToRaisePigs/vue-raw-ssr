const Vue = require('Vue') 
const { createApp, createRenderer } = Vue

const renderer = createRenderer() 
const app = createApp({
   template: `<div id="app">{{msg}}</div>`,
   data(){
     return {
       msg: 'This is renderred by vue-server-renderer'
     }
   }
})


  //该方法接受两个参数，第一个是Vue实例，第二个是一个回调函数，在渲染完成后执行
renderer.renderToString(app, (err, html) => {   //渲染得到的字符串作为回调函数的第二个参数传入
   if (err) { 
      ctx.body = err
   } else { 
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
   }
 })

