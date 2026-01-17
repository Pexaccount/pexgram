export default async function handler(req, res) {
  const target = "https://pexchatweb-default-rtdb.firebaseio.com";

  // 取出 /api/firebase 后面的路径
  const path = req.url.replace(/^\/api\/firebase/, "");

  const url = target + path;

  const response = await fetch(url, {
    method: req.method,
    headers: {
      ...req.headers,
      host: "pexchatweb-default-rtdb.firebaseio.com"
    },
    body: req.method === "GET" ? null : await req.text(),
  });

  res.status(response.status);

  response.headers.forEach((v, k) => {
    res.setHeader(k, v);
  });

  const data = await response.arrayBuffer();
  res.send(Buffer.from(data));
}
