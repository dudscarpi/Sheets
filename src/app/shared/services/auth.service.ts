import { Injectable, NgZone } from '@angular/core';

import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from './user';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    public ngZone: NgZone
  ) {

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['perfil']);
          }
        });
      })
      .catch(() => {
        this.snackbar.open('Email ou senha incorretos', 'Ok', {
          duration: 3000
        })   
      });
  }

  SignUp(email: string, password: string) {
    return this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.SendVerificationMail();
      this.SetUserData(result.user);
      })
      .catch(() => {
        this.snackbar.open('Erro ao realizar cadastro', 'Ok', {
          duration: 3000
        })   
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verification']);
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.snackbar.open('Email de redefinição de senha enviado, verifique sua caixa de entrada.', 'Ok', {
          duration: 3000
      });
      })
      .catch(() => {
        this.snackbar.open('Email não cadastrado ou incorreto!', 'Ok', {
          duration: 3000
        })   
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['perfil']);
    });
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['perfil']);
        this.SetUserData(result.user);
        this.snackbar.open('Logado com sucesso', 'Ok', {
          duration: 3000
      });
      })
      .catch(() => {
        this.snackbar.open('Usuario ou senha incorretos', 'Ok', {
          duration: 3000
        })   
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

}
