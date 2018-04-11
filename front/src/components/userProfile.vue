<template>
<div>
    <div class='nav'>
		<router-link class='button' to='/home'>Revenir à la page d'acceuil</router-link>
        <router-link class='button' to='/users'>Voir la liste des utilisateurs</router-link>
        <router-link class='button' to='/messages'>Voir la liste de vos messages</router-link>
    </div>
    <h1>Coucou, voici votre profile</h1>
    {{ user }}
</div>
</template><script type='text/javascript'>
	import axios from 'axios'
	let myComponent ={
		name: 'profile',
		data: function(){ return {
			user: {}
		}},
		methods: {
			getUser: function(){
				const backUrl = 'http://localhost:1407/profile'
				const token = localStorage.getItem ('token')
				const config ={
					headers: { 'token': token }
				}
				// utiliser axios pour faire la connexion avec le back. passer le token dans headers
				axios.get (backUrl, config)
					.then((response) => {
						console.log ('reponse de profile:', response.data.message)
						console.log ('utilisateur:', response.data.user)
						this.user = response.data.user
					})
					.catch((error) => {
						console.log ('erreur lors de la recuperation du profil:', error)
					});
			}
		},
		beforeMount(){ this.getUser() }
	}
	export default myComponent
</script>