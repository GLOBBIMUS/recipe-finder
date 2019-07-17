# [Recipe-Finder](https://globbimus.github.io/recipe-finder)  

![Alt Text](media/demo.gif)

[Recipe-Finder](https://globbimus.github.io/recipe-finder)  is a react web app that allows users to easily find recipes for both meals and cocktails.

## How to run
Clone the repository and run the following in the project's home directory

```bash
npm install
npm start
```
The app will be running at [http://localhost:3000](http://localhost:3000)

## Technology Stack
Recipe-Finder is built using [React.js](https://reactjs.org/) library and open APIs: [TheMealDB](https://www.themealdb.com) and
[TheCocktailDB](https://www.thecocktaildb.com). [Redux.js](https://redux.js.org/) allowed me to simplify the app's structure and to persist the app's state.
To combine the React.js and Redux.js [react-redux](https://www.npmjs.com/package/react-redux) was used.

**Styling:**

For styling I used multiple react component libraries and bootstrap:
* [bootstrap](https://www.npmjs.com/package/bootstrap)
* [mdbreact](https://www.npmjs.com/package/mdbreact)  
* [react-parallax](https://www.npmjs.com/package/react-parallax)
* [react-reveal](https://www.npmjs.com/package/react-reveal)
* [react-typist-updated](https://www.npmjs.com/package/react-typist-updated)


## Future Work

* Add more searching features such as: "Search by category", "Search by ingridient" and so on.
* Improve some text styling in the [Recipe.js](https://github.com/GLOBBIMUS/recipe-finder/blob/master/src/components/contentComponents/Recipe.js) component.
