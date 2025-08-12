import styles from "./finances.module.css";

import { Button } from "../../components/Finance/Button";
import { TransactionCard } from "../../components/Finance/TransactionCard";
import { Tabs } from "../../components/Finance/Tabs";
import { FinancesHeader } from "../../components/Finance/FinancesHeader";
import { TransactionItem } from "../../components/Finance/TransactionItem";

export function Finances() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <FinancesHeader>
                    <Button />
                </FinancesHeader>
            </div>

            <div className={styles.cards}>
                <TransactionCard title="Total Entradas" amount="R$ 239,90" subtitle="Este mês" icon="📈" color="green" />
                <TransactionCard title="Total Saídas" amount="R$ 1.700,00" subtitle="Este mês" icon="📉" color="red" />
                <TransactionCard title="Saldo" amount="R$ -1.460,10" subtitle="Saldo atual" icon="💰" color="red" />
                <TransactionCard title="Transações" amount="4" subtitle="Este mês" icon="📅" color="black" />
            </div>

            <div className={styles.division}>
                <Tabs />
            </div>

            <div>
                <TransactionItem
                    title="Venda #001"
                    category='vendas'
                    date='12/08/2025'
                    amount={150}
                />
                <TransactionItem
                    title="Compra de Estoque"
                    category='estoque'
                    date='12/08/2025'
                    amount={-500}
                />
                <TransactionItem
                    title="Venda #002"
                    category='vendas'
                    date='12/08/2025'
                    amount={150}
                />
                <TransactionItem
                    title="Aluguel"
                    category='Despesas'
                    date='12/08/2025'
                    amount={150}
                />
                <TransactionItem
                    title={`Venda #001`}
                    category='vendas'
                    date='12/08/2025'
                    amount={-1200}
                />

            </div>
        </div>
    );
}
