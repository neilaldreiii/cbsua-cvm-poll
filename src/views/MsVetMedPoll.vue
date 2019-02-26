<!-- Female Candidates -->
<template>
    <div class="ms-candidates">
        <app-alerts :alerts="alerts"></app-alerts>
        <div class="container" v-if="isLoggedIn" v-show="!fVoteLeft < 1">
            <div class="title">
                <h1>Ms. VetMed (People's Choice) Candidates</h1>
                <h4>Vote Remaining: {{ fVoteLeft }}</h4>
            </div>
            <div class="candidates">
                <div class="candidate" v-for="candidate in femaleCandidates" :key="candidate.id">
                    <div class="display-picture">
                        <img :src="candidate.dp" :alt="candidate.name">
                    </div>
                    <div class="candidate-info">
                        <h1>{{ candidate.name }}</h1>
                    </div>
                    <div class="controls">
                        <div v-if="!fVoteLeft < 1">
                            <button @click.once="voteF" :value="candidate.id">Vote</button>
                        </div>
                        <div v-else>
                            <button disabled class="disabled">Out of vote</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

//get the alert block
import Alerts from "@/components/Alerts.vue";
import firebase from "firebase";
import db from "@/firebase/firebaseInit";

export default {

    name: "msvetmed",
    data() {
        return {

            fVoteLeft: 2,
            isLoggedIn: false,
            hasOneVote: false,
            femaleCandidates: [
                {
                    id: 11,
                    name: "Joanna Peralta",
                    dp: null,
                    category: "ms"
                },
                {
                    id: 12,
                    name: "Shiela Payno",
                    dp: null,
                    category: "ms"
                },
                {
                    id: 13,
                    name: "Alyssa Ashley Lumacad",
                    dp: null,
                    category: "ms"
                },
                {
                    id: 14,
                    name: "Matea Ela Noche",
                    dp: null,
                    category: "ms"
                },
                {
                    id: 15,
                    name: "Merlyn Castelo",
                    dp: null,
                    category: "ms"
                },
                {
                    id: 16,
                    name: "Joy Laurel Buena",
                    dp: null,
                    category: "ms"
                },
                {
                    id: 17,
                    name: "Angel Dalanon",
                    dp: null,
                    category: "ms"
                },
                {
                    id: 18,
                    name: "Donna Carmela Hapal",
                    dp: null,
                    category: "ms"
                },
                {
                    id: 19,
                    name: "Shiena Aguilar",
                    dp: null,
                    category: "ms"
                },
                {
                    id: 20,
                    name: "Maricar Zoilo",
                    dp: null,
                    category: "ms"
                },
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
                
                
            } else {

                this.isLoggedIn = false;
                this.$router.push("/done");
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

                    if(doc.data().voteLeftFemale == 0) {
                        
                        this.fVoteLeft = doc.data().voteLeftFemale;
                        this.$router.push("/done");

                    } else if(doc.data().voteLeftFemale == 1) {
                        
                        this.hasOneVote = true;
                        this.fVoteLeft = doc.data().voteLeftFemale - 1;

                    }
                })
            })
        },
        voteF(e) {

            //decrement amount of votes
            this.fVoteLeft--;

            if(!this.hasOneVote) {

                let voteLeft = this.fVoteLeft;

                //select the target candidate and get the id
                let targetCandidate = e.target.value;

                //set variable for fetched Iterated details
                let voteForId = "";
                let voteFor = "";
                let category = "";

                //call alert everytime the button is clicked
                //prevents from flooding shit ton of data
                this.alerts = [];

                //iterate and get data then store to defined variables earlier
                for(let f of this.femaleCandidates) {

                    if(f.id == targetCandidate) {

                        voteForId = f.id;
                        voteFor = f.name;
                        category = f.category;

                    }

                }

                // start sending data to the cloud firestore
                db.collection("votes")
                .add({

                    voterId: this.voter.uid,
                    voterName: this.voter.displayName,
                    voteForId: voteForId,
                    voteFor: voteFor,
                    category: category,
                    voteLeftFemale: voteLeft,

                })
                .then(docRef => {

                    //pop up alert box
                    this.alerts.push("You voted for " + voteFor);

                })
                .catch( error => 

                    console.log(error.message)

                )

            } else {

                let voteLeft = this.fVoteLeft - 1;
                
                //select the target candidate and get the id
                let targetCandidate = e.target.value;

                //set variable for fetched Iterated details
                let voteForId = "";
                let voteFor = "";
                let category = "";

                //call alert everytime the button is clicked
                //prevents from flooding shit ton of data
                this.alerts = [];

                //iterate and get data then store to defined variables earlier
                for(let f of this.femaleCandidates) {

                    if(f.id == targetCandidate) {

                        voteForId = f.id;
                        voteFor = f.name;
                        category = f.category;

                    }

                }

                // start sending data to the cloud firestore
                db.collection("votes")
                .add({

                    voterId: this.voter.uid,
                    voterName: this.voter.displayName,
                    voteForId: voteForId,
                    voteFor: voteFor,
                    category: category,
                    voteLeftFemale: voteLeft,

                })
                .then(docRef => {

                    //pop up alert box
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