import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const Dashboard = () => {
    return (
        <LayoutBaseDePagina
            titulo="Página inicial"
             barraDeFerramentas={(
                <FerramentasDeDetalhe 
                mostarBotaoNovo
                mostrarBotaoSalvarEVoltar
                mostrarBotaoSalvarEVoltarCarregando
                mostrarBotaoVoltar = {false}
                />
            )}>
            Testando
        </LayoutBaseDePagina>
    );
}