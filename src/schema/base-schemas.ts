import * as Yup from 'yup';
import STRINGS from '../localization';

export const {
  username: usernameErrors,
  email: emailErrors,
  password: passwordErrors,
} = STRINGS.schema.baseSchema;

const USERNAME_PATTERN = /^[a-zA-Z0-9._]+$/;
const USERNAME_MIN = 3;
const USERNAME_MAX = 30;

const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|;:'",.<>?/])[\w!@#$%^&*()_+=[\]{}|;:'",.<>?/]{8,}$/;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 16;

const username = Yup.string()
  .min(
    USERNAME_MIN,
    usernameErrors.MinLength.replace('{min}', `${USERNAME_MIN}`),
  )
  .max(
    USERNAME_MAX,
    usernameErrors.MaxLength.replace('{max}', `${USERNAME_MAX}`),
  )
  .matches(USERNAME_PATTERN, usernameErrors.Invalid);

const email = Yup.string().email(emailErrors.Invalid);

const password = Yup.string()
  .min(
    PASSWORD_MIN,
    passwordErrors.MinLength.replace('{min}', `${PASSWORD_MIN}`),
  )
  .max(
    PASSWORD_MAX,
    passwordErrors.MaxLength.replace('{max}', `${PASSWORD_MAX}`),
  )
  .matches(PASSWORD_PATTERN, passwordErrors.Complexity);

export const baseSchemas = {username, email, password};
