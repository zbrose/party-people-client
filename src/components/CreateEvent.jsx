import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Row, Col, Form, Button, FloatingLabel } from "react-bootstrap"

export default function CreateEvent({ handleSubmit, setEventForm, eventForm }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGridTitle">
        <Form.Label>title:</Form.Label>
        {/* <input
          type="text"
          value={eventForm.title}
          onChange={(e) =>
            setEventForm({ ...eventForm, title: e.target.value })
          }
          id="title"
          required
        /> */}
        <Form.Control
          type="text"
          value={eventForm.title}
          onChange={(e) =>
            setEventForm({ ...eventForm, title: e.target.value })
          }
          // id="title"
          required
          placeholder="lan party"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>address:</Form.Label>
        {/* <label htmlFor="address">address:</label> */}
        {/* <input
          type="text"
          value={eventForm.address}
          onChange={(e) =>
            setEventForm({ ...eventForm, address: e.target.value })
          }
          id="address"
          required
        /> */}
        <Form.Control
          type="text"
          value={eventForm.address}
          onChange={(e) =>
            setEventForm({ ...eventForm, address: e.target.value })
          }
          // id="address"
          required
          placeholder="Apartment, studio, or floor"
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>city:</Form.Label>
          {/* <input
            type="text"
            value={eventForm.city}
            onChange={(e) =>
              setEventForm({ ...eventForm, city: e.target.value })
            }
            id="city"
          /> */}
          <Form.Control
            type="text"
            value={eventForm.city}
            onChange={(e) =>
              setEventForm({ ...eventForm, city: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select
            defaultValue="Choose..."
            value={eventForm.state}
            onChange={(e) =>
              setEventForm({ ...eventForm, state: e.target.value })
            }
            // id="state"
          >
            <option>Choose...</option>
            <option value="">N/A</option>
            <option value="AK">Alaska</option>
            <option value="AL">Alabama</option>
            <option value="AR">Arkansas</option>
            <option value="AZ">Arizona</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DC">District of Columbia</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="IA">Iowa</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="MA">Massachusetts</option>
            <option value="MD">Maryland</option>
            <option value="ME">Maine</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MO">Missouri</option>
            <option value="MS">Mississippi</option>
            <option value="MT">Montana</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="NE">Nebraska</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NV">Nevada</option>
            <option value="NY">New York</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="PR">Puerto Rico</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VA">Virginia</option>
            <option value="VT">Vermont</option>
            <option value="WA">Washington</option>
            <option value="WI">Wisconsin</option>
            <option value="WV">West Virginia</option>
            <option value="WY">Wyoming</option>
            {/* <input
              type="text"
              value={eventForm.state}
              onChange={(e) =>
                setEventForm({ ...eventForm, state: e.target.value })
              }
              id="state"
            /> */}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          {/* <label htmlFor="zipcode">zipcode:</label> */}
          {/* <input
            type="number"
            value={eventForm.zipcode}
            onChange={(e) =>
              setEventForm({ ...eventForm, zipcode: e.target.value })
            }
            id="zipcode"
          /> */}
          <Form.Control
            type="number"
            value={eventForm.zipcode}
            onChange={(e) =>
              setEventForm({ ...eventForm, zipcode: e.target.value })
            }
          />
        </Form.Group>
      </Row>

      {/* <label htmlFor="date">date of event:</label>
      <input
        type="text"
        value={eventForm.date}
        onChange={(e) =>
          setEventForm({ ...eventForm, "date of event": e.target.value })
        }
        id="date"
      /> */}

      <FloatingLabel
        controlId="floatingTextarea"
        label="description"
        className="mb-3"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          value={eventForm.description}
          onChange={(e) =>
            setEventForm({ ...eventForm, description: e.target.value })
          }
        />
      </FloatingLabel>
      {/* <label htmlFor="description">description:</label>
      <input
        type="textarea"
        value={eventForm.description}
        onChange={(e) =>
          setEventForm({ ...eventForm, description: e.target.value })
        }
        id="description"
      /> */}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label >category:</Form.Label>
          <Form.Select
            value={eventForm.category}
            onChange={(e) =>
              setEventForm({ ...eventForm, category: e.target.value })
            }
            // id="category"
          >
            <option value="party">party</option>
            <option value="concert">concert</option>
            <option value="boardgames">board games</option>
            <option value="comedy">comedy</option>
            <option value="study">study</option>
            <option value="other">other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="date">
          <Form.Label>Select Date</Form.Label>
          {/* <input
          type="text"
          value={eventForm.date}
          onChange={(e) =>
            setEventForm({ ...eventForm, "date of event": e.target.value })
          }
          id="date"
        /> */}
          <Form.Control
            type="date"
            name="date"
            placeholder="date of event"
            value={eventForm.date}
            onChange={(e) =>
              setEventForm({ ...eventForm, date: e.target.value })
            }
          />
        </Form.Group>
      </Row>
      {/* <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}

      <Button variant="primary" type="submit">
        submit
      </Button>
      {/* <button className="myButton" type="submit">
        submit */}
      {/* </button> */}
    </Form>
  )
}
