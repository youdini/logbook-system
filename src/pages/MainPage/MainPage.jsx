import { supabase } from "../../supabase/supabase.js";

import "./main.scss";
import logo from "../../assets/download (3).png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [time, setTime] = useState(new Date());
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [studentId, setStudentId] = useState("");
  const [course, setCourse] = useState("");
  const [section, setSection] = useState("");

  const date = new Date();

  const dateFormatted = date.toDateString();
  const timeFormatted = date.toLocaleTimeString();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // pushing data into database
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      firstname === "" ||
      lastname === "" ||
      studentId === "" ||
      course === "" ||
      section === ""
    ) {
      return;
    } else if (studentId.length !== 10) {
      alert("Student ID must be in the format of XXXX-XXXXX.");
    } else {
      const { data, error } = await supabase.from("student_record").insert([
        {
          time_at: timeFormatted,
          date_at: dateFormatted,
          firstname: firstname,
          lastname: lastname,
          student_id: studentId,
          course: course,
          year_section: section,
        },
      ]);
      if (error) {
        console.log(error);
      } else {
        alert("LOGGED IN");
        setFirstname("");
        setLastname("");
        setStudentId("");
        setCourse("");
        setSection("");
      }
    }
  };

  // capitalized each word in a string
  const firstnameInputChange = (event) => {
    const capitalizedString = event.target.value.replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
    setFirstname(capitalizedString);
  };

  const lastnameInputChange = (event) => {
    const capitalizedString = event.target.value.replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
    setLastname(capitalizedString);
  };

  function studentIdFormatter(event) {
    let input = event.target.value;
    input = input.replace(/\D/g, ""); // Remove non-numeric characters
    input = input.slice(0, 9); // Limit input to 9 characters
    input = input.replace(/(\d{4})(\d{1,5})/, "$1-$2"); // Add hyphen after the fourth digit
    setStudentId(input);
  }

  return (
    <div className="container">
      <div className="header">
        <Link to={"records"}>
          <button type="submit" className="recordsbutton">
            <img src={logo} className="logo" alt="logo" />
          </button>
        </Link>
        <div className="title">
          <h2 className="time">Current time: {time.toLocaleTimeString()}</h2>
          <h1>Online Logbook System</h1>
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name (e.g Juan)"
            required
            autoCapitalize="true"
            value={firstname}
            onChange={firstnameInputChange}
          />
          <input
            type="text"
            placeholder="Last Name (e.g Dela Cruz)"
            required
            autoCapitalize="words"
            value={lastname}
            onChange={lastnameInputChange}
          />
          <input
            type="text"
            placeholder="Student ID (e.g XXXX-XXXXX)"
            required
            autoCapitalize="words"
            value={studentId}
            onChange={studentIdFormatter}
          />
          <input
            type="text"
            placeholder="Course"
            required
            autoCapitalize="words"
            value={course}
            onChange={(e) => setCourse(e.target.value.toUpperCase())}
          />
          <input
            type="text"
            placeholder="Year - Section"
            required
            autoCapitalize="words"
            value={section}
            onChange={(e) => setSection(e.target.value.toUpperCase())}
          />
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default MainPage;
