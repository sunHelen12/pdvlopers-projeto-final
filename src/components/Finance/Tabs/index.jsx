import { useState } from "react";
import styles from "./Tabs.module.css";

export function Tabs() {
    const [tabAtiva, setTabAtiva] = useState("transacoes");

    return (
        <div>
            <div className={styles.tabsContainer}>
                <button
                    className={
                        tabAtiva === "transacoes"
                            ? `${styles.tab} ${styles.ativa}`
                            : styles.tab
                    }
                    onClick={() => setTabAtiva("transacoes")}
                >
                    Transações
                </button>
                <button
                    className={
                        tabAtiva === "graficos"
                            ? `${styles.tab} ${styles.ativa}`
                            : styles.tab
                    }
                    onClick={() => setTabAtiva("graficos")}
                >
                    Gráficos
                </button>
            </div>

            <div className={styles.tabContent}>
                {tabAtiva === "transacoes" && (
                    <div>
                        <h2>Lista de Transações</h2>
                        {/* Aqui entra seu componente/lista */}
                    </div>
                )}
                {tabAtiva === "graficos" && (
                    <div>
                        <h2>Gráficos</h2>
                        {/* Aqui entra seu componente de gráficos */}
                    </div>
                )}
            </div>
        </div>
    );
}