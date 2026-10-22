import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { content } from './data/content'

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar
        name={content.name}
        monogram={content.monogram}
        nav={content.nav}
      />

      <main id="main" tabIndex={-1}>
        <Hero hero={content} tech={content.tech} />
        <Projects
          heading={content.projectsHeading}
          projects={content.projects}
        />
      </main>
    </>
  )
}

export default App
