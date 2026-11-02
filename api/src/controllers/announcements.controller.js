const announcementService = require('../services/announcement.service');

function sendNotFound(res) {
  return res.status(404).json({
    success: false,
    error: { message: 'Announcement not found' }
  });
}

async function list(req, res, next) {
  try {
    return res.json({
      success: true,
      data: await announcementService.findAll()
    });
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const announcement = await announcementService.create(req.body.message);
    if (!announcement) {
      return next(new Error('Created announcement could not be retrieved'));
    }
    return res.status(201).json({ success: true, data: announcement });
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    const removed = await announcementService.remove(Number(req.params.id));
    return removed
      ? res.json({ success: true, data: { message: 'Announcement deleted' } })
      : sendNotFound(res);
  } catch (error) {
    return next(error);
  }
}

module.exports = { list, create, remove };
