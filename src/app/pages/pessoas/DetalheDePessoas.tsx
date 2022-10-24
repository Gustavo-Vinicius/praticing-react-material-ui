import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const DetalheDePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>();

    const navigate = useNavigate();

    const handleSave = () => {
        console.log('Save')
    }
    const handleDelete = () => {
        console.log('Save')
    }


    return (

        <LayoutBaseDePagina
            titulo='Detalhe de pessoa'
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEVoltar
                    mostarBotaoNovo={id !== 'nova'}
                    mostarBotaoApagar={id !== 'nova'}

                    aoClicarEmSalvarEFechar={handleSave}
                    aoClicarEmApagar={handleDelete}
                    aoClicarEmSalvar={handleSave}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/novo')}

                />
            }
        >

            <p>DetalheDePessoas{id}</p>

        </LayoutBaseDePagina>
    )
}