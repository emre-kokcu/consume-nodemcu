import { DateFormat, DefaultReadingFrequenct, Sensors } from "./Envoriment.js";
export default class Sensor {
  sensors = [];
  readingSensors = [];
  constructor() {
    debugger;
    this.sensors = Sensors;
  }

  start = () => {
    this.sensors.forEach((sensorItem) => {
      this.setReading(sensorItem);
    });
  };

  setReading = (sensorItem) => {
    this.bindTable(sensorItem);
    const interval = setInterval(
      () => {
        console.log({
          sensorName: sensorItem,
          readDate: moment(new Date()).format(DateFormat),
        });
        $(
          `#${sensorItem.name.toString().replace(/\s/g, "")}-status`
        ).removeClass("connecting non-connected connected").addClass("connected");
        $(
          `#${sensorItem.name.toString().replace(/\s/g, "")}-status-text`
        ).html("Connected");
        $(
          `#${sensorItem.name.toString().replace(/\s/g, "")}-last-read-date`
        ).html(moment(new Date()).format(DateFormat));
        $(
          `#${sensorItem.name.toString().replace(/\s/g, "")}-live-data`
        ).html((Math.random() * (0.120 - 0.0200) + 0.0200).toFixed(4));
      },
      sensorItem.readingFrequenct
        ? sensorItem.readingFrequenct
        : DefaultReadingFrequenct
    );

    this.readingSensors.push({
      sesorName: sensorItem,
      interval: interval,
    });
  };

  bindTable = (sensorItem) => {
    $("#metric-table > tbody:last-child").append(` 
    <tr>
      <th scope="row">${this.sensors.indexOf(sensorItem) + 1}</th>
      <td>
        <div id="${sensorItem.name
          .toString()
          .replace(/\s/g, "")}-status" class="circle connecting left"></div> 
        <span id="${sensorItem.name
          .toString()
          .replace(/\s/g, "")}-status-text"> Connecting </span>
      </td>
      <td>${sensorItem.name
        .toString()
        .substring(0, 1)
        .toUpperCase()}${sensorItem.name
      .toString()
      .substring(1, sensorItem.name.toString().length)
      .toLowerCase()}
      </td>
      <td id="${sensorItem.name
        .toString()
        .replace(/\s/g, "")}-last-read-date">-</td>
      <td id="${sensorItem.name
        .toString()
        .replace(/\s/g, "")}-live-data">-</td>
    </tr>`);
  };

  getReadingSensors = () => {
    return this.readingSensors;
  };

  getSensors = () => {
    return this.sensors;
  };
}
debugger;
new Sensor().start();
debugger;
