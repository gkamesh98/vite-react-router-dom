import { useParams } from "react-router-dom"

const Test = () => {
  const params = useParams()
  console.log(params)
  return <p>{params.test}</p>
}

export default Test