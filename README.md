🎓 CRUD de Estudiantes – Node + Bootstrap 5

Este proyecto es una aplicación web desarrollada en node , que permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre una base de datos de estudiantes. El diseño está completamente implementado con Bootstrap 5 para lograr una interfaz moderna, responsive y fácil de usar. Además, se integra DataTables para el manejo interactivo de la tabla de registros y SweetAlert2 para mostrar alertas elegantes al usuario.

🚀 Características principales

✅ Registro de estudiantes con carga de imagen (foto de perfil).

🔍 Búsqueda dinámica asíncrona (por nombre, DNI o código de estudiante).


✏️ Edición y eliminación de registros con confirmaciones vía SweetAlert.

🆔 Código de estudiante único generado automáticamente por el sistema.

📸 Gestión de archivos (las fotos se almacenan en la carpeta public/uploads).

🧩 Diseño responsive y limpio con Bootstrap 5.


☁️ Preparado para despliegue en Azure Cloud o cualquier hosting node.

🧰 Tecnologías utilizadas Tecnología Descripción node   para desarrollo ágil y seguro. Bootstrap 5 Framework CSS para un diseño moderno y adaptable. DataTables Librería JS para manipulación avanzada de tablas. SweetAlert2 Librería JS para mostrar alertas y confirmaciones personalizadas. MySQL Sistema de gestión de base de datos relacional. Azure / GitHub Despliegue y control de versiones en la nube.

🧱 Estructura de base de datos CREATE DATABASE persona; USE persona;

CREATE TABLE estudiante ( id_estudiante INT AUTO_INCREMENT PRIMARY KEY, foto VARCHAR(50) NOT NULL, dni CHAR(8) NOT NULL UNIQUE, nombre_apellido VARCHAR(50) NOT NULL, fecha_nac DATE, direccion VARCHAR(500) NOT NULL, carrera VARCHAR(50) NOT NULL, periodo VARCHAR(50) NOT NULL, sede VARCHAR(50) NOT NULL, cod_estudiante VARCHAR(11) NOT NULL UNIQUE );

⚙️ Instalación y ejecución local

Clona el repositorio:

git clone https://github.com/Erick-Jheanpier/crudestudiante.git

Instala dependencias con Composer:

composer install

Configura el archivo .env:

database.default.hostname = localhost database.default.database = persona database.default.username = root database.default.password = database.default.DBDriver = MySQLi

Inicia el servidor local:

php spark serve

Abre en tu navegador:

http://localhost:8080/estudiantes

🌐 Despliegue en Azure

El proyecto está preparado para ser desplegado en Azure App Service (PHP 8.x).

Solo necesitas vincular tu repositorio Git y configurar las variables de entorno correspondientes a tu base de datos.

About
No description, website, or topics provided.
Resources
 Readme
License
 MIT license
 Activity
Stars
 0 stars
Watchers
 0 watching
Forks
 0 forks
Releases
No releases published
Create a new release
Packages
No packages published
Publish your first package
Languages
PHP
96.6%
 
CSS
1.7%
 
JavaScript
1.3%
 
HTML
0.4%
Footer
