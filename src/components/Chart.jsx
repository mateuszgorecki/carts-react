// import { ResponsiveLine } from '@nivo/line'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import styles from '../styles/Chart.module.scss'

const Chart = (props) => {

  // * i leave it for later, maybe i'll use it
  //   const styles = `
  //     width: 1100px;
  //     height: 400px;
  //     margin: 5px 140px 15px 20px;
  // `

  // const priceData = props.products.map(({ title, price }) => ({
  //   x: title,
  //   y: price,
  // }))
  // const discountedPriceData = props.products.map(
  //   ({ title, discountedPrice, quantity }) => ({
  //     x: title,
  //     y: discountedPrice / quantity,
  //   })
  // )
  // const transformedData = [
  //   { id: 'price', data: priceData },
  //   { id: 'discounted', data: discountedPriceData },
  // ]

  const data = props.products.map(
    ({ title, price, discountedPrice, quantity }) => ({
      title,
      price,
      discountedPrice: Math.ceil(discountedPrice / quantity),
    })
  )

  const renderLineChart = (
    <ResponsiveContainer width='100%'>
      <LineChart
        data={data}
        margin={{ top: 5, right: 140, bottom: 15, left: 20 }}
      >
        <Line
          type='linear'
          dataKey='price'
          stroke='#0f0'
        />
        <Line
          type='linear'
          dataKey='discountedPrice'
          stroke='#f00'
        />
        <XAxis
          dataKey='title'
          stroke='#000'
          angle={10}
          textAnchor='start'
          fontSize={12}
        />
        <YAxis stroke='#000' />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )

  return (
    <div className={styles.chart}>
      {/* <ResponsiveLine
        data={transformedData}
        margin={{ top: 50, right: 140, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
        }}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 7,
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        pointSize={8}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
          },
        ]}
        isInteractive={false}
      /> */}
      {renderLineChart}
    </div>
  )
}

export default Chart
