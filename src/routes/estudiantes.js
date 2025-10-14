const express = require('express');
const router = express.Router();
const pool = require('../db');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Configuración multer para subir fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// Función para generar código único de estudiante
async function generarCodigoUnico() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo;
  let existe = true;

  while (existe) {
    codigo = '';
    for (let i = 0; i < 10; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    // Verificamos si ya existe
    const [rows] = await pool.query('SELECT cod_estudiante FROM estudiante WHERE cod_estudiante = ?', [codigo]);
    existe = rows.length > 0;
  }
  return codigo;
}

// GET: Listar estudiantes con búsqueda por nombre_apellido, dni o cod_estudiante
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    let sql = 'SELECT * FROM estudiante';
    let params = [];

    if (q && q.length >= 2) {
      const likeQuery = `%${q}%`;
      sql += ` WHERE nombre_apellido LIKE ? OR dni LIKE ? OR cod_estudiante LIKE ?`;
      params.push(likeQuery, likeQuery, likeQuery);
    }

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar estudiantes' });
  }
});

// POST: Crear estudiante
router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const {
      dni,
      nombre_apellido,
      fecha_nac,
      direccion,
      carrera,
      periodo,
      sede
    } = req.body;

    const foto = req.file ? req.file.filename : null;
    const cod_estudiante = await generarCodigoUnico();

    const sql = `INSERT INTO estudiante
      (foto, dni, nombre_apellido, fecha_nac, direccion, carrera, periodo, sede, cod_estudiante)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await pool.query(sql, [
      foto,
      dni,
      nombre_apellido,
      fecha_nac || null,
      direccion,
      carrera,
      periodo,
      sede,
      cod_estudiante
    ]);

    res.json({ message: 'Estudiante creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear estudiante' });
  }
});

// PUT: Actualizar estudiante
router.put('/:id', upload.single('foto'), async (req, res) => {
  try {
    const id = req.params.id;
    const {
      dni,
      nombre_apellido,
      fecha_nac,
      direccion,
      carrera,
      periodo,
      sede
    } = req.body;

    // Obtener estudiante actual para borrar foto si cambia
    const [rows] = await pool.query('SELECT foto FROM estudiante WHERE id_estudiante = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });

    let foto = rows[0].foto;

    if (req.file) {
      if (foto) {
        const rutaFoto = path.join(__dirname, '../../public/uploads', foto);
        if (fs.existsSync(rutaFoto)) fs.unlinkSync(rutaFoto);
      }
      foto = req.file.filename;
    }

    const sql = `UPDATE estudiante SET
      foto = ?, dni = ?, nombre_apellido = ?, fecha_nac = ?, direccion = ?, carrera = ?, periodo = ?, sede = ?
      WHERE id_estudiante = ?`;

    await pool.query(sql, [
      foto, dni, nombre_apellido, fecha_nac || null, direccion, carrera, periodo, sede, id
    ]);

    res.json({ message: 'Estudiante actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar estudiante' });
  }
});

// DELETE: Eliminar estudiante
router.delete('/:id', async (req, res) => {
    console.log('Delete request for id:', req.params.id); 
  try {
    const id = req.params.id;

    // Obtener foto para borrar archivo
    const [rows] = await pool.query('SELECT foto FROM estudiante WHERE id_estudiante = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });

    const foto = rows[0].foto;
    if (foto) {
      const rutaFoto = path.join(__dirname, '../../public/uploads', foto);
      if (fs.existsSync(rutaFoto)) fs.unlinkSync(rutaFoto);
    }

    await pool.query('DELETE FROM estudiante WHERE id_estudiante = ?', [id]);

    res.json({ message: 'Estudiante eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar estudiante' });
  }
});

module.exports = router;
