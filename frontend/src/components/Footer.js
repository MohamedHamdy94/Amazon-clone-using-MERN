import React from "react";
import {
  MDBFooter,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { FaFacebookF } from 'react-icons/fa';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
export default function Footer() {
  return (
    <MDBFooter className="text-center" color="white" bgColor="dark">
  <div className="footer__socials">
        <a href="https://www.facebook.com/anakingmsr/">
          <FaFacebookF />
        </a>
        <a href="https://github.com/MohamedHamdy94">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/mohamed-mohamed-138693219/">
          <BsLinkedin />
        </a>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2022 Copyright:{' '}
        <Link className="text-white" to="https://mohamedhamdy94.github.io/Mohamed-Hamdy/">
        mohamedhamdy94.github.io/Mohamed-Hamdy
        </Link>
      </div>
    </MDBFooter>
  );
}
