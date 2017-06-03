import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdToolbarModule, MdButtonModule, MdCardModule, MdIconModule, MdInputModule, MdDialogModule } from '@angular/material';

import { SignupDialog } from '../components/signup/signup.component';
import { LoginEmailDialog } from '../components/login-email/login-email.component';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdDialogModule
  ],
  exports: [
    MdToolbarModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdDialogModule
  ],
  declarations: [
    SignupDialog,
    LoginEmailDialog
  ],
  entryComponents: [
    SignupDialog,
    LoginEmailDialog
  ],
})
export class CustomMaterialModule { }
