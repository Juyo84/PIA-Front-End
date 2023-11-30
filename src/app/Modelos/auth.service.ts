import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) {

    this.getUid();

   }

  async login(correo: string, contra: string){

    const res = await this.auth.signInWithEmailAndPassword(correo, contra);

    return res;

  }

  async logInGoogle(): Promise<firebase.default.auth.UserCredential> {

    const provider = new firebase.default.auth.GoogleAuthProvider();
    const res = await this.auth.signInWithPopup(provider);

    return res;

  }
  
  logout(){

    return this.auth.signOut();

  }

  registro(email: string, contra: string){

    return this.auth.createUserWithEmailAndPassword(email, contra);

  }

  async getUid(){

    const user = await this.auth.currentUser;
    
    if(user === null){

      return null;

    }else{

      return user.uid;

    }

  }

  stateAuth() {

    return this.auth.authState;
    
  }

  async enviarCorreoRestablecimiento(email: string){

    return await this.auth.sendPasswordResetEmail(email);

  }

  async eliminarCuenta(){

    

    const user = this.auth.currentUser;

    if(user === null){

      return null;

    }
    
    return this.auth.user.subscribe(res => {

      return res!.delete();

    })
    
  }

}
