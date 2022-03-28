import axios from "axios"
import { useState } from "react"

export default function UploadImg({currentUser}) {
  const [formImg, setFormImg] = useState("")
  const [msg, setMsg] = useState("")
  const [displayImg, setDisplayImg] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      //multipartform data object
      const fd = new FormData()
      //append the data
      fd.append("image", formImg)
      //fd.append('title', sometitle)
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/${currentUser.id}/upload`,
        fd
      )
      console.log("RESPONSE", response)
      console.log("SPONSE DATA", response.data)
      setDisplayImg(response.data.cloudImage)
    } catch (err) {
      console.log(err)
      setMsg("go cchk the server console, tere was error")
    }
  }

  return (
    <>
      <h4>upload a pic!</h4>
      {displayImg && <img src={displayImg} alt="aliens guy" />}

      <form onSubmit={handleSubmit} encType="multipart/form">
        <label htmlFor="image">upload an image</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setFormImg(e.target.files[0])}
        />
        <input type="submit" />
      </form>
    </>
  )
}
