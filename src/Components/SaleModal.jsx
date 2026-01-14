import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import usePublicAxios from "../Hook/usePublicAxios";



const SaleModal = ({ food, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const [places, setPlaces] = useState([]);
    const [place, setPlace] = useState("");

    const axios = usePublicAxios();

    useEffect(() => {
        axios.get("places").then(res => setPlaces(res.data));
    }, [axios]);

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

        axios.post("sales", saleData)
            .then(res => {
                console.log(res);
                toast.success("Sale recorded successfully!");
            })
            .catch(err => {
                console.log(err);
                toast.error("Failed to record sale. Please try again.");
            }
            );

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
                        className="input input-bordered w-full focus:outline-none"
                        placeholder="Quantity"

                        onChange={e => setQuantity(Number(e.target.value))}
                    />

                    <input
                        type="number"
                        className="input input-bordered w-full focus:outline-none"
                        placeholder="Unit Price"
                        onChange={e => setUnitPrice(Number(e.target.value))}
                    />

                    <input
                        type="text"
                        className="input input-bordered w-full bg-gray-100 focus:outline-none"
                        value={`Total Price: ৳ ${total}`}
                        readOnly
                    />

                    <select
                        className="select select-bordered w-full focus:outline-none"
                        value={place}
                        onChange={e => setPlace(e.target.value)}
                        required
                    >
                        <option value="">Select Fair Place</option>
                        {places.map(p => (
                            <option key={p._id}>{p.name}</option>
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
