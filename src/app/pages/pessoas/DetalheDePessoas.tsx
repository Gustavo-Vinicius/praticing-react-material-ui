import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoaService } from "../../shared/services/api/pessoas/PessoaService";

interface IFormData {
    email: string;
    cidadeId: number;
    nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = ({ }) => {

    const { id = 'nova' } = useParams<'id'>()

    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null)

    const [isLoading, setIsLoading] = useState(false)
    const [nome, setNome] = useState('')

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true)

            PessoaService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false)

                    if (result instanceof Error) {
                        alert(result.message)
                        navigate('/pessoas')
                    } else {
                        setNome(result.nomeCompleto)
                        console.log(result)

                        formRef.current?.setData(result)

                    }
                })
        }else{
            formRef.current?.setData({
                email: '',
                cidadeId: '',
                nomeCompleto: ''

            })
        }
    }, [id])

    const handleSave = (dados: IFormData) => {
        setIsLoading(true)
        if (id === 'nova') {
            PessoaService
                .create(dados)
                .then((result) => {
                    setIsLoading(false)
                    if (result instanceof Error) {
                        alert(result.message)
                    } else {
                        navigate(`/pessoas/detalhe/${result}`)
                    }
                })
        } else {
            setIsLoading(true)
            if (id === 'nova') {
                PessoaService
                    .updateById(Number(id), { id: Number(id), ...dados })
                    .then((result) => {
                        setIsLoading(false)
                        if (result instanceof Error) {
                            alert(result.message)
                        }
                    })
            }
        }
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

                    aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmSalvar={() => formRef.current?.submitForm()}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/novo')}

                />
            }
        >

            <Form ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>
                    <Grid container direction='column' padding={2} spacing={2}>

                        { isLoading &&(
                            <Grid item>
                                <LinearProgress variant='indeterminate' />
                            </Grid>
                        )}
                        <Grid item>
                            <Typography variant='h6'>Geral</Typography>
                        </Grid>

                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2} >

                                <VTextField
                                    fullWidth
                                    label='Nome Completo'
                                    name='nomeCompleto' 
                                    disabled ={isLoading}
                                    onChange={e => setNome(e.target.value)}
                                    />

                            </Grid>

                        </Grid>
                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>

                                <VTextField
                                    fullWidth
                                    label='Email'
                                    name='email' 
                                    disabled ={isLoading}/>

                            </Grid>
                        </Grid>
                        <Grid container item direction='row' spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>

                                <VTextField
                                    fullWidth
                                    label='Cidade'
                                    name='cidadeId' 
                                    disabled ={isLoading}/>

                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Form>
        </LayoutBaseDePagina>
    )
}