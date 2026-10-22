import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { hero, nav, tech } from './data/content'

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar name={hero.name} monogram={hero.monogram} nav={nav} />

      <main id="main" tabIndex={-1}>
        <Hero hero={hero} tech={tech} />
      </main>
    </>
  )
}

export default App
