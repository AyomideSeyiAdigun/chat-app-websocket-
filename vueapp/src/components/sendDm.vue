<template>
<body>
    <!--  
        <div style="width:100%; height:40px; background-color:green">@  {{$route.params.id}} </div>
  <div >
    <div v-for="(info,i) in displayMessage" :key="i"> 
  <div :style="(info.reciever ==logger || info.recieved==true ? {'float':'left'}:{'float':'right'}) "> {{info.res}} {{info.message}}</div> <br>
    </div>
  </div>
    <br>
      <textarea v-model="messages" cols="30" rows="2"></textarea>  <button v-on:click="sendMessage()" >send</button>
        <br> <br>
        <div style="width:100%; height:40px; background-color:green"> footer</div> -->

    <div class="container-fluid h-100">
			<div class="row justify-content-center h-100">
				<div class="col-md-12 col-xl-12 chat">
					<div class="card">
						<div class="card-header msg_head">
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">
									<span class="online_icon"></span>
								</div>
								<div class="user_info">
									<span>Chat with {{$route.params.id}}</span>
									<p> Messages</p>
								</div>
								<div class="video_cam">
									<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
</svg></span>
									<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
</svg></span>
								</div>
							</div>
							<span id="action_menu_btn" ><svg @click="showMenu()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
</svg></span>
							<div class="action_menu">
								<ul>
									<li><i class="bi bi-person-circle"></i> View profile</li>
									<li><i class="bi bi-person-plus-fill"></i> Add to close friends</li>
									<li><i class="bi bi-people-fill"></i> Add to group</li>
									<li><i class="bi bi-x"></i> Block</li>
								</ul>
							</div>
						</div>
						<div class="card-body msg_card_body" >
						<div v-for="(info,i) in displayMessage" :key="i"> 
							<div class="d-flex justify-content-start mb-4" v-if="info.recieved">
								<div class="img_cont_msg" >
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg">
								</div>
								<div class="msg_cotainer">
									{{info.message}} 
									<span class="msg_time">time</span>
								</div>
							</div>
							<div class="d-flex justify-content-end mb-4" v-if="!info.recieved">
								<div class="msg_cotainer_send">
										{{info.res}}
									<span class="msg_time_send">Time</span>
								</div>
								<div class="img_cont_msg">
							<img src="" class="rounded-circle user_img_msg">
								</div>
							</div>
						</div>
						</div>
						<div class="card-footer">
							<div class="input-group">
								<div class="input-group-append">
									<span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
								</div>
								<textarea name=""  v-model="messages" class="form-control type_msg" placeholder="Type your message..."></textarea>
								<div class="input-group-append">
									<span class="input-group-text send_btn"> <button v-on:click="sendMessage()">send</button></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
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
        logger:'',
		displayMenu:false
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
            },
			showMenu(){	
			if (this.displayMenu){
			document.getElementsByClassName('action_menu')[0].style.display='none'
			this.displayMenu = false
			}
			else{	 
			document.getElementsByClassName('action_menu')[0].style.display='block'
			this.displayMenu = true
				}	 
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

 <style scoped>
		.chat{
			margin-top: auto;
			margin-bottom: auto;
		}
		.card{
			height: 500px;
			border-radius: 15px !important;
			background-color: rgba(0,0,0,0.4) !important;
		}
		.contacts_body{
			padding:  0.75rem 0 !important;
			overflow-y: auto;
			white-space: nowrap;
		}
		.msg_card_body{
			overflow-y: auto;
		}
		.card-header{
			border-radius: 15px 15px 0 0 !important;
			border-bottom: 0 !important;
		}
	.card-footer{
	border-radius: 0 0 15px 15px !important;
		border-top: 0 !important;
	}
	.container{
			align-content: center;
		}
		.search{
			border-radius: 15px 0 0 15px !important;
			background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color:white !important;
		}
		.search:focus{
		box-shadow:none !important;
    outline:0px !important;
		}
		.type_msg{
			background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color:white !important;
			height: 60px !important;
			overflow-y: auto;
		}
		.type_msg:focus{
		box-shadow:none !important;
      outline:0px !important;
		}
		.attach_btn{
	border-radius: 15px 0 0 15px !important;
	background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color: white !important;
			cursor: pointer;
		}
		.send_btn{
	border-radius: 0 15px 15px 0 !important;
	background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color: white !important;
			cursor: pointer;
		}
		.search_btn{
			border-radius: 0 15px 15px 0 !important;
			background-color: rgba(0,0,0,0.3) !important;
			border:0 !important;
			color: white !important;
			cursor: pointer;
		}
		.contacts{
			list-style: none;
			padding: 0;
		}
		.contacts li{
			width: 100% !important;
			padding: 5px 10px;
			margin-bottom: 15px !important;
		}
	.active{
			background-color: rgba(0,0,0,0.3);
	}
		.user_img{
			height: 70px;
			width: 70px;
			border:1.5px solid #f5f6fa;
		
		}
		.user_img_msg{
			height: 40px;
			width: 40px;
			border:1.5px solid #f5f6fa;
		
		}
	.img_cont{
			position: relative;
			height: 70px;
			width: 70px;
	}
	.img_cont_msg{
			height: 40px;
			width: 40px;
	}
	.online_icon{
		position: absolute;
		height: 15px;
		width:15px;
		background-color: #4cd137;
		border-radius: 50%;
		bottom: 0.2em;
		right: 0.4em;
		border:1.5px solid white;
	}
	.offline{
		background-color: #c23616 !important;
	}
	.user_info{
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 15px;
	}
	.user_info span{
		font-size: 20px;
		color: white;
	}
	.user_info p{
	font-size: 10px;
	color: rgba(255,255,255,0.6);
	}
	.video_cam{
		margin-left: 50px;
		margin-top: 5px;
	}
	.video_cam span{
		color: white;
		font-size: 20px;
		cursor: pointer;
		margin-right: 20px;
	}
	.msg_cotainer{
		margin-top: auto;
		margin-bottom: auto;
		margin-left: 10px;
		border-radius: 25px;
		background-color: #82ccdd;
		padding: 10px;
		position: relative;
	}
	.msg_cotainer_send{
		margin-top: auto;
		margin-bottom: auto;
		margin-right: 10px;
		border-radius: 25px;
		background-color: #78e08f;
		padding: 10px;
		position: relative;
	}
	.msg_time{
		position: absolute;
		left: 0;
		bottom: -15px;
		color: rgba(255,255,255,0.5);
		font-size: 10px;
	}
	.msg_time_send{
		position: absolute;
		right:0;
		bottom: -15px;
		color: rgba(255,255,255,0.5);
		font-size: 10px;
	}
	.msg_head{
		position: relative;
	}
	#action_menu_btn{
		position: absolute;
		right: 10px;
		top: 10px;
		color: white;
		cursor: pointer;
		font-size: 20px;
	}
	.action_menu{
		z-index: 1;
		position: absolute;
		padding: 15px 0;
		background-color: rgba(0,0,0,0.5);
		color: white;
		border-radius: 15px;
		top: 30px;
		right: 20px;
		display: none;
	}
	.action_menu ul{
		list-style: none;
		padding: 0;
	margin: 0;
	}
	.action_menu ul li{
		width: 100%;
		padding: 10px 15px;
		margin-bottom: 5px;
	}
	.action_menu ul li i{
		padding-right: 10px;
	
	}
	.action_menu ul li:hover{
		cursor: pointer;
		background-color: rgba(0,0,0,0.2);
	}
	@media(max-width: 576px){
	.contacts_card{
		margin-bottom: 15px !important;
	}
	}
 </style>