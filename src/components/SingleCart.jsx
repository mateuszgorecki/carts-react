import { useParams } from "react-router-dom"
import LayoutWrapper from "./LayoutWrapper"

const SingleCart = () => {
  const params = useParams()
  console.log(params)

  return   (
    <LayoutWrapper>
      <h1>cart detali</h1>
      <p>{params.cartId}</p>
    </LayoutWrapper>
  )
}

export default SingleCart
