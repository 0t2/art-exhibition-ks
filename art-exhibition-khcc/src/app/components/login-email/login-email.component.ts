import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.css']
})
export class LoginEmailComponent implements OnInit {

  formGroup: FormGroup;
  user: Observable<firebase.User>;

  constructor(private fb: FormBuilder, public afAuth: AngularFireAuth, private router: Router, public dialog: MdDialog) {
    this.formGroup = fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.afAuth.auth
        .signInWithEmailAndPassword(this.formGroup.value.email, this.formGroup.value.pwd)
        .then(success => this.router.navigateByUrl('/')
        )
        .catch(err => {
          console.log(err);
          let errMsg: string = '';
          if (err['code'] === 'auth/wrong-password') {
            errMsg = '密碼錯誤或帳戶已變更';
          } else {
            errMsg = err['message'];
          }
          this.openDialog({
            success: false,
            title: '登入失敗',
            content: errMsg
          });
        });
    }
  }

  openDialog(data: any) {
    let config: MdDialogConfig = {
      data: data
    };
    this.dialog.open(LoginEmailDialog, config);
  }
}

@Component({
  selector: 'login-email-dialog',
  templateUrl: 'login-email-dialog.html',
})
export class LoginEmailDialog {
  constructor(public dialogRef: MdDialogRef<LoginEmailDialog>, @Inject(MD_DIALOG_DATA) public data: any) { }
}