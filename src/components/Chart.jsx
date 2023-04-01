import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import CustomTooltip from './CustomTooltip'

import styles from '../styles/Chart.module.scss'

const Chart = (props) => {
  const width = window.innerWidth

  let propsForChart = {
    fontSize: 12,
    textAnchor: 'start',
    angle: 7,
    margin: { top: 5, right: 220, bottom: 40, left: 20 },
  }

  if (width <= 1440 && width > 1200) {
    propsForChart = {
      fontSize: 10,
      margin: { top: 5, right: 140, bottom: 20, left: 20 },
    }
  } else if (width <= 1200 && width > 576) {
    propsForChart = {
      fontSize: 10,
      textAnchor: 'end',
      angle: -70,
      margin: { top: 5, right: 20, bottom: 200, left: 20 },
    }
  } else if(width <= 576) {
    propsForChart = {
      fontSize: 0,
      margin: { top: 5, right: 10, bottom: 0, left: 0 },
    }
  }

  const data = props.products.map(
    ({ title, price, discountedPrice, quantity }) => ({
      title,
      Price: price,
      Discounted: Math.ceil(discountedPrice / quantity),
    })
  )

  return (
    <div className={styles.chart}>
      <ResponsiveContainer width='100%'>
        <LineChart
          data={data}
          margin={propsForChart.margin}
        >
          <Line
            type='monotone'
            dataKey='Price'
            stroke='#AA00FF'
          />
          <Line
            type='monotone'
            dataKey='Discounted'
            stroke='#FF8F00'
          />
          <XAxis
            dataKey='title'
            textAnchor={propsForChart.textAnchor}
            angle={propsForChart.angle}
            fontSize={propsForChart.fontSize}
            stroke='#fff'
          />
          <YAxis stroke='#fff' />
          <Tooltip
            content={(data, index) => {

              return (
                <CustomTooltip
                title={data.payload[0]?.payload.title}
                price={data.payload[0]?.payload.Price}
                discount={data.payload[0]?.payload.Discounted}
              />
              )
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
