const FoodCard = ({ food, onSelect }) => {
    return (
        <div
            onClick={() => onSelect(food)}
            className="cursor-pointer rounded-2xl bg-base-100 shadow-md hover:shadow-xl transition hover:-translate-y-1"
        >
            <figure className="p-2 md:p-4">
                <img
                    src={food.image}
                    alt={food.name}
                    className="w-12 h-12 md:w-20 md:h-20 ring-2 ring-offset-2 ring-blue-200 mx-auto rounded-full"
                />
            </figure>

            <div className="p-2 md:px-4 md:pb-4 text-center h-20 md:h-24">
                <h2 className="font-semibold text-sm md:text-lg">{food.name}</h2>
                <p className="text-sm text-gray-500">{food.category}</p>
            </div>
        </div>
    );
};

export default FoodCard;
