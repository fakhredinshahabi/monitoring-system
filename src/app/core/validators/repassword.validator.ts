import { AbstractControl, ValidationErrors } from '@angular/forms';

export const checkPassword = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const rePassword = control.get('rePassword')?.value;

  if (!password || !rePassword) return null;
  return password === rePassword ? null : { missMatchPassword: true };
};
