import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Sidebar = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="sidebar">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/djlggbdls/image/upload/v1771922028/music_h4l9qd.png"
          alt="spotify-logo"
          className="spotify-logo"
        />
      </Link>
      <button className="logout-button" onClick={logout} type="button">
        <img
          src="https://res.cloudinary.com/djlggbdls/image/upload/v1771903096/Frame_105_rldaq8.svg"
          alt="logout-btn"
          className="logout-logo"
          type="button"
        />
      </button>
    </div>
  )
}

export default withRouter(Sidebar)
