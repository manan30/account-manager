import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideNav from './components/SideNav';
import Overview from './pages/Overview';

function App() {
  return (
    <Router>
      <div className='flex h-full w-full'>
        <SideNav />
        <Switch>
          <Route exact path='/' component={Overview} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
