import { useEffect, useState } from "react";
import usePublicAxios from "../../Hook/usePublicAxios";
import Loading from "../../Components/Share/Loading";

const Report = () => {
    const axios = usePublicAxios();

    const [places, setPlaces] = useState([]);
    const [place, setPlace] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [loading, setLoading] = useState(false);

    const [sales, setSales] = useState([]);
    const [costs, setCosts] = useState([]);
    const [summary, setSummary] = useState({
        totalSales: 0,
        totalCost: 0,
        profit: 0,
    });

    /* ===============================
       Fetch places (ONLY ONCE)
    ================================ */
    useEffect(() => {
        axios.get("places").then(res => setPlaces(res.data));
    }, [axios]);

    /* ===============================
       Fetch report data
    ================================ */
    const fetchData = async () => {
        setLoading(true);

        try {
            const queryParams = new URLSearchParams();
            if (place) queryParams.append("place", place);
            if (from) queryParams.append("from", from);
            if (to) queryParams.append("to", to);

            const query = queryParams.toString();

            const [salesRes, costRes, reportRes] = await Promise.all([
                axios.get(`sales?${query}`),
                axios.get(`costs?${query}`),
                axios.get(`report?${query}`)
            ]);

            setSales(salesRes.data);
            setCosts(costRes.data);
            setSummary(reportRes.data);
        } catch (err) {
            console.error("Error fetching report data:", err);
        } finally {
            setLoading(false);
        }
    };

    /* ===============================
       Initial load
    ================================ */
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                📍 Fair Place Report
            </h1>

            {/* Filters */}
            <div className="bg-base-100 p-4 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                    className="select select-bordered"
                    value={place}
                    onChange={e => setPlace(e.target.value)}
                >
                    <option value="">All Places</option>
                    {places.map(p => (
                        <option key={p._id} value={p.name}>
                            {p.name}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    className="input input-bordered w-full"
                    value={from}
                    placeholder="date from"
                    onChange={e => setFrom(e.target.value)}
                />

                <input
                    type="date"
                    placeholder="date to"
                    className="input input-bordered w-full"
                    value={to}
                    onChange={e => setTo(e.target.value)}
                />

                <button
                    onClick={fetchData}
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Apply Filter"}
                </button>
            </div>

            {/* Loading overlay */}
            {loading && <Loading />}

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="stat bg-base-100 shadow rounded-xl">
                    <div className="stat-title">Total Sales</div>
                    <div className="stat-value text-green-600">
                        ৳ {summary.totalSales}
                    </div>
                </div>

                <div className="stat bg-base-100 shadow rounded-xl">
                    <div className="stat-title">Total Cost</div>
                    <div className="stat-value text-red-500">
                        ৳ {summary.totalCost}
                    </div>
                </div>

                <div className="stat bg-base-100 shadow rounded-xl">
                    <div className="stat-title">Profit</div>
                    <div
                        className={`stat-value ${summary.profit >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        ৳ {summary.profit}
                    </div>
                </div>
            </div>

            {/* History */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sales */}
                <div className="bg-base-100 rounded-xl shadow p-4">
                    <h2 className="font-semibold text-lg mb-3">Sales History</h2>

                    <div className="overflow-x-auto">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.slice(0, 50).map(s => (
                                    <tr key={s._id}>
                                        <td>{new Date(s.date).toLocaleDateString()}</td>
                                        <td>{s.foodName}</td>
                                        <td>{s.quantity}</td>
                                        <td>৳ {s.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Costs */}
                <div className="bg-base-100 rounded-xl shadow p-4">
                    <h2 className="font-semibold text-lg mb-3">Cost History</h2>

                    <div className="overflow-x-auto">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {costs.slice(0, 50).map(c => (
                                    <tr key={c._id}>
                                        <td>{new Date(c.date).toLocaleDateString()}</td>
                                        <td>{c.type}</td>
                                        <td>৳ {c.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
