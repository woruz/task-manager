import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import "./TaskCalendar.css";
import EventDetailModal from "../../component/modal/EventDetailModal";

const TaskCalendar = ({ events, setEvents, onSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const localizer = momentLocalizer(moment);
  const DnDCalendar = withDragAndDrop(Calendar);

  const onEventResize = (data) => {
    const {
      start,
      end,
      event: { id },
    } = data;

    setEvents((state) => {
      let new_event = state.filter((val) => val.id === id);
      let rest_state = state.filter((val) => val.id !== id);
      new_event[0].start = start;
      new_event[0].end = end;
      return [...rest_state, ...new_event];
    });
  };

  const onEventDrop = (data) => {
    const {
      start,
      end,
      event: { id },
    } = data;

    setEvents((state) => {
      let new_event = state.filter((val) => val.id === id);
      let rest_state = state.filter((val) => val.id !== id);
      new_event[0].start = start;
      new_event[0].end = end;
      return [...rest_state, ...new_event];
    });
  };

  const onSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleUpdateEvent = (updatedEvent) => {
    let updated_obj = {
      start_date: updatedEvent.start,
      end_date: updatedEvent.end,
      description: updatedEvent.title,
      isCompleted: updatedEvent.isCompleted,
      isDeleted: updatedEvent.isDeleted
    }
    onSubmit(updatedEvent.id,updated_obj)
  };

  const eventPropGetter = (event) => {
    const backgroundColor = event.isCompleted ? '#d4edda' : '#f8d7da';
    const color = event.isCompleted ? '#155724' : '#721c24';
    return { style: { backgroundColor, color } };
  };

  return (
    <div>
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onSelectEvent={onSelectEvent}
        resizable
        style={{ height: "100vh" }}
        eventPropGetter={eventPropGetter}
      />

      <EventDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent || {}}
        onSubmit={handleUpdateEvent}
      />
    </div>
  );
};

export default TaskCalendar;
