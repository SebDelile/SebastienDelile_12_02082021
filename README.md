# SportSee prototype

SportSee is a web application offering its user to monitor sports and diets metrics in an analytic Dahsboard.

This prototype includes a landing page containing links to some dashboard pages generated from API data or mocked data.

The project is hosted on netlify there (without the API) : [https://sebdelile-ocr-p12-sportsee.netlify.app/](https://sebdelile-ocr-p12-sportsee.netlify.app/)

![app preview - dashboard](/docs/app-preview-dashboard.png)

## How to begin with the project

You need to first install [node](https://nodejs.org/en/) (v14.15.4 or later) on your device in order to run `npm` commands and [git](https://git-scm.com/) to run the `git` commands

To install the project :

1. clone the repo with `git clone https://github.com/SebDelile/SebastienDelile_12_02082021.git`

1. then go to the new folder with `cd SebastienDelile_12_02082021`

1. finally install all dependencies with `npm ci`

Then you can start working on front side of the project !

If you want to make changes to the API, you can either use a Docker image (see Docker-compose scripts section at the end of this readme) or run it directly. For the later method, please follow these steps :

1. move to the micro-api folder with `cd micro-api`

1. install the dependencies with `npm ci`

1. then move back to the root folder with `cd ..`

## Documentation

A class diagram of the app can be found at [/docs/SportSee.drawio.png](/docs/SportSee.drawio.png)

The javascript documentation can be found at [/docs/javascript/index.html](/docs/javascript/index.html)

## Dependencies

The project is a single page application powered by React JS. it uses :

- **create-react-app** for the react providing (includes Webpack, Babel and Eslint)
- **react-router-dom** for the app routing
- **styled-components** to style the components performing CSS-in-JS
- **axios** to perfom the API alls
- **d3** to build the charts
- **prettier** to format the files (add any missing semi-column and 2 spaces tab-width)
- **jsdoc** to document the javascript
- **prop-types** to set the proptypes of the components
- **stylelint** to lint the style and avoid errors and inconsistencies
- **stylelint-config-standard** to configure stylelint
- **draw-io** to edit the class diagramm, a [vs-code extension](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)

Please consider to have Docker to run locally the containers of frontend and API simultaneously (see Docker-compose scripts section)

## Available scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Please note that there is no yet any implemented test.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run jsdoc`

Update the javascript documentation

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Docker-compose scripts

This needs you to have Docker installed on your device ([see documentation](https://docs.docker.com/))

### `npm run containers-build`

build the image for both the frontend and the backend API

### `npm run containers-start`

run an image for the frontend on port 3000 (with hot reload) and an image of the backend API on port 3001.

It uses docker-compose to run both images in deamon mode. It first builds the unavailable image(s) if needeed.

### `npm run containers-end`

shut down the two images and free the ports
