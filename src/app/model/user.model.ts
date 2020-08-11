export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    myCustomData?: string;
    emailVerified: boolean;
    avatar?:string;
    niveauid?: string;
  }