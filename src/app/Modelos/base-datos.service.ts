import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {

  constructor(public firestore: AngularFirestore) { }

  //Nuevo Registro
  createDocument<tipo>(datos: tipo, enlace: string, id: string){

    const ref = this.firestore.collection<tipo>(enlace);
    return ref.doc(id).set(datos);

  }

  //Nuevo Id
  crearId(){

    return this.firestore.createId();

  }

  //Registros
  getDocumentChanges<tipo>(enlace: string): Observable<tipo | undefined> {
  
    const itemDoc: AngularFirestoreDocument<tipo> | null = this.firestore.doc<tipo>(enlace);
    return itemDoc ? itemDoc.valueChanges() : of(undefined);
  
  }

  //Entidades
  getCollectionChanges<tipo>(enlace: string): Observable<tipo[]>{

    const ref = this.firestore.collection<tipo>(enlace);
    return ref.valueChanges();

  }

  

}
