import { useEffect, useState } from "react";
import SaleModal from "../../Components/SaleModal";
import FoodCard from "../../Components/FoodCard";


const Home = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFood, setSelectedFood] = useState(null);

    useEffect(() => {

        fetch("http://localhost:5000/api/items")
            .then(res => res.json())
            .then(data => {
                setFoods(data);
                setLoading(false);
            });
    }, []);



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <progress className="progress w-56"></progress>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">
                🍽️ Food Fair Items
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {foods.map(food => (
                    <FoodCard
                        key={food._id}
                        food={food}
                        onSelect={setSelectedFood}
                    />
                ))}
            </div>

            {selectedFood && (
                <SaleModal
                    food={selectedFood}
                    onClose={() => setSelectedFood(null)}
                />
            )}
        </div>
    );
};

export default Home;
