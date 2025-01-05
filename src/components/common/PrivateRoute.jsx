import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { checkAuth } from '../../features/auth/authSlice';

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());

  }, [dispatch]);
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;