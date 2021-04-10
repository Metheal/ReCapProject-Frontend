export interface User {
  userID: number;
  firstName: string;
  lastName: string;
  eMail: string;
  passwordHash: string;
  passwordSalt: string;
}
