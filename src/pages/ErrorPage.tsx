import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate("/");
    };

    return (
        <div>
            <span>잘못된 경로입니다</span>
            <button onClick={navigateHome}>홈으로 이동</button>
        </div>
    );
};

export default ErrorPage;
