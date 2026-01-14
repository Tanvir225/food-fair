const FoodCard = ({ food, onSelect }) => {
    return (
        <div
            onClick={() => onSelect(food)}
            className="cursor-pointer rounded-2xl bg-base-100 shadow-md hover:shadow-xl transition hover:-translate-y-1"
        >
            <figure className="p-4">
                <img
                    src={food.image}
                    alt={food.name}
                    className="w-20 h-24 mx-auto rounded-full"
                />
            </figure>

            <div className="px-4 pb-4 text-center">
                <h2 className="font-semibold text-lg">{food.name}</h2>
                <p className="text-sm text-gray-500">{food.category}</p>
            </div>
        </div>
    );
};

export default FoodCard;
