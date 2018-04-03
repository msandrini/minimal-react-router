# minimal-react-router
Minimal, no-frills routing component for React with optional basic auth support

(still a WIP)

## installation

```
npm install minimal-react-router
```

## usage

This package provides a component to show another given component based on the URL

```javascript
import ShowComponentOnRoute from 'minimal-react-router';

<ShowComponentOnRoute
	pageNotFound={<PageNotFoundComponent />}
	isAuthorised={() => true}
	routeDefinitions={routeDefinitions}
	defaultPages={defaultPages}
/>;
```
In the above example:
- `isAuthorised` is a function that returns a boolean (if your project doesn't have authentication leave this prop)
- `pageNotFound` is a component to be shown when no route is found (like a 404 page component)
- `defaultPages` is an object with two keys: `public` and `private`, for the default redirection on these two situations, aka "logged out" and "logged in". The values for those keys are the strings for the route.
- `routeDefinitions` is an object whose keys are the strings for the routes, and the values are objects specifying both the component to be rendered and the private flag for this route (whether the component is only meant to shown when logged in or only when logged out).