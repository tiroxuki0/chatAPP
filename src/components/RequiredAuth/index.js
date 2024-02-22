import { useLocation, Navigate } from "react-router-dom"
import jwtDefaultConfig from "../../@core/auth/jwt/jwtDefaultConfig"

const RequiredAuth = ({ children }) => {
  const location = useLocation()
  const login = localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)

  if (!login) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />
  }
  return children
}

export default RequiredAuth
