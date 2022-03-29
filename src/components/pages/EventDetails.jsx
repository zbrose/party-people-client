import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Tab, Tabs } from "react-bootstrap";
import Map from "./Map";
import EditEvent from "../EditEvent";
import HypeMeter from "./HypeMeter";

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

  const handleSubmit = async e => {
      e.preventDefault()
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/events/${id}`, eventForm)
      setShowForm(!showForm)
      refreshEvent()
    }
    
    console.log(eventForm)
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
        (showForm ? <EditEvent event={details} setShowForm={setShowForm} showForm={showForm} eventForm={eventForm} setEventForm={setEventForm} handleSubmit={handleSubmit}/> : 
            (
            <>
                <img
                    src="http://placekitten.com/1300/400"
                    alt={`${details.title}-image`}
                />

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

                <HypeMeter details={details}/>
                {currentUser.id === details.host._id ? <button onClick={() => {setShowForm(!showForm)}}>Edit Event</button> : null}
            </>
        )) : null}
    </>
  );
}
