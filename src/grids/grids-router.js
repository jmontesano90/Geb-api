const express = require('express');
const path = require('path');
const GridsService = require('./grids-service');
const { requireAuth } = require('../middleware/basic-auth');

const gridsRouter = express.Router();

gridsRouter
  .route('/:grid_id')
  // .all(requireAuth)
  .all(checkGridExists)
  .get((req, res) => {
    res.json(GridsService.serializeGrid(res.grid));
  });

gridsRouter
  .route('/user/:user_id')
  // .all(requireAuth)
  .get((req, res) => {
    GridsService.getByUserId(req.app.get('db'), req.params.user_id)
      .then((grids) => {
        res.json(grids.map(GridsService.serializeGrid));
      })
      .catch(console.log('Grids Service Error'));
  });

gridsRouter
  .route('/')
  //.all(requireAuth)
  .get((req, res) => {
    GridsService.getByUserId(req.app.get('db'), req.params.user_id)
      .then((grids) => {
        res.json(grids.map(GridsService.serializeGrid));
      })
      .catch(next);
  });

gridsRouter.route('/').post((req, res, next) => {
  const {
    template_id,
    user_id,
    x,
    y,
    partial_transect_length,
    x_partial,
    y_partial,
    direction,
  } = req.body;
  const newGrid = {
    template_id,
    user_id,
    x,
    y,
    partial_transect_length,
    x_partial,
    y_partial,
    direction,
  };

  for (const [key, value] of Object.entries(newGrid))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`,
      });

  GridsService.insertGrid(req.app.get('db'), newGrid)
    .then((grid) => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${grid.id}`))
        .json(GridsService.serializeGrid(grid));
    })
    .catch(next);
});

async function checkGridExists(req, res, next) {
  try {
    const grid = await GridsService.getById(req.app.get('db'), req.params.id);

    if (!grid)
      return res.status(404).json({
        error: `Grid doesn't exist`,
      });

    res.grid = grid;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = gridsRouter;
