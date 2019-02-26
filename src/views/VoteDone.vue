<template>
    <div class="container">
        <div class="vote-done">
            <h1>Thank you for voting {{ user.displayName }}.</h1>
            <button class="signout" @click="fbSignOut">Sign out</button>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: "default",
    data() {
        return {
            user: []
        }
    },
    created() {

        firebase.auth()
        .onAuthStateChanged(user => {

            if(user) {

                this.user = user;

            } else {

                this.$router.push("/");

            }

        })

    },
    methods: {

        fbSignOut() {
            
            firebase.auth().signOut().then(() => {
                
                this.isSignedIn = false;
                this.$router.push("/");

            })

        },
    }
}
</script>

<style>

</style>
