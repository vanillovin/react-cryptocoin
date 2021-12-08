import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { Helmet } from 'react-helmet';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number; // 종가
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <>
          <Helmet>
            <title>{coinId} chart</title>
          </Helmet>
          <ApexChart
            type="line"
            series={[
              {
                name: 'Price',
                data: data?.map((price) => price.close),
              },
            ]}
            options={{
              theme: {
                mode: isDark ? 'dark' : 'light',
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                // background: 'transparent',
              },
              grid: { show: false },
              stroke: {
                curve: 'smooth',
                width: 4,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: 'datetime',
                categories: data?.map((price) => price.time_close),
              },
              fill: {
                type: 'gradient',
                gradient: { gradientToColors: ['royalblue'], stops: [0, 100] },
              },
              colors: ['rosybrown'],
              // 마우스를 올리면 보이는 것. yValue => "close": number
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
        </>
      )}
    </>
  );
}

export default Chart;
