import React from 'react'
import Form from 'react-bootstrap/Form'

export default function CreateEvent({ handleSubmit, setEventForm, eventForm }) {
  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="title">title:</label>
      <input
        type="text"
        value={eventForm.title}
        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
        id="title"
        required
      />
      <label htmlFor="address">address:</label>
      <input
        type="text"
        value={eventForm.address}
        onChange={(e) => setEventForm({ ...eventForm, address: e.target.value })}
        id="address"
        required
      />
      <label htmlFor="city">city:</label>
      <input
        type="text"
        value={eventForm.city}
        onChange={(e) => setEventForm({ ...eventForm, city: e.target.value })}
        id="city"
      />
      <label htmlFor="state">state:</label>
      <input
        type="text"
        value={eventForm.state}
        onChange={(e) => setEventForm({ ...eventForm, state: e.target.value })}
        id="state"
      />
      <label htmlFor="zipcode">zipcode:</label>
      <input
        type="number"
        value={eventForm.zipcode}
        onChange={(e) => setEventForm({ ...eventForm, zipcode: e.target.value })}
        id="zipcode"
      />

      <label htmlFor="date">date:</label>
      <input
        type="text"
        value={eventForm.date}
        onChange={(e) =>
          setEventForm({ ...eventForm, 'date of event': e.target.value })
        }
        id="date"
      />

      <label htmlFor="description">description:</label>
      <input
        type="textarea"
        value={eventForm.description}
        onChange={(e) =>
          setEventForm({ ...eventForm, description: e.target.value })
        }
        id="description"
      />

      <label htmlFor="category">category:</label>
      <select
        value={eventForm.category}
        onChange={(e) =>
          setEventForm({ ...eventForm, category: e.target.value })
        }
        id="category"
      >
        <option value='party'>party</option>
        <option value='concert'>concert</option>
        <option value='boardgames'>board games</option>
        <option value='comedy'>comedy</option>
        <option value='study'>study</option>
        <option value='other'>other</option>
      </select>
      <button className="myButton" type="submit">submit</button>
    </Form>
  )
}
