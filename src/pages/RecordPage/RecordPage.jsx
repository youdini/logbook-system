import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabase";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import moment from "moment";

import "./record.scss";
import logo from "../../assets/download (3).png";

const RecordPage = () => {
  const [time, setTime] = useState(new Date());
  const [data, setData] = useState([]);
  const [date, setDate] = useState(null);
  const [datafile, setDatafile] = useState([]);

  useEffect(() => {
    async function getLog() {
      const { data, error } = await supabase
        .from("student_record")
        .select("*")
        .order("time_at", { ascending: false })
        .order("date_at", { ascending: false });
      if (error) {
        console.log(error);
      } else {
        setData(data);
        console.log(data);
      }
    }
    getLog();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDateChange = (event) => {
    const selectedDate = moment(event.target.value).format("YYYY-MM-DD");
    setDate(selectedDate);
  };

  const handleDownload = async () => {
    const { data: response, error } = await supabase
      .from("student_record")
      .select("*")
      .eq("date_at", date);

    if (error) {
      console.log(error);
      alert(error.message.toUpperCase());
    } else {
      setDatafile(response);
      alert("Records found: " + response.length);
    }
  };

  const headers = [
    { label: "Date", key: "date_at" },
    { label: "Time", key: "time_at" },
    { label: "Student ID", key: "student_id" },
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Course", key: "course" },
    { label: "Section", key: "section" },
  ];

  return (
    <div className="container">
      <div className="header">
        <Link to={"/"}>
          <button type="submit" className="recordsbutton">
            <img src={logo} className="logo" alt="logo" />
          </button>
        </Link>
        <div className="title">
          <h2 className="time_record">
            Current time: {time.toLocaleTimeString()}
          </h2>
          <h1>Online Logbook System</h1>
          <div className="download">
            <div>
              <label htmlFor="date-picker">Choose a date: </label>
              <input
                type={"date"}
                id="date-picker"
                onChange={handleDateChange}
              />
              <button onClick={handleDownload}>Check</button>
            </div>
            {datafile.length !== 0 ? (
              <div className="csv">
                <CSVLink data={datafile} headers={headers} filename={date}>
                  Download CSV
                </CSVLink>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="table-container">
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Student ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Course</th>
                <th>Section</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.date_at}</td>
                  <td>{entry.time_at}</td>
                  <td>{entry.student_id}</td>
                  <td>{entry.firstname}</td>
                  <td>{entry.lastname}</td>
                  <td>{entry.course}</td>
                  <td>{entry.year_section}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecordPage;
