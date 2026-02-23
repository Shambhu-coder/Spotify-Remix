import {Component} from 'react'
import Cookies from 'js-cookie'
import {
  MainDiv,
  Form,
  ImgEl,
  SpotifyRemix,
  FormEl,
  LabelEl,
  InputEl,
  LoginBtn,
  ErrorMsg,
} from './styledComponents'

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
      <MainDiv>
        <Form onSubmit={this.onSubmitForm}>
          <ImgEl src="https://res.cloudinary.com/djlggbdls/image/upload/v1771830629/Vector_1_dxz43f.jpg" />
          <SpotifyRemix>Spotify Remix</SpotifyRemix>
          <FormEl>
            <LabelEl htmlFor="username">USERNAME</LabelEl>
            <InputEl
              type="text"
              id="username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </FormEl>
          <FormEl>
            <LabelEl htmlFor="password">PASSWORD</LabelEl>
            <InputEl
              type="password"
              id="password"
              value={password}
              onChange={this.onChangePassword}
            />
          </FormEl>
          <LoginBtn>LOGIN</LoginBtn>
          {showSubmitError && <ErrorMsg>{errorMessage}</ErrorMsg>}
        </Form>
      </MainDiv>
    )
  }
}

export default Login
