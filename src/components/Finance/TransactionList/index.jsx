// TransactionList.jsx
import { TransactionItem } from "./TransactionItem";
import styles from "./TransactionList.module.css";

export function TransactionList({ transactions }) {
    return (
        <div className={styles.list}>
            <h3>Últimas Transações</h3>
            <p className={styles.subtitle}>
                Histórico de entradas e saídas
            </p>
            <div className={styles.items}>
                {transactions.map((t, i) => (
                    <TransactionItem key={i} {...t} />
                ))}
            </div>
        </div>
    );
}
