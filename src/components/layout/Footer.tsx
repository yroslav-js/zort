import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.rights}>© ZORT Inc. 2023 All rights reserved.</div>
      <div className={styles.right}>
        <div>News</div>
        <div>Terms and Conditions</div>
        <div>Privacy Police</div>
      </div>
    </div>
  );
};

export default Footer;