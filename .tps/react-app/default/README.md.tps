# {{= tps.utils.capitalCase(tps.name) }}

## Development

### Start App

To start the react app development mode, runn the following command:

```bash
npm start
```

You can now open the app in your browser on [http://localhost:3000](http://localhost:3000).\
The page will reload when you make changes.\
You may also see any lint errors in the console.

### Testing

Run the following command to run unit tests:

```bash
npm test
```

This will launch the test runner in the interactive watch mode.

### Deployment

In order to deploy this app, we need to create a production build. You can do this by by running the following command:

```bash
npm run build
```

This builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

To deploy the app, you can use any of [create-react-app](https://facebook.github.io/create-react-app) [deployment](https://facebook.github.io/create-react-app/docs/deployment) options.

### Debugging

<!-- debugging section ... -->

### Eject

```bash
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
