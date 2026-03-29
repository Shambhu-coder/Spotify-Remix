import {Component} from 'react'
import Cookies from 'js-cookie'
import Sidebar from '../Sidebar'
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
      const data = await response.json()
      const modifiedData = {
        name: data.name,
        images: {
          url: data.images[0].url,
        },
        tracks: {
          href: data.tracks.href,
          items: data.tracks.items.map(each => ({
            addedAt: each.added_at,
            artists: each.track.artists.map(eachArtist => ({
              externalUrls: eachArtist.external_urls.spotify,
              href: eachArtist.href,
              id: eachArtist.id,
              name: eachArtist.name,
              type: eachArtist.type,
              uri: eachArtist.uri,
            })),
          })),
        },
      }
      this.setState({
        responseState: apiRequest.failure,
        playlistDetails: modifiedData,
      })
      const {playlistDetails} = this.state
      console.log(playlistDetails)
    } else {
      this.setState({responseState: apiRequest.failure})
    }
  }

  appendPlaylistsDetails = () => {
    const {responseState} = this.state

    switch (responseState) {
      case apiRequest.success:
        return this.loadingView()
      case apiRequest.loading:
        return this.loadingView()
      case apiRequest.failure:
        return this.failureView()
      default:
        return null
    }
  }

  loadingView = () => (
    <div className="loading-container">
      <img
        src="https://res.cloudinary.com/djlggbdls/image/upload/v1771830629/Vector_1_dxz43f.jpg"
        alt="loading"
        className="loading-img"
      />
      <h1 className="loading-heading">Loading...</h1>
    </div>
  )

  failureView = () => {
    const tryAgain = () => this.getPlaylistdetails()

    return (
      <div className="main-div">
        <Sidebar />
        <div className="failureView">
          <img
            className="failureImg"
            src="https://res.cloudinary.com/djlggbdls/image/upload/v1771912846/alert-triangle_nvbiq9.png"
            alt="failure"
          />
          <p className="failureText">Something went wrong. Please try again.</p>
          <button type="button" className="retryBtn" onClick={tryAgain}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  render() {
    return <>{this.appendPlaylistsDetails()}</>
  }
}

export default PlaylistDetails
