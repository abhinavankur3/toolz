"use client";
import { useEffect, useState } from "react";
import AnalogueClock from "./AnalogClock";

export default function AnalogClock() {
  const [time, setTime] = useState(new Date());
  const [hours, setHours] = useState(new Date().getHours() % 12);
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  const [seconds, setSeconds] = useState(new Date().getSeconds());

  const startTime = new Date();
  useEffect(() => {
    let timerId;
    if (!timerId) {
      timerId = setInterval(() => {
        setTime(new Date());
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="min-h-screen w-[100vw] lg:w-[85vw] flex flex-col justify-center items-center p-2">
      <div className="mb-8">
        <AnalogueClock customTime={time} />
      </div>
      <div className="mb-8 mt-24">
        <AnalogueClock
          customTime={new Date(startTime.setHours(hours, minutes, seconds))}
        />
      </div>
      <div className="mb-8 flex flex-col lg:flex-row ">
        <label className="form-control max-w-xs mr-2">
          <div className="label">
            <span className="label-text">Hours</span>
          </div>
          <input
            type="text"
            aria-label="Hours"
            value={hours}
            onChange={(e) => {
              if (Number(e.target.value) <= 12) {
                setHours(Number(e.target.value));
              }
            }}
            className="input input-bordered w-full mb-4 mr-2"
          />
        </label>
        <label className="form-control max-w-xs mr-2">
          <div className="label">
            <span className="label-text">Minutes</span>
          </div>
          <input
            type="text"
            value={minutes}
            onChange={(e) => {
              console.log(e.target.validity.valid, e.target.value);

              if (e.target.validity.valid) {
                setMinutes(Number(e.target.value));
              }
            }}
            pattern="^([0-5]?[0-9])$"
            className="input input-bordered w-full mb-4 mr-2"
          />
        </label>

        <label className="form-control max-w-xs">
          <div className="label">
            <span className="label-text">Seconds</span>
          </div>
          <input
            type="text"
            value={seconds}
            onChange={(e) => {
              if (e.target.validity.valid) {
                setSeconds(Number(e.target.value));
              }
            }}
            pattern="^([0-5]?[0-9])$"
            className="input input-bordered w-full mb-4 mr-2"
          />
        </label>
      </div>
    </div>
  );
}

function Clock({ time }) {
  return (
    <div className="clock">
      <div
        className="hour_hand"
        style={{
          transform: `rotateZ(${time.getHours() * 30}deg)`,
        }}
      />
      <div
        className="min_hand"
        style={{
          transform: `rotateZ(${time.getMinutes() * 6}deg)`,
        }}
      />
      <div
        className="sec_hand"
        style={{
          transform: `rotateZ(${time.getSeconds() * 6}deg)`,
        }}
      />
      <span className="twelve">12</span>
      <span className="one">1</span>
      <span className="two">2</span>
      <span className="three">3</span>
      <span className="four">4</span>
      <span className="five">5</span>
      <span className="six">6</span>
      <span className="seven">7</span>
      <span className="eight">8</span>
      <span className="nine">9</span>
      <span className="ten">10</span>
      <span className="eleven">11</span>
    </div>
  );
}
