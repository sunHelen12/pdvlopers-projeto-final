
import styles from './TransactionList.module.css'

export function TransactionList() {
    return (
        <div className={styles.list}>
            <h3>Últimas Transações</h3>
            <p className={styles.subtitle}>
                Histórico de entradas e saídas
            </p>
        </div>
    );
}
