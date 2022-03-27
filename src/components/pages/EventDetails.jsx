import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from "axios"
import { Tab, Tabs } from 'react-bootstrap';

export default function EventDetails({ event }) {
    const { id } = useParams()
    const [details, setDetails]= useState([])
    const [attendeeCount, setAttendeeCount] = useState()
    const [host,setHost]= useState()

    useEffect(() => { 
        async function fetchData(){
            const eventDetails = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/events/${id}`)
            setDetails(eventDetails.data)
            setHost(eventDetails.data.host.name)

            
            
    }
    fetchData()
  }, [])



    return(
        <>
            <div className="left" id="details">
                <h1>{details.title}</h1>
                <h2>Host: {host} </h2>
                <h3>{details.category}</h3>
                <p>{details.date}</p>
                <p>{details.address}</p>
                <p>{details.city}, {details.state} {details.zipcode}</p>
            </div>

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