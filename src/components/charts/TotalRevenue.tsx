import { Box, Typography, Stack } from '@pankod/refine-mui';
import React from 'react';
import { PieChartProps } from 'interfaces/home';
import ReactApexChart from 'react-apexcharts';
import { ArrowCircleUpRounded } from '@mui/icons-material';
import { TotalRevenueOptions, TotalRevenueSeries } from './charts.config';

const TotalRevenue = () => {
  return (
    <><Box p={4} flex={1} bgcolor="#fcfcfc" id="chart" display="flex" flexDirection="column" borderRadius={'15px'}>
    <Typography fontSize={18} fontWeight={600} color={'#11142d'}>
      Total Revenue
    </Typography>
    <Stack my={'20px'} direction="row" gap={4} flexWrap={"wrap"}>
      <Typography  fontSize={28} fontWeight={700} color={'#11142d'}>€2346,219 </Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <ArrowCircleUpRounded sx={{ color: '#475ae8', fontSize: 25 }}/>
        <Stack>
          <Typography fontSize={15} fontWeight={600} color={'#475be8'}>0,8%</Typography>
        </Stack>
        <Typography fontSize={12} fontWeight={600} color={'#808191'}>Than Last Month</Typography>   
      </Stack>
      <ReactApexChart options={TotalRevenueOptions} series={TotalRevenueSeries} type="bar" height={310} />
      </Box>
      </>
  )
}

export default TotalRevenue