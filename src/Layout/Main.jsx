import { Outlet } from "react-router-dom";


const Main = () => {
    return (
        <div>
            <section>
                <h2 className="text-3xl font-bold underline">This is Main Section</h2>
            </section>
            <section className="bg-blue-50 h-screen">
                <Outlet></Outlet>
            </section>
        </div>
    );
};

export default Main;