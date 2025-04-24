import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./signUP.css";
import DateOfBirthInput from "../support/datePicker";

const SignUP = ({ api }) => {
  const navigate = useNavigate();
  
  // Form state with better initial values
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    password: "",
    email: "",
    dateOfBirth: null,
    phoneNumber: "",
    country: "",
    city: "",
    address: "",
    gender: "male",
    referralCode: "",
    role: "user"
  });

  const [countries, setCountries] = useState([]);
  const [referralValid, setReferralValid] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle date of birth change
  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      dateOfBirth: date
    }));
  };

  // Validate form
  const validateForm = () => {
    const { userName, fullName, email, password, dateOfBirth, city, address, phoneNumber } = formData;
    const errors = [];

    if (!userName) errors.push("Username");
    if (!fullName) errors.push("Full Name");
    if (!dateOfBirth) errors.push("Date of Birth");
    if (!city) errors.push("City");
    if (!address) errors.push("Address");
    if (!phoneNumber) errors.push("Phone Number");
    if (!password) errors.push("Password");
    if (!email) errors.push("Email");

    if (errors.length > 0) {
      toast.warning(`Please enter: ${errors.join(", ")}`);
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.warning("Please enter a valid email");
      return false;
    }

    if (referralValid === false) {
      toast.warning("Invalid referral code");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch( `${api}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          referredBy: formData.referralCode || null,
          signUpOn: new Date().toISOString()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(  `Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Check referral code validity
  useEffect(() => {
    const checkReferral = async () => {
      if (!formData.referralCode) {
        setReferralValid(null);
        return;
      }

      try {
        const response = await fetch( `${api}/check-referral?code=${formData.referralCode}`);
        const data = await response.json();
        setReferralValid(data.valid);
      } catch (error) {
        console.error("Error checking referral:", error);
        setReferralValid(false);
      }
    };

    const timer = setTimeout(checkReferral, 500);
    return () => clearTimeout(timer);
  }, [formData.referralCode, api]);

  // Get countries list on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.map(country => country.name.common).sort();
        setCountries(countryNames);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        setCountries([]);
      }
    };

    fetchCountries();
  }, []);

  // Check for referral code in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get("ref");
    if (refCode) {
      setFormData(prev => ({ ...prev, referralCode: refCode }));
    }
  }, []);

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-card-header">
          <h1>User Registration</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="signup-card-body">
            {/* Username */}
            <div className="form-group">
              <label>User Name <span className="errmsg">*</span></label>
              <input
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Full Name */}
            <div className="form-group">
              <label>Full Name <span className="errmsg">*</span></label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label>Date of Birth <span className="errmsg">*</span></label>
              <DateOfBirthInput
                selectedDate={formData.dateOfBirth}
                onChange={handleDateChange}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email <span className="errmsg">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password <span className="errmsg">*</span></label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
              />
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label>Phone Number <span className="errmsg">*</span></label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            {/* City */}
            <div className="form-group">
              <label>City <span className="errmsg">*</span></label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            {/* Country */}
            <div className="form-group">
              <label>Country <span className="errmsg">*</span></label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="form-group">
              <label>Address <span className="errmsg">*</span></label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Referral Code */}
            <div className="form-group">
              <label>
                Referral Code (Optional)
                {referralValid === false && (
                  <span style={{ color: "red", marginLeft: "5px" }}>Invalid Code</span>
                )}
                {referralValid === true && (
                  <span style={{ color: "green", marginLeft: "5px" }}>Valid Code</span>
                )}
              </label>
              <input
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                placeholder="Enter referral code if any"
              />
            </div>

            {/* Gender */}
            <div className="form-group">
              <label>Gender</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                  />
                  Female
                </label>
              </div>
            </div>
          </div>

          <div className="signup-card-footer">
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            <p>
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUP;