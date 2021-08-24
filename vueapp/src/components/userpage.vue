<template>
  <User/>
<h3>CURRENT USERS</h3>
<div style="height:240px;overflow:auto;">
    <div v-for="(user,i) in users.username " :key="i" >
    <div>{{i+1}}.<button v-on:click="gotoDm(i,user)">{{user}}</button></div> <br>
    </div>
</div>
</template>
<script>
 import axios from "axios";
 import User from "./navbar.vue";
import router from '../router';
import Socketio from "socket.io-client"
export default {
    data() {
       return{
           users:'',
            socket:{},
            port:'http://localhost:6720',
            messages:'',
       } 
    },
    components:{
        User
    },
    mounted(){
            let sender = sessionStorage.getItem('loggedIn')
          axios.get('http://localhost:6720/users').then(res=>{

            let findd= res.data.emails.find(info=>(info !==sender))
            let idx= res.data.emails.indexOf(findd)
            res.data.username= res.data.username.filter((_,i)=>(i !==idx))
             res.data.emails= res.data.emails.filter(info=>(info !==sender))
               this.users=res.data
             
             })

      let socket = Socketio(this.port)
      this.socket=socket
       this.socket.emit('person',sender)
       
    },
    methods:{
        gotoDm(val,username){
            let user = this.users.emails.find((o,inf)=>(inf == val))
            sessionStorage.setItem('reciever', user)
            axios.get(`http://localhost:6720/chat/${user}`)
            router.push({path:'/chat/'+username})
            this.socket.emit('sendDm',user)
        }
    }
    
}
</script>
