const times = (n) => {
  return (f) => {
    Array(n)
      .fill()
      .map((_, i) => f(i));
  };
};

export default times;
