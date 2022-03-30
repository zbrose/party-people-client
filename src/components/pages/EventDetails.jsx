import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Tab, Tabs } from "react-bootstrap";
import Map from "./Map";
import EditEvent from "../EditEvent";
import HypeMeter from "./HypeMeter";
import EditImage from "../EditImage";
import { Navigate } from 'react-router-dom'

const dayjs = require("dayjs");

export default function EventDetails({ currentUser }) {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [date, setDate] = useState();
  const [attendees, setAttendees] = useState([]);
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
    if (attendeesId.includes(currentUser.id)) {
        await axios.put(
            `${process.env.REACT_APP_SERVER_URL}/api-v1/events/${id}/${currentUser.id}/unattend`
        );
        setAttendees(
        attendees.filter((attendee) => {
          return attendee !== currentUser.name;
        })
        );
        setAttendeesId(
            attendeesId.filter(attendee => {
                return attendee !== currentUser.id
            })
        )
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
      eventDetails.data.attendees.forEach((attendee) => {
        setAttendees([...attendees, attendee.name]);
        setAttendeesId([...attendeesId, attendee._id]);
      });
  }

  useEffect(refreshEvent, []);

  return (
    <>
      {currentUser && details.host ? 
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
                    <button onClick={handleClick}>
                    {attendeesId.includes(currentUser.id) ? "Unattend" : "Attend"}
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
                    {attendees}
                    </Tab>
                </Tabs>

                <button onClick={showTheMap}>Show me the Map</button>
                    {showMap ? <Map details={details} showForm={showForm} /> : ""}

                {currentUser.id === details.host._id ? <button onClick={() => {setShowForm(!showForm)}}>Edit Event</button> : null}
                <HypeMeter details={details}/>
            </>
        )
        ) : <Navigate to='/login' />}
    </>
  );
}

