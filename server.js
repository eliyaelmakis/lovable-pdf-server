const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.post("/generate-pdf", async (req, res) => {
  const htmlContent = req.body.htmlContent;
  if (!htmlContent) return res.status(400).send("Missing htmlContent");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "40px", bottom: "40px", left: "40px", right: "40px" }
  });

  await browser.close();
  res.set("Content-Type", "application/pdf");
  res.send(pdfBuffer);
});

app.get("/", (req, res) => {
  res.send("PDF Generator is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
