import styles from './LayoutWrapper.module.scss'

const LayoutWrapper = (props) => {
  const classes = `${styles.wrapper} ${props.className ? props.className : ''}`
  return <div className={classes}>{props.children}</div>
}

export default LayoutWrapper
