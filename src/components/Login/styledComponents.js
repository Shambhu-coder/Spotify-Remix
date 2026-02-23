import styled from 'styled-components'

export const MainDiv = styled.div`
  margin: 0;
  padding: 0;
  background-image: url('https://res.cloudinary.com/djlggbdls/image/upload/v1771829659/bg4_r64rjw.jpg');
  height: 100vh;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Form = styled.form`
  background-color: #181818;
  height: 350px;
  width: 400px;
  border-radius: 10px;
  padding: 40px;
  border: 2px solid green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ImgEl = styled.img`
  height: 50px;
  width: 150px;
`

export const SpotifyRemix = styled.h1`
  color: #fff;
  font-size: 18px;
  margin-bottom: 24px;
`

export const FormEl = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin-bottom: 8px;
  width: 100%;
`

export const LabelEl = styled.label`
  color: #fff;
  font-size: 12px;
  margin-bottom: 5px;
`

export const InputEl = styled.input`
  background-color: #fff;
  border-radius: 3px;
  border: none;
  padding: 8px;
  height: 30px;
  width: 100%;
`

export const LoginBtn = styled.button`
  background-color: #1db954;
  padding: 8px;
  border-radius: 5px;
  font-size: 12px;
  width: 100%;
  color: #fff;
  margin-top: 10px;
  border: none;
`

export const ErrorMsg = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
`
