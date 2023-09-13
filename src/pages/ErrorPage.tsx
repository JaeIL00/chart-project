import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate("/");
    };

    return (
        <div>
            <h1 className="error-title">Error Page</h1>
            <button onClick={navigateHome}>홈으로 이동</button>
        </div>
    );
};

export default ErrorPage;
