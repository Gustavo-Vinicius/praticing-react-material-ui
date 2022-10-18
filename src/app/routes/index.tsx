import { Button } from '@mui/material';
import { House, Star } from 'phosphor-react';
import { useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {

    const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
               label : 'Página inicial',
               path : '/pagina-inicial',
               icon : <House/>,
            }
        ])
    }, []);

    return(
        <Routes>
            <Route path='/pagina-inicial' element = {<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Toggle Drawer</Button>}/>
            <Route path='*' element = {<Navigate to = '/pagina-inicial'/>}/>
        </Routes>
    );
}