function solution(D) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getDay = (dateStr) => {
    const date = new Date(dateStr);
    return days[(date.getDay() + 6) % 7];
  };

  const output = {
    Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0
  };

  for (let date in D) {
    const day = getDay(date);
    output[day] += D[date];
  }

  for (let i = 0; i < 7; i++) {
    const day = days[i];
    if (output[day] === 0) {
      let prev = i - 1, next = i + 1;
      while (prev >= 0 && output[days[prev]] === 0) prev--;
      while (next < 7 && output[days[next]] === 0) next++;
      if (prev >= 0 && next < 7)
        output[day] = Math.floor((output[days[prev]] + output[days[next]]) / 2);
    }
  }

  return output;
}

module.exports = solution;
