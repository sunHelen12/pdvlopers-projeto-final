import styles from "./messages.module.css";

import { Header } from "../../components/Finance/Header";
import { Tabs } from "../../components/Finance/Tabs";
import { Button } from "../../components/Finance/Button";

import { FaRegPaperPlane } from "react-icons/fa";

export function Messages() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header
                    title="Mensagens" subtitle="Envie promoções e mensagens para seus clientes">
                </Header>
            </div>

            <div className={styles.tabs}>
                <Tabs />
                <Button icon={<FaRegPaperPlane />} text="Criar Email" />
                <Button icon={<FaRegPaperPlane />} text="Criar Mensagem" />
            </div>
        </div>
    )
}
