# API REST - Gestión de Productos

**Estudiantes:** Ayala Escalante Carlos Enzo - Fernandez Carballo Percy Rolfy.  
**Materia:** Tecnologías Web 2  
**Descripción:** API REST desarrollada para la gestión de productos (CRUD) conectada directamente a una base de datos en SQL Server Management Studio mediante el ORM Sequelize.

---

##  Tecnologías Utilizadas

* **Node.js**: Entorno de ejecución para JavaScript.
* **Express**: Framework web para la creación de rutas y API REST.
* **Sequelize**: ORM para interactuar con SQL Server.
* **SQL Server**: Sistema Gestor de Base de Datos relacional.
* **Thunder Client**: Cliente HTTP para testing y pruebas de endpoints.

---

##  Instalación y Configuración

### 1. Clonar e instalar dependencias
```bash
git clone https://github.com/suspenzo/val1pw2.git
cd valoracion1
npm install
```
### 2.Variables de Entorno (.env)
Crea un archivo .env en la raíz del proyecto con tus credenciales de SQL Server
```bash
PORT=3000
DB_NAME=nombre_de_bd
DB_USER=nombre_de_usuario
DB_PASSWORD=tu_contraseña_aqui
DB_HOST=localhost
```
### 3. Instalar los paquetes registrados en tu package.json
```bash
npm install
```
### 4. Ejecutar el proyecto
```bash
node app.js
```


---


##  Endpoints de la APIrest


### 1. Clonar e instalar dependencias

| Método | Endpoint | Descripción | Estado HTTP |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/productos` | Consulta y lista todos los productos almacenados en SQL Server. Si la tabla está vacía retorna `[]`. | `200 OK` |
| **GET** | `/api/productos/:id` | Consulta un producto específico por su ID. | `200 OK` / `404 Not Found` |
| **GET** | `/api/productos/buscar?nombre=tecla` | Filtra productos cuyo nombre coincida con el parámetro de búsqueda. | `200 OK` |
| **POST** | `/api/productos` | Registra un nuevo producto en SQL Server. Valida `nombre` obligatorio, `precio > 0` y `stock >= 0`. | `201 Created` / `400 Bad Request` |
| **PUT** | `/api/productos/:id` | Actualiza la información de un producto existente por su ID. | `200 OK` / `404 Not Found` |
| **DELETE** | `/api/productos/:id` | Elimina físicamente el registro seleccionado de la base de datos. | `200 OK` / `404 Not Found` |


### 2. Endpoints de la API REST


* **GET (Listar todos los productos):**  
  ![GET Productos]
  <img width="1625" height="712" alt="image" src="https://github.com/user-attachments/assets/174de6dd-1b89-457d-90d0-f3602fdb45d2" />

* **GET por ID:**  
  ![GET por ID]
<img width="1520" height="752" alt="image" src="https://github.com/user-attachments/assets/a0d9c98b-6359-4919-95b7-5c6abeaa6e22" />


* **GET Buscar por nombre:**  
  ![GET Buscar]
<img width="1607" height="900" alt="image" src="https://github.com/user-attachments/assets/518f9996-7bc4-4d6f-878a-9d32a8e9ae4f" />


* **POST (Registrar producto):**  
  ![POST Producto]
  <img width="1562" height="872" alt="image" src="https://github.com/user-attachments/assets/e8d6603d-9f18-46a4-af4b-a7a662f335e8" />


* **PUT (Actualizar producto):**  
  ![PUT Producto]
  <img width="1772" height="857" alt="image" src="https://github.com/user-attachments/assets/a1632ae3-26e4-474d-b083-f7d6665e5a35" />


* **DELETE (Eliminar producto):**  
  ![DELETE Producto]
  <img width="1780" height="930" alt="image" src="https://github.com/user-attachments/assets/17def38f-d4c8-445b-8860-aa8e5c2666bd" />




## 2. Evidencias en SQL Server Management Studio
<img width="1032" height="536" alt="image" src="https://github.com/user-attachments/assets/b6d37d85-0e9d-42ed-a1cd-079f945f1781" />

##  3. SQL script
```bash
-- Crear la Base de Datos si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'WEB2DB')
BEGIN
    CREATE DATABASE WEB2DB;
END
GO

USE WEB2DB;
GO

-- Crear la tabla Productos si no existe
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Productos]') AND type in (N'U'))
BEGIN
    CREATE TABLE Productos (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombre NVARCHAR(100) NOT NULL,
        descripcion NVARCHAR(255) NULL,
        precio DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        estado BIT NOT NULL DEFAULT 1,
        createdAt DATETIME2 NOT NULL DEFAULT GETDATE(),
        updatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
    );
END
GO

-- Insertar datos de prueba iniciales
INSERT INTO Productos (nombre, descripcion, precio, stock, estado, createdAt, updatedAt)
VALUES 
('Monitor Gamer LG 27', 'Pantalla IPS Full HD 144Hz', 1450.50, 15, 1, GETDATE(), GETDATE()),
('Teclado Mecánico RGB', 'Teclado switch azul con luces RGB', 320.00, 5, 1, GETDATE(), GETDATE());
GO

-- Consultar registros existentes
SELECT * FROM Productos;
GO
```

