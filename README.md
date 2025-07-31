[README.md](https://github.com/user-attachments/files/21535887/README.md)
# LOVABLE PDF Server

This server receives HTML content from LOVABLE and returns a styled PDF using Puppeteer.

## Instructions

1. Clone this repo and deploy to [Render.com](https://render.com).
2. Use the `/generate-pdf` endpoint with a POST request.
3. Pass a JSON body with the key `htmlContent`.

## Example

POST https://<your-server>.onrender.com/generate-pdf

```json
{
  "htmlContent": "<html>...</html>"
}
```
