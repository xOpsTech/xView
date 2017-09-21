import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(ac: AbstractControl) {
        let password = ac.get('password').value; // to get value in input tag
        let confirmPassword = ac.get('cnfmpassword').value; // to get value in input tag
        if (password != confirmPassword) {
            ac.get('cnfmpassword').setErrors({ MatchPassword: true })
        } else {
            return null
        }
    }
}