import { AxiosError } from "axios";

export const erroInterceptor = (erro: AxiosError) => {
    if(erro.message === 'Network'){
        return Promise.reject(new Error('Erro de conexão.'))
    }
    if(erro.response?.status === 401){
      // Do something
    }

    return Promise.reject(erro);

}