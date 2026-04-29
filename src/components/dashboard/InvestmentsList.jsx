import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const InvestmentsList = () => {
  const { investments, removeInvestment } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">All Investments</h2>

        <button
          type="button"
          onClick={() => navigate("/dashboard/invest")}
          className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium transition"
        >
          Add Investment
        </button>
      </div>

      {investments?.length === 0 ? (
        <div className="flex items-center justify-center h-40 bg-white dark:bg-[#111C33] rounded-xl shadow-md">
          <p className="text-gray-500 dark:text-gray-400">No investments added yet.</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {investments.map((inv) => (
            <div
              key={inv.id}
              className="bg-white dark:bg-[#111C33] p-4 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition hover:shadow-lg"
            >
              <div>
                <h3 className="font-semibold text-lg">{inv.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {inv.investmentType} • {inv.investmentDate}
                </p>
                {inv.remarks ? (
                  <p className="text-xs text-gray-400 mt-1">{inv.remarks}</p>
                ) : null}
              </div>

              <div className="text-left sm:text-right">
                <p className="text-lg font-bold text-teal-600">₹{inv.investedAmount}</p>
                <p className="text-xs text-gray-500">ROI: {inv.interestRate}%</p>

                <button
                  type="button"
                  onClick={async () => {
                    const response = await removeInvestment(inv.id);
                    if (response?.success) toast.success("Investment deleted");
                    else toast.error(response?.message || "Failed to delete investment");
                  }}
                  className="mt-2 text-sm px-3 py-1 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition"
                  aria-label="Delete investment"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvestmentsList;

