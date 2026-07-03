# Biblioteca - Sistema de Gestión

Aplicación web desarrollada con React.js que permite gestionar una biblioteca mediante un sistema de usuarios con roles diferenciados (Administrador y Usuario).
---

## Integrante
Llubisay Guillen

---

## Descripción de la aplicación

Esta aplicación simula un sistema de gestión de biblioteca donde se pueden administrar libros y autores desde una interfaz gráfica.

El sistema permite:

* Iniciar sesión
* Navegar entre distintas vistas
* Gestionar información (CRUD)
* Visualizar contenido según el rol del usuario

---

# CREDENCIALES TEST 

*Administrador:
  - email: admin@gmail.com
  - contraseña: 1234

*Usuario visualizador:
  - email: user@gmail.com
  - contraseña: 1234

---

# Biblioteca Escolar

Entidades principales:

* Libros
* Autores
* Usuarios y Roles

La aplicación implementa un sistema de autenticación simulado con dos roles:

* Usuario (lector)
Puede visualizar libros y autores
Puede ver detalles mediante modales
No puede modificar información

* Administrador
Puede agregar libros y autores
Puede editar información
Puede eliminar registros

*El rol modifica dinámicamente la interfaz (renderizado condicional)

---

## Componentes Funcionales y Hooks

Se utilizaron:

* useState → manejo de estados locales
* useContext → estado global (Auth y Library)
* useEffect (si aplica en tu proyecto)
* División de Componentes

---

El proyecto está organizado en componentes reutilizables:

assets/
components/
pages/
context/
/data
layouts/
styles/

Cada funcionalidad está separada (Libros, Autores, Login, Layout, etc.)

---

* Enrutamiento (React Router)

Se implementó navegación entre vistas mediante React Router:

/login
/dashboard
/libros
/autores

* Rutas protegidas con control de usuario logueado

* Datos Locales

* Usuarios y Autenticación
Login simulado
Logout funcional
Persistencia del usuario en contexto
Manejo de roles (admin / user)

---

## Gestión de Información (CRUD)
* Libros
Listar libros
Ver detalle (modal)
Agregar libros (admin)
Editar libros (admin)
Eliminar libros (admin)

* Autores
Listar autores
Agregar autores (admin)
Editar autores (admin)
Eliminar autores (admin)

---

## Entidades

Se implementan correctamente dos entidades:

Libros
Autores

* Relación: cada libro tiene un autor asociado

* Manejo del Estado

Se utiliza Context API:

AuthContext → usuario y autenticación
LibraryContext → libros y autores

* Estado global compartido entre componentes

* Validaciones

Se implementan validaciones básicas:

Login: campos obligatorios
Formularios:
Título obligatorio
Autor obligatorio
Mensajes de alerta en caso de error

---

* Interfaz y Diseño
UI clara y organizada
Uso de Bootstrap + CSS personalizado
Paleta visual consistente
Cards para mostrar información
Modal para detalle de libros

---

Modal de detalle de libros

Al hacer click en un libro:

Se abre un pop-up
Muestra título, autor y descripción
Incluye imagen ilustrativa

---

## Instalación y ejecución
* git clone <URL_DEL_REPO>
* cd nombre-del-proyecto
* npm install
* npm run dev

---

## Capturas de pantalla

Login

<img width="1845" height="1102" alt="image" src="https://github.com/user-attachments/assets/9c079486-549e-42cb-ac49-7f7d511e8729" />

Dashboard


<img width="1917" height="1141" alt="image" src="https://github.com/user-attachments/assets/9e9bc79e-2b9d-4728-805c-235ae2741746" />


Libros - Vista Administrador


<img width="1912" height="1085" alt="image" src="https://github.com/user-attachments/assets/eee3df8c-1f2c-45f1-8672-fcd586006327" />


Libros - Vista Usuario visualizacion


<img width="1912" height="1091" alt="image" src="https://github.com/user-attachments/assets/3e6fa6cd-9a35-4302-8a21-f742b4e445c7" />


Autores - Vista Administrador


<img width="1917" height="1091" alt="image" src="https://github.com/user-attachments/assets/91574314-3290-4ba1-a6ad-6028c23015f2" />


Modal

<img width="532" height="566" alt="image" src="https://github.com/user-attachments/assets/90e5e088-dbf6-4eca-aec4-7fece64fec6e" />
