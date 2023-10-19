# Back-end para TP de Diseño de Sistemas basado en Spring Boot (Java)

La base de datos está dockerizada. Para usarla hay que correr en una consola (TERM, 
CMD, PowerShell, etc) el comando:
```
docker pull cherckyto/dds-mysql:1.0
```
Con este comando se descarga la imagen desde [docker hub](hub.docker.com). Ahora es 
necesario crear un contenedor a partir de esa imagen, para ello corremos el siguiente 
comando.

```
docker run -p 3306:3306 -d cherckyto/dds-mysql:1.0
```

Si se inicializa el contenedor desde Docker Desktop hay que exponer el puerto 3306 del contenedor. 
Para ello es necesario ingresar al menú Images y al presionar el botón Run de la imagen cherckyto/dds-mysql 
se debe abrir Optional Settings e ingresar el valor 3306 en ambos casilleros de la sección Ports. Luego 
presionar Run.

Y queda la base de datos lista en la máquina. En el directorio **/db** se encuentran los archivos para dockerizar la base de datos si no se desea utilizar la imagen subida al hub de docker.

Para realizar las pruebas con Postman se puede importar la colección para este ejercicio que se encuentra en el directorio raiz del proyecto.

Para iniciar el proyecto desde cero se utilizó [Spring Initializr](https://start.spring.io/#!type=maven-project&language=java&platformVersion=3.1.0&packaging=jar&jvmVersion=17&groupId=org.utn.frd&artifactId=dds&name=dds&description=Backend%20DDS&packageName=org.utn.frd.dds&dependencies=mysql,web,data-jpa,data-jpa)

El proyecto de Spring Boot contiene un dockerfile que permite dockerizar la aplicación.

Para crear una imagen a partir del dockerfile correr:
```
docker build --platform linux/amd64 -t spring-dds .
```

Para levantar un contenedor desde esa imagen:
```
docker run -p 8080:8080 -t spring-dds
```

# Dockerización con Docker compose
Docker compose es una herramienta que nos permite levantar diferentes contenedores que son necesarios para que una aplicación funcione. 
En nuestro caso, cada vez que queremos correr el proyecto, necesitamos levantar el contenedor de la base de datos y 
por otro lado corremos el proyecto de Spring boot (que nos dá el back-end) y el front-end, en 
este caso el front-end está corriendo en node.js en otro proyecto.

Lo primero que debemos hacer es crear la distribución del proyecto de angular. Para esto 
ver el [repositorio](https://github.com/dds-frd-utn/ngDDS2023).

Luego de copiar los archivos generados en angular dentro del directorio **src/main/resources/static** 
podemos probar en Eclipse que todo esté funcionando correctamente. Simplemente ingresamos a 
localhost desde un navegador en el puerto que hayamos seleccionado, por ejemplo: http://localhost:8080 
y allí deberíamos ver el front-end funcionando normalmente (mostrando los datos de la base). 
Parar esta ejecución para continuar con el siguiente paso.

Ahora es necesario instalar un plugin de docker [docker-compose](https://docs.docker.com/compose/install/) que nos permite levantar con un solo comando los 
contenedores necesarios para que la aplicación funcione (en nuestro caso, dos). Si tenés 
instalado docker Desktop no es necesario instalar docker-compose, ya que viene integrado.

Desde una consola (TERM, CMD, PowerShell, etc) navegar hasta el directorio del proyecto 
y ejecutar
```
docker-compose up -d
```
Con esto se podrá ver que se levantaron 3 contenedores, tanto en el registro de la consola, 
como en docker Desktop. En este último se puede ver que los 3 contenedores se encuentran 
agrupados y es posible tomar acciones sobre ellos de manera general o individual.

Si todo funcionó bien, se debería ir al navegador y ver la aplicación corriendo en:
> http://localhost:8080/

Pero también se podrá ver un cliente de base de datos (phpMyAdmin) para poder trabajar 
con ella si se lo desea en:
> http://localhost:8000/

# Subir imagen a Docker Hub
Para subir la imagen a hub.docker.com se puede seguir [este manual](https://aulasoftwarelibre.github.io/taller-de-docker/dockerfile/#compartir-imagenes)

No es necesario subir la imagen del contenedor de la base de datos ni de phpmyadmin. 
Sólo es necesaria la del proyecto Spring Boot, que contiene el back y el front end.