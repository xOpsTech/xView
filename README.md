# Dashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.3.

Git clone https://github.com/xoperations/xView.git -b develop

#Install node

## Install Angular CLI in xView project folder
Sudo npm install
** if they give you unexpected token error run: rm package-lock.json
Sudo npm install @angular/cli

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Run `sudo cp -r dist/* ../api/public` to copy contents to API folder. 

## Run back-end

Run `Mongod`

## Development server

While in API folder, run `sudo npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
