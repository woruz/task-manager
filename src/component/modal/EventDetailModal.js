import React, { useState, useEffect } from "react";
import "./EventDetailModal.css";
import moment from "moment";

const EventDetailModal = ({ isOpen, onClose, event, onSubmit }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (event) {
      setStartDate(event.start ? moment(event.start).format("YYYY-MM-DD") : "");
      setEndDate(event.end ? moment(event.end).format("YYYY-MM-DD") : "");
      setDescription(event.title || "");
      setIsCompleted(event.isCompleted || false);
      setIsDeleted(event.isDeleted || false)
    }
  }, [event]);

  const handleSubmit = () => {
    onSubmit({
      ...event,
      start: startDate,
      end: endDate,
      title: description,
      isCompleted: isCompleted,
      isDeleted: isDeleted
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Event Details</h2>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
            />
            Completed
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isDeleted}
              onChange={(e) => setIsDeleted(e.target.checked)}
            />
            Deleted
          </label>
        </div>
        <div className="modal-actions">
          <button onClick={handleSubmit} className="submit-btn">Submit</button>
          <button onClick={onClose} className="close-btn">Close</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;