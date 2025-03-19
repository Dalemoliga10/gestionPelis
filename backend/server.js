const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');  // Importar cors
dotenv.config();
app.use(express.json());

// Usar cors para permitir todas las solicitudes (deshabilitar restricciones CORS)
app.use(cors({
  origin: '*', // Permite todos los orígenes
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

// Permitir CORS manualmente
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permitir todas las solicitudes
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");

  // Si la petición es un método OPTIONS, solo respondemos con las cabeceras
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Configuración de la base de datos
const db = mysql.createConnection({
  host: "bdq4jbeczeuvey4mum0o-mysql.services.clever-cloud.com",  // IP de la BD en la nube
  user: "uvksv99vnu13phpo",
  password: "0St23Y5RqQSzAqUuKdUA",
  database: "bdq4jbeczeuvey4mum0o"
});


// Endpoint para obtener un usuario por id
app.get('/api/usuarios/:id', (req, res) => {
  const id = req.params.id;  // Obtener el id desde la URL

  const query = 'SELECT * FROM usuarios WHERE id_usuario = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (results.length > 0) {
      console.log("envio del usuario")
      return res.status(200).json(results[0]);  // Devuelve el usuario encontrado
    } else {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
});



// Endpoint para obtener usuarios por correo
app.get('/api/usuarios', (req, res) => {
  const email = req.query.email;  // Obtener el correo de la query string

  const query = 'SELECT * FROM usuarios WHERE correo = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (results.length > 0) {
      console.log("hola holita CORREO")
      return res.status(200).json(results[0]);  // Devuelve el primer usuario encontrado
    } else {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
});

//Obtener la contraseña usando un correo electrónico
app.get('/api/passwd', (req, res) => {
  const email = req.query.email;  // Obtener el correo de la query string
  const passwd = req.query.passwd;

  const query = 'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?';

  db.query(query, [email, passwd], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (results.length > 0) {
      console.log("hola holita PASSWD")
      return res.status(200).json(results[0]);  // Devuelve el primer usuario encontrado
    } else {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
});

//Para el crud: Obtener todos los usuarios
app.get('/usuarios/todos', (req, res) => {
  const query = 'SELECT * FROM usuarios';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos' });
    }
    return res.status(200).json(results); // Devuelve todos los usuarios encontrados
  });
});

//Obtener un usuario en base a la id
app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;  // Obtenemos el id del parámetro de la URL

  const query = 'DELETE FROM usuarios WHERE id_usuario = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json({ message: 'Usuario eliminado con éxito' });
  });
});

// Ruta para agregar un usuario
app.post('/api/usuarios', (req, res) => {
  const { id_usuario, nombre, apellidos, rol, correo, contrasena } = req.body;

  const values = [
    id_usuario !== undefined ? id_usuario : 0,
    nombre !== undefined ? nombre : "",
    apellidos !== undefined ? apellidos : "",
    rol !== undefined ? rol : "",
    correo !== undefined ? correo : "",
    contrasena !== undefined ? contrasena : "123",
  ];

  // Consulta SQL
  const query = `
    INSERT INTO usuarios (id_usuario, nombre, apellidos, rol, correo, contrasena)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  // Ejecutar la consulta con los valores
  db.execute(query, values, (err, result) => {
    if (err) {
      console.error('Error al agregar usuario:', err);
      return res.status(500).json({ message: 'Error al agregar usuario', error: err });
    }
    res.status(201).json({ message: 'Usuario agregado con éxito', result });
  });
});


// Endpoint para modificar un usuario por id
app.put('/api/usuarios/id', (req, res) => {
  const id = req.query.id;  // Obtener el id de la query string
  const { nombre, apellidos, rol, correo, contrasena } = req.body;  // Obtener los datos del cuerpo de la solicitud

  if (!nombre || !apellidos || !rol || !correo || !contrasena) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const query = `
    UPDATE usuarios
    SET nombre = ?, apellidos = ?, rol = ?, correo = ?, contrasena = ?
    WHERE id_usuario = ?
  `;

  db.query(query, [nombre, apellidos, rol, correo, contrasena, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (results.affectedRows > 0) {
      return res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } else {
      return res.status(404).json({ message: 'Usuario no encontrado o no se realizaron cambios' });
    }
  });
});



//Para el favoritos, obtener los id favoritos de ese usuario
app.get('/favoritos/leer/:id', (req, res) => {
  const { id } = req.params;  // Obtenemos el id del parámetro de la URL

  const query = 'SELECT id_pelicula FROM pelisFavoritas WHERE id_usuario = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    // Extraemos solo los valores de id_pelicula en un array
    const peliculas = results.map(row => row.id_pelicula);

    return res.status(200).json(peliculas); // Devuelve todos los usuarios encontrados
  });
});

//Para el favoritos: Añadir peli a favoritos
app.post('/favoritos/anadir', (req, res) => {
  const { id_usuario, id_pelicula } = req.body; // Obtener datos desde el cuerpo de la solicitud

  if (!id_usuario || !id_pelicula) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }

  const query = 'INSERT INTO pelisFavoritas (id_usuario, id_pelicula) VALUES (?, ?)';

  db.query(query, [id_usuario, id_pelicula], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos', error: err });
    }

    return res.status(201).json({ message: 'Película añadida a favoritos', id: result.insertId });
  });
});



// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
