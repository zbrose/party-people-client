import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from "axios"
import { Tab, Tabs } from 'react-bootstrap';
const dayjs = require('dayjs')

export default function EventDetails({ event }) {
    const { id } = useParams()
    const [details, setDetails]= useState([])
    const [date, setDate] = useState('')



    useEffect(() => { 
        async function fetchData(){
            const eventDetails = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/events/${id}`)
            setDetails(eventDetails.data)
            setDate(dayjs(eventDetails.data.date).format('dddd MMMM D YYYY'))
    }
    fetchData()
  }, [])

  

    return(
        <>
            <img></img>
            <div id="details">
                <h1>{details.title}</h1>
                <h2>Host:</h2>
                <h3>{details.category}</h3>
                <p>{date}</p>
                <p>{details.address}</p>
                <p>{details.city}, {details.state} {details.zipcode}</p>
            </div>

            <button>Attend</button>

            <Tabs defaultActiveKey="Description" id="tabs" className="right">
                <Tab eventKey="description" title="Description">
                    {details.description}
                </Tab>

                <Tab eventKey="attendees" title={`Attendees`}>
                    {details.attendees}
                </Tab>
            </Tabs>

        </>
    )

}