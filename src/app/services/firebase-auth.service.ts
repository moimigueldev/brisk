import { Injectable, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService implements OnInit {


  authState: Observable<{}>;
  user;
  userSubscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFirestore,
    private router: Router,
    private ngZone: NgZone,
    private toastrService: ToastrService
  ) {

    console.log('contructing')
    // this is on contructor only for the auth guard
    this.authState = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.getCurrentUser(user.uid)
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }


  ngOnInit() {
    
  }

  signIn(userCred) {

    return this.afAuth.auth.signInWithEmailAndPassword(userCred.email, userCred.password)
      .then((res) => {


        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });

      }).catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(client) {


    return this.afAuth.auth.createUserWithEmailAndPassword(client.email, client.password).then(user => {
      this.setUserData(user, client);
      this.ngZone.run(() => {
        this.toastrService.success('Welcome');
        this.router.navigate(['user']);
      });
    }).catch(err => {
      alert(err);
    });

  }



  setUserData(user, client) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.user.uid}`);
    const userData = {
      uid: user.user.uid,
      email: client.email,
      firstName: client.firstName,
      lastName: client.lastName,
      cities: [],
      emailVerified: user.user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

 getUserData() {
   return this.db.doc(`users/${this.afAuth.auth.currentUser.uid}`).valueChanges().pipe(
      map(res => {
        return res;
       })
    );
  }

  getCurrentUser(id) {
    this.userSubscription = this.db.doc(`users/${id}`).valueChanges().subscribe(res => {
     this.user = res;
    });
    
  }



  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.user = null;
      this.router.navigate(['login']);
    });
  }

  addZipcode(zipcode) {
    console.log('this is the zipcode', typeof zipcode);

    if (this.user.cities.includes(zipcode)) {
      this.toastrService.error(`You already have zipcode: ${zipcode} saved`);
    } else {
      this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).update({
        cities: [...this.user.cities, zipcode]
      }).then(res => console.log("res", res)
      ).catch(err => console.log("err", err)
      );
    }

    




    // this.db.collection('users').doc(`${this.user.uid}/cities`).update({
    //   cities: [...this.user.cities, zipcode]
    // }).then(res => console.log("res", res)
    // ).catch(err => console.log("err", err)
    // )



    // this.db.collection('users').doc('mMrRkga5ggTdt9ROlbdysIa0ltL2').collection('zipcodes').add({123015: 'asd'}).then(res => console.log('res', res))

  //   firebase.firestore()
  // .collection('proprietary')
  // .doc(docID)
  // .collection('sharedWith')
  // .add({ who: "third@test.com", when: new Date() })
  }

  ngOnDestroy() {
    this.userSubscription ? this.userSubscription.unsubscribe() : null;
  }

}
