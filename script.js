async function check() {
  const response = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=70cd19f02912f92eb511b46f4e6e011e',
    { mode: 'cors' },
  );
  const data = await response.json();
  console.log(data);
}

check();
