import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const Protected = ({ children }) => {
    const cookies = new Cookies();
    if(cookies.get('user') === undefined) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default Protected;