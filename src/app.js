import React from "react";
import ReactDOM from "react-dom";

import DaySummary from "./DaySummary";
import { minsToTimeStr, timeStrToMins } from "./time-util";

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.dailyValues = [0, 0, 0, 0, 0];
    this.weeklyRequired = 35 * 60; //35 hrs required per week (testing)
    this.state = {
      weeklySummary: 0,
      overTime: 0
    };
  }

  dailySummary = (d, v) => {
    this.dailyValues[d] = v;
    let sum = this.dailyValues.reduce((a, b) => {
      return a + b;
    });
    let ot = sum - this.weeklyRequired;

    this.setState({ weeklySummary: minsToTimeStr(sum) });
    this.setState({ overTime: minsToTimeStr(ot) });
  };

  render() {
    return (
      <div>
        <h1>Timesheet App</h1>
        <table className="days-container">
          <DaySummary
            dayName="Monday"
            changeNotify={v => this.dailySummary(0, v)}
          />
          <DaySummary
            dayName="Tuesday"
            changeNotify={v => this.dailySummary(1, v)}
          />
          <DaySummary
            dayName="Wednesday"
            changeNotify={v => this.dailySummary(2, v)}
          />
          <DaySummary
            dayName="Thursday"
            changeNotify={v => this.dailySummary(3, v)}
          />
          <DaySummary
            dayName="Friday"
            changeNotify={v => this.dailySummary(4, v)}
          />
        </table>
        <h3 className="primary-col">Weekly Total {this.state.weeklySummary}</h3>
        <h3 className="primary-col">
          Weekly Quota {minsToTimeStr(this.weeklyRequired)}
        </h3>
        <h3
          className={
            timeStrToMins(this.state.overTime) > 0 ? "primary-col" : ""
          }
        >
          Overtime {this.state.overTime}
        </h3>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
