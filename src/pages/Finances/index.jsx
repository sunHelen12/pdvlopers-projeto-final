import styles from "./finances.module.css";

import { Button } from "../../components/Finance/Button";
import { TransactionCard } from "../../components/Finance/TransactionCard";
import { Division } from "../../components/Finance/Division";

export function Finances() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1>Financeiro</h1>
                    <p>Controle suas finanças e fluxo de caixa</p>
                </div>
                <Button icon="+" text="Nova Transação" onClick={() => console.log('Abrir modal')} />
            </div>

            <div className={styles.cards}>
                <TransactionCard title="Total Entradas" amount="R$ 239,90" subtitle="Este mês" icon="📈" color="green" />
                <TransactionCard title="Total Saídas" amount="R$ 1.700,00" subtitle="Este mês" icon="📉" color="red" />
                <TransactionCard title="Saldo" amount="R$ -1.460,10" subtitle="Saldo atual" icon="💰" color="red" />
                <TransactionCard title="Transações" amount="4" subtitle="Este mês" icon="📅" color="black" />
            </div>

            <div className={styles.division}>
                <Division />
            </div>
        </div>
    );
}
