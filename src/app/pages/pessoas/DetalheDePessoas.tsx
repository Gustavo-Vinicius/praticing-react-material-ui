import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoaService } from "../../shared/services/api/pessoas/PessoaService";

export const DetalheDePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>();

    const navigate = useNavigate();

     const [isLoading, setIsLoading] = useState(false)
     const [nome, setNome] = useState('')

    useEffect(() => {
        if(id !== 'nova'){
            setIsLoading(true)

            PessoaService.getById(Number(id))
            .then((result) => {
                setIsLoading(false)

                if(result instanceof Error){
                    alert(result.message)
                    navigate('/pessoas')
                }else{
                    setNome(result.nomeCompleto)
                    console.log(result)
                }
            })
        }
    }, [id])

    const handleSave = () => {
        console.log('Save')
    }
    const handleDelete = (id: number) => {

        if (confirm('Realmente deseja apagar')) {
            PessoaService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message)
                    } else {
                        alert('Registro apagado com sucesso!')
                        navigate('/pessoas')
                    }
                })
        }
    }

    return (

        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova pessoa' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEVoltar
                    mostarBotaoNovo={id !== 'nova'}
                    mostarBotaoApagar={id !== 'nova'}

                    aoClicarEmSalvarEFechar={handleSave}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmSalvar={handleSave}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/novo')}

                />
            }
        >

            {isLoading &&(
                <LinearProgress variant='indeterminate'/>
            )}

            <p>DetalheDePessoas{id}</p>

        </LayoutBaseDePagina>
    )
}