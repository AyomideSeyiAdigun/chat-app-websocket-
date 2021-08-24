<template>
    <body>
        <div style="width:100%; height:40px; background-color:green">@  {{$route.params.id}} </div>

  <div >
    <div v-for="(info,i) in displayMessage" :key="i">
      
      <div :style="(info.reciever ==logger || info.recieved==true ? {'float':'left'}:{'float':'right'}) "> {{info.res}} {{info.message}}</div> <br>

    </div>

  </div>



    <br>
      <textarea v-model="messages" cols="30" rows="2"></textarea>  <button v-on:click="sendMessage()" >send</button>
        <br> <br>
        <div style="width:100%; height:40px; background-color:green"> footer</div>
    </body>
</template>

<script> 
import axios from 'axios'
 import Socketio from "socket.io-client"

export default  {
    data() {
      return{
        socket:{},
        port:'http://localhost:6720',
        messages:'',
         displayMessage:[],
         logger:''
      }  
    } ,
    methods:{
     
            sendMessage(){
               let reciever= sessionStorage.getItem('reciever')
               let sender = sessionStorage.getItem('loggedIn')
                let msgdisplay={
                  res:this.messages,
                  recieved:false
                }
              this.displayMessage.push(msgdisplay)

              
               let messages={
                 myMessage:this.messages,
                 reciever
               }
               this.socket.emit('message', messages)



               axios.post('http://localhost:6720/message',{ message:this.messages,reciever,sender}).then(res=>{
                  res.data

             })
             this.messages = ''
            }
    },
    mounted(){ 
      let sender = sessionStorage.getItem('loggedIn')
      let socket = Socketio(this.port)
      this.socket=socket
      this.socket.emit('person',sender)
 
  this.logger=sender
      this.socket.on('historymesg',res=>{
        this.displayMessage=[...res]
      })
      this.socket.on('message',res=>{
        let recieved={
          res,
          recieved:true
        }
       this.displayMessage.push(recieved)
      })

      
    }
}
</script>

 