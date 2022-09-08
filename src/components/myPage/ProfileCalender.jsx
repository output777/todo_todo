import React, { useEffect, useState } from 'react'

const ProfileCalender = () => {
  const now = new Date();
  const todayWeek = now.getDay();
  const today = now.getDate();
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  console.log(now)
  console.log(todayWeek)
  console.log(today)
  console.log(lastday)

  const [daylist, setDaylist] = useState([]);
  const [weeklist, setWeeklist] = useState([]);

  const getAlldata = (today, lastday) => {
    let dates = [];

    dates[0] = today;

    for (let i = 1; i <= 6; i++) {
      today++;
      if (today > lastday) {
        today = 1;
        dates[i] = today;
      } else {
        dates[i] = today;
      }
    }
    console.log(dates);
    return dates;
  }

  useEffect(() => {
    getAlldata(today, lastday);
  }, [])

  return (
    <div>ProfileCalender</div>
  )
}

export default ProfileCalender