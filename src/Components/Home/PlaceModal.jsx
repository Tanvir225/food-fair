import { useState } from "react";
import usePublicAxios from "../../Hook/usePublicAxios";
import toast from "react-hot-toast";


const PlaceModal = ({ open, onClose, onSuccess }) => {
  const axios = usePublicAxios();
  const [name, setName] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await axios.post("places", { name });
      setName("");
      onSuccess(); // refetch places
      onClose();
      toast.success("Place Added")
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("Place already exists")
      } else {
        console.error("Add place failed", err);
        toast.error("Failed to add place")
      }
    }
  };

  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">📍 Add New Place</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Place name"
            className="input input-bordered w-full focus:outline-none"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button className="btn btn-primary">
              Save Place
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceModal;
