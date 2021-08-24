<template>
    <div>
        WELCOME

        Kindly Register below.

        <div>
            <div>
                <label> First name:</label><br>
                    <input type="text" v-on:keyup ="check.fn=false" v-model="form.Fname">
                <p v-if="check.fn"   style="color:red; font-size:small; marginTop:-0.5px;">* First Name is required </p>
            </div> <br v-if="!check.fn">
            <div>
                <label for=""> Last name:</label><br>
                    <input type="text"  v-on:keyup ="check.ln=false" v-model="form.Lname">
                     <p v-if="check.ln" style="color:red; font-size:small; marginTop:-0.5px;">* Last Name is required </p> 
            </div>  <br v-if="!check.ln">
            <div>
                <label for=""> Email:</label><br>
                    <input type="text" v-on:keyup ="check.em=false" v-model="form.Email">
                     <p v-if="check.em" style="color:red; font-size:small; marginTop:-0.5px;">* Email is required </p>
            </div><br v-if="!check.em">
            <div>
                <label for=""> Password:</label><br>
                    <input type="text" v-on:keyup ="check.pa=false"  v-model="form.Password">
                     <p v-if="check.pa" style="color:red; font-size:small; marginTop:-0.5px;">* Passsword is required </p>
            </div> <br v-if="!check.pa">
            <div>
                <label for=""> Confirm password:</label> <br>
                    <input type="text" v-on:keyup ="check.cp=false"  v-model="form.Conpassword">
                     <p v-if="check.cp" style="color:red; font-size:small; marginTop:-0.5px;">* Password does not match </p>
            </div> <br>
            <button  v-on:click="submitUser()"  >submit</button>
        </div>
       
    </div>
</template>

<script> 
 
import axios from "axios";
  
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

             })
         }

     }
}
</script>
