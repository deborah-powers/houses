<template>
<div id='home'>
    <h1>Bienvenue sur la page d'acceuil</h1>
    <div class='nav'>
        <router-link class='button' to='/users'>Voir la liste des utilisateurs</router-link>
        <router-link class='button' to='/messages'>Voir la liste de vos messages</router-link>
        <router-link class='button' to='/'>Vous re-loguer</router-link>
    </div>
    <!-- afficher la carte -->
    <h2>Votre localisation</h2>
    <v-map :zoom='zoom' :center='center'>
        <v-tilelayer :url='url' :attribution='attribution'></v-tilelayer>
        <v-marker :lat-lng='marker'></v-marker>
    </v-map>
</div>
</template><script type='text/javascript'>
    import leaflet from 'vue2-leaflet'
    let map ={
        name: 'v-map',
        template: leaflet.Map
    }
    let titleLayer ={
        name: 'v-tilelayer',
        template: leaflet.TileLayer
    }
    let marker ={
        name: 'v-marker',
        template: leaflet.Marker
    }
    /* Vue.component('v-map', leaflet.Map);
    Vue.component('v-tilelayer', leaflet.TileLayer);
    Vue.component('v-marker', leaflet.Marker);
    */
    export default {
        name:'home',
        el: '#home',
        data (){ return {
            zoom: 20,
            center: [47.413220, -1.219482],
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            marker: L.latLng(47.413220, -1.219482)
        }}
    };
</script>