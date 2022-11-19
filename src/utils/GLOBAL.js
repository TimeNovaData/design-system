export default {
  debounce: (time, fn, name) => {
    return (...args) => {
      clearTimeout(window[name]);
      window[name] = setTimeout(() => {
        fn(...args);
      }, time);
    };
  }

}
