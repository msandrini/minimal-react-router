/* global window */

import React from 'react';
import PropTypes from 'prop-types';

import * as history from './router/history';

const PATH_ROOT = '/';

class ShowComponentOnRoute extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			path: window.location.pathname,
			authenticated: props.isAuthorised()
		};

		this.componentToBeRendered = null;
	}

	componentWillMount() {
		history.onChangeLocation((path) => {
			this.setState({ path });
		});
	}

	componentWillReceiveProps(nextProps) {
		const { isAuthorised } = nextProps;
		this.setState({ authenticated: isAuthorised() });
	}

	componentWillUpdate(nextProps, nextState) {
		const { defaultPages, routeDefinitions, pageNotFound } = nextProps;
		const { authenticated, path } = nextState;

		const pageDefinition = routeDefinitions[path];
		if (pageDefinition) {
			// if user is going to a private page...
			if (pageDefinition.private) {
				// ...they have to be authenticated
				if (authenticated) {
					this.componentToBeRendered = pageDefinition.component;
				} else {
					// ...otherwise we show the fallback public page
					history.push(defaultPages.public);
				}
			} else if (!authenticated) {
				// if user is going to a public page...
				// ...they must not be authenticated
				this.componentToBeRendered = pageDefinition.component;

			} else {
				// ...otherwise we show the fallback private page
				history.push(defaultPages.private);
			}

		// if root page ("/") is called it should redirect appropriately
		} else if (path === PATH_ROOT) {
			if (authenticated) {
				history.push(defaultPages.private);
			} else {
				history.push(defaultPages.public);
			}

		} else {
			this.componentToBeRendered = pageNotFound;
		}
	}

	render() {
		const Component = this.componentToBeRendered;
		return Component ? <Component /> : null;
	}
}

ShowComponentOnRoute.propTypes = {
	pageNotFound: PropTypes.element,
	isAuthorised: PropTypes.func,
	routeDefinitions: PropTypes.object(),
	defaultPages: PropTypes.shape({
		public: PropTypes.string,
		private: PropTypes.string
	})
};

ShowComponentOnRoute.defaultProps = {
	pageNotFound: null,
	isAuthorised: () => true,
	routeDefinitions: {},
	defaultPages: {
		public: '/',
		private: '/'
	}
};

export default ShowComponentOnRoute;
