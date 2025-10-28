import React, { useState } from "react";

interface EventSnapshot {
  _reactName?: string;
  type: string;
  nativeEvent: { isTrusted: boolean };
  target: string;
  currentTarget: string | null;
  eventPhase: number;
  bubbles: boolean;
  cancelable: boolean;
  timeStamp: number;
  defaultPrevented: boolean;
  isTrusted: boolean;
  detail: number;
  screenX: number;
  screenY: number;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
  button: number;
  buttons: number;
  relatedTarget: EventTarget | null;
  movementX: number;
  movementY: number;
}

export default function EventObject() {
  const [eventData, setEventData] = useState<EventSnapshot | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.persist(); // keep the synthetic event from being cleared

    // Create a snapshot of all useful event properties
    const snapshot: EventSnapshot = {
      _reactName: (e as any)._reactName, // _reactName is internal, no official type
      type: e.type,
      nativeEvent: { isTrusted: e.nativeEvent.isTrusted },
      target: (e.target as HTMLElement).outerHTML,
      currentTarget: e.currentTarget
        ? (e.currentTarget as HTMLElement).outerHTML
        : null,
      eventPhase: e.eventPhase,
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      timeStamp: e.timeStamp,
      defaultPrevented: e.defaultPrevented,
      isTrusted: e.isTrusted,
      detail: e.detail,
      screenX: e.screenX,
      screenY: e.screenY,
      clientX: e.clientX,
      clientY: e.clientY,
      pageX: e.pageX,
      pageY: e.pageY,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      altKey: e.altKey,
      metaKey: e.metaKey,
      button: e.button,
      buttons: e.buttons,
      relatedTarget: e.relatedTarget,
      movementX: e.movementX,
      movementY: e.movementY,
    };

    setEventData(snapshot);
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(eventData, null, 2)}</pre>
      <hr />
    </div>
  );
}
