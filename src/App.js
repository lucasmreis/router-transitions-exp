import React, { Component } from 'react'
import { RouteTransition } from 'react-router-transition'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

const baseStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  color: 'white',
  width: '100vw',
  height: '100vw'
}

const Home = () => (
  <div style={{ ...baseStyles, backgroundColor: 'WhiteSmoke', color: 'black'}}>
    <h1>Home</h1>
    <Link to="/cartao">
      <button>Cartao</button>
    </Link>
  </div>
)

const NumeroNome = () => (
  <div style={{ ...baseStyles, backgroundColor: 'red'}}>
    <h1>Numero e Nome</h1>
    <Link to="/cartao/cvv">
      <button>CVV</button>
    </Link>
  </div>
)

const CVV = () => (
  <div style={{ ...baseStyles, backgroundColor: 'green'}}>
    <h1>CVV</h1>
    <Link to="/">
      <button>Escolher este cartão</button>
    </Link>
  </div>
)

const pushStyles = {
  atEnter: { translateX: 50, opacity: 0 },
  atLeave: { translateX: 0, opacity: 0 },
  atActive: { translateX: 0, opacity: 1 }
}

const popStyles = {
  atEnter: { translateX: -50, opacity: 0 },
  atLeave: { translateX: 0, opacity: 0 },
  atActive: { translateX: 0, opacity: 1 }
}

const onlyOpacityStyles = {
  atEnter: { translateX: -30, opacity: 0 },
  atLeave: { translateX: 0, opacity: 0 },
  atActive: { translateX: 0, opacity: 1 }
}

const Wizard = () => (
  <Route render={({location, history, match}) => {
    const routeStyles = location.pathname === '/'
      ? onlyOpacityStyles
      : history.action === 'POP' ? popStyles : pushStyles

    return (
      <RouteTransition
        pathname={location.pathname}
        {...routeStyles}
        runOnMount={false}
        mapStyles={styles => ({
          transform: `translateX(${styles.translateX}%)`,
          opacity: styles.opacity || 1 })}>

        <Switch key={location.key} location={location}>
          <Route path="/cartao/cvv" component={CVV}/>
          <Route path="/cartao" component={NumeroNome} />
          <Route path="/" component={Home} />
          <Redirect to="/" />
        </Switch>

      </RouteTransition>
    )
  }} />
)

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1>Header</h1>
          <Wizard />
        </div>
      </Router>
    )
  }
}

export default App;
