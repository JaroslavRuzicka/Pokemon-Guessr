import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../Context/useAuth'

type Props = {children: React.ReactNode }

function ProtectedRoute({children}: Props) 
{
    const location = useLocation() 
    const {isLoggedIn} = useAuth()
    
    return ((isLoggedIn()) ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" state={{ from: location}} replace />
    ))
}

export default ProtectedRoute