<template>
	<div>
		<h1>Connexion</h1>
		<form v-if='log'>
			<h2>Vous êtes déjà inscrit</h2>
			<p class='row'><span>Couriel</span><input type='email' v-model='email'/></p>
			<p class='row'><span>Mot de passe</span><input type='password' v-model='password'/></p>
			<button v-on:click='login()'>Connexion</button>
		</form>
		<form v-else>
			<h2>Créer un compte</h2>
			<p class='row'><span>Prénom</span><input type='text' v-model='firstName'/></p>
			<p class='row'><span>Nom</span><input type='text' v-model='lastName'/></p>
			<p class='row'><span>Couriel</span><input type='email' v-model='email'/></p>
			<p class='row'><span>Mot de passe</span><input type='password' v-model='password'/></p>
			<button v-on:click='signup()'>Connexion</button>
		</form>
		<button v-on:click='exchange()'>{{ logMessage }}</button>
	</div>
</template>
<script type='text/javascript'>
	import axios from 'axios'
	export default {
		name: 'login',
		data: function(){
			return {
				log: true,
				logMessage: 'Créer un compte',
				email: 'deborah.powers89@gmail.com',
				password: 'noisette',
				firstName: 'Deborah',
				lastName: 'Powers'
			}
		},
		methods: {
			exchange: function(){
				if (this.log === true){
					this.log = false
					this.logMessage = 'Vous êtes déjà inscrit'
				}
				else{
					this.log = true
					this.logMessage = 'Créer un compte'
				}
			},
			login: function(){
				const backUrl = 'http://localhost:1407/auth/login'
				const user ={
					email: this.email,
					password: this.password
				}
				// utiliser axios pour faire la connexion avec le back
				axios.post (backUrl, user)
					.then((response) => {
						console.log ('reponse du login:', response.data)
						localStorage.setItem ('token', response.data.token)
						if (response.data.token) this.$router.push ('home')
						else this.$router.push ('erreur')
					})
					.catch((error) => {
						console.log ('erreur lors du login:', error)
						this.$router.push ('erreur')
					});
			},
			signup: function(){
				var backUrl = 'http://localhost:1407/auth/signup'
				var user ={
					email: this.email,
					password: this.password,
					firstName: this.firstName,
					lastName: this.lastName
				}
				// utiliser axios pour faire la connexion avec le back
				axios.post (backUrl, user)
					.then((response) =>{
						console.log ('reponse du signup:', response.data)
						localStorage.setItem ('token', response.data.token)
						this.$router.push ('home')
					})
					.catch((error) =>{
						console.log ('erreur lors du signup:', error)
						this.$router.push ('/erreur')
					});
			}
		}
	}
</script>
<style type='text/css' scoped></style>