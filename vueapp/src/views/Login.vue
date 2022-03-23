<template>
<Navbar/>    <br> <br> <br>
  <div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-4 ">
            <div class="card p-0">
                <div class="card-title text-center">
                    <h5 class="mt-5">HEY, THERE</h5> <small class="para"> YOU ARE WELCOME!.</small>
                </div>
                <form class="form-row justify-content-center">
                    <div class="form-group col-md-9"> <input v-model="login.email" placeholder="Username" class="form-control" type="text"></div>
                    <div class="form-group col-md-9"><input type="password"  v-model="login.password" class="form-control" placeholder="password"></div>
                    <div class="form-group col-md-9"> <button type="button"  v-on:click ="loginInfo()" class="btn btn-primary">Login</button></div>
                    <div class="row">
                        <div class="col-6 col-md-12"> <a href="#">
                                <span class="text-left pt-2" >Forgot password? </span>
                            </a> 
                             <a href="/register">
                                <span class="text-right pt-2 ml-4">Sign Up Now</span>
                            </a>
                             </div>
               
                    </div> <br><br>
                    <div class="row">
                        <div class="d-flex mx-auto pt-1 pb-3"> <a href="#"><i class="fab fa-facebook"></i></a> <a href="#"><i class="fab fa-twitter"></i></a> <a href="#"><i class="fab fa-linkedin"></i></a> </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>


<script>
import axios from "axios"
 import router from '../router'
 import Navbar from './Navbar.vue'
export default {
  
  data() {
    return{
      login:{
        email:'',
        password:''
      }
    }
  },
  components:{
      Navbar
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


<style scoped>
body {
    font-family: Arial, Helvetica, sans-serif;
  
}

.card {
    border: '2px rgb(0, 9, 32)';
    border-radius: 0;
    margin: 0 auto;
    background-color: rgba(26, 153, 132, 0.1)
}

.form-row0 {
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding: 10px 50px
}

a {
    text-decoration: none !important
}

h5 {
    color: #18056d;
    margin-bottom: 3px;
    font-weight: bold
}

small {
    color: rgba(0, 0, 0, 0.3)
}

/* input {
    width: 100%;
    display: block;
    margin-bottom: 7px
} */

.form-control {
    border: 1px solid #09031a75;
    border-radius: 30px;
    background-color: rgba(0, 0, 0, .075);
    letter-spacing: 1px
}

.form-control:focus {
    border: 0.5px solid #032d4675;
    border-radius: 30px;
    box-shadow: none;
    background-color: rgba(0, 0, 0, .075);
    color: #000;
    letter-spacing: 1px
}

.btn {
    display: block;
    width: 100%;
    border-radius: 30px;
    border: none;
    background: linear-gradient(to right, rgb(10, 70, 126) 0%, rgb(8, 25, 102) 100%);
    background: -webkit-linear-gradient(left, rgb(1, 19, 66) 0%, rgb(24, 165, 247) 100%)
}

.text-left {
    color: rgba(0, 0, 0, 0.3);
    font-weight: 400
}

.text-right {
    color: #082b79;
    font-weight: bold
}

span.text-center {
    color: rgba(0, 0, 0, 0.3)
}

.fab {
    padding: 15px;
    font-size: 23px
}

.fa-facebook {
    color: #0303d9bf
}

.fa-twitter {
    color: #0078fade
}

.fa-linkedin {
    color: #18b1c0
}
</style>

