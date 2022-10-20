import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDeListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoaService } from "../../shared/services/api/pessoas/PessoaService";

export const ListagemDePessoas: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    useEffect(() => {
        PessoaService.getAll().then((result) => {
            if (result instanceof Error) {
                alert(result.message)
            }else{
                console.log(result)
            }
        })
    }, [])

    return (
        <LayoutBaseDePagina
            titulo='Listagem de pessoas'
            barraDeFerramentas={
                <FerramentasDeListagem
                    mostrarInputBusca
                    textoBotaoNovo='Nova'
                    textoDaBusca={busca}
                    aoMudarTextDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                />
            }
        >

        </LayoutBaseDePagina>
    );
}