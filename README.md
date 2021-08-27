# SportSee prototype

SportSee is a web application offering its user to monitor sports and diets metrics in an analytic Dahsboard.

This prototype includes a landing page containing links to some dashboard pages generated from API data or mocked data.

![app preview - dashboard](/docs/app-preview-dashboard.png)

## How to begin with the project

To install the project on your laptop, fork or clone the repo and launch the command `npm ci` to install all dependencies. Then you can start working on the project !

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

Please not there is no yet any implemented test.

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

### `npm run containers-start`

run an image for the frontend on port 3000 (with hot reload) and an image of the backend api on port 3001.

It uses docker-compose to build both images and run them (deamon mode)

### `npm run containers-end`

shut down the two images and free the ports
