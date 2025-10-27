"use client";
import React, { useState } from "react";

interface EventInfo {
  type: string;
  id: string;
  className: string;
  outerHTML: string;
  timeStamp: number;
}

export default function EventObject() {
  const [event, setEvent] = useState<EventInfo | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget; // safer than e.target in React

    const eventInfo: EventInfo = {
      type: e.type,
      id: target.id,
      className: target.className,
      outerHTML: target.outerHTML,
      timeStamp: e.timeStamp,
    };

    setEvent(eventInfo);
  };

  return (
    <div>
      <h2>The Event Object</h2>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>

      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr />
    </div>
  );
}
