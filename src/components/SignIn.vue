<template>
    <div class="nav-signIn">
        <div v-if="!isSignedIn" class="nav-intro">
            <div class="short-intro">
                <h1>Welcome to CBSUA College of Veterinary Medicine Poll</h1>
            </div>
            <div class="nav-controls">
                <h3>Please log in with your facebook account to start voting.</h3>
                <button @click="fbSignIn">
                    <span><i class="fab fa-facebook-f"></i></span>
                    Sign In with Facebook
                </button>
            </div>
        </div>
        <div v-else class="nav-intro">
            <div class="short-intro">
                <h1>Welcome {{ user.displayName }} </h1>
                <img :src="user.photoURL" :alt="user.displayName" class="user-photo-url">
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
                                    <span>{{ sp.length }}</span>
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
            user: [],
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

                this.user = user;
                this.isSignedIn = true;
                
                if (user.uid == "kHsW28iNsEWvchwklvEGYY9xArv2" || 
                    user.uid == "oM4Dne0Pt7cflS6bCB8ryqhaUOz1") {

                        this.isAdmin = true;

                } else {
                    
                    this.isAdmin = false;

                }
                
            } else {
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

            db.collection("votes")
            .where("voteFor", "==", "Cris John Mendoza")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {

                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                        
                    }
                    this.cjm.push(data);
                })
            })

        },
        getlc() {

            db.collection("votes")
            .where("voteFor", "==", "Lorenzo Credo")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.lc.push(data);
                })
            })

        },
        getjvb() {

            db.collection("votes")
            .where("voteFor", "==", "Joshua Velasco Badong")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.jvb.push(data);
                })
            })

        },
        getmfb() {

            db.collection("votes")
            .where("voteFor", "==", "Michael Franco Bertumen")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.mfb.push(data);
                })
            })

        },
        geteb() {

            db.collection("votes")
            .where("voteFor", "==", "Elmo Barra")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.eb.push(data);
                })
            })

        },
        getjpr() {

            db.collection("votes")
            .where("voteFor", "==", "John Paul Reforsado")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.jpr.push(data);
                })
            })

        },
        getjol() {

            db.collection("votes")
            .where("voteFor", "==", "Julius Oliver Llana")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.jol.push(data);
                })
            })

        },
        getjf() {

            db.collection("votes")
            .where("voteFor", "==", "Jonas Fernandez")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.jf.push(data);
                })
            })

        },
        getdml() {

            db.collection("votes")
            .where("voteFor", "==", "Dan Miguel Legaspi")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.dml.push(data);
                })
            })

        },
        getjp() {

            db.collection("votes")
            .where("voteFor", "==", "Joanna Peralta")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.jp.push(data);
                })
            })

        },
        getsp() {

            db.collection("votes")
            .where("voteFor", "==", "Shiela Payno")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.sp.push(data);
                })
            })

        },
        getaal() {

            db.collection("votes")
            .where("voteFor", "==", "Alyssa Ashley Lumacad")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.aal.push(data);
                })
            })

        },
        getmen() {

            db.collection("votes")
            .where("voteFor", "==", "Matea Ela Noche")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.men.push(data);
                })
            })

        },
        getmc() {

            db.collection("votes")
            .where("voteFor", "==", "Merlyn Castelo")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.mc.push(data);
                })
            })

        },
        getjlb() {

            db.collection("votes")
            .where("voteFor", "==", "Joy Laurel Buena")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.jlb.push(data);
                })
            })

        },
        getad() {

            db.collection("votes")
            .where("voteFor", "==", "Angel Dalanon")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.ad.push(data);
                })
            })

        },
        getdch() {

            db.collection("votes")
            .where("voteFor", "==", "Donna Carmela Hapal")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.dch.push(data);
                })
            })

        },
        getsa() {

            db.collection("votes")
            .where("voteFor", "==", "Shiena Aguilar")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
                    }
                    this.sa.push(data);
                })
            })

        },
        getmz() {

            db.collection("votes")
            .where("voteFor", "==", "Maricar Zoilo")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        voterId: doc.data().voterId,
                        votecount: doc.data().voteFor
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
