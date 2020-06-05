const express = require('express');
const OutlinesService = require('./outlines-service');
const { requireAuth } = require('../middleware/basic-auth');

const outlinesRouter = express.Router();

outlinesRouter
  .route('/outline_id')
  .all(requireAuth)
  .all(checkOutlineExists)
  .get((req, res) => {
    res.json(OutlinesService.serializeOutline(res.outline));
  })

  outlinesRouter.route('/outline_id/grids')
    .all(requireAuth)
    .all(checkOutlineExists)
    .get((req, res , next) =>{
        OutlinesService.get
    })

async function checkOutlineExists(req, res, next) {
  try {
    const outline = await OutlinesService.getById(
      req.app.get('db'),
      req.params.outline_id
    );

    if (!outline)
      return res.status(404).json({
        error: `Outline doesn't exist`,
      });

    res.outline = outline;
    next();
  } catch (error) {
    next(error);
  }
}
