import { router } from './Router/AppRouter'  
import { RouterProvider } from 'react-router-dom'  
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
