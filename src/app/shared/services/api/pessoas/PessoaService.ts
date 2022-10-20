import { IdentificationBadge } from "phosphor-react";
import { Enviroment } from "../../../environment";
import { Api } from "../axios-config";

interface IListagemPessoa {
    id: number,
    email: string;
    cidadeId: number;
    nomeCompleto: string,

}
interface IDetalhePessoa {
    id: number,
    email: string;
    cidadeId: number;
    nomeCompleto: string,
}

type TPessoaComTotalCount = {
    data: IListagemPessoa[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TPessoaComTotalCount | Error> => {
    try {

        const urlRelativa = `/pessoas?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`
        const { data, headers } = await Api.get(urlRelativa)

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS)
            };
        }
        return new Error('Erro ao listar os registros.')

    } catch (error) {
        console.error(error)
        return new Error((error as { mensage: string }).mensage || 'Erro ao listar os registros.')
    }
};

const getById = async (id: number): Promise<any> => {
    try {

        const { data } = await Api.get(`/pessoas${id}`)

        if (data) return data

        return new Error('Erro ao listar os registros.')

    } catch (error) {
        console.error(error)
        return new Error((error as { mensage: string }).mensage || 'Erro ao listar os registros.')
    }
};

const create = async (dados : Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
    try {

        const { data } = await Api.post<IDetalhePessoa>(`/pessoas`, dados)

        if (data) return data.id

        return new Error('Erro ao criar o registro.')

    } catch (error) {
        console.error(error)
        return new Error((error as { mensage: string }).mensage || 'Erro ao criar o registro.')
    }
 };

const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {
    
    try {

        await Api.put<IDetalhePessoa>(`/pessoas/${id}`)

    } catch (error) {
        console.error(error)
        return new Error((error as { mensage: string }).mensage || 'Erro ao atualizar o registro.')
    }
 };

const deleteById = async (id: number): Promise<void | Error> => {
    try {

        await Api.delete<IDetalhePessoa>(`/pessoas/${id}`)

    } catch (error) {
        console.error(error)
        return new Error((error as { mensage: string }).mensage || 'Erro ao apagar o registro.')
    }
 };


export const PessoaService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}