<template>
<div>
    <div class='nav'>
		<router-link class='button' to='/home'>Revenir à la page d'acceuil</router-link>
        <router-link class='button' to='/users'>Voir la liste des utilisateurs</router-link>
    </div>
    <h1>Coucou je suis la page pour envoyer un message à un utilisateur</h1>
    <form>
		<p class='row'><span>Titre</span><input type='text' v-model='title'/></p>
		<p class='row'><span>Message</span><input type='text' v-model='content'/></p>
		<button v-on:click='sendMessage()'>Envoyez votre message</button>
    </form>
</div>
</template><script type='text/javascript'>
	import axios from 'axios'
	export default {
        name: 'messageToUser',
        data (){ return {
        	title: "",
        	content: "",
        	recipientId: this.$route.params.id
        }},
        methods: {
        	sendMessage: function(){
        		const backUrl = 'http://localhost:1407/messages'
				const token = localStorage.getItem ('token')
				const config ={
					headers: { 'token': token }
					}
        		const message ={
        			title: this.title,
        			content: this.content,
        			recipientId: this.recipientId
        		}
				// utiliser axios pour faire la connexion avec le back
				axios.post (backUrl, message, config)
					.then((response) => {
						console.log ('reponse de la creation de message:', response.data)
                        this.$router.push ('/users')
					})
					.catch((error) => {
						console.log ('erreur lors de la creation du message:', error)
					})
        	}
        }
    };
</script>
<style type='text/css' scoped></style>