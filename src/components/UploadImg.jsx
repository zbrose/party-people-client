import axios from "axios"
import { useState } from "react"
import { Form, Row } from "react-bootstrap"

export default function UploadImg({ currentUser, handleImgSubmit, setFormImg }) {
  // const [formImg, setFormImg] = useState("")

  const [msg, setMsg] = useState("")
  // const [displayImg, setDisplayImg] = useState("")

  // const handleImgSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const fd = new FormData()
  //     fd.append("image", formImg)
  //     const response = await axios.put(
  //       `${process.env.REACT_APP_SERVER_URL}/api-v1/users/${currentUser.id}/upload`,
  //       fd
  //     )

  //     setDisplayImg(response.data.cloudImage)
  //   } catch (err) {
  //     console.log(err)
  //     setMsg("go cchk the server console, tere was error")
  //   }
  // }

  return (
    <>
      <h4>upload a pic!</h4>

      


      <Form onSubmit={handleImgSubmit}>
        <Form.Group encType="multipart/form" controlId="formFile" className="mb-3">
          <Form.Label>
            upload picture here
          </Form.Label>
          <Form.Control
            type="file"
            // id="image"
            onChange={(e) => setFormImg(e.target.files[0])}
          />
          <input type="submit" />
        </Form.Group>
      </Form>

      {/* <form onSubmit={handleSubmit} encType="multipart/form">
        <label htmlFor="image">upload an image</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setFormImg(e.target.files[0])}
        />
        <input type="submit" />
      </form> */}
    </>
  )
}
