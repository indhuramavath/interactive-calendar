import { useState, useEffect } from "react";

function Calendar() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState({});

  // Load notes from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("calendarNotes")) || {};
    setSavedNotes(stored);
  }, []);

  // When range changes, load note automatically
  useEffect(() => {
    if (startDate && endDate) {
      const key = `${startDate}-${endDate}`;
      setNote(savedNotes[key] || "");
    }
  }, [startDate, endDate, savedNotes]);

  const handleClick = (day) => {
    if (!startDate) {
      setStartDate(day);
      setEndDate(null);
    } else if (!endDate && day > startDate) {
      setEndDate(day);
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  };

  const getBackground = (day) => {
    if (day === startDate || day === endDate) return "#4CAF50";
    if (startDate && endDate && day > startDate && day < endDate)
      return "#A5D6A7";
    return "transparent";
  };

  const saveNote = () => {
    if (!startDate || !endDate) {
      alert("Please select a date range first.");
      return;
    }

    const key = `${startDate}-${endDate}`;

    const updated = {
      ...savedNotes,
      [key]: note
    };

    setSavedNotes(updated);

    localStorage.setItem("calendarNotes", JSON.stringify(updated));

    alert("Note saved successfully!");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", textAlign: "center" }}>
      
      <img
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "10px"
        }}
      />

      <h2>September 2026</h2>

      {/* Calendar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: "10px",
          padding: "20px"
        }}
      >
        {days.map((day) => (
          <div
            key={day}
            onClick={() => handleClick(day)}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              cursor: "pointer",
              background: getBackground(day),
              fontWeight: "bold"
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {startDate && (
        <p>
          Selected Range: <b>{startDate}{endDate ? ` - ${endDate}` : ""}</b>
        </p>
      )}

      {/* Notes Section */}
      <h3>Notes</h3>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write notes for selected range..."
        style={{
          width: "400px",
          height: "100px",
          padding: "10px",
          borderRadius: "6px"
        }}
      />

      <br />

      <button
        onClick={saveNote}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          borderRadius: "6px",
          border: "none",
          background: "#4CAF50",
          color: "white",
          cursor: "pointer"
        }}
      >
        Save Note
      </button>

      {/* Display Saved Notes */}
      <div style={{ marginTop: "30px" }}>
        <h3>Saved Notes</h3>

        {Object.keys(savedNotes).length === 0 && <p>No notes yet.</p>}

        {Object.entries(savedNotes).map(([range, text]) => (
          <div
            key={range}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              margin: "10px auto",
              width: "300px",
              borderRadius: "6px"
            }}
          >
            <b>{range}</b>
            <p>{text}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Calendar;