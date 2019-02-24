<template>
    <div class="nav-signIn">
        <div v-if="!isSignedIn" class="nav-intro">
            <div class="short-intro">
                <h1>Welcome to CBSUA CVM Poll.</h1>
            </div>
            <div class="nav-controls">
                <h3>To start voting, please log in using your facebook.</h3>
                <button @click="fbSignIn">Sign In with Facebook</button>
            </div>
        </div>
        <div v-else class="nav-intro">
            <div class="short-intro">
                <h1>Welcome {{ displayName }}</h1>
            </div>
            <div class="nav-controls">
                <h3>You can now start voting. </h3>
                <button @click="fbSignOut">SignOut</button>
            </div>
        </div>
    </div>
</template>

<script>
import firebaseInit from '@/firebase/firebaseInit';
import firebase from 'firebase';

export default {
    name: "signin",
    data() {
        return {

            isSignedIn: false,
            displayName: null

        }
    },
    created() {

        firebase.auth().onAuthStateChanged(user => {
            if(user) {

                this.displayName = user.displayName;
                this.isSignedIn = true;
                
            } else {

                console.log("Signed out");
                this.isSignedIn = false;

            }
        })

    },
    methods: {
        fbSignIn() {

            var provider = new firebase.auth.FacebookAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(function(result) {

                var token = result.credential.accessToken;
                var user = result.user;

            })
            .catch(function(error) {

                var errorMessage = error.message;
                console.log(errorMessage);

            })
        },
        fbSignOut() {
            
            firebase.auth().signOut().then(() => {
                this.isSignedIn = false;
            })

        }
    }
}
</script>

<style>

</style>
