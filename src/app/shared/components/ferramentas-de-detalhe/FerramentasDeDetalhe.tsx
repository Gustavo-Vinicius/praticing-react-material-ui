import { Theme } from "@emotion/react";
import { Button, Divider, Paper, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { ArrowCircleLeft, FileArrowDown, Plus, TrashSimple } from "phosphor-react";

interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEVoltar?: boolean;

    mostarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;
    mostarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoSalvarEVoltarCarregando?: boolean;

    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvar?: () => void;
    aoClicarEmSalvarEFechar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    textoBotaoNovo = 'Novo',

    mostarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEVoltar = false,

    mostarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEVoltarCarregando = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEFechar
}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

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
            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    startIcon={<FileArrowDown />}
                    onClick={aoClicarEmSalvar}
                >
                    <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                        Salvar
                    </Typography>
                </Button>
            )}

            {mostrarBotaoSalvarCarregando && (
                <Skeleton width={100} height={60} />
            )}

            {(mostrarBotaoSalvarEVoltar && !mostrarBotaoSalvarEVoltarCarregando && !smDown && !mdDown) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    startIcon={<FileArrowDown />}
                >
                    <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                        Salvar e voltar
                    </Typography>

                </Button>
            )}

            {(mostrarBotaoSalvarEVoltarCarregando && !smDown && !mdDown) && (
                <Skeleton width={180} height={60} />
            )}

            {(mostarBotaoApagar && !mostarBotaoApagarCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    startIcon={<TrashSimple />}
                    onClick={aoClicarEmApagar}
                >
                    <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                        Apagar
                    </Typography>
                </Button>
            )}

            {mostarBotaoApagarCarregando && (
                <Skeleton width={110} height={60} />
            )}

            {(mostarBotaoNovo && !mostarBotaoNovoCarregando && !smDown) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    startIcon={<Plus />}
                >
                    <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                        {textoBotaoNovo}
                    </Typography>

                </Button>
            )}

            {(mostarBotaoNovoCarregando && !smDown) && (
                <Skeleton width={110} height={60} />
            )}

            {(
                mostrarBotaoVoltar &&
                (mostarBotaoNovo || mostarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEVoltar)
            ) && (
                    <Divider variant='middle' orientation='vertical' />
                )
            }

            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
                <Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    startIcon={<ArrowCircleLeft />}
                    onClick={aoClicarEmVoltar}
                >
                    <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                        Voltar
                    </Typography>
                </Button>
            )}
            {mostrarBotaoVoltarCarregando && (
                <Skeleton width={110} height={60} />
            )}
        </Box>
    );
}