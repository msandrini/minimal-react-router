/* global window */

const historyListeners = [];

window.onpopstate = (event) => {
	historyListeners.forEach(callback => callback(event.path[0].location.pathname));
};

export const push = (pathname) => {
	window.history.pushState({}, '', pathname);
	historyListeners.forEach(callback => callback(pathname));
};

export const onChangeLocation = (callback) => {
	historyListeners.push(callback);
};

window.hLTemp = historyListeners;
