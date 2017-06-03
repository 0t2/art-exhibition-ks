import { Component, OnInit, ElementRef, Input } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Input() showAll: boolean = true;
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  favorites: FirebaseListObservable<any[]>;
  realItems: any[];

  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    afAuth.authState.subscribe(user => {
      if (user) {
        this.favorites = db.list('users/' + user.uid + '/favorites');
        this.favorites.subscribe(favs => {
          this.items = db.list('/exhibits');
          this.items.subscribe(items => {
            this.realItems = items;
            favs.forEach(fav => {
              let index = this.realItems.findIndex(item => item.$key === fav.$value);
              if (index != -1) {
                this.realItems[index].fav = fav.$key;
              }
            });
          });
        });

      } else {
        this.items = db.list('/exhibits');
        this.items.subscribe(items => this.realItems = items);
      }

    });
  }

  ngOnInit() { }

  add(item: any) {
    if (item.fav) {
      this.favorites.remove(item.fav);
    } else
      this.favorites.push(item.$key);
  }
}
