import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import PlaylistDetails from './components/PlaylistDetails'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/playlists-details/:playlistId"
      component={PlaylistDetails}
    />
  </Switch>
)

export default App
