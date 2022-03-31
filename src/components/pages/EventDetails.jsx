import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Tab, Tabs } from "react-bootstrap";
import Map from "./Map";
import EditEvent from "../EditEvent";
import HypeMeter from "./HypeMeter";
import EditImage from "../EditImage";
import { Navigate, useNavigate } from 'react-router-dom'
import "../../App.css"

const dayjs = require("dayjs");
const utc = require('dayjs/plugin/utc')
const timezone = require("dayjs/plugin/timezone")
dayjs.extend(utc)
dayjs.extend(timezone)

export default function EventDetails({ currentUser, fetchData }) {
    let navigate = useNavigate()
    const { id } = useParams();
    const [details, setDetails] = useState([]);
    const [date, setDate] = useState();
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
            setDate(dayjs.tz(eventDetails.data.date, "America/New_York").format("dddd MMMM D YYYY"));
            setHost(eventDetails.data.host.name);
        }
    
        let attendeesList = null
        let attendeesListId = []
        

        {details.attendees ? (attendeesList = details.attendees.map((attendee, i) => {
            return(
                console.log(attendee.image),
                <p className="white" id={`attendee-${i}`}><img id={`profileImg-${i}`} className="attendeePic" src={attendee.image} />{attendee.name}</p>
            )
        })) : <h3>There are no attendees</h3>}

        {details.attendees ? (details.attendees.map((attendee) => {
            return(
                attendeesListId.push(attendee._id)
            )
        })) : <h3>There are no attendees</h3>}

        const deleteEvent = async () => {
            await axios.delete(
                `${process.env.REACT_APP_SERVER_URL}/api-v1/events/${id}`
            )
            fetchData()
            navigate('/')
        }

    useEffect(refreshEvent, []);

    return (
        <>
        {currentUser && details.host? 
            (showForm ? <EditEvent event={details} setShowForm={setShowForm} showForm={showForm} eventForm={eventForm} setEventForm={setEventForm} handleSubmit={handleSubmit}/> : showImgForm ? <EditImage handleSubmit={editEventImg} setFormImg={setFormImg} event={details} setShowImgForm={setShowImgForm} showImgForm={showImgForm}/> :
                (
                <div id="eventDetails">
                    <div id="content">
                        <div id="left">
                            <div id="eventImage">
                                <img
                                    src={details.image ? details.image : "http://via.placeholder.com/1300x400"}
                                    alt={`${details.title}`}
                                    id="image"
                                />
                                <button id="editImgBtn" onClick={() => {setShowImgForm(!showImgForm)}}>Edit Image</button>
                            </div>

                            <div id="tabs">
                                <Tabs defaultActiveKey="description" id="tabs" className="mb-3 flex-tab">
                                    <Tab eventKey="description" title="Description" className="flex-box tab-style detailsTab">
                                        <p className="white">Hosted By: {host} </p>
                                        <p className="white">Type: {details.category}</p>
                                        <p className="white">Description: {details.description}</p>
                                    </Tab>

                                    <Tab eventKey="attendees" title={`Attendees`} className="flex-box tab-style detailsTab">
                                        {attendeesList}
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>

                        <div id="right">
                            <div id="detailsHype">
                                <div id="details">
                                    <h1 className="white BebasNeue">{details.title}</h1>
                                    <h4 className="white BebasNeue">
                                    <h3 className="white BebasNeue">{date}</h3>
                                    Starts At: {details.time} 
                                    </h4>
                                    <h3 className="white BebasNeue">{details.address}</h3>
                                    <h3 className="white BebasNeue">
                                    {details.city}, {details.state} {details.zipcode}
                                    </h3>
                                    <h2>
                                    <button id={attendeesListId.includes(currentUser.id) ? "unAttendBtn" : "attendBtn"} className="BebasNeue" onClick={currentUser ? handleClick : <Navigate to='/login'/>}>
                                    {attendeesListId.includes(currentUser.id) ? "Unattend" : "Attend"}
                                    </button>
                                    </h2>
                                </div>

                                <div id="hypeMeter">
                                    <HypeMeter details={details}/>
                                </div>
                            </div>

                            <div id="map">
                               <Map details={details} showForm={showForm} />
                            </div>

                            <div id="editEvent">
                                {currentUser.id === details.host._id ?
                                <> 
                                    <button className="BebasNeue" id="editBtn" onClick={() => {setShowForm(!showForm)}}>Edit Event</button> <button className="BebasNeue" onClick={deleteEvent}>Delete Event</button>
                                </> : null}
                            </div>
                        </div>
                    </div>
                </div>
            )
            ) : null }
        </>
    );
}

