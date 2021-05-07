import Sensor from "./Sensor.js";

//Ajax config
$.ajaxSetup({
  cache: false,
});

//Instance sensor
const sensor = new Sensor();

//Start Reading Sensors
sensor.start();
