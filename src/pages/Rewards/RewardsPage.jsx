import { Outlet, Link, useLocation } from 'react-router-dom';
import { PointsOverview } from './components/PointsOverview';
import { RewardsList } from './components/RewardsList';

export const RewardsPage = () => {
  const location = useLocation();

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">Programa de Fidelidade</h1>
      <p className="mb-8">Gerencie pontos, recompensas e promoções</p>
      
      <div className="mb-8">
        <div className="flex space-x-4 mb-6">
          <Link to="/rewards" className={`${location.pathname === '/rewards' ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
            Recompensas
          </Link>
          <Link to="/rewards/history" className={`${location.pathname.includes('/history') ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
            Histórico
          </Link>
          <Link to="/rewards/promotions" className={`${location.pathname.includes('/promotions') ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
            Promoções
          </Link>
        </div>
      </div>

      {location.pathname === '/rewards' && (
        <>
          <PointsOverview />
          <RewardsList />
        </>
      )}
      <Outlet />
    </div>
  );
};