import React, { Component } from 'react'
import { RouteTransition } from 'react-router-transition'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const baseStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  color: 'white',
  width: '100vw',
  height: '100vw'
}

const Home = () => (
  <div style={{ ...baseStyles, backgroundColor: 'red'}}>
    <h1>Home</h1>
    <Link to="/about">
      <button>About</button>
    </Link>
  </div>
)

const About = () => (
  <div style={{ ...baseStyles, backgroundColor: 'green'}}>
    <h1>About</h1>
    <Link to="/">
      <button>Home</button>
    </Link>
  </div>
)

const pushStyles = {
  atEnter: { translateX: 100, opacity: 0 },
  atLeave: { translateX: 0, opacity: 0 },
  atActive: { translateX: 0, opacity: 1 }
}

const popStyles = {
  atEnter: { translateX: -100, opacity: 0 },
  atLeave: { translateX: 0, opacity: 0 },
  atActive: { translateX: 0, opacity: 1 }
}

class App extends Component {
  render() {
    return (
      <Router>
        <Route render={({location, history, match}) => {
          const routeStyles = history.action === 'POP' ? popStyles : pushStyles
          return (
            <RouteTransition
              pathname={location.pathname}
              {...routeStyles}
              runOnMount={false}
              mapStyles={styles => ({
                transform: `translateX(${styles.translateX}%)`,
                opacity: styles.opacity || 1 })}>

              <Switch key={location.key} location={location}>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About}/>
              </Switch>

            </RouteTransition>
          )
        }} />
      </Router>
    )
  }
}

export default App;
