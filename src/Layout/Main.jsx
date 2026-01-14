import { Outlet } from "react-router-dom";
import Navbar from "../Components/Share/Navbar";


const Main = () => {
    return (
        <div>
            <section>
                <Navbar></Navbar>
            </section>
            <section className="bg-blue-50">
                <Outlet></Outlet>
            </section>
        </div>
    );
};

export default Main;