import styles from './FinancesHeader.module.css'

export function FinancesHeader({ children }) {
    return (
        <div className={styles.header}>
            <div>
                <h1>Financeiro</h1>
                <p>Controle suas finanças e fluxo de caixa</p>
            </div>
            {children}
        </div>
    )
}