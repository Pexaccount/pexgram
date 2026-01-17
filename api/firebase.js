export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const target = req.query.url;
  if (!target) {
    res.status(400).send("missing url");
    return;
  }

  const r = await fetch(target, {
    method: req.method,
    headers: req.headers,
  });

  const text = await r.text();
  res.status(r.status).send(text);
}
