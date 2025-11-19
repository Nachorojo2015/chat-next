# Chat-Next - Una aplicación web para chatear con personas

### Stack utilizado:

- Next js 16
- Typescript
- Tailwind CSS
- PostgresSQL
- Pusher
- Cloudinary
- Auth js

## Características principales: 

- Comunicación en tiempo real
- Subida de archivos a la nube
- Creación y eliminación de chats
- Edición del perfil del usuario
- Autenticación
- Manejo de roles
- Diseño responsivo y moderno

## Como empezar: 

Ejecuta este comando en la consola
```
git clone https://github.com/Nachorojo2015/chat-next.git
```

Crea un archivo .env en el directorio principal y completa las variables de entorno como se indica acá:

```
# El connection string de tu base de datos Postgres. Puede ser la local o de algun proveedor como Neon, railway, etc.
DATABASE_URL=

# Agregado por `npx auth`. Más info: https://cli.authjs.dev
AUTH_SECRET=

# https://cloudinary.com/
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# https://pusher.com/
PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=
NEXT_PUBLIC_PUSHER_KEY=
NEXT_PUBLIC_PUSHER_CLUSTER=
```

Luego, instala las dependencias. Ejecuta este comando en tu proyecto
```
npm i
```

Ya con eso puedes empezar!

