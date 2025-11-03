function solution(D) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getDay = (dateStr) => {

    const [y, m, d] = dateStr.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    const idx = (dt.getDay() + 6) % 7; 
    return days[idx];
  };

  const output = {
    Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0
  };

  const present = {
    Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false
  };

  for (let date in D) {
    const day = getDay(date);
    output[day] += D[date];
    present[day] = true;
  }

  for (let i = 0; i < 7; i++) {
    if (present[days[i]]) continue;

    let prev = i - 1;
    while (prev >= 0 && !present[days[prev]]) prev--;

    let next = i + 1;
    while (next < 7 && !present[days[next]]) next++;

    if (prev >= 0 && next < 7) {
      const startVal = output[days[prev]];
      const endVal = output[days[next]];
      const gap = next - prev; 

      for (let j = prev + 1; j < next; j++) {
        const frac = (j - prev) / gap;
        output[days[j]] = Math.round(startVal + (endVal - startVal) * frac);
        present[days[j]] = true;
      }

      i = next; 
    }
  }

  return output;
}

module.exports = solution;
