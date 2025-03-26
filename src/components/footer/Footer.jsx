import styles from "./Footer.module.css";
import linkedin from "../../assets/logo-linkedin-2.svg"; // Importa o ícone do LinkedIn
import Instagram from "../../assets/logo-instagram-1.svg"; // Importa o ícone do Instagram
//   };

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
      <p>
        Feito com ❤️ por
        <a href={props.devLink} target="_blank" rel="noopener noreferrer">
          {props.devName}
        </a>
      </p>
      {/* Adiciona o ícone do LinkedIn */}
      <a
        href="https://www.linkedin.com/in/pedro-silva-de-lima-083562313/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.linkedin}
      >
        <img src={linkedin} alt="LinkedIn" />
      </a>

      <a href="https://www.instagram.com/limazxzn/" target="_blank"
      rel="noopener noreferrer">
        <img src={Instagram} alt="Instagram" />

      </a>
    </footer>
  );
};

export default Footer;