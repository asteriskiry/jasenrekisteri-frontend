# Jäsenrekisteri frontend

Asteriski ry's membership register UI. Node **24.16.0**, React 16, React Router 5 and Vite 7.

Author: [Maks Turtiainen](https://github.com/mjturt)

Node.js backend: <https://github.com/asteriskiry/jasenrekisteri-backend>.

## Run with Docker

Place this repository beside `jasenrekisteri-backend` and follow the [backend Compose instructions](../jasenrekisteri-backend/README.md). The stack serves this application at <http://localhost:8080> and proxies `/api/` to the backend.

The image uses a Vite build stage and an unprivileged Nginx runtime with SPA routing. `VITE_USE_PAYMENT` is a build argument, configured through the backend Compose `.env`; changing it requires rebuilding. Stripe secrets belong only in the backend environment.

Login uses the backend's HttpOnly session cookie. `AuthProvider` restores identity through `/api/session`, keeps public session metadata in memory, and clears it on expiry or a protected API's 401 response. The shared API client sends cookies and the CSRF header. Logout revokes the server session. Deploy this frontend with the matching backend; old login tokens are rejected and existing users must sign in again. Production requires one HTTPS origin for the UI and `/api`.

## Develop

Registration proceeds directly from the form to payment with the selected membership option. No registration confirmation email or extra confirmation screen is required. Password-recovery messages do not disclose account existence.

Profile changes to passwords or email require the current password. Email changes remain pending until the member confirms the new address while signed in. Approved UTU-account changes require an administrator. Deploy these screens with the matching backend API and ensure SMTP delivery works for confirmation links.

```sh
cp .env-sample .env
npm ci
npm run dev
```

The development server uses port 5173. Set backend `CLIENTURL=http://localhost:5173` when testing Stripe through Vite, and configure `VITE_API_URL` in this repository's `.env`.

```sh
npm run lint
npm test
npm run build
```

The static build is written to `dist/`. Payment tests cover API response compatibility, cookie-based receipt access, pending webhook confirmation, failures and canceled polling. Receipt access and its expiry are described in the [backend payment instructions](../jasenrekisteri-backend/README.md#stripe).

GitHub Actions runs locked installation, lint, tests and a Docker build on pull requests and development/mainline pushes. Deployment is a separate manual setup; see [CI/CD](../jasenrekisteri-backend/docs/ci-cd.md).

The package-update branch is merged, but React/Router upgrades remain separate work. See the [modernization review](../jasenrekisteri-backend/docs/modernization-review.md).

Member CSV downloads quote every field and prefix formula-like values with an apostrophe so they are treated as text on import into a spreadsheet. This also covers historical data, leading whitespace/control characters and full-width formula prefixes. Keep these cells as text when importing or editing the export; spreadsheet software can change escaping when saving a CSV again.

## Screenshots

![Screenshot 1](screenshots/jasenrekisteri1.png)
![Screenshot 2](screenshots/jasenrekisteri2.png)

---

© Asteriski ry
