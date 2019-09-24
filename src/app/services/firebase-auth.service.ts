import { Injectable, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { WeatherService } from './weather.service';

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
    private toastrService: ToastrService,
    private weatherService: WeatherService
  ) {

    // this is on contructor only for the auth guard
    this.authState = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.getCurrentUser(user.uid);
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
    const location = this.weatherService.locationToSave;
    const doesNotRepeatPostal = this.user.cities.some(el => {
      return el.postal === zipcode;
    });

    if (!doesNotRepeatPostal) {
      this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).update({
        cities: [...this.user.cities, { postal: zipcode, city: location.city, state: location.state }]
      }).then(res => this.toastrService.success('Citi Saved')
      ).catch(err => console.log('err', err)
      );
    } else {
      this.toastrService.warning(`Zipcode: ${zipcode} is already saved.`);
    }
  }

  deleteCity(index) {
    // Deletes the selected item from array.
    this.user.cities.splice(index, 1);

    this.db.collection('users').doc(this.afAuth.auth.currentUser.uid).update({
      cities: this.user.cities
    }).then(res => this.toastrService.success('City Deleted')
    ).catch(err => console.log('err', err)
    );
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    this.userSubscription ? this.userSubscription.unsubscribe() : null;
  }

}
