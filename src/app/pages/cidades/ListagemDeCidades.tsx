import React, { useEffect, useMemo, useState } from "react";
import { IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell,
         TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { PencilSimple, Trash } from "phosphor-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { IListagemCidade, CidadeService } from "../../shared/services/api/cidades/CidadeService";
import { FerramentasDeListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { Enviroment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";

export const ListagemDeCidades: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();
    const navigate = useNavigate();

    const [rows, setRows] = useState<IListagemCidade[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [totalCount, setTotalCount] = useState(0)

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true)
        debounce(() => {
            CidadeService.getAll(pagina, busca)
                .then((result) => {
                    setIsLoading(false)
                    if (result instanceof Error) {
                        alert(result.message)
                    } else {
                        console.log(result)

                        setTotalCount(result.totalCount)
                        setRows(result.data)
                    }
                })
        })
    }, [busca, pagina])

    const handleDelete = (id: number) => {

        if (confirm('Realmente deseja apagar')) {
            CidadeService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message)
                    } else {
                        setRows(oldRows => {
                            return [
                                ...oldRows.filter(oldRow => oldRow.id !== id),
                            ]
                        });
                        alert('Registro apagado com sucesso!')
                    }
                })
        }
    }

    return (
        <LayoutBaseDePagina
            titulo='Listagem de Cidades'
            barraDeFerramentas={
                <FerramentasDeListagem
                    mostrarInputBusca
                    textoDaBusca={busca}
                    textoBotaoNovo='Nova'
                    aoCLicarEmNovo={() => navigate('/cidades/detalhe/nova')}
                    aoMudarTextDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
                />
            }
        >
            <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={100}>Ações</TableCell>
                            <TableCell>Nome </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(rows => (
                            <TableRow key={rows.id}>
                                <TableCell>
                                    <IconButton size='small' onClick={() => handleDelete(rows.id)}>
                                        <Trash weight='fill' />
                                    </IconButton>
                                    <IconButton size='small' onClick={() => navigate(`/Cidades/detalhe/${rows.id}`)}>
                                        <PencilSimple weight='fill' />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{rows.nome}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {totalCount === 0 && !isLoading && (
                        <caption>{Enviroment.LISTAGEM_VAZIA}</caption>
                    )}

                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LinearProgress variant="indeterminate" />
                                </TableCell>
                            </TableRow>
                        )}
                        {(totalCount > 0 && totalCount > Enviroment.LIMITE_DE_LINHAS) && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Pagination
                                        page={pagina}
                                        count={Math.ceil(totalCount / Enviroment.LIMITE_DE_LINHAS)}
                                        onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })} />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>

        </LayoutBaseDePagina >
    );
}