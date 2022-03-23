// const express = require('express')  
// const app = express()
//  app.set('view engine','ejs')
// app.use(express.urlencoded({extended:true}))
//  const input = require('./forms')
//  app.use('/input',input)
 
// let saveBox= []
 
// app.get('/',(req,res)=>{
// res.render('index')
// })

// app.get('/about',(req,res)=>{
//     res.render('about')
//     })
//  app.get('/contact',(req,res)=>{
//     res.render('contact',{saveBox})
//      })
 
// app.post('/myForm',(req,res)=>{
//     let {body}=req
//     saveBox.push(body) 
//  console.log(req.files.picture)
 
//     res.render('contact',{saveBox})
// })
// app.get('/myForm:i',(req,res)=>{
//     let {i}=req.params
//     console.log(i)
//     let a=saveBox.filter((info,vl)=> ':'+vl !== i)
    
//    saveBox=a
  
//     res.render('contact',{saveBox})
    
// })
//     //   app.get('*',(req,res)=>{
    //     res.render('index')
    //      })

const express = require('express')  
const app = express()
const cors = require('cors')
const socketio = require('socket.io')
const http = require('http')
const server = http.createServer(app)
require('dotenv').config()
const mongoose = require('mongoose')
const uri = process.env.URI
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const io = socketio(server,{
    cors:{
        origin:'*',
        method:['POST','GET']
    }
})
app.use(cors( ))
app.use(express.urlencoded({extended:true}))
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).catch(err => {
    console.log(Error, err.message);
  })
  .then(() => console.log("DB Connected!"))
const userschema =mongoose.Schema({
    firstName:{
        required:true,
        type:String,
        minLength:3
    },
    lastName:{
        required:true,
        type:String,
        minLength:3
    },
    email:{
        required:true,
        type:String,
        minLength:3
    },
    password:{
        required:true,
        type:String,
        minLength:1
    }

})
const User = new mongoose.model('user',userschema)
const messageschema = mongoose.Schema({
    message:{
        required:true,
        type:String 
    },
    reciever:{
        required:true,
        type:String,
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        
    },
    whosend:{
        required:true,
        type:String,
    }
})
 

 
const Message = new mongoose.model('message',messageschema)
const myUser=[]
 
app.post('/submitForm',async (req,res)=>{
let {body} = req
const a =  await User.find({email:body.Email})
console.log(a)

if (a.length > 0){
res.send('email already exist')
return
} 
 User.create({firstName:body.Fname, lastName:body.Lname,email:body.Email,password:body.Password },(err,user)=>{
    res.send('success')
 })
     
})
server.listen(6720,()=>{
    console.log('app connected successfully')
})

app.post('/loginForm',async (req,res)=>{
    let {body} =req
    const user = await User.find({email:body.email})
    if (user.length == 0){
        res.send(false)
        return
    }else {
        res.send(true)
    } 
})
 
app.get('/users',async (req,res)=>{
    const user = await User.find()
    var username = user.map(function(friendsEmail){
        return friendsEmail.lastName;
    })
    var emails = user.map(function(friendsEmail){
        return friendsEmail.email;
    })

    let info={
        username,emails
    }
    res.send(info)
 
} )
 
app.get('/chat/:id',async (req,res)=>{
      let id = req.params.id
     let user = await User.findOne({email:id})

     
})
 
app.post('/message',async (req,res)=>{
let {body}= req
const user = await User.find({email:body.sender})
Message.create({message:body.message, reciever:body.reciever,sender:user[0],whosend:body.sender},(err,user)=>{
    console.log(err)
    res.send('success')
 })
   

})

app.post('/finduser',async (req,res)=>{
    let {body}=req
    const user = await User.find({email:body.finduserEmail})
    let myres ={
        email:user[0].email,
        name:user[0].firstName,
        username:user[0].lastName
    }
    res.send(myres)

})


io.on('connection', (socket) =>{    
let reIt;
 

    socket.on('person',async res=>{
    let check =  myUser.filter(info=>info.sender==res) 
    let check2 =  myUser.find(info=>info.sender==res) 
      reIt = res
            if (check.length>=1){
                let index = myUser.indexOf(check2)
                let user={userId :socket.id,sender:res}
                myUser[index]=user
            }
            else if (check.length==0){
                let user={userId :socket.id,sender:res}
                 myUser.push(user)
            }
            
      
           
            
         socket.emit('user',myUser)
    })
     socket.on('message',res=>{
       let chat = myUser.filter(info=>(info.sender == res.reciever))
       if (chat.length>=1) {
        chat =chat[0].userId
      
        socket.to(chat).emit('message',res.myMessage)  
       } 
        
    })
    socket.on('sendDm',async res=>{
    let colletMessages = await Message.find()
    let mesag = colletMessages.filter(info=>(info.whosend == reIt ||info.whosend==res ) && (info.reciever== reIt ||info.reciever==res))
   
    let chat = myUser.filter(info=>(info.sender == reIt))
    if (chat.length>=1) {
     chat =chat[0].userId
     socket.to(chat).emit('historymesg',mesag)  
    } 
   
    })
 })
const any = require('./test')
 
 
 
 