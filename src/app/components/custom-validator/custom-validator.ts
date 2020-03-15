import { FormControl, FormGroup, AbstractControl, AsyncValidatorFn } from '@angular/forms';

export class CustomValidator {

    public static isValidMailFormat(control: FormControl) {
        let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(control.value != null && control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return { "isValidMailFormat": true };
        }

        return null;
    }

    public static areEqual(group: FormGroup) {
        let val;
        let valid = true;

        for (var name in group.controls) {
            if(val === undefined) {
                val = group.controls[name].value
            }
            else {
                if(val !== group.controls[name].value) {
                    valid = false;
                    break;
                }
            }
        }

        if(valid) {
            return null;
        }

        return {
            areEqual: true
        };
    }

    public static isTrue(control) {
        if(control.value == true) {
            return null;
        }
        return {
            isTrue: true
        };
    }

    public static password(control: FormControl) {
        let hasNumber = /\d/.test(control.value);
        let hasUpper = /[A-Z]/.test(control.value);
        let hasLower = /[a-z]/.test(control.value);
        let length = control.value.length >= 8;
        let notEmpty = control.value != null && control.value != "";
        if(notEmpty && !(hasNumber && hasUpper && hasLower && length)) {
            return { password: true };
        }
        return null;
    }

    public static compareDates(group: FormGroup) {
        const dateStartControl = group.controls['dateStart'];
        const dateEndControl = group.controls['dateEnd'];

        if(dateEndControl.value && (dateStartControl.value > dateEndControl.value)) {
            return {
                compareDates: true
            };
        }

        return null;
    }
}