# Bienvenido al código fuente del frontend de BARBERÍA

**BARBERÍA** es una solución de software basada en la web diseñada tanto para los propietarios de barberías como para los clientes. Simplifica el proceso de reserva de citas y proporciona una interfaz fácil de usar para gestionar reservas, empleados y finanzas.

# Introducción

Este repositorio aloja el frontend de BARBERÍA.

## Comenzando

#### Clona el repositorio primero

```bash

git  clone  https://github.com/No-Country/c18-09-t-node-react.git

```

#### Cambia al directorio del frontend

```bash

cd  frontend

```

#### Instala todas las dependencias

```bash

npm  install

```

#### Ejecuta el servidor de desarrollo

```bash

npm  run  dev

```

## Ramas

- **main** -> **no debería modificarse**, esto es lo que se ejecutará en producción

## Pautas de contribución

1. Clona el repositorio `https://github.com/No-Country/c18-09-t-node-react.git`.

2. Crea una nueva rama para la tarea que se te asignó, `(Feat/Bug/Fix/Chore)/Ticket-title`. Ejemplo: `git checkout -b feat/Sign-up`

3. Después de hacer cambios, ejecuta `git add .`

4. Haz un commit de tus cambios con un mensaje descriptivo: `git commit -m "your commit message"`.

5. Para asegurarte de que no haya conflictos, ejecuta `git pull origin main`.

6. Sube los cambios a tu nueva rama, ejecuta `git push -u origin feat/Sign-up`.

7. Crea un pull request hacia la rama `main`.

8. Asegúrate de describir bien el pull request.

9. > Si has agregado código que debe ser probado, agrega ejemplos de pruebas (capturas de pantalla o comentarios descriptivos por lo menos).

## Tecnologías utilizadas

React - React Router - TypeScript - TailwindCss

## Estructura de carpetas

- `src/`: Contiene todo el código fuente.
  - `components/`: Componentes globales compartidos en toda la aplicación, por ejemplo: Navbar, Footer, etc.
  - `pages/`: Cada página tiene su propia carpeta con todo lo relacionado, por ejemplo: componentes utilizados solo en esta página, llamadas a API, etc.
    - `API/`: Carpeta para alojar todas las llamadas a API necesarias para esta página.
    - `Components/`: Componentes de esta página en particular.
    - `assets`: imagines.
  - `layouts/`: Contiene los diferentes diseños.
  - `styles/`: Almacena los archivos CSS.
  - `helpers/`: Funciones auxiliares (estrictamente para funciones y cada función debería tener idealmente una sola responsabilidad).
  - `config/`: Configuraciones de bibliotecas de terceros.
  - `types/`: Interfaces y tipos (TypeScript).
- `public/`:
  - `assets`: fotos usados a nivel global en la app.
- `README.md`: Documenta el proyecto.
- `tailwind.config.ts`: Configuración de Tailwind.
- `package.json`: Gestiona las dependencias del proyecto.
- `tsconfig.json`: Configuración de TypeScript.
- `vite.config.ts`: Configuración de Vite.

### _CheatSheet de commits_

| Tipo     |                           | Descripción                                                                                                 |
| -------- | ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| feat     | Características           | Una nueva característica                                                                                    |
| fix      | Correcciones de errores   | Una corrección de error                                                                                     |
| docs     | Documentación             | Cambios solo en la documentación                                                                            |
| refactor | Refactorización de código | Un cambio de código que no soluciona un error ni agrega una característica                                  |
| perf     | Mejoras de rendimiento    | Un cambio de código que mejora el rendimiento                                                               |
| test     | Pruebas                   | Agregar pruebas faltantes o corregir pruebas existentes                                                     |
| styles   | Estilos                   | Agregar o corregir estilos CSS styles                                                                       |
| build    | Construcciones            | Cambios en los archivos y scripts de configuración de CI (ejemplo: Travis, Circle, BrowserStack, SauceLabs) |
| ci       | Continuous Integrations   | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| chore    | Tareas                    | Otros cambios que no modifican , frontend o archivos de prueba                                              |
| revert   | Reversiones               | Revierte un commit anterior commit                                                                          |

> _Ejemplos de mensajes de commit_

- `chore: Updated README file` := `chore` se utiliza porque el commit no realizó cambios en las carpetas , frontend o de prueba de ninguna manera.
- `feat: Added plugin info endpoints` := `feat` se utiliza aquí porque la característica no existía antes del commit.

## License

MIT
