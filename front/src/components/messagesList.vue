<template>
<div>
    <div class='nav'>
		<router-link class='button' to='/home'>Revenir à la page d'acceuil</router-link>
        <router-link class='button' to='/users'>Voir la liste des utilisateurs</router-link>
        <router-link class='button' to='/'>Vous re-loguer</router-link>
    </div>
	<h1>Liste des messages</h1>
	<div class='article' v-for='message in messagesList'>
		<router-link v-bind:to="{name: 'messageDetails', params: {
			id: message.id, date: message.date,
			author: message.author,
			recipient: message.recipient,
			title: message.title,
			content: message.content,
			toMarkAsRead: message.toMarkAsRead }}">{{ message.title }}</router-link>
	</div>
</div>
</template>
<script type='text/javascript'>
	import axios from 'axios'
	let myComponent ={
		name: 'messagesList',
		data: function(){
			return {
				messagesList: []
			}
		},
		methods: {
			getMessages: function(){
				const backUrl = 'http://localhost:1407/messages'
				const token = localStorage.getItem ('token')
				const config ={
					headers: {
						'token': token
					}
				}
				// utiliser axios pour faire la connexion avec le back. passer le token dans headers
				axios.get (backUrl, config)
					.then((response) => {
						console.log ('reponse de messagesList:', response.data.message)
						console.log ('liste des messages:', response.data.messagesList)
						this.messagesList = response.data.messagesList
					})
					.catch((error) => {
						console.log ('erreur lors de la recuperation des messages:', error)
					});
			}
		},
		beforeMount(){ this.getMessages() }
	}
	export default myComponent
</script>
<style type='text/css' scoped></style>