# 🥑 Nutri Plans - Backend API

Backend del sistema **Nutri Plans**, desarrollado con **NestJS + TypeScript**, conectado a **PostgreSQL (Neon)** para datos relacionales y **MongoDB (Atlas)** para seguimiento y dietas. Incluye autenticación JWT, validación robusta con DTOs, y manejo global de errores.

---

## 🚀 Tecnologías principales

- 🚀 **NestJS** con **TypeScript**
- 🐘 **PostgreSQL (Neon)** + **TypeORM**
- 🍃 **MongoDB (Atlas)** + **Mongoose**
- 🔐 **JWT + Bcrypt** para autenticación segura
- 🔍 **class-validator** para validación DTOs
- 🛡 **Passport** para estrategias JWT
- 🖥 **PM2 + NGINX** recomendado para despliegue en VPS

---

## 📚 Modelo de datos

### 🔥 PostgreSQL
- **Planes:** nombre, descripción, precio
- **Pacientes:** nombre, email, password (hash), rol
- **Nutricionistas:** nombre, especialidad, email
- **Pagos:** relaciona Pacientes y Planes, con monto y fecha

### 🌿 MongoDB
- **Seguimiento:** paciente_id, semana, peso, medidas, fotos, fecha
- **Dietas:** paciente_id, plan_id, semanas con menú

---

## 🔐 Autenticación
- **JWT:** Login devuelve `access_token`.
- Protege rutas privadas con `@UseGuards(AuthGuard('jwt'))`.
- Roles `paciente` por defecto (extensible).

---

## ⚙️ Instalación local

### 📥 Clonar repositorio
```bash
git clone https://github.com/tu-usuario/nutri-plans.git
cd nutri-plans/backend
```

---

### ⚙️ Configurar variables de entorno
Copia el archivo `.env.example` a `.env` y completa tus credenciales.

#### `.env.example`
```
DATABASE_URL=postgresql://usuario:password@neon.io/dbname
MONGO_URI=mongodb+srv://usuario:password@atlas.mongodb.net/nutri_plans
JWT_SECRET=ultrasecreto
JWT_EXPIRES=3600s
```

---

### 📦 Instalar dependencias
```bash
npm install
```

---

### 🚀 Correr el servidor
```bash
npm run start:dev
```
Por defecto quedará en:
```
http://localhost:3000
```

---

## 🔑 Endpoints principales

### 📚 Auth
| Método | Ruta            | Descripción          |
|--------|-----------------|----------------------|
| POST   | `/auth/register`| Registro de paciente |
| POST   | `/auth/login`   | Login con JWT        |

---

### 🐘 PostgreSQL
| Método | Ruta                 | Descripción                    |
|--------|----------------------|--------------------------------|
| GET    | `/planes`            | Listar planes                  |
| POST   | `/planes`            | Crear plan (JWT requerido)     |
| PUT    | `/planes/:id`        | Editar plan (JWT requerido)    |
| DELETE | `/planes/:id`        | Borrar plan (JWT requerido)    |
| ...    | `/pacientes`, `/nutricionistas`, `/pagos` | CRUD similar |

---

### 🍃 MongoDB
| Método | Ruta                  | Descripción                              |
|--------|-----------------------|-----------------------------------------|
| GET    | `/seguimiento`        | Listar seguimientos (JWT requerido)     |
| POST   | `/seguimiento`        | Crear seguimiento (JWT requerido)       |
| GET    | `/dietas`             | Listar dietas (JWT requerido)           |
| POST   | `/dietas`             | Crear dieta personalizada (JWT requerido)|

---

## 🚀 Ejemplo payloads JSON

### ✅ POST /planes
```json
{
  "nombre": "Plan Básico",
  "descripcion": "Incluye asesorías iniciales",
  "precio": 29.99
}
```

---

### ✅ POST /pacientes
```json
{
  "nombre": "Carlos",
  "email": "carlos@mail.com",
  "password": "123456",
  "rol": "paciente"
}
```

---

### ✅ POST /nutricionistas
```json
{
  "nombre": "Lic. Marta",
  "especialidad": "Nutrición deportiva",
  "email": "marta@correo.com"
}
```

---

### ✅ POST /pagos
```json
{
  "paciente": 1,
  "plan": 2,
  "monto": 49.99,
  "fecha": "2025-07-10"
}
```

---

### ✅ POST /seguimiento
```json
{
  "paciente_id": "1",
  "semana": 1,
  "peso": 70,
  "medidas": {"cintura": 80, "cadera": 90},
  "fotos": ["url1", "url2"],
  "fecha": "2025-07-10"
}
```

---

### ✅ POST /dietas
```json
{
  "paciente_id": "1",
  "plan_id": "2",
  "semanas": [
    {"semana": 1, "menu": ["Desayuno: Avena", "Almuerzo: Pollo"]}
  ]
}
```

---

## 🧪 Testing con Postman  
Prueba todos los endpoints agregando el Header:

```
Authorization: Bearer <tu_token>
```