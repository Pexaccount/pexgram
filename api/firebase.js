export default async function handler(req, res) {
  const target = "https://pexchatweb-default-rtdb.firebaseio.com";

  const url = target + req.url;

  const response = await fetch(url, {
    method: req.method,
    headers: {
      ...req.headers,
      host: "pexchatweb-default-rtdb.firebaseio.com"
    },
    body: req.method === "GET" ? null : req.body,
  });

  res.status(response.status);

  response.headers.forEach((v, k) => {
    res.setHeader(k, v);
  });

  const data = await response.arrayBuffer();
  res.send(Buffer.from(data));
}
