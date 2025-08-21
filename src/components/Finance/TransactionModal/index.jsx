import { useState } from "react";
import styles from './TransactionModal.module.css'
import { Header } from "../Header";

export function TransactionModal({ onSave, onClose }) {
    const [formData, setFormData] = useState({
        type: "",
        title: "",
        category: "",
        date: "",
        amount: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const amountValue = Number(formData.amount);
        const newTransaction = {
            id: Date.now(),
            ...formData,
            // Se for saída, deixa negativo
            amount: formData.type === "saida" ? -Math.abs(amountValue) : Math.abs(amountValue),
        };

        console.log("Nova transação:", newTransaction); // para verificar
        onSave(newTransaction);
        onClose();
    };


    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <Header
                        title="Registrar Transação"
                        subtitle="Adicione uma nova entrada ou saída financeira."
                        size="small"
                    />
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>

                    {/* Tipo */}
                    <div className={styles.field}>
                        <label>Tipo</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option value="" disabled selected>Selecione o tipo</option>
                            <option value="entrada">Entrada</option>
                            <option value="saida">Saída</option>
                        </select>
                    </div>

                    {/* Descrição */}
                    <div className={styles.field}>
                        <label>Descrição</label>
                        <input
                            type="text"
                            placeholder="Ex: Venda, Aluguel, Compra de estoque..."
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    {/* Valor */}
                    <div className={styles.field}>
                        <label>Valor</label>
                        <input
                            type="number"
                            placeholder="Ex: 1200"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                        />
                    </div>

                    {/* Categoria */}
                    <div className={styles.field}>
                        <label>Categoria</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="" disabled>Selecione a categoria</option>
                            <option value="Vendas">Vendas</option>
                            <option value="Estoque">Estoque</option>
                            <option value="Despesas">Despesas</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>

                    {/* Data */}
                    <div className={styles.field}>
                        <label>Data</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>

                    {/* Botões */}
                    <div className={styles.buttons}>
                        <button type="button" className={styles.cancel} onClick={onClose}>Cancelar</button>
                        <button type="submit" className={styles.save}>Registar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
