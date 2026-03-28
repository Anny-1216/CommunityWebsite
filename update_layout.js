const fs = require('fs');

const path = '/home/chaitanya/Desktop/cdsc/app/layout.tsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('export const viewport')) {
    content = content.replace("import type { Metadata } from 'next'", "import type { Metadata, Viewport } from 'next'");
    content = content.replace('export const metadata: Metadata = {', "export const viewport: Viewport = {\n  width: 'device-width',\n  initialScale: 1,\n  maximumScale: 1,\n}\n\nexport const metadata: Metadata = {");
    fs.writeFileSync(path, content);
}
