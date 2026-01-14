import { useEffect, useState } from "react";
import SaleModal from "../../Components/SaleModal";
import FoodCard from "../../Components/FoodCard";
import usePublicAxios from "../../Hook/usePublicAxios";
import Loading from "../../Components/Share/Loading";
import CostModal from "../../Components/Home/CostModal";
import PlaceModal from "../../Components/Home/PlaceModal";


const Home = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFood, setSelectedFood] = useState(null);
    const [openCostModal, setOpenCostModal] = useState(false);
    const [openPlaceModal, setOpenPlaceModal] = useState(false);

    const axios = usePublicAxios();

    useEffect(() => {
        axios.get("items")
            .then(res => {
                setFoods(res.data);
                setLoading(false);
            });
    }, [axios]);

    const refreshData = () => {
        // refetch costs / summary
    };

    if (loading) {
        return (
            <Loading></Loading>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <button
                        className="btn btn-warning text-white btn-xs text-xs md:btn-sm"
                        onClick={() => setOpenPlaceModal(true)}
                    >
                        Add Place
                    </button>
                </div>

                <h1 className="text-base md:text-2xl font-bold  text-center">
                    🍽️ Food Fair Items
                </h1>

                <div>
                    <button
                        className="btn btn-success text-white text-xs btn-xs md:btn-sm"
                        onClick={() => setOpenCostModal(true)}
                    >
                        Add Cost
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {foods.map(food => (
                    <FoodCard
                        key={food._id}
                        food={food}
                        onSelect={setSelectedFood}
                    />
                ))}
            </div>


            {/* selected food modal */}
            {selectedFood && (
                <SaleModal
                    food={selectedFood}
                    onClose={() => setSelectedFood(null)}
                />
            )}

            {/* cost modal */}
            <CostModal
                open={openCostModal}
                onClose={() => setOpenCostModal(false)}
                onSuccess={refreshData}
            />

            {/* place modal */}
            <PlaceModal
                open={openPlaceModal}
                onClose={() => setOpenPlaceModal(false)}
                onSuccess={refreshData}
            />
        </div>
    );
};

export default Home;
