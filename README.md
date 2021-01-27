# Vensim Dashboard Generator

This app allows to build a decent looking dashboard from a Vensim system dynamics model and to run it locally on browser.

## Purpose
Load your system-dynamics working folder and and run the app to serve locally a simple web-page o for your model with a dynamically responsive dashboard.

You would be able to customize by:
* changing the text content of some page elements
* deciding which input sliders to and output charts to display on the dashboard
* changing the diagram in display on the dashboard
* customizing the setup for the model (baseline inputs configuration)
* adding multiple tabs for the setup and the dashboard

## Requirements

Before running this application, the Vensim web folder needs to be published first. The Vensim web publishing feature is available only on  v8.1+. 

The app also requires node.js to run.

## Usage

Clone the repository on your machine and install the required npm packages:

```bash
npm install
```

Then replace the "sd" directory with your own working directory. Your working dir is the folder containing the model you are working on. Make sure the "sd" folder contains:
* your system-dynamics model in .mdl format. Make sure there is only one .mdl file in the "sd" dir.
* the web directory published by Vensim. Make sure the web folder has been published and is up to date with your model.

To launch the app: if on Windows double click on the run.bat file. Otherwise just open the command line or terminal from the vens-dash folder and launch run.js via node:

```bash
node run.js
```

Once the app is launched, the user can customize the dashboard view. If you change the model in the meantime, the view is still saved: republish the Vensim web folder and and relaunch the the run.js command. To go back to the default view, clear the /public/config/ folder.

If you want the dashboard not to be customisable, so if it is intended just for a user to see the model with a predefined dashboard view, run (or double click on view.bat):

```bash
node run.js viewMode
```


## Limitations

Being built on top of the Vensim Web folder, this app has same limitation as for the models complexity it can support. It supports all functiona and subscript, but not read from file or optimization for example. For the same reason, the graphs that can be visualized as of now are just one-variable line graphs, not bar charts or stack graphs for example.

## Next steps
The Vensim Dashboard generator is still work in progress. Apart from fixing [bugs](bugs.md), next steps for development:
* capability to reorder elements (sliders, charts, tabs, setup-inputs, text-boxes)
* capability to compare variables in the same graph (for a singular scenario)
* capability to use alternative visualizations other than just line charts
* causal tracing of variables
* capability to drag element or personalize layouts
* capability to draw diagrams on the page
