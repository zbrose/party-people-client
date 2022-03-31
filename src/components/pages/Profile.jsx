import { useState, useEffect } from "react"
import axios from "axios"
import CreateEvent from "../CreateEvent"
import { Card, Button } from "react-bootstrap"
import UploadImg from "../UploadImg"
import Events from "../Events"
import ProfileEvents from "../ProfileEvents"

export default function Profile({
  currentUser,
  // filter,
  // setFilter,
  events,
  // setEvents,
  // handleUploadImg,
}) {
  // const [formData, setFormData] = useState({})
  const [displayImg, setDisplayImg] = useState("")
  const [formImg, setFormImg] = useState("")
  const [userInfo, setUserInfo] = useState("")
  const [imgForm, setImgForm] = useState(false)
  // const [showForm, setShowForm] = useState

  console.log("payload", currentUser)
  // use useEffect to get data from the back
  useEffect(() => {
    ;(async () => {
      try {
        // get token for local storage
        const token = localStorage.getItem("jwt")
        console.log("token", token)
        // make the auth headers
        const options = {
          headers: {
            Authorization: token,
          },
        }
        // hit the auth locked endpoint
        // axios.get(url, options)
        // axios.post(url, body, options) (same thing w put)
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`,
          options
        )
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  

  const getUserData = async () => {
    const userData = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api-v1/users/${currentUser.id}`
    )
    setUserInfo(userData.data)
    // setDisplayImg(userInfo)
    setDisplayImg(userData.data.image)
    if (!userData.data.image){

      setImgForm(true)
    }
  }

  //get user info
  useEffect(getUserData, [])


  const handleImgSubmit = async (e) => {
    e.preventDefault()
    try {
      const fd = new FormData()
      fd.append("image", formImg)
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/${currentUser.id}/upload`,
        fd
      )
      console.log("IMAGE DATA", response.data)
      setDisplayImg(response.data.cloudImage)
      getUserData()
      setImgForm(false)
    } catch (err) {
      console.log(err)
      
    }
  }

const handleImgError= ()=> {
  console.log("herro")
// e.target.src = "https://cdn.pixabay.com/photo/2021/01/14/14/09/cat-5916926_1280.jpg"
setImgForm(true)
  }
  // console.log(!displayImg)
  console.log("currentimgformmmm",imgForm)

  return (
    <>
      <div className="flex-box mb-5">
        <Card
          className="box noBack"
          style={{ width: "25rem", margin: "0 auto", border: "none", color:"white" }}
        >
          {!displayImg ? (
            <Card.Img
              className="img-fluid"
              variant="top"
              src={
                "https://cdn.pixabay.com/photo/2021/01/14/14/09/cat-5916926_1280.jpg"
              }
              // src={displayImg}

              onError={handleImgError}
              alt="uploaded user profile"
            />
          ) : (
            <Card.Img
              className="img-fluid mt-5"
              variant="top"
              // src={
              //   displayImg ||
              //   "https://cdn.pixabay.com/photo/2021/01/14/14/09/cat-5916926_1280.jpg"
              // }
              src={displayImg}
              // onError={ e=> handleImgError}
              alt="uploaded user profile"
            />
          )}

          {/* {displayImg && <img src={displayImg} alt="uploaded user profile" />} */}
          <h3 className="card-title mt-3"> {currentUser.name}'s Profile</h3>

          {imgForm ? (
            <UploadImg
              currentUser={currentUser}
              handleImgSubmit={handleImgSubmit}
              formImg={formImg}
              setFormImg={setFormImg}
            />
          ) : (
            <Button
              variant="outline-light"
              style={{ color: "rgb(255,64,132)" }}
              size="sm"
              onClick={() => setImgForm(true)}
            >
              {imgForm ? "add pic" : "change pic"}
            </Button>
          )}
        </Card>
      </div>

      <ProfileEvents
        events={events}
        userInfo={userInfo}
        imgForm={imgForm}
        setImgForm={setImgForm}
      />
    </>
  )
}


