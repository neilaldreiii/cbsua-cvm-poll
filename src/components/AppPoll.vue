<template>
    <div v-if="isSignedIn" class="container">

        <!-- Male Contestants -->

        <div class="male-contestants-poll" v-if="!afterVoting" v-show="!hasVoted">
            <h1 style="text-align: center;">
                Vote Remaining: <span style="color: #0066FF;">{{ mVoteCount }}</span>
            </h1>
            <div v-if="voted.length" class="voted">
                <ul>
                    <li v-for="v in voted" :key="v.index">
                        <p>{{ v }}</p>
                    </li>
                </ul>
            </div>
            <h1 style="text-align:center;">
                Mr. VetMed(People's Choice)
            </h1>
            <div class="contestants">
                <div class="contestant" v-for="mc in maleContestants" :key="mc.id">
                    <div class="display-picture">
                        <img :src="mc.dp" alt="">
                    </div>
                    <div class="info">
                        <h1>{{ mc.name }}</h1>
                    </div>
                    <div class="controls">
                        <div v-if="!mVoteCount < 1">
                            <button @click.once="voteM" :value="mc.id">Vote</button>
                        </div>
                        <div v-else>
                            <button disabled class="disabled">Out of vote</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Done voting male contestants ?  -->

        <div class="mc-vote-done" v-if="mVoteCount < 1" v-show="!afterVoting">
            <h1>Next up: Ms. VetMed Candidates</h1>
            <button @click="afterVoting = true">Next</button>
        </div>

        <!-- Female contestants -->

        <div v-if="afterVoting" class="female-contestants-poll"> 
            <h1 style="text-align:center;">
                Vote Remaining: 
                <span style="color: #0066FF;">{{ fVoteCount }}</span>
            </h1>
            <div v-if="voted.length" class="voted">
                <ul>
                    <li v-for="v in voted" :key="v.index">
                        <p>{{ v }}</p>
                    </li>
                </ul>
            </div>
            <div v-if="!fVoteCount < 1" class="contestants">
                <h1 style="text-align:center;">
                    Ms. VetMed(People's Choice)
                </h1>
                <div class="contestant" v-for="fc in femaleContestants" :key="fc.id">
                    <div class="display-picture"></div>
                    <div class="info">
                        <h1>{{ fc.name }}</h1>
                    </div>
                    <div class="controls">
                        <div v-if="!fVoteCount < 1">
                            <button @click.once="voteF" :value="fc.id">Vote</button>
                        </div>
                        <div v-else>
                            <button disabled class="disabled">Out of vote</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Done voting for contestants ? -->

        <div v-if="fVoteCount < 1" class="thank-you">
            <h1 style="text-align: center;">Thank you for voting Mr. And Ms. VetMed (People's choice) 2019. Share the poll with your friends using the buttons below.</h1>
        </div>

        <!-- User tries to cheat but wise man detected that the user has already voted -->

        <div v-show="hasVoted" class="thank-you">
            <h1 style="text-align: center;">
                Thank you for voting Mr. And Ms. VetMed (People's choice) 2019.
                <span style="color: red; display: block;">You have used all your votes</span>
            </h1>
        </div>

    </div>
</template>

<script>

import db from '@/firebase/firebaseInit';
import firebase from "firebase";

export default {
    name: "poll",
    data() {
        return {
            /*
             * Default voting value is == 2
             * When vote count reaches 0 buttons will be disabled
             * 1 vote for 1 contestant only
             * if doneVoting button is clicked -> switch to female contestants
             * a message will pop up after a vote has been sent
             * finally a thank you message
             */
            mVoteCount: 2,
            fVoteCount: 2,
            afterVoting: false,
            isSignedIn: false,
            hasVoted: false,
            loggedId: null,
            maleContestants: [
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
            femaleContestants: [
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
            voted: [], //on success message
            voter: [], //current user logged in
        }
    },
    created() {

        firebase.auth().onAuthStateChanged(user => {

            if(user) {
                
                /*
                 * Check to see if the user is logged in 
                 * then set the truethiness or falsiness
                 * Depending on the user's state to display
                 * the candidates  
                 */

                this.isSignedIn = true;
                this.voter = user;

                /*
                 * Check to see if the user has already  used all their votes 
                 */
                db.collection("voters")
                .where("voterId", "==", user.uid)
                .get()
                .then(
                    querySnapshot => {
                        
                        querySnapshot.forEach(doc => {
                            
                            if(doc.data().hasVoted) {

                                this.hasVoted = true;

                            }

                        })
                    }
                )

            } else {

                this.isSignedIn = false;

            }
        })
    },
    methods: {
        voteM(e) {
            
            /*
             * Decrease vote count after voting
             */

            this.mVoteCount--;
            var targetContestant = e.target.value;
            /*
            * Get details
            */
            let voteForId = "";
            let voteFor = "";

            this.voted = []; // show alert

            /*
             * Get the contestant's name
             * Then push a mini alert
             */

            for(let m of this.maleContestants) {
                
                if(m.id == targetContestant) {

                    voteForId = m.id;
                    voteFor = m.name;
                    category = m.category;

                }
            }

            /*
             * Send data to the cloud firestore  
             */ 

            db.collection("voters").add({
                
                voterId: this.voter.uid,
                voterName: this.voter.displayName,
                votedForId: voteForId,
                votedFor: voteFor,
                category: category,
                hasVoted: false,

            })
            .then(

                docRef => {

                    this.voted.push("You voted for " + voteFor);

            })
            .catch(

                error => console.log(error)

            )

        },
        voteF(e) {

            /*
             * Decrease vote count after voting
             */

            this.fVoteCount--;
            let targetContestant = e.target.value;
            this.voted = []; //show alert

            /*
            * Get details
            */
            let voteForId = "";
            let voteFor = "";

            /*
             * Get the contestant's name
             * Then push a mini alert
             */

            for(let f of this.femaleContestants) {

                if(f.id == targetContestant) {

                    voteForId = f.id;
                    voteFor = f.name;
                    category = f.category;

                }
            }

            /*
             * Check to see if the user has used their final vote
             * set hasVoted to true
             */
            let finishedVoting = false;

            if(this.fVoteCount == 0) {
                
                finishedVoting = true;

            }

            /*
             * Send data to the cloud firestore  
             */ 

            db.collection("voters").add({
                
                voterId: this.voter.uid,
                voterName: this.voter.displayName,
                votedForId: voteForId,
                votedFor: voteFor,
                category: category,
                hasVoted: finishedVoting,

            })
            .then(

                docRef => {

                    this.voted.push("You voted for " + voteFor);

            })
            .catch(

                error => console.log(error)

            )

        }
    }
}
</script>
