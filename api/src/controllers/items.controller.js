const fs = require('fs/promises');
const path = require('path');
const itemService = require('../services/item.service');

const itemPicturesFolder = path.resolve(__dirname, '..', '..', '..', 'item_pics');

function imagePath(imageId) {
  if (typeof imageId !== 'string' || path.basename(imageId) !== imageId) {
    return null;
  }
  return path.join(itemPicturesFolder, imageId);
}

async function deleteImage(imageId) {
  const target = imagePath(imageId);
  if (!target) {
    throw new Error('Stored item image filename is invalid');
  }
  try {
    await fs.unlink(target);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

function sendNotFound(res) {
  return res.status(404).json({
    success: false,
    error: { message: 'Item not found' }
  });
}

function sendItem(res, item, status = 200) {
  return res.status(status).json({ success: true, data: item });
}

async function list(req, res, next) {
  try {
    return res.json({ success: true, data: await itemService.findAll() });
  } catch (error) {
    return next(error);
  }
}

async function getById(req, res, next) {
  try {
    const item = await itemService.findById(Number(req.params.id));
    return item ? sendItem(res, item) : sendNotFound(res);
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: { message: 'Item image file is required' }
    });
  }

  try {
    const item = await itemService.create({
      quantity: Number(req.body.quantity),
      originalName: path.basename(req.file.originalname),
      imageId: req.file.filename
    });
    return sendItem(res, item, 201);
  } catch (error) {
    try {
      await deleteImage(req.file.filename);
    } catch (cleanupError) {
      return next(cleanupError);
    }
    return next(error);
  }
}

async function updateImage(req, res, next) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: { message: 'Item image file is required' }
    });
  }

  try {
    const previousItem = await itemService.findById(Number(req.params.id));
    if (!previousItem) {
      await deleteImage(req.file.filename);
      return sendNotFound(res);
    }

    let item;
    try {
      item = await itemService.updateImage(
        Number(req.params.id),
        path.basename(req.file.originalname),
        req.file.filename
      );
    } catch (error) {
      await deleteImage(req.file.filename);
      throw error;
    }

    if (!item) {
      await deleteImage(req.file.filename);
      return sendNotFound(res);
    }

    await deleteImage(previousItem.item_pic_id);
    return sendItem(res, item);
  } catch (error) {
    return next(error);
  }
}

async function updateQuantity(req, res, next) {
  try {
    const item = await itemService.updateQuantity(
      Number(req.params.id),
      Number(req.body.quantity)
    );
    return item ? sendItem(res, item) : sendNotFound(res);
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    const item = await itemService.findById(Number(req.params.id));
    if (!item) {
      return sendNotFound(res);
    }

    const removed = await itemService.remove(Number(req.params.id));
    if (!removed) {
      return sendNotFound(res);
    }

    await deleteImage(item.item_pic_id);
    return res.json({
      success: true,
      data: { message: 'Item deleted' }
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { list, getById, create, updateImage, updateQuantity, remove };
