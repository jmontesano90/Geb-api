const express = require('express');
const TemplatesService = require('./templates-service');
const { requireAuth } = require('../middleware/basic-auth');

const templatesRouter = express.Router();

templatesRouter
  .route('/:outline_id')
  .all(requireAuth)
  .all(checkOutlineExists)
  .get((req, res) => {
    res.json(TemplatesService.serializeOutline(res.outline));
  });

templatesRouter
  .route('/:outline_id/grids')
  .all(requireAuth)
  .all(checkOutlineExists)
  .get((req, res, next) => {
    TemplatesService.getGridsForOutline(
      req.app.get('db'),
      req.params.outline_id
    )
      .then((grids) => {
        res.json(grids.map(TemplatesService.serializeGrid));
      })
      .catch(next);
  });

async function checkOutlineExists(req, res, next) {
  try {
    const outline = await TemplatesService.getById(
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

module.exports = templatesRouter;
