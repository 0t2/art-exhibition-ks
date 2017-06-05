import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  error: any;

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, public afAuth: AngularFireAuth, private router: Router) {
    iconRegistry.addSvgIcon(
      'facebook',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/facebook.svg'))
      .addSvgIcon(
      'google',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/google.svg'));
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }

  loginFb() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(success => this.router.navigateByUrl("/"))
      .catch(err => {
        console.log(err);
        this.error = err;
      });
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(success => this.router.navigateByUrl("/"))
      .catch(err => {
        console.log(err);
        this.error = err;
      });
  }

  loginAnonymously() {
    this.afAuth.auth.signInAnonymously()
      .then(success => this.router.navigateByUrl("/"))
      .catch(err => {
        console.log(err);
        this.error = err;
      });
  }
}
