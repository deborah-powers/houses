<template>
<div>
    <h1>Bienvenue sur la page d'acceuil</h1>
    <div class='nav'>
        <router-link class='button' to='/users'>Voir la liste des utilisateurs</router-link>
        <router-link class='button' to='/messages'>Voir la liste de vos messages</router-link>
        <router-link class='button' to='/profile'>Voir votre profile</router-link>
        <router-link class='button' to='/'>Vous re-loguer</router-link>
    </div>
</div>
</template><script type='text/javascript'>
    export default {
        name:'home',
        data (){ return {}}
    };
</script>