<template>
<div>
    <div class='nav'>
		<router-link class='button' to='/home'>Revenir à la page d'acceuil</router-link>
        <router-link class='button' to='/users'>Voir la liste des utilisateurs</router-link>
    </div>
    <h1>Coucou voici {{ user.firstName }} {{ user.lastName }}</h1>
    <p>{{ user.email }}</p>
</div>
</template><script type='text/javascript'>
	import axios from 'axios'
	let myComponent ={
		name: 'userDetails',
		data: function(){ return {
			user: this.$route.params.user
		}},
		methods: {},
		mounted(){}
	}
	export default myComponent
</script>
<style type='text/css' scoped></style>