import styles from '../styles/Modal.module.scss'

const Modal = (props) => {
  const closeModal = () => {
    props.toggleModal(false)
  }
  return (
    <div className={styles.container}>
      <div
        className={styles.blur}
        onClick={closeModal}
      ></div>
      <div className={styles.modal}>
        <span
          className={styles.close}
          onClick={closeModal}
        >
          &#x02A2F;
        </span>
        <h1>Are you sure?</h1>
        <div>
          <button>YES</button>
          <button>NO</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
