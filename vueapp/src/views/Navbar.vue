<template>
    <nav class="navbar navbar-expand-lg navbar-light bg" style="height:80px; background-color:#030e24;">
  <a class="navbar-brand" href="#">AIG</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item ">
         <router-link class="nvas" to="/">Home</router-link> 
      </li>
      <li class="nav-item">
        <router-link class="nvas" to="/login">Login</router-link>
      </li>
      <li class="nav-item">
      <router-link class="nvas" to="/register">Register</router-link> 
      </li>
      <li class="nav-item">
      <router-link class="nvas" to="/about">About</router-link> 
      </li>
      <li class="nav-item">
      <router-link class="nvas" to="/contacts">Contact</router-link> 
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
</template>

<script>
export default {
    data(){
        return{

        }
    }
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