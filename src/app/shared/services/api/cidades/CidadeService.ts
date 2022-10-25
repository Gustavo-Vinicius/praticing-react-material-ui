import { Enviroment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemCidade {
    id: number,
    nome: string;
    

}
export interface IDetalheCidade {
    id: number,
    nome: string;
}

type TCidadeComTotalCount = {
    data: IListagemCidade[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TCidadeComTotalCount | Error> => {
    try {

        const urlRelativa = `/cidades?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nome_like=${filter}`
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

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
    try {

        const { data } = await Api.get(`/cidades${id}`)

        if (data) return data

        throw new Error('Erro ao listar os registros.')

    } catch (error) {
        console.error(error)
        throw new Error((error as { mensage: string }).mensage || 'Erro ao listar os registros.')
    }
};

const create = async (dados : Omit<IDetalheCidade, 'id'>): Promise<number | Error> => {
    try {

        const { data } = await Api.post<IDetalheCidade>(`/Cidades`, dados)

        if (data) return data.id

        return new Error('Erro ao criar o registro.')

    } catch (error) {
        console.error(error)
        return new Error((error as { mensage: string }).mensage || 'Erro ao criar o registro.')
    }
 };

const updateById = async (id: number, dados: IDetalheCidade): Promise<void | Error> => {
    
    try {

        await Api.put<IDetalheCidade>(`/cidades/${id}`)

    } catch (error) {
        console.error(error)
        return new Error((error as { mensage: string }).mensage || 'Erro ao atualizar o registro.')
    }
 };

const deleteById = async (id: number): Promise<void | Error> => {
    try {

        await Api.delete<IDetalheCidade>(`/cidades/${id}`)

    } catch (error) {
        console.error(error)
        return new Error((error as { mensage: string }).mensage || 'Erro ao apagar o registro.')
    }
 };


export const CidadeService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
}