const express = require("express");
const router = express.Router();
const ClientsService = require("../services/clients.service");
// opcional: proteger com auth
// const auth = require("../middleware/authMiddleware");

const ok = (res, data) => res.json(data);
const created = (res, data) => res.status(201).json(data);
const badReq = (res, msg) => res.status(400).json({ error: msg });
const notFound = (res, msg = "Cliente não encontrado") => res.status(404).json({ error: msg });
const fail = (res, err) => res.status(500).json({ message: "Erro interno", error: err?.message });

/** GET /api/clients */
router.get("/", async (_req, res) => {
  try {
    const items = await ClientsService.findAllClientes();
    return ok(res, { items });
  } catch (err) {
    return fail(res, err);
  }
});

/** GET /api/clients/:id */
router.get("/:id", async (req, res) => {
  try {
    const item = await ClientsService.findClienteById(req.params.id);
    if (!item) return notFound(res);
    return ok(res, { item });
  } catch (err) {
    return fail(res, err);
  }
});

/** POST /api/clients */
router.post("/", async (req, res) => {
  try {
    const { nome, cpf } = req.body || {};
    if (!nome || !cpf) return badReq(res, "nome e cpf são obrigatórios");

    const result = await ClientsService.createCliente(req.body);
    if (result?.success === false) {
      return res.status(409).json({ error: result.message });
    }
    return created(res, { item: result.cliente });
  } catch (err) {
    return fail(res, err);
  }
});

/** PUT /api/clients/:id */
router.put("/:id", async (req, res) => {
  try {
    const item = await ClientsService.updateCliente(req.params.id, req.body || {});
    if (!item) return notFound(res);
    return ok(res, { item });
  } catch (err) {
    return fail(res, err);
  }
});

/** DELETE /api/clients/:id */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await ClientsService.deleteCliente(req.params.id);
    if (!deleted) return notFound(res);
    return ok(res, { message: "Cliente removido", id: req.params.id });
  } catch (err) {
    return fail(res, err);
  }
});

module.exports = router;
