import styles from './TransictionItem.module.css'
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export function TransactionItem({ title, category, date, amount }) {
    const isPositive = amount >= 0;

    return (
        <div className={styles.item}>
            <div className={styles.iconWrapper}>
                {isPositive ? (
                    <FaArrowTrendUp className={styles.iconIncome} size={18} />
                ) : (
                    <FaArrowTrendDown className={styles.iconExpense} size={18} />
                )}
            </div>
            <div className={styles.details}>
                <span className={styles.title}>{title}</span>
                <div className={styles.meta}>
                    <span className={styles.category}>{category}</span>
                    <span className={styles.date}>{date}</span>
                </div>
            </div>
            <div
                className={
                    isPositive ? styles.amountIncome : styles.amountExpense
                }
            >
                {isPositive ? "+" : "-"}R$ {Math.abs(amount).toFixed(2)}
            </div>
        </div>
    );
}
