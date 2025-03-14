const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');  // Importar cors

dotenv.config();

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

app.get('/api/usuarios/todos', (req, res) => {
  const query = 'SELECT * FROM usuarios';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la base de datos' });
    }
    return res.status(200).json(results); // Devuelve todos los usuarios encontrados
  });
});

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



// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
