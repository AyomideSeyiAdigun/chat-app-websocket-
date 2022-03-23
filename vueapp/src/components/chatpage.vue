<template>
    <div>
    <Navbar/>
    </div>
</template>
<script>
  import Navbar from "./navbar.vue";
  import Socketio from "socket.io-client"
export default  {
    data() {
     return{
         socket:{},
        port:'http://localhost:6720',
        messages:'' ,
        myUser:[],
     }   
    },
    components:{
        Navbar
    },
    mounted(){ 
      let sender = sessionStorage.getItem('loggedIn')
      let socket = Socketio(this.port)
      this.socket=socket
      this.socket.emit('person',sender)
      this.socket.on('user',res=>{
        this.myUser = res
      })
    }
}
</script>
