import { createSSRApp } from "vue";

export function createApp() { 
   return createSSRApp(
      {
         template: `
            <div>
               <div><div>{{ msg }}</div></div>
               <button @click="increaseCount">{{ count }}</button>
            </div>
         `,
         data(){
            return {
             count: 1,
             msg: 'hello!'
           }
         },
         methods: {
            increaseCount() { 
               this.count++
            }
         }
      }
   )
}