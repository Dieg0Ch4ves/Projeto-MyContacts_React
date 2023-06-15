import { Route, useLocation, Switch } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import NovoContato from './pages/NovoContato';
import AlterarContato from './pages/AlterarContato';

export default function Routes() {
  const location = useLocation();
  const trasitions = useTransition(location, {
    from: { opacity: 0, transform: 'translateY(50px)', position: 'absolute' },
    enter: { opacity: 1, transform: 'translateY(0)', position: 'absolute' },
    leave: { opacity: 0, transform: 'translateY(50px)', position: 'absolute' },
  });

  return trasitions((props, item) => (
    <animated.div style={props}>
      <Switch location={item}>
        <Route exact path="/" component={Cadastro} />
        <Route path="/login" component={Login} />
        <Route path="/Home" component={Home} />
        <Route path="/novoContato" component={NovoContato} />
        <Route path="/alterarContato/:id" component={AlterarContato} />
        <Route component={NotFound} />
      </Switch>
    </animated.div>
  ));
}
