import styles from './Tooltip.module.scss'

const CustomTooltip = (props) => {
  const { title, price, discount } = props
  return (
    <div className={styles.tooltip}>
      <p>{title}</p>
      <p>
        <span className={styles.price}>Price:</span> {price}
      </p>
      <p>
        <span className={styles.discount}>Discounted:</span> {discount}
      </p>
    </div>
  )
}

export default CustomTooltip
