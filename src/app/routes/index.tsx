import { House, Users } from 'phosphor-react';
import { useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { 
    Dashboard,
    DetalheDePessoas,
    ListagemDePessoas
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
               label : 'Pessoas',
               path : '/pessoas',
               icon : <Users weight='fill'/>,
            }
        ])
    }, []);

    return(
        <Routes>
            <Route path='/pagina-inicial' element = {<Dashboard/>}/>
            <Route path='/pessoas' element = {<ListagemDePessoas/>}/>
            <Route path='/pessoas/detalhe/:id' element = {<DetalheDePessoas/>}/>

            <Route path='*' element = {<Navigate to = '/pagina-inicial'/>}/>
        </Routes>
    );
}