import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./signUP.css";
import Select from "react-select";
import DateOfBirthInput from "../support/datePicker";
import { Countries, PhoneCode, CountryCities } from "../support/usefulArrays";

const SignUP = ({ api }) => {
  const navigate = useNavigate();

  // Form state with better initial values
  const [countryCode, setCountryCode] = useState(PhoneCode[45]?.phone || "+1");
const [phoneNumber, setPhoneNumber] = useState()

const fullPhoneNumber = countryCode + phoneNumber;
  
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    dateOfBirth: null,
    phoneNumber: fullPhoneNumber,
    country: "Cameroon",
    city: "",
    address: "",
    gender: "male",
    referralCode: "",
    role: "user",
  });

  const [countries, setCountries] = useState(Countries);
  const [phoneCode, SetPhoneCode] = useState(PhoneCode);
  const [search, setSearch] = useState("");
  const [referralValid, setReferralValid] = useState(null);
  const [loading, setLoading] = useState(false);


  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "rePassword") {
      setRePassword(value);
      setPasswordError(
        formData.password && value !== formData.password
          ? "Passwords do not match"
          : ""
      );
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (name === "password" && rePassword) {
        setPasswordError(value !== rePassword ? "Passwords do not match" : "");
      }
    }
  };

  // Handle date of birth change
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date,
    }));
  };

  // Validate form
  const validateForm = () => {
    const {
      userName,
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      city,
      address,
      phoneNumber,
    } = formData;
    const errors = [];

    if (!userName) errors.push("Username");
    if (/\s/.test(userName)) {
      toast.warning("Username should not contain spaces");
      return false;
    }
    if (!firstName) errors.push("first Name");
    if (!lastName) errors.push("last Name");
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
      const response = await fetch(`${api}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          referredBy: formData.referralCode || null,
          signUpOn: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
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
        const response = await fetch(
          `${api}/check-referral?code=${formData.referralCode}`
        );
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
  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     try {
  //       const response = await fetch("https://restcountries.com/v3.1/all");
  //       const data = await response.json();
  //       const countryNames = data.map(country => country.name.common).sort();
  //       setCountries(countryNames);
  //     } catch (error) {
  //       console.error("Failed to fetch countries:", error);
  //       setCountries([]);
  //     }
  //   };

  //   fetchCountries();
  // }, []);

  // Check for referral code in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get("ref");
    if (refCode) {
      setFormData((prev) => ({ ...prev, referralCode: refCode }));
    }
  }, []);

const phoneOptions = phoneCode.map((code) => ({
  value: code.phone,
  label: `${code.emoji} ${code.name} (${code.phone})`,
}));

  const cities = CountryCities[formData.country] || [];


  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-card-header">
          <h1>User Registration</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="signup-card-body">
            {/* first Name */}
            <div className="form-group">
              <label>
                First Name <span className="errmsg">*</span>
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            {/* last Name */}
            <div className="form-group">
              <label>
                Last Name <span className="errmsg">*</span>
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Username */}
            <div className="form-group">
              <label>
                User Name <span className="errmsg">*</span>
              </label>
              <input
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <DateOfBirthInput
                selectedDate={formData.dateOfBirth}
                onChange={handleDateChange}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>
                Email <span className="errmsg">*</span>
              </label>
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
              <label>
                Password <span className="errmsg">*</span>
              </label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="8"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ marginLeft: 8 }}
                  tabIndex={-1}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>
                Re-enter Password <span className="errmsg">*</span>
              </label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type={showRePassword ? "text" : "password"}
                  name="rePassword"
                  value={rePassword}
                  onChange={handleChange}
                  required
                  minLength="8"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => setShowRePassword((prev) => !prev)}
                  style={{ marginLeft: 8 }}
                  tabIndex={-1}
                >
                  {showRePassword ? "Hide" : "Show"}
                </button>
              </div>
              {passwordError && (
                <span className="errmsg" style={{ color: "red" }}>
                  {passwordError}
                </span>
              )}
            </div>

      {/* phone Number */}
<label>
  Phone Number <span className="errmsg">*</span>
</label>
<div style={{ display: "flex" }} className="form-group">
  <div style={{ width: "30%" }}>
    <Select
      name="countryCode"
      value={phoneOptions.find((opt) => opt.value === countryCode)}
      onChange={(option) => setCountryCode(option.value)}
      options={phoneOptions}
      placeholder="Select Country Code"
      isSearchable
    />
  </div>
  <div style={{ width: "70%", marginLeft: "auto", display: "flex", alignItems: "center" }}>
    <span   style={{ height:"43px", padding: "8px", background: "#f8f9fa", border: "1px solid #ccc", borderRadius: "4px 0 0 4px" , }}>
      {countryCode}
    </span>
    <input
      type="tel"
      name="phoneNumber"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      required
      style={{ borderRadius: "0 4px 4px 0", borderLeft: "none", flex: 1 }}
      // Do NOT include the code in the input value
    />
   
  </div>
</div>

             {/* Country */}
      <div className="form-group">
        <label>
          Country <span className="errmsg">*</span>
        </label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          {Object.keys(CountryCities).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      {formData.country && (
        <div className="form-group">
          <label>
            City <span className="errmsg">*</span>
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}
            {/* Address */}
            <div className="form-group">
              <label>
                Address <span className="errmsg">*</span>
              </label>
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
                  <span style={{ color: "red", marginLeft: "5px" }}>
                    Invalid Code
                  </span>
                )}
                {referralValid === true && (
                  <span style={{ color: "green", marginLeft: "5px" }}>
                    Valid Code
                  </span>
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
