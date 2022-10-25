import { Buildings, House, Users } from 'phosphor-react';
import { useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { 
    Dashboard,
    DetalheDeCidades,
    DetalheDePessoas,
    ListagemDeCidades,
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
               label : 'Cidades',
               path : '/cidades',
               icon : <Buildings weight='fill'/>,
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

            <Route path='/cidades' element = {<ListagemDeCidades/>}/>
            <Route path='/cidades/detalhe/:id' element = {<DetalheDeCidades/>}/>

            

            <Route path='*' element = {<Navigate to = '/pagina-inicial'/>}/>
        </Routes>
    );
}