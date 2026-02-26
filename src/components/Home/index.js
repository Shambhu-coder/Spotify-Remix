import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Sidebar from '../Sidebar'
import './index.css'

const apiRequest = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    playlists: [],
    playlistsLoading: apiRequest.initial,
    newReleases: [],
    newReleasesLoading: apiRequest.initial,
    categories: [],
    categoriesLoading: apiRequest.initial,
  }

  componentDidMount() {
    this.getPlaylists()
    this.getNewReleases()
    this.getCategories()
  }

  getPlaylists = async () => {
    this.setState({playlistsLoading: apiRequest.loading})
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const url = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const musicLists = data.playlists.items.map(each => ({
        name: each.name,
        id: each.id,
        images: each.images.map(eachImage => ({
          height: eachImage.height,
          url: eachImage.url,
          width: eachImage.width,
        })),
      }))
      this.setState({
        playlists: musicLists,
        playlistsLoading: apiRequest.success,
      })
    } else {
      this.setState({playlistsLoading: apiRequest.failure})
    }
  }

  getCategories = async () => {
    this.setState({categoriesLoading: apiRequest.loading})
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const url = 'https://apis2.ccbp.in/spotify-clone/categories'
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const categoriesList = data.categories.items.map(each => ({
        name: each.name,
        id: each.id,
        icons: each.icons.map(eachIcon => ({
          url: eachIcon.url,
          height: eachIcon.height,
          width: eachIcon.width,
        })),
      }))
      this.setState({
        categories: categoriesList,
        categoriesLoading: apiRequest.success,
      })
    } else {
      this.setState({categoriesLoading: apiRequest.failure})
    }
  }

  getNewReleases = async () => {
    this.setState({newReleasesLoading: apiRequest.loading})
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const url = 'https://apis2.ccbp.in/spotify-clone/new-releases'
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const newReleased = data.albums.items.map(each => ({
        name: each.name,
        id: each.id,
        images: each.images.map(eachImage => ({
          url: eachImage.url,
          width: eachImage.width,
          height: eachImage.height,
        })),
      }))
      this.setState({
        newReleases: newReleased,
        newReleasesLoading: apiRequest.success,
      })
    } else {
      this.setState({newReleasesLoading: apiRequest.failure})
    }
  }

  loadingView = () => (
    <div className="loading-view">
      <img
        src="https://res.cloudinary.com/djlggbdls/image/upload/v1771830629/Vector_1_dxz43f.jpg"
        alt="loading"
        className="loading-img"
      />
      <h1 className="loading-text">Loading...</h1>
    </div>
  )

  failureView = () => (
    <div className="failure-view">
      <img
        className="failure-img"
        src="https://res.cloudinary.com/djlggbdls/image/upload/v1771912846/alert-triangle_nvbiq9.png"
        alt="failure"
      />
      <p className="failure-text">Something went wrong. Please try again.</p>
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  playlistsSuccess = () => {
    const {playlists} = this.state
    return (
      <div className="result-view">
        {playlists.map(eachPlaylist => (
          <Link
            to={`/playlists-details/${eachPlaylist.id}`}
            key={eachPlaylist.id}
            className="link-item"
          >
            <div className="playlist-item">
              <img
                className="playlist-img"
                src={eachPlaylist.images[0].url}
                alt={eachPlaylist.name}
              />
              <p className="playlist-name">{eachPlaylist.name}</p>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  categoriesSuccess = () => {
    const {categories} = this.state
    return (
      <div className="categories-div">
        {categories.map(eachCategory => (
          <div className="categories-item" key={eachCategory.name}>
            <p className="category-name">{eachCategory.name}</p>
            <img
              className="category-img"
              src={eachCategory.icons[0].url}
              alt={eachCategory.name}
            />
          </div>
        ))}
      </div>
    )
  }

  newReleasesSuccess = () => {
    const {newReleases} = this.state
    return (
      <div className="result-view">
        {newReleases.map(eachRelease => (
          <div className="playlist-item" key={eachRelease.name}>
            <img
              className="playlist-img"
              src={eachRelease.images[0].url}
              alt={eachRelease.name}
            />
            <p className="playlist-name">{eachRelease.name}</p>
          </div>
        ))}
      </div>
    )
  }

  appendPlaylists = () => {
    const {playlistsLoading} = this.state

    switch (playlistsLoading) {
      case apiRequest.success:
        return this.playlistsSuccess()

      case apiRequest.loading:
        return this.loadingView()

      case apiRequest.failure:
        return this.failureView()

      default:
        return null
    }
  }

  appendCategories = () => {
    const {newReleasesLoading} = this.state

    switch (newReleasesLoading) {
      case apiRequest.success:
        return this.categoriesSuccess()

      case apiRequest.loading:
        return this.loadingView()

      case apiRequest.failure:
        return this.failureView()

      default:
        return null
    }
  }

  appendNewReleases = () => {
    const {categoriesLoading} = this.state

    switch (categoriesLoading) {
      case apiRequest.success:
        return this.newReleasesSuccess()

      case apiRequest.loading:
        return this.loadingView()

      case apiRequest.failure:
        return this.failureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="home">
        <Sidebar />
        <div className="home-content">
          <h1 className="heading-text">Editors Picks</h1>
          {this.appendPlaylists()}
          <h1 className="heading-text">Genres and Moods</h1>
          {this.appendCategories()}
          <h1 className="heading-text">New Releases</h1>
          {this.appendNewReleases()}
        </div>
      </div>
    )
  }
}

export default Home
