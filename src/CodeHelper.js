export const printTiming = (hr, min) => {
  let res = '';
  
  if (hr === 0) { //if no hours show mins
    res = `${min} Mins`;
  }
  else if(hr > 0) { //if there is hours
    if (min === 0) { //if there is hours and no mins
      if (hr === 1) { //if hours is one
        res = `${hr} Hr`; 
      } else {
        res = `${hr} Hrs`;
      }
    } else { //if there is hours and mins
      if (hr === 1) { //if there is one hour and mins
        res = `${hr} Hr ${min} Mins`;
      } else { //if there is hours and mins
        res = `${hr} Hrs ${min} Mins`;
      }
    }
  }
  return res;
}