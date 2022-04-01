import { useState } from "react"
import { Form, Button } from "react-bootstrap"

export default function UploadImg({
  currentUser,
  handleImgSubmit,
  setFormImg,
  imgForm,
  setImgForm,
}) {
  const [msg, setMsg] = useState("")

  return (
    <>
      <Form onSubmit={handleImgSubmit}>
        <Form.Group encType="multipart/form" className="mb-3 mt-3">
          <Form.Label>add your picture here:</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFormImg(e.target.files[0])}
          />
          <Button className="mt-3" variant="outline-primary" type="submit">
            submit
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}
