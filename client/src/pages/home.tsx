import { useList } from '@pankod/refine-core';
import { Typography, Box, Stack } from '@pankod/refine-mui';

import { PieChart, StockReferrals, TotalRevenue, StockCard } from 'components';

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: 'stocks',
    config: {
      pagination: {
        pageSize: 4
      }
    }
  })

  const latestStocks = data?.data ?? [];

  if(isLoading) return <Typography>Loading...</Typography>
  if(isError) return <Typography>Something went wrong!</Typography>

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart 
          title="Stocks for Sale"
          value={684}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart 
          title="Stocks for Rent"
          value={550}
          series={[60, 40]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart 
          title="Total customers"
          value={5684}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart 
          title="Stocks for Cities"
          value={555}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
      </Box>

      <Stack mt="25px" width="100%" direction={{ xs: 'column', lg: 'row' }} gap={4}>
        <TotalRevenue />
        <StockReferrals />
      </Stack>

      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">Latest Stocks</Typography>

        <Box mt={2.5} sx={{ display: 'flex', flexWrap: 'wrap', gap: 4}}>
          {latestStocks.map((stock) => (
            <StockCard
            key={stock._id}
            id={stock._id}
            kode={stock.kode}
            item={stock.item}
            location={stock.location}
            actual={stock.actual}
            photo={stock.photo}
          />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Home