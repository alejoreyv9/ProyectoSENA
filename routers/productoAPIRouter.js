const express = require("express");
const router = express.Router();
const productoApiController = require("../controllers/productoAPIController");

router.get("/", productoApiController.getAllProductos);
router.get("/:id", productoApiController.getProductoById);
router.post("/", productoApiController.insertProducto);
router.put("/:id", productoApiController.updateProducto);
router.delete("/:id", productoApiController.deleteProducto);

module.exports = router;
