import { Outlet, Link, useLocation } from 'react-router-dom';
import { PointsOverview } from '../components/PointsOverview/PointsOverview';  
import { RewardsList } from '../components/RewardsList/RewardsList';          
import styles from './RewardsPage.module.css';  

export const RewardsPage = () => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Programa de Fidelidade</h1>
        <p className={styles.description}>Gerencie pontos, recompensas e promoções</p>
      </div>
      
      
      <div className={styles.navContainer}>
        <div className={styles.navLinks}>
          <Link 
            to="/rewards" 
            className={`${styles.link} ${location.pathname === '/rewards' ? styles.linkActive : ''}`}
          >
            Visão Geral
          </Link>

          {/* Precisa criar essa subpasta */}
          <Link 
            to="/rewards/available" 
            className={`${styles.link} ${location.pathname.includes('/available') ? styles.linkActive : ''}`}
          >
            Recompensas
          </Link>
          <Link 
            to="/rewards/history" 
            className={`${styles.link} ${location.pathname.includes('/history') ? styles.linkActive : ''}`}
          >
            Histórico
          </Link>
          <Link 
            to="/rewards/promotions" 
            className={`${styles.link} ${location.pathname.includes('/promotions') ? styles.linkActive : ''}`}
          >
            Promoções
          </Link>
        </div>
      </div>

      {location.pathname === '/rewards' && (
        <>
          <PointsOverview />
        </>
      )}
      <Outlet />
    </div>
  );
};