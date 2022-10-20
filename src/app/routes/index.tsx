import { Buildings, House } from 'phosphor-react';
import { useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { 
    Dashboard,
    ListagemDeCidade
 } from '../pages';

export const AppRoutes = () => {

    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
               label : 'Página inicial',
               path : '/pagina-inicial',
               icon : <House weight='fill'/>,
            },
            {
               label : 'Cidades',
               path : '/cidades',
               icon : <Buildings  weight='fill'/>,
            }
        ])
    }, []);

    return(
        <Routes>
            <Route path='/pagina-inicial' element = {<Dashboard/>}/>
            <Route path='/cidades' element = {<ListagemDeCidade/>}/>
            {/* <Route path='/cidades/detalhe/:id' element = {<Dashboard/>}/> */}

            <Route path='*' element = {<Navigate to = '/pagina-inicial'/>}/>
        </Routes>
    );
}