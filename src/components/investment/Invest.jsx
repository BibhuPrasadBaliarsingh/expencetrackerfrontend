import React, { useContext } from "react";
import { useFormik } from "formik";
import AuthContext from '../../context/AuthContext'
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Invest = () => {
  const { addNewInvestment, investments, removeInvestment } = useContext(AuthContext)

  const initialState = {
    title: "",
    investmentType: "",
    investedAmount: "",
    interestRate: "",
    investmentDate: "",
    remarks: "",
  };

  const formik = useFormik({
    initialValues: initialState,

    onSubmit: async (values, { resetForm }) => {
      const newInvestment = {
        title: values.title,
        investmentType: values.investmentType,
        investedAmount: Number(values.investedAmount),
        interestRate: Number(values.interestRate),
        investmentDate: values.investmentDate,
        remarks: values.remarks,
      };

      const response = await addNewInvestment(newInvestment)
      if (response?.success) toast.success("Investment added")
      else toast.error(response?.message || "Failed to add investment")

      resetForm();
    },
  });

  return (
    <div className="h-full overflow-y-auto px-4 sm:px-10 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 dark:text-white">
          Investments
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Manage your investment details.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Title
            </label>
            <input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              type="text"
              required
              placeholder="Ex: HDFC NIFTY Next 50 Index Fund"
              className="w-full px-4 py-3 rounded-xl 
                        bg-gray-100 dark:bg-[#0B1220]
                        border border-gray-300 dark:border-gray-700
                        focus:ring-2 focus:ring-teal-500 
                        focus:outline-none transition"
            />
          </div>

          {/* Invested Amount */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Invested Amount
            </label>
            <input
              name="investedAmount"
              value={formik.values.investedAmount}
              onChange={formik.handleChange}
              type="number"
              placeholder="Ex: ₹50000"
              required
              className="w-full px-4 py-3 rounded-xl 
                        bg-gray-100 dark:bg-[#0B1220]
                        border border-gray-300 dark:border-gray-700
                        focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Investment Type */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Type of Investment
            </label>
            <select
              name="investmentType"
              value={formik.values.investmentType}
              onChange={formik.handleChange}
              required
              className="w-full px-4 py-3 rounded-xl 
                        bg-gray-100 dark:bg-[#0B1220]
                        border border-gray-300 dark:border-gray-700"
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="fd">FD</option>
              <option value="rd">RD</option>
              <option value="sip">SIP</option>
              <option value="mutualFund">Mutual Fund</option>
              <option value="stocks">Stocks</option>
              <option value="crypto">Crypto</option>
              <option value="gold">Gold</option>
              <option value="realEstate">Real Estate</option>
            </select>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              ROI (Rate of Interest %)
            </label>
            <input
              name="interestRate"
              value={formik.values.interestRate}
              onChange={formik.handleChange}
              type="number"
              required
              placeholder="Ex: 12%"
              className="w-full px-4 py-3 rounded-xl 
                        bg-gray-100 dark:bg-[#0B1220]
                        border border-gray-300 dark:border-gray-700
                        focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Date of Investment
            </label>
            <input
              name="investmentDate"
              value={formik.values.investmentDate}
              onChange={formik.handleChange}
              type="date"
              required
              className="w-full px-4 py-3 rounded-xl 
                        bg-gray-100 dark:bg-[#0B1220]
                        border border-gray-300 dark:border-gray-700
                        focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Remarks */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Remarks
            </label>
            <textarea
              name="remarks"
              value={formik.values.remarks}
              onChange={formik.handleChange}
              rows={4}
              placeholder="Ex: Long term investment for 10 years"
              className="w-full px-4 py-3 rounded-xl 
                        bg-gray-100 dark:bg-[#0B1220]
                        border border-gray-300 dark:border-gray-700"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={formik.resetForm}
            className="px-6 py-3 rounded-xl 
                      border border-gray-400 dark:border-gray-600
                      hover:bg-gray-200 dark:hover:bg-gray-800
                      transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-3 rounded-xl font-semibold text-white
                      bg-teal-600 hover:bg-teal-500
                      transition duration-300 hover:scale-105 shadow-md"
          >
            Add Investment
          </button>
        </div>
      </form>

      {/* Investments List */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Your Investments
        </h2>

        {investments?.length === 0 ? (
          <div className="flex items-center justify-center h-32 bg-white dark:bg-[#111C33] rounded-xl shadow-md">
            <p className="text-gray-500 dark:text-gray-400">No investments added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {investments.map((inv) => (
              <div
                key={inv.id}
                className="bg-white dark:bg-[#111C33] p-4 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                    {inv.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {inv.investmentType} â€¢ {inv.investmentDate}
                  </p>
                  {inv.remarks ? (
                    <p className="text-xs text-gray-400 mt-1">{inv.remarks}</p>
                  ) : null}
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-lg font-bold text-teal-600">
                    â‚¹{inv.investedAmount}
                  </p>
                  <p className="text-xs text-gray-500">
                    ROI: {inv.interestRate}%
                  </p>

                  <button
                    onClick={async () => {
                      const response = await removeInvestment(inv.id)
                      if (response?.success) toast.success("Investment deleted")
                      else toast.error(response?.message || "Failed to delete investment")
                    }}
                    className="mt-2 text-sm px-3 py-1 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition"
                    type="button"
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
    </div>
  );
};

export default Invest;
