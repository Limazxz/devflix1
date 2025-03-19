import styles from './Footer.module.css'

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
    <p>
      Feito com ❤️ por 
        <a href={props.devLink}>
          {props.devName}</a>
    </p>
  </footer>
  )
}

export default Footer