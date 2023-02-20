import { Box, Typography, Stack } from '@pankod/refine-mui';
import React from 'react';
import { PieChartProps } from 'interfaces/home';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({title, value, series, colors }: PieChartProps) => {
  return (
    <Box
    id="chart"
    flex={1}
    display="flex"
    flexDirection="row"
    bgcolor={'#fcfcfc'}
    justifyContent={'space-between'}
    alignItems={'center'}
    pl={3.5}
    py={2}
    gap={2}
    borderRadius={'15px'}
    minHeight={'110px'}
    width='fit-content'

    >
      <Stack direction="column">
      <Typography fontSize={14} color="#808191">{title}</Typography>
      <Typography fontSize={24} fontWeight={700} color="#11142d" mt={1}>{value}</Typography>
      </Stack>
      <ReactApexChart options={{chart: { type: 'donut'}, colors, legend: {show: false}, dataLabels: {enabled: false}}} series={series} type="donut" width={120}  />
    </Box>
  )
}

export default PieChart