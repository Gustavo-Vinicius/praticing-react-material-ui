import { Button, Divider, Paper, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { ArrowCircleLeft, FileArrowDown, Plus, TrashSimple } from "phosphor-react";


export const FerramentasDeDetalhe: React.FC = () => {

    const theme = useTheme();

    return (

        <Box
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            display='flex'
            alignItems='center'
            height={theme.spacing(5)}
            component={Paper}
        >
            <Button
                color='primary'
                disableElevation
                variant='contained'
                startIcon={<FileArrowDown  />}>
                Salvar</Button>
            <Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<FileArrowDown  />}>
                Salvar e voltar</Button>
            <Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<TrashSimple  />}>
                Apagar</Button>
            <Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<Plus />}>
                Novo</Button>

                <Divider variant='middle' orientation='vertical'/>

            <Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<ArrowCircleLeft  />}>
                Voltar</Button>
        </Box>
    );
}