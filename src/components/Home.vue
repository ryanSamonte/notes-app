<template>
    <div>
        <h1>You are logged in!</h1>
        <button v-on:click="logout">Logout</button>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: "Home",
    data() {
        return {

        }
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.push('/sign-in');
            })

        }
    }
}
</script>