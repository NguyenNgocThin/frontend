import * as React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {
    GridColumnMenu,
    GridColumnMenuContainer,
    GridColumnMenuFilterItem,
    GridColumnMenuSortItem,
    useGridApiRef,
    DataGridPro,
} from '@mui/x-data-grid-pro';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const StyledGridColumnMenuContainer = styled(GridColumnMenuContainer)(
    ({ theme, ownerState }) => ({
        background: theme.palette[ownerState.color].main,
    }),
);

const StyledGridColumnMenu = styled(GridColumnMenu)(({ theme, ownerState }) => ({
    background: theme.palette[ownerState.color].main,
}));

function CustomColumnMenuComponent(props) {
    const { hideMenu, colDef, color, ...other } = props;

    if (colDef.field === 'name') {
        return (
            <StyledGridColumnMenuContainer
                hideMenu={hideMenu}
                colDef={colDef}
                ownerState={{ color }}
                {...other}
            >
                <GridColumnMenuSortItem onClick={hideMenu} colDef={colDef} />
                <GridColumnMenuFilterItem onClick={hideMenu} colDef={colDef} />
            </StyledGridColumnMenuContainer>
        );
    }
    if (colDef.field === 'stars') {
        return (
            <StyledGridColumnMenuContainer
                hideMenu={hideMenu}
                colDef={colDef}
                ownerState={{ color }}
                {...other}
            >
                <Box
                    sx={{
                        width: 127,
                        height: 160,
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <StarOutlineIcon sx={{ fontSize: 80 }} />
                </Box>
            </StyledGridColumnMenuContainer>
        );
    }
    return (
        <StyledGridColumnMenu
            hideMenu={hideMenu}
            colDef={colDef}
            ownerState={{ color }}
            {...other}
        />
    );
}

CustomColumnMenuComponent.propTypes = {
    colDef: PropTypes.object.isRequired,
    color: PropTypes.oneOf(['primary', 'secondary']).isRequired,
    hideMenu: PropTypes.func.isRequired,
};

export { CustomColumnMenuComponent };

export default function CustomColumnMenu() {
    const [color, setColor] = React.useState('primary');
    const apiRef = useGridApiRef();

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ height: 1000, mt: 1 }}>
                <DataGridPro
                    apiRef={apiRef}
                    columns={[
                        { field: 'TT', width: 250 },
                        { field: 'name', width: 450, headerName: 'Nhóm đối tượng khách hàng' },
                        { field: 'stars', width: 350, headerName: 'Giá bán điện (đồng/kWh)' },
                    ]}
                    rows={[
                        {
                            id: 1,
                            name: 'Giá bán lẻ điện sinh hoạt',
                            TT: '1',
                        },
                        {
                            id: 2,
                            name: 'Bậc 1: Cho kWh từ 0 - 50',
                            stars: 1.678,
                            TT: '',
                        },
                        {
                            id: 3,
                            name: 'Bậc 2: Cho kWh từ 51 - 100',
                            stars: 1.734,
                            TT: '',
                        },
                        {
                            id: 4,
                            name: 'Bậc 3: Cho kWh từ 101 - 200',
                            stars: 2.014,
                            TT: '',
                        },
                        {
                            id: 5,
                            name: 'Bậc 4: Cho kWh từ 201 - 300',
                            stars: 2.536,
                            TT: '',
                        },
                        {
                            id: 6,
                            name: 'Bậc 5: Cho kWh từ 301 - 400',
                            stars: 2.834,
                            TT: '',
                        },
                        {
                            id: 7,
                            name: 'Bậc 6: Cho kWh từ 401 trở lên',
                            stars: 2.927,
                            TT: '',
                        },
                        {
                            id: 8,
                            name: 'Giá bán lẻ điện sinh hoạt dùng công tơ thẻ trả trước',
                            stars: 2.461,
                            TT: '2',
                        },
                    ]}
                    slots={{
                        columnMenu: CustomColumnMenuComponent,
                    }}
                    slotProps={{
                        columnMenu: { color },
                    }}
                />
            </Box>


        </Box>


    );
}