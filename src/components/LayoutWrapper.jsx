import styles from '../styles/LayoutWrapper.module.scss'

const LayoutWrapper = (props) => {
  return <div className={styles.wrapper}>{props.children}</div>
}

export default LayoutWrapper
