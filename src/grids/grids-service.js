const xss = require('xss');

const GridsService = {
  getAllGrids(knex) {
    return knex.select('*').from('geb_grids');
  },

  insertGrid(knex, newGrid) {
    return knex
      .insert(newGrid)
      .into('geb_grids')
      .returning('*')
      .then(([grid]) => grid)
      .then((grid) => {
        // GridsService.getById(db, grid.id);
        return grid[0];
      });
  },
  getById(knex, id) {
    return knex.from('geb_grids').select('*').where('id', id).first();
  },
  getByGridId(knex, gridId) {
    return knex.from('geb_grids').select('*').where('grid_id', gridId);
  },
  deleteGrid(knex, id) {
    return knex('geb_grids').where({ id }).delete();
  },
  serializeGrid(grid) {
    const { user } = grid;
    return {
      id: grid.id,
      user_id: grid.user_id,
      comment: xss(grid.comment),
      x: grid.x,
      y: grid.y,
      transect_count: grid.transect_count,
      minimum: grid.minimum,
      partial_transect_count: grid.partial_transect_count,
      partial_transect_length: grid.partial_transect_length,
      x_partial: grid.x_partial,
      y_partial: grid.y_partial,
      grid_id: grid.grid_id,
      date_created: new Date(grid.date_created),
      user: {
        id: user.id,
        user_id: user.user_id,
        comment: xss(user.comment),
        x: user.x,
        y: user.y,
        transect_count: user.transect_count,
        minimum: user.minimum,
        partial_transect_count: user.partial_transect_count,
        partial_transect_length: user.partial_transect_length,
        x_partial: user.x_partial,
        y_partial: user.y_partial,
        grid_id: user.grid_id,
        date_created: new Date(user.date_created),
      },
    };
  },
};

module.exports = GridsService;
