// pages/booking/index.tsx
import axios from "axios";
import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.cardNumber ||
      !formData.expirationDate ||
      !formData.cvv ||
      !formData.billingAddress
    ) {
      return "All fields are required.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/bookings", formData);
      setSuccess("✅ Booking confirmed successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        billingAddress: "",
      });
    } catch (err) {
      console.error("Booking error:", err);
      setError("❌ Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Complete Your Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={formData.cardNumber}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="expirationDate"
          placeholder="Expiration Date (MM/YY)"
          value={formData.expirationDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="cvv"
          placeholder="CVV"
          value={formData.cvv}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="billingAddress"
          placeholder="Billing Address"
          value={formData.billingAddress}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">{success}</p>}
      </form>
    </div>
  );
}
