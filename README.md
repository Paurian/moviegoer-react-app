# The Moviegoer React App

This web application displays a board of movie cards, using React and The Movie Db (TMDb).

## Getting Started

You'll need to have NodeJS installed for NPM to build and run the application.
Quickguide:
npm start (runs the application locally in your browser)
npm build

### Prerequisites

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It also uses the following libraries which can be retrieved through npm:
Axios
react-bootstrap
react-tooltip
react-modal
popper.js

### Installing

Pull this project to your machine, then do the following from within the base directory:
npm i create-react-app
npm i axios
npm i react-tooltip
npm i react-modal
npm i popper.js

## Running the tests

A few tests were created, and will continue to be built. Jest is the framework used by default
in create-react-app

They can be executed by running:
npm test

## Design Patterns

One of the reasons I did this was to experiment with certain design patterns. I worked towards
separating the data gathering and business logic from the display in a React pattern known as
[the ReactJS Container and Presentational Design Pattern](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) as
recommended by Dan Abromov

I also used dependency injection and one-way directional flow to pass data into the view components
and give them access to the control of their higher-level logic components.

Other patterns, such as the

[React.js patterns](http://krasimirtsonev.com/blog/article/react-js-in-design-patterns#input)

As this progresses, I'll look to implement other patterns that could be beneficial. For example,
the Render Props pattern mentioned in [Cunha's post](https://medium.com/@joomiguelcunha/react-patterns-you-should-know-da86568372fa)
to give users the ability to rate and bookmark movies in watch or favorites list.

## Deployment

npm run build
Add additional notes about how to deploy this on a live system

## Built With

- [Create React App](https://github.com/facebook/create-react-app)
- ...

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Bri Gipson** [Paurian Cafe](http://paurian.com) and [on Github](https://github.com/Paurian)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
