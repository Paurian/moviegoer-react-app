# The Moviegoer React App

This web application displays a board of movie cards, using React and The Movie Db (TMDb).

## Demo

You can view this [demo](http://wordpress.paurian.com/WebApps/moviegoer-react-app/) at the [Paurian Café](http://wordpress.paurian.com)

## Getting Started

You'll need to have NodeJS installed for NPM to build and run the application.
Quickguide:
npm start (runs the application locally in your browser)
npm build

### Prerequisites

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It also uses the following libraries which can be retrieved through npm:

- [Axios](https://www.npmjs.com/package/axios)
- [React Bootstrap](https://www.npmjs.com/package/react-bootstrap)
- [React Tooltip](https://www.npmjs.com/package/react-tooltip) by Jed Watson
- [React Modal](https://www.npmjs.com/package/react-modal) by Dias Bruno

### Installing

Pull this project to your machine, then do the following from within the base directory:
npm i create-react-app
npm i axios
npm i react-tooltip
npm i react-modal

## Running the tests

A few tests were created, and will continue to be built. [Jest](https://www.npmjs.com/package/jest) is the framework used by default
in create-react-app

They can be executed by running:
npm test

## Needs work / Known issues

- The popup modal's layout is in dire need of love.
- The rating system doesn't react on iDevices when tapped.

## Design Patterns

One of the reasons I did this was to experiment with certain design patterns. I worked towards
separating the data gathering and business logic from the display in a React pattern known as
[the ReactJS Container and Presentational Design Pattern](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) as
recommended by Dan Abromov

I also used dependency injection and one-way directional flow to pass data into the view components
and give them access to the control of their higher-level logic components.

A targetted data-growth pattern is used on some searches because TMDb queries don't always produce results
with the highest pertenance. For example, when a user selects a movie category (e.g. popular) the first set
of searches will be from the closest date range to the current date. As the user continues to load movies,
the dates expand. This forces TMDb to focus on the most recent popular scores first.

[React.js patterns](http://krasimirtsonev.com/blog/article/react-js-in-design-patterns#input)

As this progresses, I'll look to implement other patterns that could be beneficial. For example,
the Render Props pattern mentioned in [Cunha's post](https://medium.com/@joomiguelcunha/react-patterns-you-should-know-da86568372fa)
to give users the ability to rate and bookmark movies in watch or favorites list.

## Ideas for Future Development

TMDb API 4 has the ability to tie a user account to the web app through a tokenized, approved login.
My endgame is to have someone log into the app, flag what movies they like, bookmark movies they're interested in,
and rate the movies they've seen. From that information, TMDb provides a suggested movie list that I can provide
to the user.

## Going deeper

I enjoy creating deep-learning systems, so I'd like to take the same list of likes, wants and ratings to scour
TMDb and the user's social media for what the user's friends like to build my own weighted property that can be
suppressed. Recommendations can then be made and if the user rates or likes the movie that has my weighted points,
the variables themselves would be reweighted. For example, if it's found that the Genre of a film has a greater
significance to a person than the director, it might deduce that the person would like "Schindler's list", but not
"Jaws".

## Down the rabit hole

Deeper still, people's tastes change in seasons. A romantic comedy might be perfect around Valentines day, but
droll during the summer. I'd like to add the ability for theaters like AMC to tap into this, as they have dates
and can expand the social network ties. Then as movies come up, instead of the person flagging it manually as
one to watch, the system will be intelligent enough to do it automatically. If the user doesn't respond to that,
it will see if any of his friends also have an account and see if collaborative group-buzz will garner that response.

## Deployment

npm run build
Consult the guide from create-react-app for other npm run options

## Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](hhttps://github.com/Paurian/moviegoer-react-app/tags).

## Authors

- **Bri Gipson** [Paurian Cafe](http://paurian.com) and [on Github](https://github.com/Paurian)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- I'm grateful for those who take the time to post on their blog
- Along with millions of developers, I'm thankful for the Stack Overflow community
- I'm grateful for those who bring me challenges along with encouragement
