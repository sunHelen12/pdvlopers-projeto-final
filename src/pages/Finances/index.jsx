import styles from "./finances.module.css";

import { Button } from "../../components/Finance/Button";
import { TransactionCard } from "../../components/Finance/TransactionCard";
import { Tabs } from "../../components/Finance/Tabs";
import { Header } from "../../components/Finance/Header"

import { FaPlus } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md"
import { CiCalendar } from "react-icons/ci";

export function Finances() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header
                    title="Financeiro" subtitle="Controle suas finanças e fluxo de caixa"
                />
                <div>
                    <Button icon={<FaPlus />} text="Nova Transação" />
                </div>
            </div>

            <div className={styles.cards}>
                <TransactionCard title="Total Entradas" amount="R$ 239,90" subtitle="Este mês" icon={<FaArrowTrendUp />} color="green" />
                <TransactionCard title="Total Saídas" amount="R$ 1.700,00" subtitle="Este mês" icon={<FaArrowTrendDown />} color="red" />
                <TransactionCard title="Saldo" amount="R$ -1.460,10" subtitle="Saldo atual" icon={<MdOutlineAttachMoney />} color="red" />
                <TransactionCard title="Transações" amount="4" subtitle="Este mês" icon={<CiCalendar />} color="black" />
            </div>

            <div className={styles.tabs}>
                <Tabs />
            </div>

        </div >
    );
}
