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
            <Box sx={{ height: 500, mt: 1 }}>
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
                            name: 'Bệnh viện, nhà trẻ, mẫu giáo, trường phổ thông',
                            TT: '1',
                        },
                        {
                            id: 2,
                            name: 'Cấp điện áp từ 6 kV trở lên',
                            stars: 1.659,
                            TT: '',
                        },
                        {
                            id: 3,
                            name: 'Cấp điện áp dưới 6 kV',
                            stars: 1771,
                            TT: '',
                        },
                        {
                            id: 4,
                            name: 'Chiếu sáng công cộng; đơn vị hành chính sự nghiệp',
                            TT: '2',
                        },
                        {
                            id: 5,
                            name: 'Cấp điện áp từ 6 kV trở lên',
                            stars: 1.827,
                            TT: '',
                        },
                        {
                            id: 6,
                            name: 'Cấp điện áp dưới 6 kV',
                            stars: 1.902,
                            TT: '',
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