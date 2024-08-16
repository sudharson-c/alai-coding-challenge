import React, { useState } from "react";
import "tldraw/tldraw.css";

interface TimelineEvent {
  id: number;
  title: string;
  description: string;
}


const HorizontalTimeline: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [num, setNum] = useState<number[]>([1, 2, 3]);

  const onGenerate = () => {
    const updatedEvents = num.map((n) => ({
      id: n,
      title: `Subheading ${n}`,
      description: `Description ${n}`,
    }));
    setEvents(updatedEvents);
  };

  function createArray(size: number): number[] {
    return Array.from({ length: size }, (_, i) => i + 1);
  }

  const updateEvent = (id: number, key: keyof TimelineEvent, value: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, [key]: value } : event
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="number"
        placeholder="Enter number of events"
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (value > 0) {
            setNum(createArray(value));
          }
        }}
      />
      <button onClick={onGenerate}>Generate</button>
      <div
        className="container"
        style={{ paddingLeft: "40px", marginRight: "100px" }}
      >
        <div
          style={{
            position: "relative",
            width: "90vw",
            height: "200px",
            marginTop: "50px",
            paddingLeft: "30px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "121px",
              left: 0,
              right: 0,
              height: "2px",
              backgroundColor: "#000",
            }}
          ></div>

          {events.map((event, index) => (
            <div
              key={event.id}
              style={{
                position: "absolute",
                top: index % 2 === 0 ? "30%" : "55%",
                left: `${(index / events.length) * 100}%`,
                transform: "translateX(-50%)",
                textAlign: "center",
              }}
            >
              {index % 2 === 0 ? (
                <>
                  <input
                    type="text"
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                    value={event.title}
                    onChange={(e) =>
                      updateEvent(event.id, "title", e.target.value)
                    }
                  />
                  <br />
                  <input
                    type="text"
                    style={{ fontSize: "14px", color: "#666" }}
                    value={event.description}
                    onChange={(e) =>
                      updateEvent(event.id, "description", e.target.value)
                    }
                  />
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: "#000",
                      borderRadius: "50%",
                      margin: "10px auto 0",
                    }}
                  ></div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: "#000",
                      borderRadius: "50%",
                      margin: "10px auto 0",
                    }}
                  ></div>
                  <input
                    type="text"
                    style={{ fontSize: "18px", fontWeight: "bold" ,marginTop:'10px'}}
                    value={event.title}
                    onChange={(e) =>
                      updateEvent(event.id, "title", e.target.value)
                    }
                  />
                  <br />
                  <input
                    type="text"
                    style={{ fontSize: "14px", color: "#666" }}
                    value={event.description}
                    onChange={(e) =>
                      updateEvent(event.id, "description", e.target.value)
                    }
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function TldrawComponent() {
  return (
    <div
      style={{
        position: "relative",
        paddingLeft : '50px',
        width: "80%",
        height: "50vh",
        display: "flex",
      }}
    >
      <HorizontalTimeline />
    </div>
  );
}
