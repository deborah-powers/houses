<template>
<div>
    <div class='nav'>
		<router-link class='button' to='/home'>Revenir à la page d'acceuil</router-link>
        <router-link class='button' to='/messages'>Voir la liste de vos messages</router-link>
    </div>
    <h1>Coucou voici les détails de votre message</h1>
	<p>Date: {{ $route.params.date }}</p>
	<p>Autheur: {{ $route.params.author }}</p>
	<p>Destinataire: {{ $route.params.recipient }}</p>
	<p>Titre: {{ $route.params.title }}</p>
	<p>Message: {{ $route.params.content }}</p>
</div>
</template><script type='text/javascript'>
	import axios from 'axios'
	let myComponent ={
		name: 'messageDetails',
		data: function(){ return {
		}},
		methods: {
			markAsRead: function(){
				const backUrl = 'http://localhost:1407/messages/' + this.$route.params.id
				console.log ('url', backUrl)
				const token = localStorage.getItem ('token')
				const config ={
					headers: { 'token': token }
				}
				const idJson ={
					id: this.$route.params.id
				}
				if (this.$route.params.toMarkAsRead){
					// utiliser axios pour faire la connexion avec le back. passer le token dans headers
					axios.put (backUrl, idJson, config)
						.then((response) => {
							console.log ('reponse de la validation:', response.data.message)
						})
						.catch((error) => {
							console.log ('erreur lors de la validation du message:', error)
						})
				}
			}
		},
		mounted(){ this.markAsRead() }
	}
	export default myComponent
</script>
<style type='text/css' scoped></style>