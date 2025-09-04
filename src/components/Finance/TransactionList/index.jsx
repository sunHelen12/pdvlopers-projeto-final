import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "./TransactionList.module.css";

const transacoes = [
    { month: "Jan", entrada: 1000, saida: 1208, data: "2025-01-10" },
    { month: "Fev", entrada: 1700, saida: 1298, data: "2025-02-10" },
    { month: "Mar", entrada: 1250, saida: 1250, data: "2025-03-10" },
    { month: "Abr", entrada: 7300, saida: 4024, data: "2025-04-10" },
    { month: "Mai", entrada: 2100, saida: 1200, data: "2025-05-10" },
    { month: "Jun", entrada: 500, saida: 1700, data: "2025-06-10" },
    { month: "Jul", entrada: 987, saida: 2400, data: "2025-07-10" },
    { month: "Ago", entrada: 3000, saida: 1398, data: "2025-08-12" },
    { month: "Set", entrada: 2000, saida: 9800, data: "2025-09-18" },
    { month: "Out", entrada: 2780, saida: 3908, data: "2024-10-05" },
    { month: "Nov", entrada: 1890, saida: 4800, data: "2024-11-22" },
    { month: "Dez", entrada: 2390, saida: 3800, data: "2024-12-15" },
];

function agruparTransacoes(dados) {
    // Agrupa transações por mês + ano
    const agrupado = {};

    dados.forEach((t) => {
        const data = new Date(t.data);
        const key = `${data.getMonth()}-${data.getFullYear()}`; // 0-11 + ano
        const monthLabel = `${t.month}/${data.getFullYear()}`;    // ex: "Out/2024"

        if (!agrupado[key]) {
            agrupado[key] = { monthLabel, entrada: 0, saida: 0 };
        }

        if (t.entrada) agrupado[key].entrada += t.entrada;
        if (t.saida) agrupado[key].saida += t.saida;
    });

    // Ordena do mais antigo para o mais recente
    return Object.values(agrupado).sort((a, b) => {
        const [mesA, anoA] = a.monthLabel.split("/").map(Number);
        const [mesB, anoB] = b.monthLabel.split("/").map(Number);
        return anoA === anoB ? mesA - mesB : anoA - anoB;
    });
}

// Função para filtrar pelo período
function filtrarTransacoes(transacoes, meses) {
    const hoje = new Date();
    const mesAtual = hoje.getMonth(); // 0 = Janeiro, 11 = Dezembro
    const anoAtual = hoje.getFullYear();

    return transacoes.filter((transacao) => {
        const data = new Date(transacao.data);
        const mesTransacao = data.getMonth();
        const anoTransacao = data.getFullYear();

        // Diferença total em meses entre hoje e a transação
        const diffMeses = (anoAtual - anoTransacao) * 12 + (mesAtual - mesTransacao);

        // Mostra só transações dentro do período solicitado
        return diffMeses >= 0 && diffMeses < meses;
    });
}

export function TransactionList({ periodo, setPeriodo }) {
    const dadosFiltrados = filtrarTransacoes(transacoes, periodo);
    const dadosAgrupados = agruparTransacoes(dadosFiltrados);

    return (
        <div className={styles.chartContainer}>
            <div className={styles.graphic}>
                <ResponsiveContainer width="80%" height={300}>
                    <BarChart data={dadosAgrupados}>
                        <XAxis dataKey="monthLabel" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="entrada" fill="green" />
                        <Bar dataKey="saida" fill="red" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => setPeriodo(1)}>1 Mês</button>
                <button className={styles.button} onClick={() => setPeriodo(3)}>3 Meses</button>
                <button className={styles.button} onClick={() => setPeriodo(6)}>6 Meses</button>
                <button className={styles.button} onClick={() => setPeriodo(12)}>12 Meses</button>
            </div>
        </div>
    );
}

