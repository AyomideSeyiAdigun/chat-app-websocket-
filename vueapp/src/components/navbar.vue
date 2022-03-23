<template>
   <nav class="navbar navbar-expand-lg navbar-light bg" style="height:max-content; background-color:#030e24; text-align:center">
  <a class="navbar-brand" href="#">AIG</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse  " id="navbarTogglerDemo02">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0 ">
      <li class="nav-item ">
         <router-link class="nvas" to="/recent-chats" >Recent chats</router-link> 
      </li>
      <li class="nav-item">
        <router-link class="nvas" to="/chat/users">Find User</router-link>
      </li>
      <li class="nav-item">
      <router-link class="nvas" to="/groups">Groups</router-link> 
      </li>
      <li class="nav-item">
      <router-link class="nvas" to="/about">Profile</router-link> 
      </li>
      <li class="nav-item">
      <router-link class="nvas" to="/">Logout</router-link> 
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {
  data() {
    return{

    }
  },
}
</script>
<style scoped>
.nvas{
    color: white;
    font-size: 27px;
    margin-right: 25px;
    text-decoration: none;
}
</style>