# consulti-123
# DOCKERIZAR APLICACION STREAMING SPRING BOOT
PASOS:

1.- Limpiar el proyecto MAVEN de spring boot STREAMING con MAVEN CLEAN.
2.- Validar que el proyecto se haya limpiado correctamente BUILD SUCCESS.
3.- Despues de esto realizar la instalacion de MAVEN.
4.- Esperar a que se descargue todo y luego verificar que se haya construido correctamente.
5.- Revisar que en el TARJET se haya creado correctamente el .jar de la aplicacion.
6.- En el directorio raiz del proyecto crear un fichero llamado Dockerfile.
7.- Dentro del fichero creado colocar la configuracion de Docker.
8.- Abrir una terminal y sitúarse en el directorio principal del proyecto.
9.- Hacer la construccion de Dockerfile, en la terminal escribir lo siguiente: docker build -t "streaming-docker" .
10.- Comprobar la imagen creada: Abrir la aplicación de Windows Docker Desktop y observa que se ha añadido la nueva imagen
11.- Ejecutar contenedor Docker, sitúarse en el directorio principal de tu proyecto e introduce:
docker run –name streaming –publish 8081:8081 spring-boot-docker
12.- Por ultimo, observar que la aplicacion se levante correctamente.