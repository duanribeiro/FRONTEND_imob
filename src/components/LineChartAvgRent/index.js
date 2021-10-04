import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import "./styles.scss"


export default function LineChartAvgRent() {
  const [avgRentPerMonth, setAvgRentPerMonth] = React.useState([
  {
    'month': 'abril',
    'avg_rent_north': 4081,
    'avg_rent_east': 5121,
    'avg_rent_west': 3055,
    'avg_rent_south': 4081,
    'avg_rent_center': 4081,
  }, {
    'month': 'maio',
    'avg_rent_north': 3852,
    'avg_rent_east': 5863,
    'avg_rent_west': 3423,
    'avg_rent_south': 4356,
    'avg_rent_center': 4568,
  }
  ])

  // React.useEffect(() => {
  //   fetchHousesPerDistrict()
  // }, [])

  // const fetchHousesPerDistrict = () => {
  //     axios.get(`https://01ldy5zq44.execute-api.us-east-1.amazonaws.com/dev/statistics/houses_per_district`)
  //       .then(response => {
  //         setAvgRentPerMonth(response.data)
  //       })
  //   }

  return (
    <ResponsiveContainer height={300}>
      <LineChart
        data={avgRentPerMonth}
        margin={{
          top: 5,
          right: 30,
          left: 50,
          bottom: 5
        }}
      >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="month" />
            <YAxis domain={[0, 'dataMax']}/>
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px', color: "white" }}/>
            <Line type="monotone" dataKey="avg_rent_north" stroke="#B3B3B3" />
            <Line type="monotone" dataKey="avg_rent_east" stroke="#B3B3B3" />
            <Line type="monotone" dataKey="avg_rent_west" stroke="#B3B3B3" />
            <Line type="monotone" dataKey="avg_rent_south" stroke="#B3B3B3" />
            <Line type="monotone" dataKey="avg_rent_center" stroke="#B3B3B3" />
      </LineChart>
    </ResponsiveContainer>
  );
}
