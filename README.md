Geb

Live app: https://geb.jmontesano90.vercel.app/

Thank you for using Geb!

Geb is a transect generator aimed at ecologists, biologists, entomologists or anyone that uses transect based sampling! Use Geb to specify template dimensions, then allow it to tell you where to sample using complete random transect generation. Geb will remember when you sampled and where you sampled in case you need it for your records.

https://imgur.com/fmdYdLn
https://imgur.com/3xagKHu
https://imgur.com/OK6Aw1r

Uses React, CSS, Node, Express, and PostgreSQL.

API Endpoints

Authentication Route:
${config.API_ENDPOINT}/auth/${userName}
Returns user id. Supports Get requests

    ${config.API_ENDPOINT}/auth/login
    Logs user in, requires user_name and password.  Supports Post requests

    ${config.API_ENDPOINT}/auth/users
    Posts a new user, requires user_name and password.  Supports Post requests

Grid Route:
${config.API_ENDPOINT}/grids/user/${userId}
Returns all user grids. Supports Get requests

\${config.API_ENDPOINT}/grids
Posts new grid. Supports Post requests. Requires the following: template_id, user_id, x, y, partial_transect_length, x_partial, y_partial, direction

${config.API_ENDPOINT}/grids/user/${userId}
Returns a specific grid. Supports Get requests
Template Route:
${config.API_ENDPOINT}/templates/${templateId}
Returns a specific template. Supports Get requests

${config.API_ENDPOINT}/templates/${userId}
Returns all user templates. Supports Get requests

${config.API_ENDPOINT}/templates/grids/${templateId}
Deletes all grids associated with a template. Supports Delete requests

${config.API_ENDPOINT}/templates/template${templateId}
Deletes a template. Supports Delete requests

${config.API_ENDPOINT}/templates/${templateId}/grids
Returns all grids with associated with a template. Supports Get requests

\${config.API_ENDPOINT}/templates/
Posts a new template. Supports Post requests. Requires the following: minimum, name, partial_transect_count, partial_transect_length, transect_count, user_id, x, y.
