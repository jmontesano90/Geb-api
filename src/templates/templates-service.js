const xss = require('xss');

const Templateservice = {
  getAllTemplates(knex) {
    return knex.select('*').from('geb_templates');
  },

  insertTemplate(knex, newTemplate) {
    return knex
      .insert(newTemplate)
      .into('geb_templates')
      .returning('*')
      .then(([template]) => template);
  },
  getById(knex, id) {
    return knex.from('geb_templates').select('*').where('id', id).first();
  },
  getByUserId(knex, userId) {
    return knex.from('geb_templates').select('*').where('user_id', userId);
  },

  getGridsForTemplate(knex, templateId) {
    return knex.from('geb_grids').select('*').where('template_id', templateId);
  },
  deleteTemplate(knex, id) {
    return knex('geb_templates').where({ id }).delete();
  },
  deleteTemplateGrids(knex, templateId) {
    return knex('geb_grids').where('template_id', templateId).delete();
  },
  serializeTemplate(template) {
    const { user } = template;
    return {
      id: template.id,
      name: template.name,
      user_id: template.user_id,
      x: template.x,
      y: template.y,
      transect_count: template.transect_count,
      minimum: template.minimum,
      partial_transect_count: template.partial_transect_count,
      partial_transect_length: template.partial_transect_length,
      date_created: new Date(template.date_created),
    };
  },

  serializeGrid(grid) {
    const { user } = grid;
    return {
      id: grid.id,
      user_id: grid.user_id,
      comment: xss(grid.comment),
      direction: grid.direction,
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
    };
  },
};

module.exports = Templateservice;
