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
         "target": "http://localhost:3000",
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
     import { Injectable } from "@angular/core";
     import { HttpClient } from "@angular/common/http";

     @Injectable({
       providedIn: "root",
     })
     export class AppService {
       constructor(private http: HttpClient) {}

       fetchData() {
         return this.http.get("/api/data"); // Esto se redirigirá al servidor Nest.js
       }
     }
     ```

## Configuración Docker

1. **crea docker-composer**:

   ```bash
    touch docker-composer.yml
    mkdir db && touch db/init.sql
   ```

   ````yml
   version: '3.8'

   services:
     nest_pg:
       image: postgres:16.3
       container_name: nest_pg
       restart: always
       environment:
         - POSTGRES_DB=${POSTGRES_DB}
         - POSTGRES_USER=${POSTGRES_USER}
         - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
       volumes:
         - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
       ports:
         - 5432:5432
     ```

   ````

2. **crea archivo .env**:

- se crea un archivo .env, se instala el paquete dotenv & @nestjs/config y se configura en el módulo

  ```bash
    npm install dotenv
    npm i --save @nestjs/config
  ```

  ```txt
    DB_NAME=nestdb
    DB_USER=nestdb
    DB_PASSWORD=secret1234
    DB_HOST=localhost
    DB_PORT=5432
  ```

3. **Levantar docker**:

   ```bash
     docker-compose up
   ```

<!-- ## Configuración Prisma

1. **Instala Prisma**:

     ```bash
      npm i prisma -D
     ```

2. **Configura Prisma**:

     ```bash
      npx prisma init
     ``` -->

## Instalar TypeOrm

```bash
  npm install --save @nestjs/typeorm typeorm pg
```

```typescript
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ProductsModule } from "./modules/products/products.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST, // Utiliza las variables de entorno
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../../client/dist"),
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

## Verificación

Iniciamos la aplicación Angular y verificamos que las solicitudes se redirijan correctamente al servidor Nest.js a través del proxy.

## creando el Módulo

```bash
nest g mo modules/products
nest g class modules/products/product
nest g co modules/products
nest g s modules/products
```

o

```bash
nest generate resource modules/products
```

- resumen

  ```bash
  nest g co mod mo s modules/products
  ```

  ```bash
  nest generate resource modules/auth
  npm i @nestjs/jwt @nestjs/passport passport passport-jwt passport-local
  ```

## Contribución

Si deseas contribuir, sigue estos pasos:

1. Crea una rama desde `main`.
2. Realiza tus cambios y asegúrate de que las pruebas pasen.
3. Envía una solicitud de extracción (PR) a la rama `main`.

¡Gracias por contribuir! 😊
