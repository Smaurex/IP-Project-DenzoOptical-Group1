const pool = require('../config/db');

const aboutColumns = [
  'aboutID',
  'headerImg_OriginalName',
  'headerImgName_id',
  'doctorImg_OriginalName',
  'doctorImgName_id',
  'doctorName',
  'mobile',
  'telephone',
  'email',
  'address',
  'credentials'
].join(', ');

const emptyAbout = {
  aboutID: '',
  headerImg_OriginalName: '',
  headerImgName_id: '',
  doctorImg_OriginalName: '',
  doctorImgName_id: '',
  doctorName: '',
  mobile: '',
  telephone: '',
  email: '',
  address: '',
  credentials: ''
};

async function find() {
  const [rows] = await pool.execute(
    `SELECT ${aboutColumns} FROM about WHERE aboutID = 1 LIMIT 1`
  );
  return rows[0] || { ...emptyAbout };
}

async function isTableEmpty() {
  const [rows] = await pool.execute('SELECT aboutID FROM about LIMIT 1');
  return rows.length === 0;
}

async function updateFields(fields) {
  const current = await find();
  const merged = { ...current, ...fields };

  if (await isTableEmpty()) {
    await pool.execute(
      `INSERT INTO about (
        headerImg_OriginalName, headerImgName_id,
        doctorImg_OriginalName, doctorImgName_id,
        doctorName, mobile, telephone, email, address, credentials
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        merged.headerImg_OriginalName,
        merged.headerImgName_id,
        merged.doctorImg_OriginalName,
        merged.doctorImgName_id,
        merged.doctorName,
        merged.mobile,
        merged.telephone,
        merged.email,
        merged.address,
        merged.credentials
      ]
    );
  } else {
    const assignments = Object.keys(fields)
      .map((column) => `\`${column}\` = ?`)
      .join(', ');
    await pool.execute(
      `UPDATE about SET ${assignments} WHERE aboutID = 1`,
      Object.values(fields)
    );
  }

  return find();
}

async function updateImage(originalNameColumn, imageIdColumn, originalName, imageId) {
  return updateFields({
    [originalNameColumn]: originalName,
    [imageIdColumn]: imageId
  });
}

module.exports = { find, updateFields, updateImage };
