<template>
 
 <Navbar/>
<div class="container-fluid"  >
  <div class="row">
    <div class="col-md-12" style="background-color:rgb(172, 174, 194);height:500px; " >
      <div style="margin-top:100px; text-align: center; ">
     <h1> ETHWAS CHAT APPLICATION</h1>
      <h3> Easy to use and Privacy oriented.A chat application for all</h3>
      <button class="btn">Login</button>   <button class="btn ">Sign up</button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12"  style="background-color:rgb(49, 49, 143););height:max-content;color:white; font-size:25px;word-wrap: break-word;" >
     <br> <h1>HOW DOES ETHWAS WORKS?</h1>
      <h3>Ethwas is a social application. </h3>
      <p>1.Click on Sign up and supply neccessary informations to register </p>
      <p>2. Login in to your account and start chatting</p>
      <p>3.There are rooms you can join for disccussions</p>
      <p>Note: You must know the username of the person you want to chat with,that is the only means you can search and chat them up.</p>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12" style="background-color:white;height:300px;">
    <br> <h1>Sign up now</h1> <br>
      <button class="btn"> LOGIN HERE</button> 
      <button class="btn"> SIGN UP NOW </button>
     </div>
  </div>
  <div class="row">
    <div class="col-md-12" style="background-color: rgb(1, 1, 41);height:400px;" >
       <br> <h1>CONTACTS</h1>
       facebook
       twitter
       linkdeln
       whatsapp
       email
    </div>
  </div>
</div>
  
</template>

<script>
// @ is an alias to /src
import Navbar from '@/views/Navbar.vue'

export default {
  name: 'Home',
  components: {
   Navbar
  }
}
</script>

<style scoped>
 .btn{
  background-color: rgb(1, 1, 41);
  color: white;
  margin-right: 15px;
 }
</style>