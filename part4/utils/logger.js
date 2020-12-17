const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`%c${ [...params].join(' ') }`,'color: green; background-color: LightGreen; padding: 3px 5px; border-radius: 2px; border: 1px solid green;');
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(`%c${ [...params].join(' ') }`,'color: red; background-color: LightRed; padding: 3px 5px; border-radius: 2px; border: 1px solid red;');
  }
};

const group = (params) => {
  console.group(`%c${params}`,'font-size: 20px; color: red;');
};

module.exports = {
  info,
  error,
  group,
};