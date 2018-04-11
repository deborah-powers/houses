<template>
<div>
    <div class='nav'>
		<router-link class='button' to='/home'>Revenir à la page d'acceuil</router-link>
        <router-link class='button' to='/messages'>Voir la liste de vos messages</router-link>
        <router-link class='button' to='/'>Vous re-loguer</router-link>
    </div>
	<h1>liste des utilisateurs</h1>
	<div class='article' v-for='user in usersList'>
		<router-link v-bind:to="{name: 'userDetails', params: {
			id: user.id,
			user: user }}">{{ user.firstName }} {{ user.lastName }}</router-link>
		<router-link class='button' v-bind:to="{name: 'messageToUser', params: { id: user.id }}">Envoyer un message</router-link>
	</div>
</div>
</template>
<script type='text/javascript'>
	import axios from 'axios'
	let myComponent ={
		name: 'usersList',
		data: function(){
			return {
				usersList: []
			}
		},
		methods: {
			getUsers: function(){
				const backUrl = 'http://localhost:1407/users'
				const token = localStorage.getItem ('token')
				const config ={
					headers: { 'token': token }
				}
				// utiliser axios pour faire la connexion avec le back. passer le token dans headers
				axios.get (backUrl, config)
					.then((response) => {
						console.log ('reponse de usersList:', response.data.message)
						console.log ('liste des utilisateurs:', response.data.usersList)
						this.usersList = response.data.usersList
					})
					.catch((error) => {
					//	location.reload()
						console.log ('erreur lors de la recuperation des utilisateurs:', error)
					});
			}
		},
		beforeMount(){ 
			console.log('in before mount')
			this.getUsers(); 
		}
	}
	export default myComponent
</script>
<style type='text/css' scoped></style>