import { FunctionComponent } from "react";

export const Footer: FunctionComponent = () => {
  return (
    <footer className="footer footer-context">
      <div className="footer-base">
        <nav>
          <ul className="footer-links">
            <li>
              &copy; <a href="https://blog.itadams.co.uk">Thomas Adams</a>{" "}
              {new Date().getFullYear()}
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
