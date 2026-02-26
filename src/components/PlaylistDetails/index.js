import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const apiRequest = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class PlaylistDetails extends Component {
  state = {playlistDetails: '', responseState: apiRequest.initial}

  componentDidMount() {
    this.getPlaylistdetails()
  }

  getPlaylistdetails = async () => {
    this.setState({responseState: apiRequest.loading})
    const {match} = this.props
    const {params} = match
    const {playlistId} = params
    console.log(playlistId)

    const {jwtToken} = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${playlistId}`
    const response = await fetch(url, options)
    if (response.ok) {
      this.setState({responseState: apiRequest.success})
      const data = await response.json()
      console.log(data)
    } else {
      this.setState({responseState: apiRequest.failure})
    }
  }

  render() {
    return (
      <div>
        <h1>Hiii</h1>
      </div>
    )
  }
}

export default PlaylistDetails
