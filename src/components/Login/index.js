import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMessage: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    console.log(jwtToken)
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
    this.setState({showSubmitError: false, errorMessage: ''})
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMessage: errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const url = 'https://apis.ccbp.in/login'

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    console.log(response)

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMessage} = this.state

    return (
      <div className="login">
        <form className="form" onSubmit={this.onSubmitForm}>
          <img
            className="logo"
            alt="logo"
            src="https://res.cloudinary.com/djlggbdls/image/upload/v1771830629/Vector_1_dxz43f.jpg"
          />
          <h1 className="spotify-heading">Spotify Remix</h1>
          <div className="formEl">
            <label className="labelEl" htmlFor="username">
              USERNAME
            </label>
            <input
              className="inputEl"
              type="text"
              id="username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="formEl">
            <label className="labelEl" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="inputEl"
              type="password"
              id="password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button className="loginBtn" type="submit">
            LOGIN
          </button>
          {showSubmitError && <p className="errorMsg">{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default Login
