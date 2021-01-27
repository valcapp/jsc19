# Ideas for Refactoring

## Medium

### Rethink the usage of the pakcage
* create a dash-data next to web
* understand how to implement it as an npm package
* implement npm scripts

### Refactor the data system
* move config (dashboard data) from public and be served through app routes
* implement data models to manipulate dahsboard data
* implement controllers to split data and views
* run the dashboard without sd inside

### Improve code
* modify data communication using axios
* read .mdl file in a different route

## Radical
* turn the package into a react app
* split the app into 2 micro-services, one express app working with ui-data models, a react app serving the front-end