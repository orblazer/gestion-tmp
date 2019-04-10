import { UserRole } from '~/lib/enum'

declare namespace User {
  interface User {
    readonly _id: string;
    username: string;
    password: {
      salt: string;
      hash: string;
      iterations: number;
    };
    displayName: string;
    role: UserRole;
    createdAt: Date;
  }

  interface UserJWT {
    readonly id: string;
    username: string;
    displayName: string;
    role: UserRole;
  }

  interface UserInput {
    username: string;
    password: string;
  }

 type UserType = false | UserJWT
}

export = User
