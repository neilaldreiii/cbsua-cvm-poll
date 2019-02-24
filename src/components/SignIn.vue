<template>
    <div class="nav-signIn">
        <div v-if="!isSignedIn" class="nav-intro">
            <div class="short-intro">
                <h1>Welcome to CBSUA CVM Poll.</h1>
            </div>
            <div class="nav-controls">
                <h3>To start voting, please log in with your facebook.</h3>
                <button @click="fbSignIn">
                    <span><i class="fab fa-facebook-f"></i></span>
                    Sign In with Facebook
                </button>
            </div>
        </div>
        <div v-else class="nav-intro">
            <div class="short-intro">
                <h1>Welcome {{ displayName }}</h1>
            </div>
            <div class="nav-controls">
                <button @click="fbSignOut">
                    <span><i class="fab fa-facebook-f"></i></span>
                    Sign Out
                </button>
                
                <!-- ONLY FOR ADMIN JL -->
                <button v-if="isAdmin" @click="admin = !admin" class="admin-button">
                    <i class="fas fa-poll"></i>
                    Poll Status
                </button>

                <!-- ADMIN JL IS HEEEEEEEEEEEEEEEERE FOOLS -->
                <div class="admin-view-container" v-if="admin">
                    <div class="results">
                        <div class="close">
                            <a @click.prevent="admin = !admin">&times;</a>
                        </div>
                        <div class="status">
                            <p>Total Votes: {{ votes.length }} </p>
                        </div>
                        <div v-for="vote in votes" :key="vote.id" class="result">
                            {{ vote.votedFor }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/firebaseInit';
import firebase from 'firebase';

export default {
    name: "signin",
    data() {
        return {

            isSignedIn: false,
            displayName: null,
            admin: false,
            isAdmin: false,
            votes: [], //votes sent by users

        }
    },
    created() {

        this.getResults();

        firebase.auth().onAuthStateChanged(user => {
            if(user) {

                this.displayName = user.displayName;
                this.isSignedIn = true;
                
                if (user.uid == "kHsW28iNsEWvchwklvEGYY9xArv2" || 
                    user.uid == "oM4Dne0Pt7cflS6bCB8ryqhaUOz1") {

                        this.isAdmin = true;

                } else {
                    
                    this.isAdmin = false;

                }
                
            } else {

                console.log("Signed out");
                this.isSignedIn = false;

            }
        })
        
        this.counter();

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

        },
        getResults() {

            /*
         * Get all votes
         */

        db.collection("voters")
        .get()
        .then(
            querySnapshot => {
             
                querySnapshot.forEach(doc => {
                    
                    const data = {

                        voteId: doc.id,
                        voterId: doc.data().voterId,
                        voterName: doc.data().voterName,
                        votedForId: doc.data().votedForId,
                        votedFor: doc.data().votedFor,
                        hasVoted: doc.data().hasVoted

                    }

                    this.votes.push(data);
                    
                })
            })
            .catch(

                error => console.log(error.message)

            )

        },
        /*
         * Counting votes
         */
        counter() {
            
        }
    }
}
</script>

<style>

</style>
