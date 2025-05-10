import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'


// Importación dinámica de los componentes
const Home = React.lazy(() => import('../views/Home'))
const Team = React.lazy(() => import('../views/Team'))
const League = React.lazy(() => import('../views/League'))
const Leagues = React.lazy(() => import('../views/Leagues'))
const Teams = React.lazy(() => import('../views/Teams'))
const Game = React.lazy(() => import('../views/Game'))
const Player = React.lazy(() => import('../views/Player'))
const AboutUs = React.lazy(() => import('../views/About'))
const Registro = React.lazy(() => import('../views/Registro'))
const Iniciar = React.lazy(() => import('../views/Login'))
const Account = React.lazy(() => import('../views/Account'))
const ResetPassword = React.lazy(() => import('../views/ResetPassword'))
const NotFound = React.lazy(() => import('../views/404'))
const Cuotas = React.lazy(() => import('../views/Cuotas'))
const PaymentGateway = React.lazy(() => import('../components/common/Account/PaymentGateway'))

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
        path: '/cuotas',
        element: (
            <ProtectedRoute>
                <Cuotas />
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
