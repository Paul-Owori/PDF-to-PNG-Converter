# PDF-to-PNG-Converter
## A simple node.js server that converts a pdf to a single png image.

Accepts a .pdf via a POST request with { file: (multipart formdata) } to the /app endpoint.
Returns a single .png shot of the whole .pdf
