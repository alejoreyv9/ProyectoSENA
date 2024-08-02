const connection = require("../database/db");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");

exports.getDashboard = async (req, res) => {
  const itemsPerPage = 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * itemsPerPage;

  try {
    const [tareas, totalTareas] = await getTareas(offset, itemsPerPage);
    const [calidad, totalCalidad] = await getCalidad(offset, itemsPerPage);
    const [reportes, totalReportes] = await getReportes(offset, itemsPerPage);
    const [bodegas, totalBodegas] = await getBodegas(offset, itemsPerPage);
    const [productos, totalProductos] = await getProductos(
      offset,
      itemsPerPage
    );
    const [bodega_producto, totalBodega_Productos] = await getBodega_Productos(
      offset,
      itemsPerPage
    );

    // Formatear fechas
    const formatDate = (date) =>
      format(new Date(date), "dd/MM/yyyy", { locale: es });

    tareas.forEach((tarea) => {
      tarea.fecha_Inicial = formatDate(tarea.fecha_Inicial);
      tarea.fecha_Final = formatDate(tarea.fecha_Final);
    });

    reportes.forEach((reporte) => {
      reporte.fecha = formatDate(reporte.fecha);
    });

    bodegas.forEach((bodega) => {
      bodega.fecha = formatDate(bodega.fecha);
    });

    res.render("dashboard", {
      tareas,
      calidad,
      reportes,
      bodegas,
      productos,
      bodega_producto,
      page,
      totalPagesTareas: Math.ceil(totalTareas / itemsPerPage),
      totalPagesCalidad: Math.ceil(totalCalidad / itemsPerPage),
      totalPagesReportes: Math.ceil(totalReportes / itemsPerPage),
      totalPagesBodegas: Math.ceil(totalBodegas / itemsPerPage),
      totalPagesProductos: Math.ceil(totalProductos / itemsPerPage),
      totalPagesBodega_Productos: Math.ceil(
        totalBodega_Productos / itemsPerPage
      ),
    });
  } catch (error) {
    console.error("Error al obtener los datos del dashboard: ", error);
    res.status(500).send("Error al obtener los datos del dashboard");
  }
};

// Funciones para obtener los datos de la base de datos
function getTareas(offset, limit) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM tareaAsignar LIMIT ?, ?",
      [offset, limit],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          connection.query(
            "SELECT COUNT(*) AS total FROM tareaAsignar",
            (error, countResults) => {
              if (error) {
                reject(error);
              } else {
                resolve([results, countResults[0].total]);
              }
            }
          );
        }
      }
    );
  });
}

function getCalidad(offset, limit) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM reporteCalidad LIMIT ?, ?",
      [offset, limit],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          connection.query(
            "SELECT COUNT(*) AS total FROM reporteCalidad",
            (error, countResults) => {
              if (error) {
                reject(error);
              } else {
                resolve([results, countResults[0].total]);
              }
            }
          );
        }
      }
    );
  });
}

function getReportes(offset, limit) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM reporteFabricacion LIMIT ?, ?",
      [offset, limit],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          connection.query(
            "SELECT COUNT(*) AS total FROM reporteFabricacion",
            (error, countResults) => {
              if (error) {
                reject(error);
              } else {
                resolve([results, countResults[0].total]);
              }
            }
          );
        }
      }
    );
  });
}

function getBodegas(offset, limit) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM bodega LIMIT ?, ?",
      [offset, limit],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          connection.query(
            "SELECT COUNT(*) AS total FROM bodega",
            (error, countResults) => {
              if (error) {
                reject(error);
              } else {
                resolve([results, countResults[0].total]);
              }
            }
          );
        }
      }
    );
  });
}

function getProductos(offset, limit) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM producto LIMIT ?, ?",
      [offset, limit],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          connection.query(
            "SELECT COUNT(*) AS total FROM producto",
            (error, countResults) => {
              if (error) {
                reject(error);
              } else {
                resolve([results, countResults[0].total]);
              }
            }
          );
        }
      }
    );
  });
}

function getBodega_Productos(offset, limit) {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM bodega_producto LIMIT ?, ?",
      [offset, limit],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          connection.query(
            "SELECT COUNT(*) AS total FROM bodega_producto",
            (error, countResults) => {
              if (error) {
                reject(error);
              } else {
                resolve([results, countResults[0].total]);
              }
            }
          );
        }
      }
    );
  });
}
