## Herramientas usadas para el back end
- XAMPP. xampp-windows-x64-7.4.8-0-VC15-installer. [Clic para descargar](https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/7.4.8/xampp-windows-x64-7.4.8-0-VC15-installer.exe/download "Clic para descargar")
- Recomendado tener instalado composer versión 2.5.5. [Clic para descargar](https://getcomposer.org/Composer-Setup.exe "Clic para descargar")
- Postman. ([Clic para decargar](https://dl.pstmn.io/download/latest/win64 "Clic para decargar"))
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
- Ejcutar el siguiente comando en el proyecto de Angula **npm install --save @angular/material @angular/cdk** en caso de no ejecutar el comando puede haber problemas con la ejecución del proyecto

## Ejemplo de como consumir la API
Endpoint: http://localhost:8000/api/personal

Código:
```javascript
public obtenerPersonal(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${ this.baseUrl }/personal`);
}
```


