<template>
    <div class="container">
        <router-link class="home" to="/home">Home</router-link>
        <div class="log-container">
            <router-link class="log" to="/login" v-show="!authenticated">log-in</router-link>
            <button class="log" v-show="authenticated" @click="logout($event)">Deslogar</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {

    methods: {
        logout(e) {
            e.preventDefault()
            this.$store.commit("logout")
            console.log("deslogado")

            this.$router.push("/home")
        }
    },
    computed: {
        ...mapState([
            'authenticated'
    ])
    }
}


</script>

<style scoped>
.container {
    display: flex;
    border-bottom: 2px solid black;
    padding: 20px;
    justify-content: space-between;

}

.home {
    text-decoration: none;
    color: black;
    font-size: 1.2em;
    margin-left: 20px;
}

.log {
    margin-right: 20px;
    text-decoration: none;
}

.log-container a {
    padding: 10px 30px;
    color: white;
    background-color: blue;
    border: none;
    border-radius: 2px;
    cursor: pointer;
}

.log-container a:hover {
    background-color: rgb(3, 3, 181);
}

.log-container button {
    padding: 10px 20px;
    color: white;
    background-color: rgb(213, 3, 3);
    border: none;
    border-radius: 2px;
    cursor: pointer;
}

.log-container button:hover {
    background-color: rgb(172, 0, 0);
}
</style>