import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
    afAuth.authState.subscribe(user => {
      // if (user)
      //   console.log(user);
    });
  }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(success => this.router.navigateByUrl("/login"))
      .catch(err => {
        console.log(err);
      });;
  }

}
