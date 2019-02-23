<template>
    <div class="container">
        <div class="male-contestants-poll" v-if="!afterVoting">
            <h1>Vote Remaining: {{ mVoteCount }}</h1>
            <div v-if="voted.length" class="voted">
                <ul>
                    <li v-for="v in voted" :key="v.index">
                        <p>{{ v }}</p>
                    </li>
                </ul>
            </div>
            <div class="contestants">
                <h1>Male Contestants</h1>
                <div class="contestant" v-for="mc in maleContestants" :key="mc.id">
                    <div class="display-picture"></div>
                    <div class="info">
                        <h1>{{ mc.name }}</h1>
                    </div>
                    <div class="controls">
                        <div v-if="!mVoteCount < 1">
                            <button @click.once="voteM" :value="mc.id">Vote</button>
                        </div>
                        <div v-else>
                            <button disabled>Out of vote</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Done voting male contestants ?  -->
        <div class="mc-vote-done" v-if="mVoteCount < 1">
            <button @click="afterVoting = true" v-if="!afterVoting">Next</button>
        </div>
        <div v-if="afterVoting" class="female-contestants-poll">
            <h1>Vote Remaining: {{ fVoteCount }}</h1>
            <div v-if="voted.length" class="voted">
                <ul>
                    <li v-for="v in voted" :key="v.index">
                        <p>{{ v }}</p>
                    </li>
                </ul>
            </div>
            <div class="contestants">
                <h1>Female Contestants</h1>
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
                            <button disabled>Out of vote</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Done voting female contestants ? -->
        <div v-if="fVoteCount < 1" class="thank-you">
            <h1>Thank you for voting</h1>
        </div>
    </div>
</template>

<script>
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
            maleContestants: [
                {
                    id: 1,
                    name: "Leonardo Da Fappio"
                },
                {
                    id: 2,
                    name: "Davinci Sisti"
                }
            ],
            femaleContestants: [
                {
                    id: 1,
                    name: "Liza rd"
                },
                {
                    id: 2,
                    name: "Catreeeen Biy"
                }
            ],
            voted: []
        }
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

<style>

</style>
