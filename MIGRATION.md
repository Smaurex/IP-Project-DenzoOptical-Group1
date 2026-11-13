# Express migration

The PHP request handlers are replaced by the Express API in `server.js` and
`src/`. Existing MySQL tables and image directories remain unchanged.

## Run

1. Use Node.js 20 or newer and run `npm install`.
2. Copy `.env.example` to `.env`, set the MySQL values, and replace
   `JWT_SECRET` with a long random value.
3. Import `includes/s22102454_denzo.sql` if the database is not already set up.
4. Run `npm run check`, then `npm start`.

The health endpoint is `GET /api/health`. The API provides authentication,
items, announcements, about content, and profile image operations. Browser
requests use an HttpOnly JWT cookie; API clients may use a bearer token.

## Frontend and API documentation

The recovered pages are static HTML under `public/pages/` and reuse the original
`style.css`, images, fonts, and page layout. Their browser scripts call the
existing Express endpoints without changing the original roles or workflows.

Scalar API documentation is available at `/docs`; its OpenAPI source is
`/openapi.yaml`.

## Verification

Run `npm run check` and `npm test`, then smoke-test health, registration, login,
items, announcements, and about against a configured MySQL database. This
checkout has Node but no `npm` executable or configured database, so dependency
installation and DB-backed tests must be run in a normal Node environment.

## Scope and recommendations

The old pages were PHP server-rendered, so this migration intentionally keeps a
minimal static client while the backend contract is established. Migrate richer
role-specific UI incrementally if needed. Next improvements should be request
schemas and MySQL integration tests, upload object storage for multi-server
deployment, secret rotation, and refresh-token rotation for longer sessions.
