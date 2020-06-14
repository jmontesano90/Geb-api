const express = require('express');
const path = require('path');
const GridsService = require('./grids-service');

const gridsRouter = express.Router();

gridsRouter.route('/').post((req, res, next) => {
  const {
    grid_id,
    comment,
    x,
    y,
    transect_count,
    minimum,
    partial_transect_count,
    partial_transect_length,
    x_partial,
    y_partial,
  } = req.body;
  const newGrid = {
    grid_id,
    comment,
    x,
    y,
    transect_count,
    minimum,
    partial_transect_count,
    partial_transect_length,
    x_partial,
    y_partial,
  };

  for (const [key, value] of Object.entries(newGrid))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`,
      });

  newGrid.user_id = req.user.id;

  GridsService.insertGrid(req.app.get('db'))
    .then((grid) => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${comment.id}`))
        .json(grid.map(GridsService.serializeGrid));
    })
    .catch(next);
});

module.exports = gridsRouter;
