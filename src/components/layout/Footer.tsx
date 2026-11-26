import './Footer.css'

interface FooterProps {
  name: string
}

export function Footer({ name }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <p className="footer__copyright">
            © {year} {name}
          </p>
        </div>
      </div>
    </footer>
  )
}
