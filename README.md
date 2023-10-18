# Instalacion Frontend Angular
+ Instalar node.js: consultar en https://nodejs.org/es/
+ Abrir una consola (PowerShell, CMD, TERM) para actualizar npm ejecutando el comando
```
npm install npm@latest –g
```
+ Instalar Angular CLI (este paso nos permite usar el comando ng)
```
npm install -g @angular/cli
```
+ Instalar BootStrap para el estilo
```
npm install bootstrap@4.6.1
```
# Configurar entorno de desarrollo
Lo primero que hay que hacer es clonar el proyecto de GitHub
+ desde la consola posicionarse en el directorio donde se desea descargar el código y ejecutar
```
git clone https://github.com/dds-frd-utn/ngDDS2023
```
+ una vez terminado el proceso de clonación debemos ingresar al directorio creado
```
cd ngDDS2023
```
+ ahora es necesario instalar las dependencias definidas para el proyecto, para ello corremos
```
npm install
```
+ una vez finalizado el proceso anterior, podemos levantar el servidor de angular con el siguiente comando
```
ng serve --proxy-config=src/proxy.conf.json
```
Este comando tiene configurada la creación de un proxy para evitar los problemas relacionados a [CORS] (https://www.juannicolas.eu/cors-que-es-y-como-funciona/)

# Desarrollo
Aqui se debe realizar el desarrollo de la aplicación. Hay que tener en cuenta que es necesario tener el backend corriendo para que todo funcione.

# Compilar y generar la distribución 
Al terminar el desarrollo es necesario crear los archivos de distribución del proyecto. Esto consiste en un proceso que elimina la dependencia al entorno de desarrollo que creamos localmente, generando los archivos necesarios para que la aplicación funcione correctamente utilizando las tecnologías HTML/CSS/JS
```
npm run build --prod
```
con este comando podemos ver que se creó la carpeta **/dist** y dentro de ella deben estar los archivos compilados del proyecto (HTML/CSS/JS).

Copiar esos archivos en el proyecto del backend (Spring Boot) en el directorio **src/main/resources/static**. 

Finalmente, para ver el proyecto corriendo, se debe ingresar por la url del servicio REST al archivo index.html
```
http://localhost:8080/index.html
```

