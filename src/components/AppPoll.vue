<template>
    <div v-if="isSignedIn" class="container">
        <div class="male-contestants-poll" v-if="!afterVoting">
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
        <div class="mc-vote-done" v-if="mVoteCount < 1">
            <h1>Next up: Ms. VetMed Candidates</h1>
            <button @click="afterVoting = true" v-if="!afterVoting">Next</button>
        </div>
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
        <!-- Done voting female contestants ? -->
        <div v-if="fVoteCount < 1">
            <h1>Thank you for voting Mr. And Ms. VetMed (People's choice) 2019. Share the poll with your friends using the buttons below.</h1>
        </div>
    </div>
</template>

<script>

import firebaseInit from '@/firebase/firebaseInit';
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
            maleContestants: [
                {
                    id: 1,
                    name: "Cris John Mendoza",
                    dp: require('@/assets/images/CrisJohnMendoza.jpg')
                },
                {
                    id: 2,
                    name: "Lorenzo Credo",
                    dp: require('@/assets/images/LorenzoCredo.jpg')
                },
                {
                    id: 3,
                    name: "Joshua Velasco Badong",
                    dp:require('@/assets/images/JoshuaVelascoBadong.jpg')
                },
                {
                    id: 4,
                    name: "Michael Franco Bertumen",
                    dp: require('@/assets/images/MichaelFrancoBertumen.jpg')
                },
                {
                    id: 5,
                    name: "Elmo Barra",
                    dp:require('@/assets/images/ElmoBarra.jpg')
                },
                {
                    id: 6,
                    name: "John Paul Reforsado",
                    dp:require('@/assets/images/JohnPaulReforsado.jpg')
                },
                {
                    id: 7,
                    name: "Julius Oliver Llana",
                    dp:require('@/assets/images/JuliusOliverLlana.jpg')
                },
                {
                    id: 8,
                    name: "Jonas Fernandez",
                    dp:require('@/assets/images/JonasFernandez.jpg')
                },
                {
                    id: 9,
                    name: "Dan Miguel Legaspi",
                    dp:require('@/assets/images/DanMiguelLegaspi.jpg')
                }
            ],
            femaleContestants: [
                {
                    id: 1,
                    name: "Joanna Peralta",
                    dp: null
                },
                {
                    id: 2,
                    name: "Shiela Payno",
                    dp: null
                },
                {
                    id: 3,
                    name: "Alyssa Ashley Lumacad",
                    dp: null
                },
                {
                    id: 4,
                    name: "Matea Ela Noche",
                    dp: null
                },
                {
                    id: 5,
                    name: "Merlyn Castelo",
                    dp: null
                },
                {
                    id: 6,
                    name: "Joy Laurel Buena",
                    dp: null
                },
                {
                    id: 7,
                    name: "Angel Dalanon",
                    dp: null
                },
                {
                    id: 8,
                    name: "Donna Carmela Hapal",
                    dp: null
                },
                {
                    id: 9,
                    name: "Shiena Aguilar",
                    dp: null
                },
                {
                    id: 10,
                    name: "Maricar Zoilo",
                    dp: null
                },
            ],
            voted: []
        }
    },
    created() {

        firebase.auth().onAuthStateChanged(user => {

            if(user) {
                this.isSignedIn = true;
            }
        });

    },
    methods: {
        voteM(e) {

            this.mVoteCount--;
            let targetContestant = e.target.value;
            this.voted = [];

            for(let m of this.maleContestants) {
                
                if(m.id == targetContestant) {

                    this.voted.push("You voted for " + m.name);

                }
            }
        },
        voteF(e) {

            this.fVoteCount--;
            let targetContestant = e.target.value;
            this.voted = [];

            for(let f of this.femaleContestants) {

                if(f.id == targetContestant) {

                    this.voted.push("You voted for " + f.name);

                }
            }

        }
    }
}
</script>
