export interface Articulos {

    autor: string;
    fecha: string;
    foto: string;
    informacion: string;
    titulo: string;
    tema: string;

}

export interface Constelaciones {
    
    nombre: string;
    resumen: string;
    estrellas: number;
    estrellaPrincipal: string;
    simbolismo: string;
    ascension: string;
    visibilidad: string;
    descripcion: string;

}

export interface Eventos {

    descripcion: string;
    fecha: string;
    foto: string;
    informacion: string;
    tema: string;
    titulo: string;

}

export interface Foro {

    autor: string;
    fecha: string;
    informacion: string;
    publicaciones: Array<Foro>;
    titulo: string;
    tema: string;

}

export interface Galeria {

    autor: string;
    fecha: string;
    foto: string;
    titulo: string;

}

export interface Guias {

    descripcion: string;
    foto: string;
    informacion: string;
    titulo: string;

}

export interface Noticias {

    descripcion: string;
    fecha: string;
    foto: string;
    informacion: string;
    tema: string;
    titulo: string;

}

export interface Planetas {

    atmosfera: string;
    diametro: string;
    distancia: string;
    exploraciones: Array<string>;
    lunas: number;
    masa: string;
    nombre: string;

}

export interface Usuarios {

    apellido: string;
    contrasena: string;
    correo: string;
    foto: string;
    intereses: Array<string>;
    nombre: string;
    pais: string;
    profesion: string;
    usuario: string;

}