import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
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
    // Rutas públicas
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
        path: '*',
        element: <NotFound />
    },

    // Rutas protegidas
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: '/team/:teamId',
        element: (
            <ProtectedRoute>
                <Team />
            </ProtectedRoute>
        )
    },
    {
        path: '/league/:idLiga',
        element: (
            <ProtectedRoute>
                <League />
            </ProtectedRoute>
        )
    },
    {
        path: '/leagues',
        element: (
            <ProtectedRoute>
                <Leagues />
            </ProtectedRoute>
        )
    },
    {
        path: '/teams',
        element: (
            <ProtectedRoute>
                <Teams />
            </ProtectedRoute>
        )
    },
    {
        path: '/game',
        element: (
            <ProtectedRoute>
                <Game />
            </ProtectedRoute>
        )
    },
    {
        path: '/player/:playerId',
        element: (
            <ProtectedRoute>
                <Player />
            </ProtectedRoute>
        )
    },
    {
        path: '/AboutUs',
        element: (
            <ProtectedRoute>
                <AboutUs />
            </ProtectedRoute>
        )
    },
    {
        path: '/cuenta',
        element: (
            <ProtectedRoute>
                <Account />
            </ProtectedRoute>
        )
    },
    {
        path: '/favoritos',
        element: (
            <ProtectedRoute>
                <Favorites />
            </ProtectedRoute>
        )
    },
    {
        path: '/pagar',
        element: (
            <ProtectedRoute>
                <PaymentGateway />
            </ProtectedRoute>
        )
    }
])
