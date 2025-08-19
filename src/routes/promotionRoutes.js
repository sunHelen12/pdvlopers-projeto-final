// routes/promotionRoutes.js
const express = require("express");
const router = express.Router();

const supabase = require("../config/database"); 
const { sendEmail } = require("../utils/email");

// --- Helpers ---
const parseBool = (v) => (typeof v === "boolean" ? v : v === "true");
const isISODate = (v) => !v || !isNaN(Date.parse(v));

const ok = (res, data) => res.json(data);
const created = (res, data) => res.status(201).json(data);
const notFound = (res, msg = "Promoção não encontrada") =>
  res.status(404).json({ error: msg });
const badReq = (res, msg) => res.status(400).json({ error: msg });
const fail = (res, err) =>
  res.status(500).json({ error: err?.message || "Erro interno" });

// --- ROTAS LITERAIS PRIMEIRO (evitam colisão com /:id) ---
router.post("/send-email", (req, res) => {
  return ok(res, { message: "Enviar email promocional - implementar (João Jacques)" });
});

// router.post("/send-whatsapp", (req, res) => {
//   return ok(res, { message: "Enviar WhatsApp - implementar (João Jacques)" });
// });

router.get("/segments", (req, res) => {
  return ok(res, { message: "Listar segmentos de clientes - implementar (João Jacques)" });
});

// --- CRUD BASEADO EM BANCO (canônico) ---

/**
 * GET /promotions
 * Query params:
 *  - limit: number (default 20, max 100)
 *  - offset: number (default 0)
 *  - order: "created_at" | "updated_at" (default "created_at")
 *  - dir: "asc" | "desc" (default "desc")
 */
router.get("/", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit ?? "20", 10), 100);
    const offset = Math.max(parseInt(req.query.offset ?? "0", 10), 0);
    const orderBy = ["created_at", "updated_at"].includes(req.query.order)
      ? req.query.order
      : "created_at";
    const dir = req.query.dir === "asc" ? true : false; // ascending

    let query = supabase
      .from("promotions")
      .select("*", { count: "exact" })
      .order(orderBy, { ascending: dir });

    if (offset > 0) query = query.range(offset, offset + limit - 1);
    else query = query.limit(limit);

    const { data, error, count } = await query;
    if (error) return fail(res, error);

    return ok(res, { items: data, meta: { limit, offset, count } });
  } catch (err) {
    return fail(res, err);
  }
});

/**
 * GET /promotions/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id; // se for integer no banco, supabase faz cast
    const { data, error } = await supabase
      .from("promotions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return notFound(res);
    return ok(res, { item: data });
  } catch (err) {
    return fail(res, err);
  }
});

/**
 * POST /promotions
 * Body:
 *  - title (string, required)
 *  - description (string, required)
 *  - type (string, optional - ex: "PERCENT", "VALUE", "BOGO")
 *  - conditions (json/text, optional)
 *  - active (boolean, default true)
 *  - start_date (ISO string, optional)
 *  - end_date (ISO string, optional)
 */
router.post("/", async (req, res) => {
  try {
    let {
      title,
      description,
      type,
      conditions,
      active = true,
      start_date,
      end_date,
    } = req.body || {};

    // validações mínimas
    if (!title || !description) return badReq(res, "title e description são obrigatórios");
    if (!isISODate(start_date) || !isISODate(end_date))
      return badReq(res, "Datas devem ser ISO válidas (YYYY-MM-DD ou ISO 8601)");
    if (start_date && end_date && new Date(start_date) > new Date(end_date))
      return badReq(res, "start_date não pode ser maior que end_date");

    active = parseBool(active);

    const payload = { title, description, type, conditions, active, start_date, end_date };

    // cria a promoção
    const { data: promo, error: promoErr } = await supabase
      .from("promotions")
      .insert([payload])
      .select()
      .single();

    if (promoErr) return fail(res, promoErr);

    // envia e-mails de teste (opcional por ENV)
    if (process.env.SEND_TEST_EMAILS === "true") {
      const { data: users, error: usersErr } = await supabase
        .from("users")
        .select("email");

      if (usersErr) {
        // Não falha a requisição, mas loga
        console.error("[usersErr]", usersErr);
      } else if (users?.length) {
        const results = await Promise.allSettled(
          users.map((u) =>
            sendEmail({
              to: u.email,
              subject: `Nova promoção: ${title}`,
              text: description,
              html: `<h2>${title}</h2><p>${description}</p>`,
            })
          )
        );
        console.log("[EMAIL_TEST_RESULTS]", JSON.stringify(results, null, 2));
      }
    }

    return created(res, { item: promo });
  } catch (err) {
    return fail(res, err);
  }
});

/**
 * PUT /promotions/:id
 * Atualiza campos parciais
 */
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let {
      title,
      description,
      type,
      conditions,
      active,
      start_date,
      end_date,
    } = req.body || {};

    if (start_date && !isISODate(start_date)) return badReq(res, "start_date inválida");
    if (end_date && !isISODate(end_date)) return badReq(res, "end_date inválida");
    if (start_date && end_date && new Date(start_date) > new Date(end_date))
      return badReq(res, "start_date não pode ser maior que end_date");

    const patch = {};
    if (title !== undefined) patch.title = title;
    if (description !== undefined) patch.description = description;
    if (type !== undefined) patch.type = type;
    if (conditions !== undefined) patch.conditions = conditions;
    if (active !== undefined) patch.active = parseBool(active);
    if (start_date !== undefined) patch.start_date = start_date;
    if (end_date !== undefined) patch.end_date = end_date;
    patch.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("promotions")
      .update(patch)
      .eq("id", id)
      .select()
      .single();

    if (error || !data) return notFound(res);
    return ok(res, { item: data });
  } catch (err) {
    return fail(res, err);
  }
});

/**
 * DELETE /promotions/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { data, error } = await supabase
      .from("promotions")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error || !data) return notFound(res);
    return ok(res, { message: "Promoção removida", item: data });
  } catch (err) {
    return fail(res, err);
  }
});

// --- (Opcional) Endpoints de MOCK, atrás de um prefixo claro ---
// Para usar, defina um array fora daqui: const mockPromotions = [...];
// E ative por ENV: USE_PROMO_MOCK === "true"
if (process.env.USE_PROMO_MOCK === "true") {
  const mockPromotions = []; // substitua pelo seu mock real

  router.get("/mock", (req, res) => ok(res, { items: mockPromotions }));
  router.get("/mock/:id", (req, res) => {
    const item = mockPromotions.find((p) => String(p.id) === String(req.params.id));
    return item ? ok(res, { item }) : notFound(res);
  });
  router.post("/mock", async (req, res) => {
    const { title, description } = req.body || {};
    if (!title || !description) return badReq(res, "title e description são obrigatórios");
    const newPromo = {
      id: (mockPromotions.length + 1).toString(),
      title,
      description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockPromotions.push(newPromo);
    return created(res, { item: newPromo });
  });
}

module.exports = router;
