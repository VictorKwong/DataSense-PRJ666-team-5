# DataSense

Update UI
### Date: 13-Oct-24
npm install react-csv
npm install react-datepicker
npm install react-toastify
npm install react-chartjs-2 chart.js
npm install react-circular-progressbar

### Date: 15-Oct-24
Password Regex update special character inclusion
- Apple12345 (fail)
- !Apple1234 (pass)

### Date: 16-Oct-24
Navbar update (login and logout)
Update data.js timezone

### Date: 28-Oct-24
Navbar update
Update layout.js
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Date: 29-Oct-24
Update authenticate.js (Port 8080 -> process.env.NEXT_PUBLIC_API_URL)
Update Vercel Env NEXT_PUBLIC_API_URL = https://datasensebackend-prj666-team-5.onrender.com

### Date: 31-Oct-24
config.json: server_api, ws_api
  "server_api": "http://localhost:8080" ->  "server_api": "https://datasensebackend-prj666-team-5.onrender.com",
  "ws_api": "ws://localhost:8080" ->   "ws_api": "wss://datasensebackend-prj666-team-5.onrender.com"

### Date: 04-Nov-24
Setting page: store.js -> export const userAtom = atom(null); // Initialize with null for unauthenticated state
Add Images into public/assets
ADd info-hub, alert, and account-settings

### Date: 11-Nov-24
fontawesome className update
Modified Layout.js, navbar.js, dashboard.js, info-hub.js
Add about.js contact.js, privacy.js
Images added

### Date: 12-Nov-24
Add Layout.css, Terms.css, Alert.css
Add terms.js
Update info-hub.js, interactivedatahub.js, dashboard.js, alert.js, layout.js, navbar.js

### Date 25-Nov-24
npm install @react-oauth/google
add google account auth

### Date 27-Nov-24
Google account template update

### Date 01-Dec-24
Update getSensorHistoryData | data.js | interactivedatahub.js | layout.js, + useAtom(userAtom) get user.email

### Date 02-Dec-24
Update getSensorHistoryData | data.js | interactivedatahub.js | layout.js, + const userFromToken = readToken(); const data = await getSensorHistoryData(userFromToken.email); get user.email
Update device date
Update history database (5 var, timestamp, temperature, moisture, humidity, isConnected)

### Date 04-Dec-24
- Chat bot update (components/ChatBot.js, components/ChatBotWrapper.js, dialogflow-key.json, pages/HelpPage.js, pages/api/dialogflow.js)
- Chat bot Modified (pages/_app.js, pages/dashboard.js)
- Chat bot is for general uses (with/without user authentication)
- npm install @google-cloud/dialogflow
- npm install dialogflow
- npm install @mui/material @emotion/react @emotion/styled
- npm install @mui/icons-material

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
