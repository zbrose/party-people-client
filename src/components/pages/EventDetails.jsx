import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from "axios"

export default function EventDetails({ event }) {
    const { id } = useParams()
    const [details, setDetails]= useState([])

    useEffect(() => { 
        async function fetchData(){
            const eventDetails = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/events/${id}`)
            setDetails(eventDetails.data)
    }
    fetchData()
  }, [])

    return(
        <>
            <div>
                <h1>{details.title}</h1>
                <h2>Host: {details.host}</h2>
            </div>
        </>
    )

}