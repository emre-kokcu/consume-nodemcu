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
      window.sendNotifications = this.sendNotifications;
    });
  };

  setReading = (sensorItem) => {
    this.bindTable(sensorItem);
    const interval = setInterval(
      () => {
        this.readSensorData(sensorItem);
      },
      sensorItem.readingFrequenct
        ? sensorItem.readingFrequenct
        : DefaultReadingFrequenct
    );

    this.readingSensors.push({
      sesor: sensorItem,
      interval: interval,
    });
  };

  readSensorData = (sensorItem) => {
    let sensorName = sensorItem.name.toString().replace(/\s/g, "");
    $.ajax({
      url: sensorItem.readDataUrl,
      method: "GET",
    })
      .done(function (data) {
        $(`#${sensorName}-status`)
          .removeClass("connecting non-connected connected")
          .addClass("connected");
        $(`#${sensorName}-status-text`).html("Connected");
        $(`#${sensorName}-last-read-date`).html(
          moment(new Date()).format(DateFormat)
        );
        $(`#${sensorName}-data`).html(data);

        if (data && data !== "") {
          if (Number(data) >= sensorItem.threshold) {
            debugger;
            window.sendNotifications(
              `${sensorItem.name} sensörü kritik değeri aştı !`,
              "error"
            );
          } else if (sensorItem.threshold - Number(data) <= 0.05) {
            window.sendNotifications(
              `${sensorItem.name} sensörü kritik değere yaklaştı !`,
              "warn"
            );
          }
        }
      })
      .fail(function (e) {
        $(`#${sensorName}-status`)
          .removeClass("connecting non-connected connected")
          .addClass("connected");
        $(`#${sensorName}-status-text`).html("Non Connected");
        $(`#${sensorName}-last-read-date`).html(
          moment(new Date()).format(DateFormat)
        );
        $(`#${sensorName}-data`).html("error");
        console.error(e);
      });
  };

  sendNotifications = (message, notificationLevel) => {
    $.notify(message, {
      className: notificationLevel,
      position: "right bottom",
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
      <td id="${sensorItem.name.toString().replace(/\s/g, "")}-data">-</td>
      <td id="${sensorItem.name
        .toString()
        .replace(/\s/g, "")}-last-read-date">-</td>
    </tr>`);
  };

  getReadingSensors = () => {
    return this.readingSensors;
  };

  getSensors = () => {
    return this.sensors;
  };
}
