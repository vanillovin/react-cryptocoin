import { useQuery } from 'react-query';
import {
  Switch,
  Route,
  useLocation,
  useParams,
  useRouteMatch,
  useHistory,
} from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import Chart from './Chart';
import Price from './Price';
import { Helmet } from 'react-helmet';

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  padding: 20px;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.textColor};
  margin: 20px 0;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  span:first-child {
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  padding: 20px 0px;
  line-height: 1.4;
  letter-spacing: 0.4px;
  word-spacing: 0.4px;
`;
const Container = styled.div`
  padding: 0 20px;
  max-width: 500px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -moz-box-pack: justify;
`;
const Back = styled.button`
  width: 20%;
  all: unset;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  font-size: 24px;
  &:hover {
    color: gray;
  }
  transition: color 0.2s ease-in-out;
`;
const Title = styled.h1`
  width: 60%;
  text-align: center;
  font-size: 36px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  display: block;
  text-align: center;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 30px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  padding: 7px 0px;
  border-radius: 2px;
  transition: background-color 0.2s ease-in-out;
  color: ${(props) => (props.isActive ? props.theme.accentColor : 'gray')};
  /* background-color: ${(props) =>
    props.isActive
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(255, 255, 255, 0.4)'}; */
  background-color: ${(props) => props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}
interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: object;
  parent: object;
  tags?: ITag[];
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const history = useHistory();
  // const { coinId } = useParams<{ coinId: string }>();
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch('/:coinId/price');
  const chartMatch = useRouteMatch('/:coinId/chart');
  // parameter - uniqQueryKey, fetcher, optinal object
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId),
    {
      // query를 5초마다 refetch
      refetchInterval: 5000,
    }
  );
  /* const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      console.log(infoData);
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(priceData);
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]); */
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Back onClick={() => history.push('/')}>←</Back>
        <Title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </Title>
        <Back />
      </Header>
      {!loading ? (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price</span>
              <span>$ {tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description || 'no description'}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} tickersData={tickersData} />
            </Route>
          </Switch>
        </>
      ) : (
        <Loader>Loading...</Loader>
      )}
    </Container>
  );
}

export default Coin;
