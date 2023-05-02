import styles from './Tooltip.module.scss'

const CustomTooltip = (props) => {
  return (
    <div className={styles.tooltip}>
      <p>{props.title}</p>
      <p>
        <span className={styles.price}>Price:</span> {props.price}
      </p>
      <p>
        <span className={styles.discount}>Discounted:</span> {props.discount}
      </p>
    </div>
  )
}

export default CustomTooltip
