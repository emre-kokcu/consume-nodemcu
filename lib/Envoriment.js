export const Sensors = [
  {
    name: "temperature",
    readDataUrl:
      "https://spring-client-nodemcu.herokuapp.com/nodemcu/temperature",
    readingFrequenct: 1000,
    threshold: 0.48,
  },
  {
    name: "LDR",
    readDataUrl: "https://spring-client-nodemcu.herokuapp.com/nodemcu/ldr",
    readingFrequenct: 4000,
    threshold: 0.45,
  },
  {
    name: "rain",
    readDataUrl: "https://spring-client-nodemcu.herokuapp.com/nodemcu/rain",
    readingFrequenct: 2000,
    threshold: 0.35,
  },
  {
    name: "moisture",
    readDataUrl: "https://spring-client-nodemcu.herokuapp.com/nodemcu/moisture",
    readingFrequenct: 3000,
    threshold: 0.4,
  },
];
export const DefaultReadingFrequenct = 1000;
export const DateFormat = "YYYY-MM-DD HH:mm:ss";
