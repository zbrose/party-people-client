import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Tab, Tabs } from "react-bootstrap";
import Map from "./Map";
import EditEvent from "../EditEvent";
import HypeMeter from "./HypeMeter";
import EditImage from "../EditImage";
import { Navigate, Link } from 'react-router-dom'

const dayjs = require("dayjs");

export default function EventDetails({ currentUser }) {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [date, setDate] = useState();
  const [attendeesId, setAttendeesId] = useState([]);
  const [host, setHost] = useState();
  const [showMap, setShowMap] = useState(false);
  const [showForm, setShowForm] = useState(false)
  const [eventForm, setEventForm] = useState()
  const [showImgForm, setShowImgForm] = useState(false)
  const [formImg, setFormImg] = useState()

  const handleSubmit = async e => {
      e.preventDefault()
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/events/${id}`, eventForm)
      setShowForm(!showForm)
      refreshEvent()
    }

  function showTheMap() {
    setShowMap(!showMap);
  }


  const handleClick = async () => {
    if (attendeesListId.includes(currentUser.id)) {
        await axios.put(
            `${process.env.REACT_APP_SERVER_URL}/api-v1/events/${id}/${currentUser.id}/unattend`
        );
        refreshEvent()
    } else {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/events/${id}/${currentUser.id}/attend`
      );
      refreshEvent()
    }
  };

  const editEventImg = async(e) => {
    e.preventDefault()
    try {
        const fd = new FormData()
        fd.append("image", formImg)
        const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/events/${id}/upload`,
        fd
        )
        refreshEvent()
    } catch (err) {
        console.log(err)
    }
  }

  const refreshEvent = async () => {
    const eventDetails = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/events/${id}`
        );
        setDetails(eventDetails.data);
        setEventForm(eventDetails.data)
        setDate(dayjs(eventDetails.data.date).format("dddd MMMM D YYYY"));
        setHost(eventDetails.data.host.name);
    }
   
    let attendeesList = null
    let attendeesListId = []

    {details.attendees ? (attendeesList = details.attendees.map((attendee, i) => {
        return(
            <p>{attendee.name}</p>
        )
    })) : <h3>There are no attendees</h3>}

    {details.attendees ? (details.attendees.map((attendee, i) => {
        return(
            attendeesListId.push(attendee._id)
        )
    })) : <h3>There are no attendees</h3>}

    const deleteEvent = async () => {
        await axios.delete(
            `${process.env.REACT_APP_SERVER_URL}/api-v1/events/${id}`
        )
    }

  useEffect(refreshEvent, []);

  return (
    <>
      {currentUser && details.host? 
        (showForm ? <EditEvent event={details} setShowForm={setShowForm} showForm={showForm} eventForm={eventForm} setEventForm={setEventForm} handleSubmit={handleSubmit}/> : showImgForm ? <EditImage handleSubmit={editEventImg} setFormImg={setFormImg} event={details} setShowImgForm={setShowImgForm} showImgForm={showImgForm}/> :
            (
            <>
                <img
                    src={details.image ? details.image : "http://via.placeholder.com/1300x400"}
                    alt={`${details.title}`}
                />
                <button onClick={() => {setShowImgForm(!showImgForm)}}>Edit Image</button>

                <div id="eventHeader">
                    <h1>{details.title}</h1>
                    <button onClick={currentUser ? handleClick : <Navigate to='/login'/>}>
                    {attendeesListId.includes(currentUser.id) ? "Unattend" : "Attend"}
                    </button>
                </div>

                <div id="details">
                    <h2>Host: {host} </h2>
                    <h3>{details.category}</h3>
                    <p>{date}</p>
                    <p>{details.time} </p>
                    <p>{details.address}</p>
                    <p>
                    {details.city}, {details.state} {details.zipcode}
                    </p>
                </div>
                
                <Tabs defaultActiveKey="description" id="tabs" className="right">
                    <Tab eventKey="description" title="Description">
                    {details.description}
                    </Tab>

                    <Tab eventKey="attendees" title={`Attendees`}>
                        {attendeesList}
                    </Tab>
                </Tabs>

                <button onClick={showTheMap}>Show me the Map</button>
                    {showMap ? <Map details={details} showForm={showForm} /> : ""}

                {currentUser.id === details.host._id ?
                <> 
                    <button onClick={() => {setShowForm(!showForm)}}>Edit Event</button> <button onClick={deleteEvent}><Link to='/'>Delete Event</Link></button>
                </> : null}
                <HypeMeter details={details}/>
            </>
        )
        ) : null}
    </>
  );
}

