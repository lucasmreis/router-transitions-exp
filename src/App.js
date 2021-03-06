import React, { Component } from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

const baseStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  color: 'white',
  width: '100vw',
  height: '90vh'
}

const indexButtonContainerStyles = {
  position: 'relative',
  width: '80vw',
  margin: '10vw',
  border: '1px solid lightgray',
  height: '80px'
}

const indexButtonContentsStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateY(-50%) translateX(-50%)'
}

const Home = () => (
  <div style={{ ...baseStyles, backgroundColor: 'WhiteSmoke', color: 'black'}}>
    <h1>Home</h1>
    <Link to="/card">
      <div style={indexButtonContainerStyles}>
        <div style={indexButtonContentsStyles}>Card</div>
      </div>
    </Link>
  </div>
)

const NumberName = () => (
  <div style={{ ...baseStyles, backgroundColor: 'red'}}>
    <h1>Number and Name</h1>
    <Link to="/card/cvc">
      <button>CVC</button>
    </Link>
  </div>
)

const CVC = () => (
  <div style={{ ...baseStyles, backgroundColor: 'green'}}>
    <h1>CVC</h1>
    <Link to="/">
      <button>Choose this card</button>
    </Link>
  </div>
)

const pushStyles = {
  atEnter: { translateX: 30, opacity: 0 },
  atLeave: { translateX: 0, opacity: 0 },
  atActive: { translateX: 0, opacity: 1 }
}

const popStyles = {
  atEnter: { translateX: -30, opacity: 0 },
  atLeave: { translateX: 0, opacity: 0 },
  atActive: { translateX: 0, opacity: 1 }
}

const backToIndex = {
  atEnter: { translateX: -30, opacity: 0 },
  atLeave: { translateX: 0, opacity: 0 },
  atActive: { translateX: 0, opacity: 1 }
}

const defineTransition = (pathname, action) => {
  switch (pathname) {
    case '/':
      return presets.slideRight
    default:
      return action === 'POP' ? presets.slideRight : presets.slideLeft
  }
}

const AppContents = () => (
  <Route render={({location, history, match}) => {
    const routeStyles = defineTransition(location.pathname, history.action)

    return (
      <RouteTransition
        pathname={location.pathname}
        {...routeStyles}
        runOnMount={false}>

        <Switch key={location.key} location={location}>
          <Route path="/card/cvc" component={CVC}/>
          <Route path="/card" component={NumberName} />
          <Route path="/" component={Home} />
          <Redirect to="/" />
        </Switch>

      </RouteTransition>
    )
  }} />
)

const Header = ({ text }) => (
  <div style={{ height: '10vh' }}>
    <h1 style={{ margin: 0 }}>{text}</h1>
  </div>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' render={() => <Header text="Header" />} />
          <Route path='/card' render={() => <Header text="Header: Card" />} />
          <AppContents />
        </div>
      </Router>
    )
  }
}

export default App;
