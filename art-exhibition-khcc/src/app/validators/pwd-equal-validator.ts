import { AbstractControl, ValidatorFn } from '@angular/forms';


export class PwdEqualValidator {

    static Match(ac: AbstractControl) {

        let confirmPwd = ac.get('confirmPwd');
        let confirmPwdValue = ac.get('confirmPwd').value;
        let pwdValue = ac.get('pwd').value;

        if (pwdValue !== confirmPwdValue)
            confirmPwd.setErrors({ 'notEqual': true });
        else
            confirmPwd.setErrors(null);
    }
}