import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(private storage: AngularFireStorage) { }

  subirImagen(file: any, path: string, nombre: string): Promise<string>{

    return new Promise(resolve =>{

      const filepath = path + '/' + nombre;
      const ref = this.storage.ref(filepath);
      const task = ref.put(file);

      task.snapshotChanges().pipe(finalize(() => {
      
        ref.getDownloadURL().subscribe(res => {

          const downloadURL = res;
          resolve(downloadURL);
          return;

        });
      
      })).subscribe();
    
      });

  }

}
