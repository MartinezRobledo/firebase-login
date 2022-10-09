import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

  firebaseError(code: string) {
    switch (code) {
      //correo ya existe
      case 'auth/email-already-in-use':
        return 'El usuario ya existe';
      //contraseña debila
      case 'auth/weak-password':
        return 'La contraseña es muy debil';
      //email invalido
      case 'auth/invalid-email':
        return 'El formato del email es invalido';
      //usuario no existente
      case 'auth/user-not-found':
        return 'El usuario no existe';
      //La contraseña es erronea
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      default:
        return 'Error desconocido';
    }
  }
}
