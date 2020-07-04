import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import EditSession from './pages/EditSession';
import NewTask from './pages/NewTask';

export default function Routes () {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Logon} />
				<Route path="/tasks/new" component={NewTask} />
				<Route path="/register" component={Register} />
				<Route path="/profile" exact component={Profile} />
				<Route path="/profile/edit/pwd" exact component={EditSession} />
				<Route path="/profile/edit" exact component={EditProfile} />
			</Switch>
		</BrowserRouter>
	);
}