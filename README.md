# Issue building npm packages for browsers with Fusebox

The repository contains two projects:

- *app*
  the main application (a React aplication)
- *npmPackage*
  the npm package project



## First test

Initially, the *Quantum* target for the npm project is set to *npm* (i.e. it generates code for the server).

So, build the npm package by following these steps

```shell
cd npmPackage
npm install
npm run dist
```

Now go in the app folder and create the project environment:

```shell
cd ../app
npm install
```

Then, create the `mypackage` folder in `node_modules` folder of the main app in order to simulate the installation of our package:

```shell
mkdir node_modules/mypackage
cp ../npmPackage/dist/* node_modules/mypackage
```

Finally, run the React application by typing:

```shell
npm run dist
```

If you point a browser to http://localhost:4444 you should see in the console a *null* value instead of the `appName` of your browser.



## Second test

In this second test we set the *Quantum* target for the npm project to *npm-browser*.

Then clear the `.fusebox` folder and rebuild the npm package by typing the following command

```shell
npm run dist
```

Now, copy the new npm package into the `node_modules/mypackage` folder of the app project.

Then delete the `.fusebox` folder inside the `app` folder and rebuild the app:

```shell
npm run dist
```

Now, when you open the browser will get an error in the console:

`TypeError: mypackage_1.getBrowserAppName is not a function`

Actually *mypackage_1* is an object without any exported method.

