import ShowComponentOnRoute from './index';

const Login = <div />;
const Page1 = <div />;
const Page2 = <div />;
const PageNotFound = <div />;

const routeDefinitions = {
	'/login': { component: Login, private: false },
	'/internal-page1': { component: Page1, private: true },
	'/internal-page2': { component: Page2, private: true }
};

const defaultPages = {
	public: '/login',
	private: '/internal-page1'
};

const isAuthorised = () => true;

// use it like:

<ShowComponentOnRoute
	pageNotFound={PageNotFound}
	isAuthorised={isAuthorised}
	routeDefinitions={routeDefinitions}
	defaultPages={defaultPages}
/>;