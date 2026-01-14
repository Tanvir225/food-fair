import { useState } from "react";
import usePublicAxios from "../../Hook/usePublicAxios";
import toast from "react-hot-toast";



const CostModal = ({ open, onClose, onSuccess }) => {
    const axios = usePublicAxios();
    const [places, setPlaces] = useState([]);
    const [place, setPlace] = useState("");
    const [form, setForm] = useState({
        type: "",
        amount: "",
        date: "",
    });

    axios.get("places").then((res)=>{
        setPlaces(res?.data)
    })

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await axios.post("costs", { ...form, place });
            onSuccess();       // refresh list
            onClose();         // close modal
            setForm({ type: "", amount: "", date: "" });
            toast.success("Cost added successfully");
        } catch (err) {
            console.error("Add cost failed", err);
            toast.error("Failed to add cost. Please try again.");
        }
    };

    if (!open) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">➕ Add New Cost</h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        name="type"
                        placeholder="Cost type (Rent, Gas, etc)"
                        className="input input-bordered w-full"
                        value={form.type}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        className="input input-bordered w-full"
                        value={form.amount}
                        onChange={handleChange}
                        required
                    />

                    <select
                        className="select select-bordered w-full"
                        value={place}
                        onChange={e => setPlace(e.target.value)}
                    >
                        <option value="">Select Place</option>
                        {places.filter(Boolean).map(p => (
                            <option key={p._id}>{p.name}</option>
                        ))}
                    </select>

                    <input
                        type="date"
                        name="date"
                        className="input input-bordered w-full"
                        value={form.date}
                        onChange={handleChange}
                    />

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="btn btn-primary">
                            Save Cost
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CostModal;
