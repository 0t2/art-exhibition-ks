import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { PwdEqualValidator } from '../../validators/pwd-equal-validator';

import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formGroup: FormGroup;
  user: Observable<firebase.User>;

  constructor(private fb: FormBuilder, public afAuth: AngularFireAuth, private router: Router, public dialog: MdDialog) {
    this.formGroup = fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      confirmPwd: ['', [Validators.required, Validators.minLength(6)]]
    },
      {
        validator: PwdEqualValidator.Match
      });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.afAuth.auth
        .createUserWithEmailAndPassword(this.formGroup.value.email, this.formGroup.value.pwd)
        .then(success => {
          this.afAuth.auth.currentUser.sendEmailVerification();
          this.openDialog({
            success: true,
            title: '註冊成功',
            content: '請前往信箱驗證您的電子郵件地址!'
          });
        })
        .catch(err => {
          console.log(err);
          let errMsg: string = '';
          if (err['code'] === 'auth/email-already-in-use') {
            errMsg = 'Email 已經被使用';
          } else {
            errMsg = err['message'];
          }
          this.openDialog({
            success: false,
            title: '註冊失敗',
            content: errMsg
          });
        });
    }
  }

  openDialog(data: any) {
    let config: MdDialogConfig = {
      data: data
    };
    let dialogRef = this.dialog.open(SignupDialog, config);
    dialogRef.afterClosed().subscribe(result => {
      if (data.success) {
        console.log(result);
        this.router.navigateByUrl('/');
      }
    });
  }

}

@Component({
  selector: 'signup-info-dialog',
  templateUrl: 'signup-info-dialog.html',
})
export class SignupDialog {
  constructor(public dialogRef: MdDialogRef<SignupDialog>, @Inject(MD_DIALOG_DATA) public data: any) { }
}