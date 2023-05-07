
export const obtenerFecha = (): string => {
    
    const hoy = new Date();
    const mes = hoy.getMonth() + 1;
    const dia = hoy.getDate();

    let mesString;
    let diaString;

    if( mes < 10 ){
      mesString = '0' + mes;
    }else {
      mesString = mes;
    }

    if( dia < 10 ){
      diaString = '0' + dia;
    }else{
      diaString = dia;
    }

    const fechadeingreso = `${ hoy.getFullYear() }-${ mesString }-${ diaString }`;

    return fechadeingreso; 
}