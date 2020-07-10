const express = require('express');
const TemplatesService = require('./templates-service');

const templatesRouter = express.Router();

templatesRouter.route('/:user_id').get((req, res) => {
  TemplatesService.getByUserId(req.app.get('db'), req.params.user_id)
    .then((templates) => {
      console.log('Ran inside the .then');
      res.json(templates.map(TemplatesService.serializeTemplate));
    })
    .catch(console.log('Templates user error'));
});
templatesRouter.route('/hello/pleasework').post((req, res, next) => {
  return res.status(609);
});
templatesRouter.route('/').post((req, res, next) => {
  const {
    user_id,
    name,
    x,
    y,
    transect_count,
    minimum,
    partial_transect_count,
    partial_transect_length,
  } = req.body;
  const newTemplate = {
    user_id,
    name,
    x,
    y,
    transect_count,
    minimum,
    partial_transect_count,
    partial_transect_length,
  };
  for (const [key, value] of Object.entries(newTemplate))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`,
      });

  TemplatesService.insertTemplate(req.app.get('db'), newTemplate)
    .then((template) => {
      res
        .status(201)

        .json(TemplatesService.serializeTemplate(template));
    })
    .catch(next);
});

templatesRouter
  .route('/:user_id/:template_id')
  .all(checkTemplateExists)
  .get((req, res) => {
    res.json(TemplatesService.serializeTemplate(res.template));
  });

templatesRouter
  .route('/grids/:template_id')
  .all(checkTemplateExists)
  .delete((req, res, next) => {
    const { template_id } = req.params;
    TemplatesService.deleteTemplateGrids(req.app.get('db'), template_id)
      .then(res.status(204).end())
      .catch(next);
  });
templatesRouter
  .route('/template/:template_id')
  .all(checkTemplateExists)
  .delete((req, res, next) => {
    const { template_id } = req.params;
    TemplatesService.deleteTemplate(req.app.get('db'), template_id)
      .then(res.status(204).end())
      .catch(next);
  });

templatesRouter
  .route('/:user_id/:template_id/grids')
  .all(checkTemplateExists)
  .get((req, res, next) => {
    TemplatesService.getGridsForTemplate(
      req.app.get('db'),
      req.params.template_id
    )
      .then((grids) => {
        res.json(grids.map(TemplatesService.serializeGrid));
      })
      .catch(next);
  });

async function checkTemplateExists(req, res, next) {
  try {
    const template = await TemplatesService.getById(
      req.app.get('db'),
      req.params.template_id
    );

    if (!template)
      return res.status(404).json({
        error: `Template doesn't exist`,
      });

    res.template = template;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = templatesRouter;
