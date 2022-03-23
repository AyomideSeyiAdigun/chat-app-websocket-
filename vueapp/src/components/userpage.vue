<template>
  <Navbar/>
  <br>

 <input type="search" v-model="search"> <button @click="serchPerson()"> Search user</button>
<div class="container mt-5 d-flex justify-content-center " v-if="personProfile!=='not' && personProfile !== false ">
    <div class="maincard p-3">
        <div class="thecard">
            <div class="thefront text-center py-4"> <img src="https://i.imgur.com/o5uMfKo.jpg" class="rounded-circle" width="100">
                <h3 class="mt-2 mb-0">{{personProfile.name}}</h3> <small class="user_name">@{{personProfile.username}}</small>
                <div class="stats d-flex justify-content-between px-3 mt-3">
                    <div class="stats-1 d-flex flex-column"> <span>132</span> <span>Followers</span> </div>
                    <div class="stats-1 d-flex flex-column"> <span>16</span> <span>Following</span> </div>
                    <div class="stats-1 d-flex flex-column"> <span>80%</span> <span>Match</span> </div>
                </div>
            </div>
            <div class="theback text-center py-3 px-3">
                <h4>About {{personProfile.name}}</h4>
                <p class="about text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div class="px-5"><p> <button class="btn follow-button  ">Follow</button>  <svg @click="gotoDm()"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" style="marginLeft:10px;width:35px;height:35px;" viewBox="0 0 16 16">
  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
</svg> </p></div>
            </div>
        </div>
    </div>
</div>

<div class="container mt-5 d-flex justify-content-center " v-if=" personProfile=='not' ">
  User not Found!
</div>
</template>
<script>
 import axios from "axios";
 import Navbar from "./navbar.vue";
import router from '../router';
import Socketio from "socket.io-client"
export default {
    data() {
       return{
           users:'',
            socket:{},
            port:'http://localhost:6720',
            messages:'',
            search:'',
            personProfile:false
       } 
    },
    components:{
        Navbar
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
        gotoDm(){
          
            sessionStorage.setItem('reciever',this.personProfile.email )
            axios.get(`http://localhost:6720/chat/${this.personProfile.email}`)
            router.push({path:'/chat/'+this.personProfile.username})
            this.socket.emit('sendDm',this.personProfile.email)
        },
        serchPerson(){
          let finduserEmail = this.users.emails.find((inf)=>(inf == this.search))
          if ( finduserEmail !== ''){
            axios.post('http://localhost:6720/finduser',{finduserEmail}).then(res=>{
              this.personProfile=res.data
            })
          }
          else {
          this.personProfile= 'not'
          }
          
        }
    }
    
}
</script>

<style scoped>
.maincard {
    position: absolute;
    width: 300px;
    height: 300px
}

.thecard {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: all 0.8s ease
}

.thecard:hover {
    transform: rotateY(180deg)
}

.thefront {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: hidden;
    background: #8E24AA;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid #eee;
    box-shadow: 5px 6px 6px 2px #e9ecef;
    padding: 10px
}

.theback {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: hidden;
    background: #BA68C8;
    color: #fff;
    border-radius: 10px;
    transform: rotateY(180deg);
    border: 1px solid #eee;
    box-shadow: 5px 6px 6px 2px #e9ecef;
    padding: 10px
}

.btn {
  margin-left: -30px;
    padding-left: 20px;
    padding-right: 20px
}

.user_name {
    color: #eee;
    font-size: 10px;
    margin-top: 0px
}

.about {
    font-size: 12px
}

.follow-button,
.follow-button:active,
.follow-button:visited,
.follow-button:focus {
    background-color: #8E24AA !important;
    border-color: #8E24AA !important;
    color: #fff !important;
    box-shadow: none
}

.follow-button:hover {
    background-color: #69157f !important;
    border-color: #69157f !important
}
</style>