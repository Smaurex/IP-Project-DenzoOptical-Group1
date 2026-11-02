# Project context
Denzo Optical: PHP + MySQL (mysqli) clinic website, local URL `http://localhost/DenzoOptical` (XAMPP), live at `https://denzo.dcism.org`. We are adding an Express.js REST API in `/api` (PHP files stay until the API is confirmed working).

## Database (MySQL, utf8mb4, local DB name `denz`; dump: includes/s22102454_denzo.sql)
- users(userID PK AI, username, email UNIQUE, password, role, profile_pic_originalName, profile_pic_id, verification_token NULL)
  - roles: doctor | assistant | patient
  - passwords were hashed with PHP password_hash() (bcrypt `$2y$`); existing users must still log in
- item(itemID PK AI, quantity int, item_OriginalName, item_pic_id)
- announcement(announcementID PK AI, message text)
- about(aboutID PK AI, headerImg_OriginalName, headerImgName_id, doctorImg_OriginalName, doctorImgName_id, doctorName, mobile, telephone, email, address, credentials) – single row, aboutID = 1
- credential(credID PK AI, credential_pic_originalName, credential_pic_id)

## Upload folders (project root)
profile_pics/ (default: default_pfp.jpg), item_pics/, uploads/ (about-page images)

## Permissions
- doctor: item CRUD, post announcements, edit About, manage credentials
- assistant: item CRUD, view announcements, view About
- patient: view items/announcements/About, edit own profile pic
- any logged-in user: own profile pic
- public: view items, view About

## Rules for all work
- Only use the tables/columns above. Parameterized queries only (mysql2 `?`).
- Never return `password` or `verification_token` in responses.
- JSON shape: `{ success, data?, error?: { message, details? } }` with correct HTTP codes.
- Images: jpg/jpeg/png/gif only (check MIME and extension), max 5 MB, unique filenames.
- No hardcoded credentials; use `.env`.
- Use async/await, keep code commented and simple for a student team. Do not change style.css class names.
- Do only the chunk I ask for. Don't touch unrelated files.