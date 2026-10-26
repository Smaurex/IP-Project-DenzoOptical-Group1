# Denzo Optical API

The API is an Express application backed by the existing MySQL database. During the migration, the PHP site remains in place and is served by Apache under XAMPP; the API runs separately on port `3000`.

## Prerequisites

- Node.js and npm
- XAMPP with Apache and MySQL
- The project database dump at `includes/s22102454_denzo.sql`

## Install

From the `api` directory, install the dependencies:

```sh
npm install
```

## Configure `.env`

Copy `.env.example` to `.env` in the `api` directory and set the values for your local MySQL installation:

```dotenv
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=denz
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_ORIGIN=http://localhost
```

`DB_PASSWORD` is often empty for a default local XAMPP MySQL installation; use the password configured for your MySQL user if yours is different. Generate a private JWT secret rather than using the example value. For example, from the `api` directory:

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

`CLIENT_ORIGIN` must be the browser origin serving the PHP site: scheme, hostname, and optional port only, with no path. For example, the local site at `http://localhost/IP-Project-DenzoOptical-Group1` has the origin `http://localhost`. If you browse using `127.0.0.1` instead, set it to `http://127.0.0.1`.

Keep `.env` private and do not commit it.

## Import the MySQL database

1. Open the XAMPP Control Panel and start **MySQL**. Start **Apache** as well when you are ready to use the PHP site.
2. Open phpMyAdmin at `http://localhost/phpmyadmin`.
3. Create a database named `denz` using `utf8mb4` character encoding/collation.
4. Select `denz`, choose **Import**, select `includes/s22102454_denzo.sql` from the project root, and run the import.
5. Confirm that the imported tables include `users`, `item`, `announcement`, `about`, and `credential`.

Alternatively, create `denz` in a MySQL client and import the dump using the MySQL command-line client:

```sh
mysql -u root -p denz < includes/s22102454_denzo.sql
```

Omit `-p` if your local MySQL user has no password. Run the command from the project root, or adjust the dump path to its location.

## Run

Start the API from the `api` directory:

```sh
npm run dev
```

This uses nodemon and restarts the server when source files change. To run without nodemon:

```sh
npm start
```

The API listens on `http://localhost:3000` by default. Its health endpoint is `http://localhost:3000/api/health`.

## Run the PHP site and API together under XAMPP

1. Start Apache and MySQL in the XAMPP Control Panel.
2. Put or keep the project under XAMPP's `htdocs` directory, for example `C:\xampp\htdocs\IP-Project-DenzoOptical-Group1`.
3. Open the PHP site at `http://localhost/IP-Project-DenzoOptical-Group1`.
4. In a separate terminal, start the API from the project's `api` directory using `npm run dev` or `npm start`.
5. Leave both Apache and the API process running while using the site.

The PHP site is served by Apache; it is not served by Express. Browser API requests go to `http://localhost:3000/api`, include credentials, and use the API's httpOnly `token` cookie for authenticated routes. The login flow also calls `includes/api_session.php`, which validates the API token with `/api/auth/me` and establishes the PHP session needed by existing PHP page access checks.

Uploaded files are stored in the project-root `profile_pics/`, `item_pics/`, and `uploads/` folders. The API accepts JPG/JPEG/PNG/GIF images with matching MIME type and extension, up to 5 MB.

## API endpoints

All responses use the JSON envelope `{ "success": true, "data": ... }` on success and `{ "success": false, "error": { "message": "...", "details": [...] } }` on errors. `details` is included for validation errors. Examples below show representative response bodies; IDs and records depend on the database contents. JSON request bodies use `Content-Type: application/json`; upload bodies use `multipart/form-data`.

| Method | Path | Auth / role | Body | Sample response |
|---|---|---|---|---|
| `GET` | `/api/health` | Public | None | `{"success":true,"data":{"status":"ok","db":"connected"}}` |
| `POST` | `/api/auth/register` | Public; limited to 10 requests per 15 minutes per IP | JSON: `{"fname":"Ada","lname":"Optician","email":"ada@example.com","password":"...","passwordConfirm":"..."}` | `201` `{"success":true,"data":{"userID":12,"username":"Ada Optician","email":"ada@example.com","role":"patient","profile_pic":"default_pfp.jpg"}}` |
| `POST` | `/api/auth/login` | Public; limited to 10 requests per 15 minutes per IP | JSON: `{"email":"ada@example.com","password":"..."}` | Sets httpOnly `token` cookie. `{"success":true,"data":{"userID":12,"username":"Ada Optician","email":"ada@example.com","role":"patient","profile_pic":"default_pfp.jpg"}}` |
| `POST` | `/api/auth/logout` | Public; clears the `token` cookie | None | `{"success":true,"data":{"message":"Logged out"}}` |
| `GET` | `/api/auth/me` | Logged in | None | `{"success":true,"data":{"userID":12,"username":"Ada Optician","email":"ada@example.com","role":"patient","profile_pic":"default_pfp.jpg"}}` |
| `GET` | `/api/users/me` | Logged in | None | `{"success":true,"data":{"userID":12,"username":"Ada Optician","email":"ada@example.com","role":"patient","profile_pic":"default_pfp.jpg"}}` |
| `PUT` | `/api/users/me/profile-pic` | Logged in | Multipart field `pfp-img`: image file | `{"success":true,"data":{"userID":12,"username":"Ada Optician","email":"ada@example.com","role":"patient","profile_pic":"pfp_<unique-id>.jpg"}}` |
| `DELETE` | `/api/users/me/profile-pic` | Logged in | None | `{"success":true,"data":{"userID":12,"username":"Ada Optician","email":"ada@example.com","role":"patient","profile_pic":"default_pfp.jpg"}}` |
| `GET` | `/api/items` | Public | None | `{"success":true,"data":[{"itemID":3,"quantity":5,"item_OriginalName":"frames.jpg","item_pic_id":"pfp_<unique-id>.jpg"}]}` |
| `GET` | `/api/items/:id` | Public | None; `id` must be a positive integer | `{"success":true,"data":{"itemID":3,"quantity":5,"item_OriginalName":"frames.jpg","item_pic_id":"pfp_<unique-id>.jpg"}}` |
| `POST` | `/api/items` | Logged in; doctor or assistant | Multipart field `item-img-2`: image file; text field `quantity`: non-negative integer | `201` `{"success":true,"data":{"itemID":4,"quantity":5,"item_OriginalName":"frames.jpg","item_pic_id":"pfp_<unique-id>.jpg"}}` |
| `PUT` | `/api/items/:id` | Logged in; doctor or assistant | Multipart field `item-edit-img`: replacement image file | `{"success":true,"data":{"itemID":3,"quantity":5,"item_OriginalName":"new-frames.jpg","item_pic_id":"pfp_<unique-id>.jpg"}}` |
| `PATCH` | `/api/items/:id/quantity` | Logged in; doctor or assistant | JSON: `{"quantity":8}` (non-negative integer) | `{"success":true,"data":{"itemID":3,"quantity":8,"item_OriginalName":"frames.jpg","item_pic_id":"pfp_<unique-id>.jpg"}}` |
| `DELETE` | `/api/items/:id` | Logged in; doctor or assistant | None | `{"success":true,"data":{"message":"Item deleted"}}` |
| `GET` | `/api/announcements` | Logged in; any role | None | `{"success":true,"data":[{"announcementID":6,"message":"Clinic hours updated"}]}` |
| `POST` | `/api/announcements` | Logged in; doctor | JSON: `{"message":"Clinic hours updated"}`; required, trimmed, at most 2,000 characters | `201` `{"success":true,"data":{"announcementID":7,"message":"Clinic hours updated"}}` |
| `DELETE` | `/api/announcements/:id` | Logged in; doctor | None; `id` must be a positive integer | `{"success":true,"data":{"message":"Announcement deleted"}}` |
| `GET` | `/api/about` | Public | None | `{"success":true,"data":{"aboutID":"","headerImg_OriginalName":"","headerImgName_id":"","doctorImg_OriginalName":"","doctorImgName_id":"","doctorName":"","mobile":"","telephone":"","email":"","address":"","credentials":""}}` (when no About row exists) |
| `PUT` | `/api/about` | Logged in; doctor | JSON with one or more of `doctorName`, `mobile`, `telephone`, `email`, `address`, `credentials`; for example `{"doctorName":"Dr. Ada Optician"}` | `{"success":true,"data":{"aboutID":1,"headerImg_OriginalName":"","headerImgName_id":"","doctorImg_OriginalName":"","doctorImgName_id":"","doctorName":"Dr. Ada Optician","mobile":"","telephone":"","email":"","address":"","credentials":""}}` |
| `PUT` | `/api/about/header-image` | Logged in; doctor | Multipart field `header-img`: image file | `{"success":true,"data":{"aboutID":1,"headerImg_OriginalName":"clinic.jpg","headerImgName_id":"pfp_<unique-id>.jpg","doctorImg_OriginalName":"","doctorImgName_id":"","doctorName":"","mobile":"","telephone":"","email":"","address":"","credentials":""}}` |
| `PUT` | `/api/about/doctor-image` | Logged in; doctor | Multipart field `doctor-img`: image file | `{"success":true,"data":{"aboutID":1,"headerImg_OriginalName":"","headerImgName_id":"","doctorImg_OriginalName":"doctor.jpg","doctorImgName_id":"pfp_<unique-id>.jpg","doctorName":"","mobile":"","telephone":"","email":"","address":"","credentials":""}}` |
| `GET` | `/api/credentials` | Public | None | `{"success":true,"data":[{"credID":2,"credential_pic_originalName":"certificate.jpg","credential_pic_id":"pfp_<unique-id>.jpg"}]}` |
| `POST` | `/api/credentials` | Logged in; doctor | Multipart field `credential-img`: image file | `201` `{"success":true,"data":{"credID":3,"credential_pic_originalName":"certificate.jpg","credential_pic_id":"pfp_<unique-id>.jpg"}}` |
| `DELETE` | `/api/credentials/:id` | Logged in; doctor | None; `id` must be a positive integer | `{"success":true,"data":{"message":"Credential deleted"}}` |

Successful authentication returns only public user fields; password hashes and verification tokens are never included. Authenticated endpoints require the `token` cookie set by login. Missing/invalid authentication returns `401`; a logged-in user with an insufficient role receives `403`; missing records return `404`.

## Troubleshooting

- **CORS errors:** Set `CLIENT_ORIGIN` to the exact PHP site origin, including scheme and port if present, but excluding the project path. The hostname must match exactly (`localhost` and `127.0.0.1` are different origins). Restart the API after changing `.env`.
- **Cookie not set or sent:** Browser requests must include credentials; the site's API wrapper already uses `credentials: "include"`. Confirm `CLIENT_ORIGIN` matches the page origin and that `JWT_SECRET` is set. Local HTTP uses a non-secure cookie; production sets `secure` when `NODE_ENV=production`, so production must use HTTPS. `SameSite=Lax` is configured for the token cookie.
- **Database connection errors:** Ensure XAMPP MySQL is running, the `denz` database has been imported, and `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` in `api/.env` match the local MySQL setup. Check `http://localhost:3000/api/health`; it reports whether the API can query MySQL.
- **Address already in use:** Change `PORT` in `api/.env` and restart the API. Update the local PHP site's API URL configuration if you choose a port other than `3000`.
