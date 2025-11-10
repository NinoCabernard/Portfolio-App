import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-name">Nino Cabernard</p>
        <a
          href="https://github.com/ninocabernard"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-container"
        >
          <img
            className="footer-icon"
            src="..\images\shared\github.svg"
            alt="GitHub"
            title="Visit my GitHub"
          />
          <span className="icon-text">
            Are you interested in checking out my projects?
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/nino-cabernard-96777a1b7/"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-container"
        >
          <img
            className="footer-icon"
            src="..\images\shared\linkedin.svg"
            alt="LinkedIn"
            title="Visit my LinkedIn"
          />
          <span className="icon-text">
            You can also view my professional career on LinkedIn.
          </span>
        </a>
        <a
          href="mailto:nino.cabernard@outlook.com"
          className="icon-container"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="footer-icon"
            src="..\images\shared\mail.svg"
            alt="Email"
            title="Send me an email"
          />
          <span className="icon-text">
            Want to know more about me? Don’t hesitate to reach out!
          </span>
        </a>
      </div>
    </footer>
  );
}
