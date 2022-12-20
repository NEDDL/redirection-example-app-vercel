// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(410).json({ message: "This page is permanently removed." });
}
