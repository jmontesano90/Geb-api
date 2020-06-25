const xss = require('xss');
const knex = require('knex');

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
        return GridsService.getById(knex, grid.id);
      });
  },
  getById(knex, id) {
    return knex.from('geb_grids').select('*').where('id', id).first();
  },
  getByGridId(knex, gridId) {
    return knex.from('geb_grids').select('*').where('template_id', gridId);
  },
  deleteGrid(knex, id) {
    return knex('geb_grids').where({ id }).delete();
  },
  serializeGrid(grid) {
    const { user } = grid;
    return {
      id: grid.id,
      user_id: grid.user_id,
      x: grid.x,
      y: grid.y,
      partial_transect_length: grid.partial_transect_length,
      x_partial: grid.x_partial,
      y_partial: grid.y_partial,
      template_id: grid.template_id,
      date_created: new Date(grid.date_created),
      user: {
        id: user.id,
        user_id: user.user_id,
        x: user.x,
        y: user.y,
        partial_transect_length: user.partial_transect_length,
        x_partial: user.x_partial,
        y_partial: user.y_partial,
        template_id: user.template_id,
        date_created: new Date(user.date_created),
      },
    };
  },
};

module.exports = GridsService;
