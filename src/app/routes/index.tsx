import { House } from 'phosphor-react';
import { useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { Dashboard } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {

    const { setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
               label : 'Página inicial',
               path : '/pagina-inicial',
               icon : <House weight='fill'/>,
            }
        ])
    }, []);

    return(
        <Routes>
            <Route path='/pagina-inicial' element = {<Dashboard/>}/>
            <Route path='*' element = {<Navigate to = '/pagina-inicial'/>}/>
        </Routes>
    );
}