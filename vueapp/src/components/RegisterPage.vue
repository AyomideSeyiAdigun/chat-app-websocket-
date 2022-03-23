<template>
<Navbar/> <br><br><br>
<div class="container">
    <div class="row justify-content-center">
    <div class="col-md-7" style="  background:  rgba(26, 153, 132, 0.1); box-shadow: 2px 2px 3px rgba(0,0,0,0.1);border:2px solid #18056d">
      <h3>WELCOME</h3>
      <h4>Kindly register below!</h4>
    <div>
    <label>
    <p class="label-txt">ENTER YOUR NAME</p>
    <input type="text" class="input" v-on:keyup ="check.fn=false" v-model="form.Fname">
    <div class="line-box">
      <div class="line"></div>
    </div>
    <p v-if="check.fn"   style="color:red; font-size:small; marginTop:-0.5px;">* First Name is required </p>
  </label>
    </div>
   <div>
  <label>
    <p class="label-txt">ENTER YOUR USERNAME</p>
    <input type="text" class="input"  v-on:keyup ="check.ln=false" v-model="form.Lname">
    <div class="line-box">
      <div class="line"></div>
    </div>
      <p v-if="check.ln" style="color:red; font-size:small; marginTop:-0.5px;">* Last Name is required </p> 
  </label>
    </div>
   <div>
  <label>
    <p class="label-txt">ENTER YOUR EMAIL</p>
    <input type="text" class="input" v-on:keyup ="check.em=false" v-model="form.Email">
    <div class="line-box">
      <div class="line"></div>
    </div>
      <p v-if="check.em" style="color:red; font-size:small; marginTop:-0.5px;">* Email is required </p>
  </label>
    </div>
   <div>
  <label>
    <p class="label-txt">ENTER YOUR PASSWORD</p>
    <input type="text" class="input"  v-on:keyup ="check.pa=false"  v-model="form.Password">
    <div class="line-box">
      <div class="line"></div>
    </div>
     <p v-if="check.pa" style="color:red; font-size:small; marginTop:-0.5px;">* Passsword is required </p>
  </label>
  </div>
   <div>
  <label>
    <p class="label-txt">CONFIRM PASSWORD</p>
    <input type="text" class="input"  v-on:keyup ="check.cp=false"  v-model="form.Conpassword">
    <div class="line-box">
      <div class="line"></div>
    </div>
     <p v-if="check.cp" style="color:red; font-size:small; marginTop:-0.5px;">* Password does not match </p>
  </label>
  </div>
   
  <button class="mb-4"   v-on:click="submitUser()">submit</button>
 

  </div>
    </div>
</div>
    
</template>

<script> 
 
import axios from "axios";
import Navbar from '../views/Navbar.vue'
import router from '../router';
export default {
  
     data(){
         return{
             form:{
                 Fname:'',
                 Lname:'',
                 Email:'',
                 Password:'',
                 Conpassword:'',
             },
             check:{
                 fn:false,
                 ln:false,
                 em:false,
                 pa:false,
                 cp:false
             },
             registeredMembers:[]
         }
     },
     components:{
       Navbar
     },
     methods:{
         
         submitUser(){
             if(this.form.Fname==''){
                this.check.fn = true 
                 return
             }else if (this.form.Lname==''){
                this.check.ln = true 
                 return
             } 
             else if (this.form.Email==''){
                this.check.em = true 
                 return
             } else if (this.form.Password==''){
                this.check.pa = true 
                 return
             } else if (this.form.Conpassword !== this.form.Password ){
                this.check.cp = true 
                 return
             } 

             this.registeredMembers.push(this.form)

             axios.post('http://localhost:6720/submitForm', this.form).then(res=>{
                 alert(res.data)
                  router.push('/login')

             })

            
         }

     }
}

</script>

<style scoped>
.col {
  margin: 60px auto;
;
  padding: 60px 120px 80px 120px;
  text-align: center;
  -webkit-box-shadow: 2px 2px 3px rgba(0,0,0,0.1);
  box-shadow: 2px 2px 3px rgba(0,0,0,0.1);
}
label {
  display: block;
  position: relative;
  margin: 40px 0px;
}
.label-txt {
  position: absolute;
  top: -1.6em;
  padding: 10px;
  font-family: sans-serif;
  font-size: .8em;
  letter-spacing: 1px;
  color: rgb(120,120,120);
  transition: ease .3s;
}
.input {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: none;
  outline: none;
}

.line-box {
  position: relative;
  width: 100%;
  height: 2px;
  background: #BCBCBC;
}

.line {
  position: absolute;
  width: 0%;
  height: 2px;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: #18056d;
  transition: ease .6s;
}

.input:focus + .line-box .line {
  width: 100%;
}

.input:focus {
  top: -3em;
}
.label-active {
  top: -3em;
}

button {
  display: inline-block;
  padding: 12px 24px;
  background: rgb(220,220,220);
  font-weight: bold;
  color: rgb(120,120,120);
  border: none;
  outline: none;
  border-radius: 3px;
  cursor: pointer;
  transition: ease .3s;
}

button:hover {
  background: #18056d;
  color: #ffffff;
}

</style>
