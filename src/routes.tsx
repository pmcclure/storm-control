import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';

import App from './components/App/App';
import NotFound from './components/NotFound/NotFound';
import Subnetting from './components/Subnetting/Subnetting';
import Dns from './components/Dns/Dns';
import Mac from './components/Mac/Mac'; 
import WhoIs from './components/WhoIs/WhoIs';
import Converter from './components/Converter/Converter';
import BitsnBytes from './components/BitsnBytes/BitsnBytes';

const Routes = () => (
  <ReactRouterRoutes>
    {/* The parent route */}
    <Route path="/" element={<App />}>
      {/* Default */}
      <Route index element={<Subnetting />} />
      
      {/* sub-routes */}
      <Route path="subnetting" element={<Subnetting />} />
      <Route path="converter" element={<Converter />} />
      <Route path="bitsnbytes" element={<BitsnBytes />} />
      <Route path="dns" element={<Dns />} />
      <Route path="whois" element={<WhoIs />} />
      <Route path="mac" element={<Mac />} />
      
      {/* Catch-all for 404 */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </ReactRouterRoutes>
);

export default Routes;