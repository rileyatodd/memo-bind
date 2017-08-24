import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Example from './example';

export default class App extends Component {
	render() {
		return (
			<div id="app">
				<Header />
				<Example />
			</div>
		);
	}
}
