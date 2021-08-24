<template>
  <div class="about">
 <div>
          
            <div>
                <label for=""> Email:</label><br>
                    <input v-model="login.email" type="text">
            </div>
            <div>
                <label for=""> Password:</label><br>
                    <input v-model="login.password" type="text">
            </div>
              <br>
            <button type="submit" v-on:click ="loginInfo()">submit</button>
        </div>
  </div>
</template>


<script>
import axios from "axios"
 import router from '../router'
export default {
  
  data() {
    return{
      login:{
        email:'',
        password:''
      }
    }
  },
  methods:{
    loginInfo(){
      axios.post('http://localhost:6720/loginForm', this.login).then(res=>{
          if(res.data == false){
            alert('user not found')
          }else if(res.data){
            sessionStorage.setItem('loggedIn',this.login.email)
            router.push({path:'/chat'})
          }

    })
    }
    }
}
</script>

