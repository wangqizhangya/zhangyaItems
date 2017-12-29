<template>
  <div id="app">
    <div class="content">
        <router-link to="/"></router-link>
        <router-link to="/edit"></router-link> 
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss" type="text/css">
*{
	margin:0!important;
	padding:0!important;
}
body{
	width:100%;
}
#app{
	width:100%;
	height:100%;
}


</style>
