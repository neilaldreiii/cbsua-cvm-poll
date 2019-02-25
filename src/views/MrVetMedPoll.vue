<!-- Male Candidates -->
<template>
    <div class="mr-candidates">
        <app-alerts :alerts="alerts"></app-alerts>
        <div class="container" v-if="isLoggedIn" v-show="!mVoteLeft < 1">
            <header class="title">
                <h1>Mr. VetMed (People's Choice) Candidates</h1>
                <h4>Vote Remaining: {{ mVoteLeft }}</h4>
            </header>
            <div class="candidates">
                <div class="candidate" v-for="candidate in maleCandidates" :key="candidate.id">
                    <div class="display-picture">
                        <img :src="candidate.dp" :alt="candidate.name">
                    </div>
                    <div class="candidate-info">
                        <h1>{{ candidate.name }}</h1>
                    </div>
                    <div class="controls">
                        <div v-if="!mVoteLeft < 1">
                            <button @click.once="voteM" :value="candidate.id">Vote</button>
                        </div>
                        <div v-else>
                            <button disabled class="disabled">Out of vote</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="mVoteLeft < 1" class="next-step">
            <p>Thank you for Voting. </p>
            <p>Click <b>"Next"</b> to vote for Ms. VetMed Candidates</p>
            <router-link to="msvetmedpoll">Next</router-link>
        </div>
    </div>
</template>

<script>

//get the alert block
import Alerts from "@/components/Alerts.vue";
import firebase from "firebase";
import db from "@/firebase/firebaseInit";

export default {

    name: "mrvetmed",
    data() {
        return {

            mVoteLeft: 2,
            isLoggedIn: false,
            hasVoted: false,
            maleCandidates: [
                {
                    id: 1,
                    name: "Cris John Mendoza",
                    dp: require('@/assets/images/CrisJohnMendoza.jpg'),
                    category: "mr"
                },
                {
                    id: 2,
                    name: "Lorenzo Credo",
                    dp: require('@/assets/images/LorenzoCredo.jpg'),
                    category: "mr"
                },
                {
                    id: 3,
                    name: "Joshua Velasco Badong",
                    dp:require('@/assets/images/JoshuaVelascoBadong.jpg'),
                    category: "mr"
                },
                {
                    id: 4,
                    name: "Michael Franco Bertumen",
                    dp: require('@/assets/images/MichaelFrancoBertumen.jpg'),
                    category: "mr"
                },
                {
                    id: 5,
                    name: "Elmo Barra",
                    dp:require('@/assets/images/ElmoBarra.jpg'),
                    category: "mr"
                },
                {
                    id: 6,
                    name: "John Paul Reforsado",
                    dp:require('@/assets/images/JohnPaulReforsado.jpg'),
                    category: "mr"
                },
                {
                    id: 7,
                    name: "Julius Oliver Llana",
                    dp:require('@/assets/images/JuliusOliverLlana.jpg'),
                    category: "mr"
                },
                {
                    id: 8,
                    name: "Jonas Fernandez",
                    dp:require('@/assets/images/JonasFernandez.jpg'),
                    category: "mr"
                },
                {
                    id: 9,
                    name: "Dan Miguel Legaspi",
                    dp:require('@/assets/images/DanMiguelLegaspi.jpg'),
                    category: "mr"
                }
            ],
            alerts: [],
            voter: []

        }
    },
    components: {

        "app-alerts": Alerts

    },
    created() {
        
        //get user info and set the user as -> voter
        firebase.auth()
        .onAuthStateChanged(user => {

            if(user) {
                
                this.voter = user;
                this.isLoggedIn = true;
                this.getVoteCounts();
            }
            else {
                
                this.isLoggedIn = false;

            }
        })
    },
    methods: {

        getVoteCounts() {
            
            //check to see if the user has no votes left for male candidates
            db.collection("votes")
            .where("voterId", "==", this.voter.uid)
            .get()
            .then(querySnapshot => {

                querySnapshot.forEach(doc => {

                    if(doc.data().voteLeftMale == 0) {
                        
                        this.mVoteLeft = doc.data().voteLeftMale;

                    } else if(doc.data().voteLeftMale == 1) {
                        
                        this.hasOneVote = true;
                        this.mVoteLeft = doc.data().voteLeftMale - 1;

                    }
                })
            })
        },
        
        voteM(e) {
            
            //decrement number of votes
            this.mVoteLeft--;

            if(!this.hasOneVote) {

                let voteLeft = this.mVoteLeft;

                //select the target candidate and get the id
                let targetCandidate = e.target.value;
                
                //set variable for fetched details
                let voteForId = "";
                let voteFor = "";
                let category = "";

                //call alert everytime the button is clicked
                //prevents from flooding shit ton of data
                this.alerts = [];

                //iterate and get data then store to data base
                for(let m of this.maleCandidates) {

                    if(m.id == targetCandidate) {

                        voteForId = m.id;
                        voteFor = m.name;
                        category = m.category;

                    }
                }

                // add data to the cloud firestore(database)

                db.collection("votes")
                .add({

                    voterId: this.voter.uid,
                    voterName: this.voter.displayName,
                    voteForId: voteForId,
                    voteFor: voteFor,
                    category: category,
                    voteLeftMale: voteLeft
                    

                })
                .then( docRef => {

                    //show an alert if a user has voted for a candidate
                    this.alerts.push("You voted for " + voteFor);

                })
                .catch( error => 

                    console.log(error.message)
                
                )

            } else {

                let voteLeft = this.mVoteLeft - 1;

                //select the target candidate and get the id
                let targetCandidate = e.target.value;
                
                //set variable for fetched details
                let voteForId = "";
                let voteFor = "";
                let category = "";

                //call alert everytime the button is clicked
                //prevents from flooding shit ton of data
                this.alerts = [];

                //iterate and get data then store to data base
                for(let m of this.maleCandidates) {

                    if(m.id == targetCandidate) {

                        voteForId = m.id;
                        voteFor = m.name;
                        category = m.category;

                    }
                }

                // add data to the cloud firestore(database)

                db.collection("votes")
                .add({

                    voterId: this.voter.uid,
                    voterName: this.voter.displayName,
                    voteForId: voteForId,
                    voteFor: voteFor,
                    category: category,
                    voteLeftMale: voteLeft
                    

                })
                .then( docRef => {

                    //show an alert if a user has voted for a candidate
                    this.alerts.push("You voted for " + voteFor);

                })
                .catch( error => 

                    console.log(error.message)
                
                )

            }

        }

    }
}
</script>