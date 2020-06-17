import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import 'bulma'
import './styles/style.scss'

Array.prototype.randomIndex = function () {
  return this[Math.floor(Math.random() * this.length)]
}

ReactDOM.render(<App />, document.getElementById('root'))