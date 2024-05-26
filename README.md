# Turbo Repo

Este repositorio contiene dos aplicaciones: una **Nest.js** para el backend y una **Angular** para el frontend. Utilizamos **Turbo Repo** para gestionar y construir ambas aplicaciones de manera eficiente.

## Estructura del Repositorio

- `apps/api`: Aplicación **Nest.js** para el backend.
- `apps/client`: Aplicación **Angular** para el frontend.

## Configuración

1. **Instalación de Dependencias**:
   - Ejecuta `npm install` en la raíz del proyecto para instalar las dependencias de desarrollo y las dependencias compartidas.

2. **Desarrollo Local**:
   - Inicia el servidor de desarrollo para ambas aplicaciones con el siguiente comando:
     ```bash
     npm run dev
     ```
   - La aplicación **Nest.js** estará disponible en `http://localhost:3000`.
   - La aplicación **Angular** estará disponible en `http://localhost:4200`.

3. **Construcción para Producción**:
   - Compila ambos proyectos para producción con:
     ```bash
     npm run build
     ```

4. **Servir Archivos Estáticos con Nest.js**:
   - La aplicación **Nest.js** sirve los archivos estáticos de la aplicación **Angular**.
   - Verifica la configuración en `api/src/app.module.ts`.


5. **Instalar dependencias en Nest.js**:
   `npm install --workspace api @nestjs/serve-static`

6. **Ejecutar en produccion**:
   `node apps/api/dist/main.js`

## Configuración del Proxy

Para comunicar el cliente (**Angular**) con el servidor (**Nest.js**) a través de un dominio compartido, hemos configurado un proxy en la aplicación **Angular**.

1. **Creación del Archivo de Configuración de Proxy**:
   - En la raíz de la aplicación **Angular**, creamos un archivo llamado `proxy.conf.json`.
   - Este archivo contiene la configuración del proxy para redirigir las solicitudes al servidor **Nest.js**.
   - Ejemplo de contenido en `proxy.conf.json`:
     ```json
     {
       "/api": {
         "target": "http://localhost:3000", // Cambia esto a la URL de tu servidor Nest.js
         "secure": false
       }
     }
     ```

2. **Configuración en el Archivo angular.json**:
   - Abrimos el archivo `angular.json` en la raíz de la aplicación.
   - Buscamos la sección `"architect" > "serve" > "options"` y agregamos la siguiente línea:
     ```json
     "proxyConfig": "proxy.conf.json"
     ```

3. **Iniciar la Aplicación con el Proxy**:
   - Ejecutamos el siguiente comando para iniciar la aplicación Angular con el proxy:
     ```bash
     ng serve
     ```

4. **Consumo del Backend a través del Proxy**:
   - En el código Angular, cuando realicemos solicitudes HTTP, utilizaremos la ruta relativa `/api` como prefijo.
   - Ejemplo en un servicio Angular:
     ```typescript
     // app.service.ts
     import { Injectable } from '@angular/core';
     import { HttpClient } from '@angular/common/http';

     @Injectable({
       providedIn: 'root'
     })
     export class AppService {
       constructor(private http: HttpClient) {}

       fetchData() {
         return this.http.get('/api/data'); // Esto se redirigirá al servidor Nest.js
       }
     }
     ```

## Verificación

Iniciamos la aplicación Angular y verificamos que las solicitudes se redirijan correctamente al servidor Nest.js a través del proxy.

## Contribución

Si deseas contribuir, sigue estos pasos:

1. Crea una rama desde `main`.
2. Realiza tus cambios y asegúrate de que las pruebas pasen.
3. Envía una solicitud de extracción (PR) a la rama `main`.

¡Gracias por contribuir! 😊