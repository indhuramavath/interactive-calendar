import { useState, useEffect } from "react";

function Calendar() {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState({});

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    const stored = localStorage.getItem("calendarNotes");
    if (stored) {
      setSavedNotes(JSON.parse(stored));
    }
  }, []);

  const handleDateClick = (day) => {

    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else {
      if (day < startDate) {
        setStartDate(day);
        setEndDate(null);
      } else {
        setEndDate(day);
      }
    }
  };

  const isSelected = (day) => {

    if (startDate && endDate) {
      return day >= startDate && day <= endDate;
    }

    if (startDate === day) {
      return true;
    }

    return false;
  };

  const saveNote = () => {

    if (!startDate || !endDate) {
      alert("Please select a date range first");
      return;
    }

    const key = `${year}-${month}-${startDate}-${endDate}`;

    const updated = {
      ...savedNotes,
      [key]: note,
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

      {/* Month Navigation */}

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        marginTop: "20px"
      }}>

        <button
          onClick={() => setCurrentDate(new Date(year, month - 1))}
          style={{ padding: "8px 15px" }}
        >
          Prev
        </button>

        <h2>{monthName} {year}</h2>

        <button
          onClick={() => setCurrentDate(new Date(year, month + 1))}
          style={{ padding: "8px 15px" }}
        >
          Next
        </button>

      </div>

      {/* Calendar Grid */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: "10px",
          padding: "20px"
        }}
      >

        {days.map((day) => (

          <button
            key={day}
            onClick={() => handleDateClick(day)}
            style={{
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              background: isSelected(day) ? "#4CAF50" : "#111",
              color: "white",
              cursor: "pointer"
            }}
          >

            {day}

          </button>

        ))}

      </div>

      {/* Selected Range */}

      {startDate && endDate && (

        <p>
          Selected Range: {startDate} - {endDate}
        </p>

      )}

      {/* Notes Section */}

      <h3>Notes</h3>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write notes for selected range..."
        style={{
          width: "100%",
          height: "100px",
          borderRadius: "10px",
          padding: "10px"
        }}
      />

      <br />

      <button
        onClick={saveNote}
        style={{
          marginTop: "10px",
          padding: "10px 20px"
        }}
      >
        Save Note
      </button>

    </div>

  );
}

export default Calendar;