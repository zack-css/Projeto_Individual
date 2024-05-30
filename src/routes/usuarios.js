var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})


router.get("/pontosUsuario/:idUsuario", function (req, res) {
    usuarioController.pontosUsuario(req, res);
});

router.get("/mediaDosUsuarios", function (req, res) {
    usuarioController.mediaDosUsuarios(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/pegar/:idUsuario", function (req, res) {
    usuarioController.pegar(req, res);
});

module.exports = router;