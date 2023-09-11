import { Outlet } from "react-router-dom";
import "./App.scss";

function App() {
    return (
        <>
            <header>
                <h1>시계열 차트</h1>
            </header>
            <Outlet />
        </>
    );
}

export default App;
