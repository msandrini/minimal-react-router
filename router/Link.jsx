import React from 'react';
import PropTypes from 'prop-types';

import * as history from './history';

const Link = (props) => {
	const onClick = (e) => {
		const aNewTab = e.metaKey || e.ctrlKey;
		// TODO: support other protocols with regex
		const anExternalLink = props.to.startsWith('http');

		if (!aNewTab && !anExternalLink) {
			e.preventDefault();
			history.push(props.to);
		}
	};

	const activeClass = props.isActive ? props.activeClassName : '';
	const className = `${props.className}${activeClass}`;

	return (
		<a
			{...props}
			href={props.to}
			className={className}
			onClick={onClick}
		>
			{props.children}
		</a>
	);
};

Link.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.string
	]),
	className: PropTypes.string,
	to: PropTypes.string.isRequired,
	activeClassName: PropTypes.string,
	isActive: PropTypes.bool
};

Link.defaultProps = {
	children: null,
	className: '',
	activeClassName: 'is-active',
	isActive: false
};

export default Link;
