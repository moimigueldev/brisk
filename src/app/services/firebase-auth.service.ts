import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {


  authState: Observable<{}>;
  user;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFirestore,
    private router: Router,
    private ngZone: NgZone,
    private toastrService: ToastrService
  ) { 
    
    this.authState = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.getUserData(user.uid);
          return this.afs.doc(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
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
        window.alert(error.message)
      })
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
    })

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
    }
    return userRef.set(userData, {
      merge: true
    })
  }

 getUserData(userId) {
  this.db.doc(`users/${userId}`).valueChanges().subscribe(res => {
    this.user = res;
    return this.user;
  });
  
  
     
}



  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.user = null;
      this.router.navigate(['login']);
    })
  }
 

}
