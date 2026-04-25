import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header id="header">

      <img src="../assets/pokemon-logo.svg" alt="Pokemon logo"/>

      <nav>
        <ul>
          <Link className="nav-link" to='/'>Home</Link>
          <Link className="nav-link" to='/pokedex'>Pokedex</Link>
          <Link className="nav-link" to='/prefight'>Pre-Fight</Link>
          <Link className="nav-link" to='/battle'>Battle</Link>
        </ul>
      </nav>
    </header>
  )
}