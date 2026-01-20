# Wedding Website

Static wedding website with multi-language support (EN/PT/NO).

## Invitations

Each guest gets a personalized invitation link:
- `https://yoursite.com/invitations/?guest=smith`
- `https://yoursite.com/invitations/?guest=garcia`

### Edit guests

Edit `invitations/guests.json` (gitignored, stays private):

```json
{
  "smith": {
    "name": "The Smith Family",
    "text": "John & Jane, you are warmly invited to celebrate with us!"
  }
}
```

Upload the updated file to your server — no build step needed.

## Local Development

```bash
python3 -m http.server 8000
```

Open http://localhost:8000

## Deploy

Upload all files to any static host (Cloudflare Pages, Netlify, your own server).

Remember to upload `invitations/guests.json` separately since it's gitignored.
