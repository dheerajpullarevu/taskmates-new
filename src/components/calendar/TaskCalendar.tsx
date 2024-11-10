import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface TaskEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  taskId: string;
}

interface TaskCalendarProps {
  events: TaskEvent[];
  onEventSelect: (event: TaskEvent) => void;
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({ events, onEventSelect }) => {
  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={onEventSelect}
        views={['month', 'week', 'day']}
        defaultView="month"
      />
    </div>
  );
};

export default TaskCalendar;