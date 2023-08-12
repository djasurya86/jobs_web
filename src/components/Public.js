import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const Public = ({ children }) => {
    const cookies = new Cookies();
    if(cookies.get('user') !== undefined) {
        return <Navigate to="/job" replace />;
    }
    return children;
};

export default Public;