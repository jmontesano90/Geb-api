const xss = require('xss');

const OutLineService = {
  getAllOutlines(knex) {
    return knex.select('*').from('geb_outlines');
  },

  insertOutline(knex, newOutline) {
    return knex
      .insert(newOutline)
      .into('geb_outlines')
      .returning('*')
      .then(([outline]) => outline)
      .then((outline) => {
        OutLineService.getById(db, outline.id);
      });
  },
  getById(knex, id) {
    return knex.from('geb_outlines').select('*').where('id', id).first();
  },
  getByUserId(knex, userId) {
    return knex.from('geb_outlines').select('*').where('user_id', userId);
  },
  getGridsForOutline(knex, outlineId) {
    return knex.from('geb_grids').select('*').where('grid_id', outlineId);
  },
  deleteOutline(knex, id) {
    return knex('geb_outlines').where({ id }).delete();
  },
  serializeOutline(outline) {
    const { user } = outline;
    return {
      id: outline.id,
      user_id: outline.user_id,
      name: xss(outline.name),
      x: outline.x,
      y: outline.y,
      transect_count: outline.transect_count,
      minimum: outline.minimum,
      partial_transect_count: outline.partial_transect_count,
      partial_transect_length: outline.partial_transect_length,
      date_created: new Date(outline.date_created),
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
        date_created: new Date(user.date_created),
      },
    };
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

module.exports = OutLineService;
