import axios from 'axios'
import { Enviroment } from '../../../environment';
import { erroInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
    baseURL: Enviroment.URL_BASE
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (erro) => erroInterceptor(erro)
);

export { Api };