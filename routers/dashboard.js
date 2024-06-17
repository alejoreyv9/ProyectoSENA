const express = require("express");
const router = express.Router();
const connection = require("../database/db");

// ===================== SISTEMA DE TAREAS ===================

// Obtener todas las tareas
router.get("/", (req, res) => {
  connection.query("SELECT * FROM tareaasignar", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render("dashboard", { results: results });
    }
  });
});

// Renderizar formulario de edición de tarea por ID
router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM tareaasignar WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("edit", { tarea: results[0] });
      }
    }
  );
});

module.exports = router;
