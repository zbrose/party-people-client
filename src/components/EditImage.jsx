import { Form } from 'react-bootstrap'

function EditImage({
  handleSubmit,
  setFormImg,
  event,
  setShowImgForm,
  showImgForm,
}) {
  return (
    <div
    className="BebasNeue createFormCardTwo container-fluid mb-5"
    >
      <div>
        <h3>Current Event Image</h3>
        <img
          src={event.image ? event.image : "http://via.placeholder.com/500x500"}
          alt={event.title}
        />
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group
          encType="multipart/form"
          controlId="formFile"
          className="mb-3"
        >
          <Form.Label>Upload a New Image for your Event</Form.Label>
          <Form.Control
            type="file"
            // id="image"
            onChange={(e) => setFormImg(e.target.files[0])}
          />
          <input type="submit" />
        </Form.Group>
        <button
          onClick={() => {
            setShowImgForm(!showImgForm)
          }}
        >
          Exit
        </button>
      </Form>
    </div>
  )
}

export default EditImage
