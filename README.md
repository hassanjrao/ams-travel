# AMS Global Travel & Tours

Website for AMS Global Travel & Tours, Multan. Next.js 16, Tailwind CSS 4, English and Urdu (RTL).

## Run locally

Needs Node 20.9 or newer (`.nvmrc` pins 22).

```bash
nvm use 22
npm install
npm run dev     # http://localhost:3000
```

`/` redirects to `/en` or `/ur` based on the visitor's browser language.

## Where to edit

| What | File |
| --- | --- |
| Phone, WhatsApp, email, domain | `lib/site.ts` |
| English text | `app/[lang]/dictionaries/en.ts` |
| Urdu text | `app/[lang]/dictionaries/ur.ts` |
| Images | `public/images/` |
| Colours and fonts | `app/globals.css` |

The Urdu dictionary is typed against the English one, so a key added to one and missing from the other fails the build.

The contact form has no backend: it builds a WhatsApp message to the number in `lib/site.ts`.

## Deploy

Pushing to `main` deploys on Vercel once the GitHub repo is imported there.
