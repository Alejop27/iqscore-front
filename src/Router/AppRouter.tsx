import { createBrowserRouter } from 'react-router-dom'
import Home from '../views/Home'
import Team from '../views/Team'
import League from '../views/League'
import Leagues from '../views/Leagues'
import Teams from '../views/Teams'
import Game from '../views/Game'
import Player from '../views/Player'
import AboutUs from '../views/About'
import Registro from '../views/Registro'
import Iniciar from '../views/Login'
import Account from '../views/Account'
import ResetPassword from '../views/ResetPassword'
import NotFound from '../views/404'
import Favorites from '../views/Favorites'
import PaymentGateway from '../components/common/Account/PaymentGateway'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/team/:teamId',
        element: <Team />
    },
    {
        path: '/league/:idLiga',
        element: <League />
    },
    {
        path: '/leagues',
        element: <Leagues />
    },
    {
        path: '/teams',
        element: <Teams />
    },
    {
        path: '/game',
        element: <Game />
    },
    {
        path: '/player/:playerId',
        element: <Player />
    },
    {
        path: '/AboutUs',
        element: <AboutUs />
    },
    {
        path: '/Iniciar',
        element: <Iniciar />
    },

    {
        path: '/Registro',
        element: <Registro />
    },
    {
        path: '/Reestablecer',
        element: <ResetPassword />
    },
    {
        path: '/cuenta',
        element: <Account />
    },
    {
        path: '*',
        element: <NotFound />
    },
    {
        path: '/favoritos',
        element: <Favorites />
    },
    {
        path: '/pagar',
        element: <PaymentGateway />
    }


])
