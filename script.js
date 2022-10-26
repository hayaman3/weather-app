// const search = document.querySelector('.search');

// function getCityName() {
//   const input = document.querySelector('.search');
//   const cityName = input.value;
//   // console.log(cityName);
//   if (cityName) {
//     // console.log(cityName);

//     // remove whitespace for the api call
//     return cityName
//       .replace(/(\s+$|^\s+)/g, '') // remove whitespace from begining and end of string
//       .replace(/(,\s+)/g, ',') // remove any white space that follows a comma
//       .replace(/(\s+,)/g, ',') // remove any white space that preceeds a comma
//       .replace(/\s+/g, '+'); // replace any remaining white space with +, so it works in api call
//   }
//   return '';
// }

// async function APIcall() {
//   const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${getCityName()}&APPID=20f7632ffc2c022654e4093c6947b4f4`;
//   const response = await fetch(cityUrl, { mode: 'cors' });
//   const data = await response.json();
//   console.log(data);
// }

// function handleError(fn) {
//   return function (...params) {
//     return fn(...params).catch((err) => {
//       console.error(err);
//       // console.log('error');
//     });
//   };
// }

// search.addEventListener('keydown', (e) => {
//   if (e.code === 'Enter') {
//     handleError(APIcall());
//     // APIcall();
//   }
// });

console.log("workin")

// 'https://api.openweathermap.org/data/2.5/weather?q=,uk&APPID=70cd19f02912f92eb511b46f4e6e011e',
