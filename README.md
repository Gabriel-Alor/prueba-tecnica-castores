## Herramientas usadas para el back end
- XAMPP. xampp-windows-x64-7.4.8-0-VC15-installer Enlace de descarga. https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/7.4.8/xampp-windows-x64-7.4.8-0-VC15-installer.exe/download
- Recomendado tener instalado composer versión 2.5.5
- Postman
- Tener ejecutando el xampp

## Instrucciones para ejecutar el back end

- Crear la base de datos llamada noticias
- Ejecutar el script adjunto que se llama noticias.sql
- En caso de requerir editar el usuario o ip de la conexión de la base de datos, editar el archivo .env que se encuentra dentro de la carpeta back end
- Ejecutar el comando **php artisan serve --host=127.0.0.1** en caso de no ejecutar este comando habrá problemas para consumir el api.

## Herramientas usadas para el front end
- Instalar Angular CLI versión 15.2.7
- Instalar  Node JS versión 18.16.0

## Instrucciones para ejecutar el front end
- Ejecutar el comando **ng serve -o** para correr el proyecto
- En caso de no tener la carpeta de node_modules en el proyecto ejecutar el comando **npm install**

## Ejemplo de como consumir la API
...
public obtenerPersonal(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${ this.baseUrl }/personal`);
}
...
 



