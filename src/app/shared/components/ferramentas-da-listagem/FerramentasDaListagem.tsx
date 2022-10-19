import { Button, Paper, TextField, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { Plus } from "phosphor-react";

interface IFerramentasDeListagemProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoCLicarEmNovo?: () => void;
}

export const FerramentasDeListagem: React.FC<IFerramentasDeListagemProps> = ({
    textoDaBusca = '',
    mostrarInputBusca = false,
    aoMudarTextDeBusca,
    aoCLicarEmNovo,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true
}) => {

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
            {mostrarInputBusca && (
                <TextField
                    size='small'
                    value={textoDaBusca}
                    placeholder='Pesquisar...'
                    onChange={(e) => aoMudarTextDeBusca?.(e.target.value)}

                />
            )}
            <Box flex={1} display='flex' justifyContent='end'>
                {mostrarBotaoNovo && (
                    <Button
                        color='primary'
                        disableElevation
                        variant='contained'
                        onClick={aoCLicarEmNovo}
                        endIcon={<Plus />}>
                        {textoBotaoNovo}</Button>
                )}
            </Box>
        </Box>
    );
}