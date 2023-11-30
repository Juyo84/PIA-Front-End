export interface Articulos {

    autor: string;
    fecha: string;
    foto: string;
    informacion: string;
    titulo: string;
    tema: string;
    uid: string;

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

    fecha: string;
    foto: string;
    informacion: string;
    tema: string;
    titulo: string;
    uid: string;

}

export interface Foro {

    autor: string;
    fecha: string;
    informacion: string;
    publicaciones: Array<RespuestaForo>;
    titulo: string;
    tema: string;
    uid: string;
    hora: string;

}

export interface RespuestaForo {

    autor: string;
    hora: string;
    fecha: string;
    informacion: string;
    titulo: string;

}

export interface Galeria {

    autor: string;
    fecha: string;
    foto: string;
    titulo: string;
    tema: string;
    uid: string;
    tipo: string;

}

export interface Guias {

    descripcion: string;
    foto: string;
    informacion: string;
    titulo: string;
    uid: string;
    tema: string;

}

export interface Noticias {

    fecha: string;
    foto: string;
    informacion: string;
    tema: string;
    titulo: string;
    uid: string;

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
    correo: string;
    uid: string;
    foto: string;
    intereses: Array<string>;
    nombre: string;
    pais: string;
    profesion: string;
    usuario: string;
    veridico: boolean;

}