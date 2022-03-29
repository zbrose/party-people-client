import { useState } from "react"
import { Form, Row } from "react-bootstrap"

export default function UploadImg({ currentUser, handleImgSubmit, setFormImg }) {
  // const [formImg, setFormImg] = useState("")

  const [msg, setMsg] = useState("")

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
