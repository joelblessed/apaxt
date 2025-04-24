import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./signUP.css"; // Import the CSS file

const SignUP = ({ api, user }) => {
  const [userName, userNamechange] = useState("");
  const [fullName, fullNamechange] = useState("");
  const [password, passwordchange] = useState("");
  const [email, emailchange] = useState("");
  const [dateOfBirth,dateOfbithChange] = useState("");
  const [phone, phonechange] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [country, setCountry] = useState("Cameroon");
  const [address, addresschange] = useState("");
  const [gender, genderchange] = useState("male");
  const [wallet, setWallet] = useState(0);
  const [city, setCity] = useState("");
  const [role, setRole] = useState("user");
  const [signUpOn, setSignUpOn] = useState(
      new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  const [location, setLocation] = useState([
        { id: Date.now(), location: "", latitude: "", longitude: "" },
      ]);
 

  const navigate = useNavigate();

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (userName === null || userName === "") {
      isproceed = false;
      errormessage += " Username";
    }
    if (fullName === null || fullName === "") {
      isproceed = false;
      errormessage += " Fullname";
    }
    if (dateOfBirth === null || dateOfBirth === "") {
      isproceed = false;
      errormessage += " Date of Birth";
    }
    if (city === null || city === "") {
      isproceed = false;
      errormessage += " City";
    }
    if (address === null || address === "") {
      isproceed = false;
      errormessage += " Address";
    }
    if (phone === null || phone === "") {
      isproceed = false;
      errormessage += " Phone";
    }
    if (password === null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " Email";
    }

    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("Please enter the valid email");
      }
    }
    return isproceed;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj = {
      userName,
      fullName,
      dateOfBirth,
      password,
      email,
      phone,
      country,
      city,
      address,
      gender,
      wallet,
      role,
      signUpOn,
      location, 
    };
    if (IsValidate()) {
      fetch(`${api}/signup`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          toast.success("Registered successfully.");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed :" + err.message);
        });
    }
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    if (value !== "other") {
      setCustomValue(""); // Reset input if another option is selected
      setCountry(value);
    }
  };

  const handleCustomInputChange = (event) => {
    setCustomValue(event.target.value);
  };

  useEffect(() => {
    if (customValue.trim()) {
      setCountry(customValue); //store input
    }
  });

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-card-header">
          <h1>User Registration</h1>
        </div>
        <form onSubmit={handlesubmit}>
          <div className="signup-card-body">
            <div className="form-group">
              <label>
                User Name <span className="errmsg">*</span>
              </label>
              <input
                value={userName}
                onChange={(e) => userNamechange(e.target.value)}
                required
              />
            </div>
            
            </div>
            <div className="form-group">
              <label>
                Full Name <span className="errmsg">*</span>
              </label>
              <input
                value={fullName}
                onChange={(e) => fullNamechange(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Date of Birth <span className="errmsg">*</span>
              </label>
              <input
                value={dateOfBirth}
                onChange={(e) => dateOfbithChange(e.target.value)}
                required
              />
              </div>
            <div className="form-group">
              <label>
                Email <span className="errmsg">*</span>
              </label>
              <input
                value={email}
                onChange={(e) => emailchange(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                value={phone}
                onChange={(e) => phonechange(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>
                City <span className="errmsg">*</span>
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Password <span className="errmsg">*</span>
              </label>
              <input
                value={password}
                onChange={(e) => passwordchange(e.target.value)}
                type="password"
                required
              />
            <div className="form-group">
              <label>
                Country <span className="errmsg">*</span>
              </label>
              <select value={selectedValue} onChange={handleSelectChange}>
                
                <option value="other">Other</option>
              </select>
              {selectedValue === "other" && (
                <div className="custom-country-input">
                  <input
                    value={customValue}
                    placeholder="Enter your Country"
                    onChange={handleCustomInputChange}
                  />
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                value={address}
                onChange={(e) => addresschange(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    checked={gender === "male"}
                    onChange={(e) => genderchange(e.target.value)}
                    name="gender"
                    value="male"
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    checked={gender === "female"}
                    onChange={(e) => genderchange(e.target.value)}
                    name="gender"
                    value="female"
                  />
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className="signup-card-footer">
            <button type="submit">Register</button>
            <p>
              Already have an account? <Link to="/signIN">LogIn</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUP;