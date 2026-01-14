import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const places = [
    "Dhanmondi",
    "Gulshan",
    "Badda",
    "BUET",
    "TSC",
    "DOHS",
    "Mohakhali",
    "Baridhara"
];

const SaleModal = ({ food, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const [place, setPlace] = useState("");


    useEffect(() => {
        setTotal(quantity * unitPrice);
    }, [quantity, unitPrice]);

    const handleSubmit = e => {
        e.preventDefault();

        const saleData = {
            foodId: food._id,
            foodName: food.name,
            quantity,
            unitPrice,
            place,
            total
        };

        // post saleData to server or handle it as needed
        fetch("http://localhost:5000/api/sales", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(saleData)
        })
            .then(res => res.json())
            .then(data => {
                console.log("Sale recorded:", data);
                toast.success("Sale recorded successfully!");
            });

        console.log("SALE DATA", saleData);
        onClose();
    };

    return (
        <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-xl mb-4">{food.name}</h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="Quantity"

                        onChange={e => setQuantity(Number(e.target.value))}
                    />

                    <input
                        type="number"
                        className="input input-bordered w-full"
                        placeholder="Unit Price"
                        onChange={e => setUnitPrice(Number(e.target.value))}
                    />

                    <input
                        type="text"
                        className="input input-bordered w-full bg-gray-100"
                        value={`Total Price: ৳ ${total}`}
                        readOnly
                    />

                    <select
                        className="select select-bordered w-full"
                        value={place}
                        onChange={e => setPlace(e.target.value)}
                        required
                    >
                        <option value="">Select Fair Place</option>
                        {places.map(p => (
                            <option key={p}>{p}</option>
                        ))}
                    </select>

                    {/* <input
                        type="date"
                        className="input input-bordered w-full"
                        onChange={e => setDate(e.target.value)}
                        required
                    /> */}

                    <div className="modal-action">
                        <button type="button" onClick={onClose} className="btn bg-red-500 hover:bg-red-600 p-2 text-white">
                            Cancel
                        </button>
                        <button className="btn bg-green-500 hover:bg-green-600 p-2 text-white">Save Sale</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default SaleModal;
