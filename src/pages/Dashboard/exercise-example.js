function celsiusToFahrenheit(temperatures) {
  const fahrenheitTemperatures = [];

  for (let i = 0; i < temperatures.length; i++) {
    const fahrenheit = (temperatures[i] * 9) / 5 + 32;
    fahrenheitTemperatures.push(fahrenheit);
  }

  return fahrenheitTemperatures;
}

console.log(celsiusToFahrenheit([15, 20, 22, 18, 24, 21, 19]));
