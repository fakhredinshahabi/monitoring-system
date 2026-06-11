import {AbstractControl, ValidatorFn} from '@angular/forms';

export const strongPasswordValidator:ValidatorFn=(control:AbstractControl)=>{
  const password =control.value ?? ''
  const hasUpperCase=/[A-Z]/.test((password));
  const hasLowerCase=/[a-z]/.test((password));
  const hasNumber=/[0-9]/.test((password));
  const hasCharacter =/[!@#$%^&*()_+]/.test(password);

     return ( hasCharacter && hasLowerCase && hasUpperCase && hasNumber) ? null: {
            weak : {hasNumber,hasCharacter,hasUpperCase,hasLowerCase},
     }

}
