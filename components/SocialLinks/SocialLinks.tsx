import { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ISocialLinks {
  color: string;
}

export const SocialLinks: FunctionComponent<ISocialLinks> = ({ color }) => (
  <div className="social-links">
    <a
      className="social-link"
      href="https://github.com/tjackadams"
      target="_blank"
      rel="noopener"
      title="GitHub Profile"
    >
      <FontAwesomeIcon icon={["fab", "github"]} color={color} />
    </a>
    <a
      className="social-link"
      href="https://twitter.com/tjackadams"
      target="_blank"
      rel="noopener"
      title="Twitter Profile"
    >
      <FontAwesomeIcon icon={["fab", "twitter"]} color={color} />
    </a>
    <a
      className="social-link"
      href="https://www.linkedin.com/in/thomas-adams-84096a52/"
      target="_blank"
      rel="noopener"
      title="LinkedIn Profile"
    >
      <FontAwesomeIcon icon={["fab", "linkedin-in"]} color={color} />
    </a>
  </div>
);
