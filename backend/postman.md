```markdown
# Usuarios de Ejemplo


# Postman Collection

## Crear Usuarios

### Request
- **Method:** POST
- **URL:** `http://localhost:3000/api/users`
- **Headers:**
    - `Content-Type: application/json`
- **Body:**
    ```json
    [
        {
            "username": "jdoe",
            "email": "jdoe@example.com",
            "password": "Password123!"
        },
        {
            "username": "asmith",
            "email": "asmith@example.com",
            "password": "SecurePass456!"
        },
        {
            "username": "mbrown",
            "email": "mbrown@example.com",
            "password": "MyPassword789!"
        },
        {
            "username": "lwilson",
            "email": "lwilson@example.com",
            "password": "WilsonPass101!"
        },
        {
            "username": "kclark",
            "email": "kclark@example.com",
            "password": "ClarkSecure202!"
        }
    ]
    ```
```

```markdown
## Crear Eventos

### Request
- **Method:** POST
- **URL:** `http://localhost:3000/api/events`
- **Headers:**
    - `Content-Type: application/json`
- **Body:**
    ```json
    [
        {
            "title": "Conferencia de Tecnología",
            "description": "Una conferencia sobre las últimas tendencias en tecnología.",
            "startTime": "2023-11-01T09:00:00Z",
            "endTime": "2023-11-01T17:00:00Z",
            "location": "Centro de Convenciones",
            "status": "pendiente",
            "tags": ["tecnología", "conferencia"],
            "userId": "60d0fe4f5311236168a109ca",
            "visibility": "publico",
            "createdAt": "2023-10-01T10:00:00Z",
            "updatedAt": "2023-10-01T10:00:00Z"
        },
        {
            "title": "Taller de Fotografía",
            "description": "Aprende técnicas avanzadas de fotografía.",
            "startTime": "2023-11-05T10:00:00Z",
            "endTime": "2023-11-05T14:00:00Z",
            "location": "Estudio Creativo",
            "status": "pendiente",
            "tags": ["fotografía", "taller"],
            "userId": "60d0fe4f5311236168a109cb",
            "visibility": "privado",
            "createdAt": "2023-10-02T10:00:00Z",
            "updatedAt": "2023-10-02T10:00:00Z"
        },
        {
            "title": "Maratón de Ciudad",
            "description": "Participa en el maratón anual de la ciudad.",
            "startTime": "2023-11-10T06:00:00Z",
            "endTime": "2023-11-10T12:00:00Z",
            "location": "Parque Central",
            "status": "pendiente",
            "tags": ["deporte", "maratón"],
            "userId": "60d0fe4f5311236168a109cc",
            "visibility": "publico",
            "createdAt": "2023-10-03T10:00:00Z",
            "updatedAt": "2023-10-03T10:00:00Z"
        },
        {
            "title": "Concierto de Rock",
            "description": "Disfruta de una noche de rock en vivo.",
            "startTime": "2023-11-15T20:00:00Z",
            "endTime": "2023-11-15T23:00:00Z",
            "location": "Auditorio Nacional",
            "status": "pendiente",
            "tags": ["música", "concierto"],
            "userId": "60d0fe4f5311236168a109cd",
            "visibility": "publico",
            "createdAt": "2023-10-04T10:00:00Z",
            "updatedAt": "2023-10-04T10:00:00Z"
        },
        {
            "title": "Exposición de Arte",
            "description": "Exposición de arte contemporáneo.",
            "startTime": "2023-11-20T11:00:00Z",
            "endTime": "2023-11-20T18:00:00Z",
            "location": "Galería de Arte Moderno",
            "status": "pendiente",
            "tags": ["arte", "exposición"],
            "userId": "60d0fe4f5311236168a109ce",
            "visibility": "privado",
            "createdAt": "2023-10-05T10:00:00Z",
            "updatedAt": "2023-10-05T10:00:00Z"
        }
    ]
    ```
```markdown
## Crear Eventos con Timestamp

### Request
- **Method:** POST
- **URL:** `http://localhost:3000/api/events`
- **Headers:**
    - `Content-Type: application/json`
- **Body:**
    ```json
    [ {
            "title": "Conferencia de Tecnología",
            "description": "Una conferencia sobre las últimas tendencias en tecnología.",
            "startTime": "2023-11-01T09:00:00Z",
            "endTime": "2023-11-01T17:00:00Z",
            "location": "Centro de Convenciones",
            "status": "pendiente",
            "tags": ["tecnología", "conferencia"],
            "userId": "60d0fe4f5311236168a109ca",
            "visibility": "publico",
            "createdAt": "2023-10-01T10:00:00Z",
            "updatedAt": "2023-10-01T10:00:00Z",
            "timestamp": "2023-10-01T10:00:00Z"
        }
       ,
        {
            "title": "Taller de Fotografía",
            "description": "Aprende técnicas avanzadas de fotografía.",
            "startTime": "2023-11-05T10:00:00Z",
            "endTime": "2023-11-05T14:00:00Z",
            "location": "Estudio Creativo",
            "status": "pendiente",
            "tags": ["fotografía", "taller"],
            "userId": "60d0fe4f5311236168a109cb",
            "visibility": "privado",
            "createdAt": "2023-10-02T10:00:00Z",
            "updatedAt": "2023-10-02T10:00:00Z",
            "timestamp": "2023-10-02T10:00:00Z"
        },
        {
            "title": "Maratón de Ciudad",
            "description": "Participa en el maratón anual de la ciudad.",
            "startTime": "2023-11-10T06:00:00Z",
            "endTime": "2023-11-10T12:00:00Z",
            "location": "Parque Central",
            "status": "pendiente",
            "tags": ["deporte", "maratón"],
            "userId": "60d0fe4f5311236168a109cc",
            "visibility": "publico",
            "createdAt": "2023-10-03T10:00:00Z",
            "updatedAt": "2023-10-03T10:00:00Z",
            "timestamp": "2023-10-03T10:00:00Z"
        },
        {
            "title": "Concierto de Rock",
            "description": "Disfruta de una noche de rock en vivo.",
            "startTime": "2023-11-15T20:00:00Z",
            "endTime": "2023-11-15T23:00:00Z",
            "location": "Auditorio Nacional",
            "status": "pendiente",
            "tags": ["música", "concierto"],
            "userId": "60d0fe4f5311236168a109cd",
            "visibility": "publico",
            "createdAt": "2023-10-04T10:00:00Z",
            "updatedAt": "2023-10-04T10:00:00Z",
            "timestamp": "2023-10-04T10:00:00Z"
        },
        {
            "title": "Exposición de Arte",
            "description": "Exposición de arte contemporáneo.",
            "startTime": "2023-11-20T11:00:00Z",
            "endTime": "2023-11-20T18:00:00Z",
            "location": "Galería de Arte Moderno",
            "status": "pendiente",
            "tags": ["arte", "exposición"],
            "userId": "60d0fe4f5311236168a109ce",
            "visibility": "privado",
            "createdAt": "2023-10-05T10:00:00Z",
            "updatedAt": "2023-10-05T10:00:00Z",
            "timestamp": "2023-10-05T10:00:00Z"
        }
    ]
    ```
```
```

```markdown
## Crear Evento con Validaciones

### Request
- **Method:** POST
- **URL:** `http://localhost:3000/api/events`
- **Headers:**
    - `Content-Type: application/json`
- **Body:**
    ```json
    {
        "title": "Evento de Prueba",
        "description": "Descripción del evento de prueba.",
        "startTime": "2023-12-01T10:00:00Z",
        "endTime": "2023-12-01T12:00:00Z",
        "location": "Lugar de Prueba",
        "status": "pendiente",
        "tags": ["prueba", "evento"],
        "userId": "60d0fe4f5311236168a109cf",
        "visibility": "publico"
    }
    ```
```

```markdown
## Crear Más Eventos de Prueba

### Request
- **Method:** POST
- **URL:** `http://localhost:3000/api/events`
- **Headers:**
    - `Content-Type: application/json`
- **Body:**
    ```json
    [
        {
            "title": "Evento de Prueba 2",
            "description": "Descripción del evento de prueba 2.",
            "startTime": "2023-12-02T10:00:00Z",
            "endTime": "2023-12-02T12:00:00Z",
            "location": "Lugar de Prueba 2",
            "status": "pendiente",
            "tags": ["prueba", "evento"],
            "userId": "60d0fe4f5311236168a109d0",
            "visibility": "publico"
        },
        {
            "title": "Evento de Prueba 3",
            "description": "Descripción del evento de prueba 3.",
            "startTime": "2023-12-03T10:00:00Z",
            "endTime": "2023-12-03T12:00:00Z",
            "location": "Lugar de Prueba 3",
            "status": "pendiente",
            "tags": ["prueba", "evento"],
            "userId": "60d0fe4f5311236168a109d1",
            "visibility": "publico"
        },
        {
            "title": "Evento de Prueba 4",
            "description": "Descripción del evento de prueba 4.",
            "startTime": "2023-12-04T10:00:00Z",
            "endTime": "2023-12-04T12:00:00Z",
            "location": "Lugar de Prueba 4",
            "status": "pendiente",
            "tags": ["prueba", "evento"],
            "userId": "60d0fe4f5311236168a109d2",
            "visibility": "publico"
        },
        {
            "title": "Evento de Prueba 5",
            "description": "Descripción del evento de prueba 5.",
            "startTime": "2023-12-05T10:00:00Z",
            "endTime": "2023-12-05T12:00:00Z",
            "location": "Lugar de Prueba 5",
            "status": "pendiente",
            "tags": ["prueba", "evento"],
            "userId": "60d0fe4f5311236168a109d3",
            "visibility": "publico"
        }
    ]
    ```
```markdown
## Crear Eventos Reales

### Request
- **Method:** POST
- **URL:** `http://localhost:3000/api/events`
- **Headers:**
    - `Content-Type: application/json`
- **Body:**
    ```json
    [
        {
            "title": "Feria del Libro",
            "description": "Una feria con las últimas novedades editoriales.",
            "startTime": "2023-12-10T09:00:00Z",
            "endTime": "2023-12-10T18:00:00Z",
            "location": "Plaza Central",
            "status": "pendiente",
            "tags": ["libros", "feria"],
            "userId": "60d0fe4f5311236168a109d4",
            "visibility": "publico"
        },
        {
            "title": "Festival de Cine",
            "description": "Proyección de películas independientes.",
            "startTime": "2023-12-15T17:00:00Z",
            "endTime": "2023-12-15T23:00:00Z",
            "location": "Cine Local",
            "status": "pendiente",
            "tags": ["cine", "festival"],
            "userId": "60d0fe4f5311236168a109d5",
            "visibility": "publico"
        },
        {
            "title": "Concierto de Jazz",
            "description": "Una noche de jazz en vivo.",
            "startTime": "2023-12-20T20:00:00Z",0
            "endTime": "2023-12-20T22:00:00Z",
            "location": "Club de Jazz",
            "status": "pendiente",
            "tags": ["música", "jazz"],
            "userId": "60d0fe4f5311236168a109d6",
            "visibility": "publico"
        },
        {
            "title": "Exposición de Fotografía",
            "description": "Exposición de fotografías de paisajes.",
            "startTime": "2023-12-25T10:00:00Z",
            "endTime": "2023-12-25T17:00:00Z",
            "location": "Galería de Arte",
            "status": "pendiente",
            "tags": ["fotografía", "exposición"],
            "userId": "60d0fe4f5311236168a109d7",
            "visibility": "publico"
        },
        {
            "title": "Torneo de Ajedrez",
            "description": "Competencia de ajedrez abierta a todos.",
            "startTime": "2023-12-30T09:00:00Z",
            "endTime": "2023-12-30T18:00:00Z",
            "location": "Centro Deportivo",
            "status": "pendiente",
            "tags": ["ajedrez", "torneo"],
            "userId": "60d0fe4f5311236168a109d8",
            "visibility": "publico"
        }
    ]
    ```
```