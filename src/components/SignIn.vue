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
                        <div class="mr-vetmed"> <!-- Mr VetMed -->
                            <div class="title">
                                <h3 style="text-align: center;">Mr. VetMed</h3>
                            </div>
                            <div class="result">
                                <p>
                                    <span>Cris John Mendoza:</span>
                                    <span>{{ cjm.length }}</span>
                                </p>
                                <p>
                                    <span>Lorenzo Credo:</span>
                                    <span>{{ lc.length }}</span>
                                </p>
                                <p>
                                    <span>Joshua Velasco Badong:</span>
                                    <span> {{ jvb.length }}</span>
                                </p>
                                <p>
                                    <span>Michael Franco Bertumen:</span>
                                    <span>{{ mfb.length }}</span>
                                </p>
                                <p>
                                    <span>Elmo Barra: </span>
                                    <span>{{ eb.length }}</span>
                                </p>
                                <p>
                                    <span>John Paul Reforsado:</span>
                                    <span>{{ jpr.length }}</span>
                                </p>
                                <p>
                                    <span>Julius Oliver Llana: </span>
                                    <span>{{ jol.length }}</span>
                                </p>
                                <p>
                                    <span>Jonas Fernandez: </span>
                                    <span>{{ jf.length }}</span>
                                </p>
                                <p>
                                    <span>Dan Miguel Legaspi: </span>
                                    <span>{{ dml.length }}</span>
                                </p>
                                
                            </div>
                        </div>
                        <div class="ms-vetmed"> <!-- Ms VetMed -->
                            <div class="title">
                                <h3 style="text-align: center;">Ms. VetMed</h3>
                            </div>
                            <div class="result">
                                <p>
                                    <span>Joanna Peralta: </span>
                                    <span>{{ jp.length }}</span>
                                </p>
                                <p>
                                    <span>Shiela Payno: </span>
                                    <span>{{ sa.length }}</span>
                                </p>
                                <p>
                                    <span>Alyssa Ashley Lumacad: </span>
                                    <span>{{ aal.length }}</span>
                                </p>
                                <p>
                                    <span>Matea Ela Noche: </span>
                                    <span>{{ men.length }}</span>
                                </p>
                                <p>
                                    <span>Merlyn Castelo:</span>
                                    <span>{{ mc.length }}</span>
                                </p>
                                <p>
                                    <span>Joy Laurel Buena: </span>
                                    <span>{{ jlb.length }}</span>
                                </p>
                                <p>
                                    <span>Angel Dalanon: </span>
                                    <span>{{ ad.length }}</span>
                                </p>
                                <p>
                                    <span>Donna Carmela Hapal:</span>
                                    <span>{{ dch.length }}</span>
                                </p>
                                <p>
                                    <span>Shiena Aguilar:</span>
                                    <span>{{ sa.length }}</span>
                                </p>
                                <p>
                                    <span>Maricar Zoilo: </span>
                                    <span>{{ mz.length }}</span>
                                </p>
                            </div>
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
            cjm: [],
            lc: [],
            jvb: [],
            mfb: [],
            eb: [],
            jpr: [],
            jol: [],
            jf: [],
            dml: [],
            jp: [],
            sp: [],
            aal: [],
            men: [],
            mc: [],
            jlb: [],
            ad: [],
            dch: [],
            sa: [],
            mz: [],
        }
    },
    created() {

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
        counter() {

            /*
                * Counting votes
                */
            this.getcjm();
            this.getlc();
            this.getjvb();
            this.getmfb();
            this.geteb();
            this.getjpr();
            this.getjol();
            this.getjf();
            this.getdml();
            this.getjp();
            this.getsp();
            this.getaal();
            this.getmen();
            this.getmc();
            this.getjlb();
            this.getad();
            this.getdch();
            this.getsa();
            this.getmz();
            
        },
        getcjm() {

            db.collection("voters")
            .where("votedFor", "==", "Cris John Mendoza")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.cjm.push(data);
                })
            })

        },
        getlc() {

            db.collection("voters")
            .where("votedFor", "==", "Lorenzo Credo")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.lc.push(data);
                })
            })

        },
        getjvb() {

            db.collection("voters")
            .where("votedFor", "==", "Joshua Velasco Badong")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.jvb.push(data);
                })
            })

        },
        getmfb() {

            db.collection("voters")
            .where("votedFor", "==", "Michael Franco Bertumen")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.mfb.push(data);
                })
            })

        },
        geteb() {

            db.collection("voters")
            .where("votedFor", "==", "Elmo Barra")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.eb.push(data);
                })
            })

        },
        getjpr() {

            db.collection("voters")
            .where("votedFor", "==", "John Paul Reforsado")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.jpr.push(data);
                })
            })

        },
        getjol() {

            db.collection("voters")
            .where("votedFor", "==", "Julius Oliver Llana")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.jol.push(data);
                })
            })

        },
        getjf() {

            db.collection("voters")
            .where("votedFor", "==", "Jonas Fernandez")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.jf.push(data);
                })
            })

        },
        getdml() {

            db.collection("voters")
            .where("votedFor", "==", "Dan Miguel Legaspi")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.dml.push(data);
                })
            })

        },
        getjp() {

            db.collection("voters")
            .where("votedFor", "==", "Joanna Peralta")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.jp.push(data);
                })
            })

        },
        getsp() {

            db.collection("voters")
            .where("votedFor", "==", "Shiela Payno")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.sp.push(data);
                })
            })

        },
        getaal() {

            db.collection("voters")
            .where("votedFor", "==", "Alyssa Ashley Lumacad")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.dml.aal(data);
                })
            })

        },
        getmen() {

            db.collection("voters")
            .where("votedFor", "==", "Matea Ela Noche")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.men.push(data);
                })
            })

        },
        getmc() {

            db.collection("voters")
            .where("votedFor", "==", "Merlyn Castelo")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.mc.push(data);
                })
            })

        },
        getjlb() {

            db.collection("voters")
            .where("votedFor", "==", "Joy Laurel Buena")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.jlb.push(data);
                })
            })

        },
        getad() {

            db.collection("voters")
            .where("votedFor", "==", "Angel Dalaon")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.ad.push(data);
                })
            })

        },
        getdch() {

            db.collection("voters")
            .where("votedFor", "==", "Donna Carmela Hapal")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.dch.push(data);
                })
            })

        },
        getsa() {

            db.collection("voters")
            .where("votedFor", "==", "Shiena Aguilar")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.sa.push(data);
                })
            })

        },
        getmz() {

            db.collection("voters")
            .where("votedFor", "==", "Maricar Zoilo")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().votedFor
                    }
                    this.mz.push(data);
                })
            })

        },
    }
}
</script>

<style scoped>
    .result {
        padding: 20px;
    }
    .result p{
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        margin: 0;
        padding: 8px;
        font-weight: bold;
    }
    .result p:nth-child(even) {
        background: #ddd;
    }
    .result p:nth-child(odd) {
        background: #c9c7c7;
    }
</style>
