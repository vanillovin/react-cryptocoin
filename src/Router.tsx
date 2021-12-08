import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Coins} />
        <Route exact path="/:coinId" component={Coin} />
        <Route path="/:coinId/*" component={Coin} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
