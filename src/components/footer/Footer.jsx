import styles from "./Footer.module.css";
import linkedin from "../../assets/logo-linkedin-2.svg"; // Importa o ícone do LinkedIn

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
    </footer>
  );
};

export default Footer;