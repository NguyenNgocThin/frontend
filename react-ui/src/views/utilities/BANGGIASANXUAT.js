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
            <Button
                color={color}
                size="small"
                onClick={(event) => {
                    event.stopPropagation();
                    setColor((current) => (current === 'primary' ? 'secondary' : 'primary'));
                    apiRef.current.showColumnMenu('default');
                }}
            >
                Khách hàng mua điện tại cấp điện áp 20kV được tính theo giá tại cấp điện áp từ 22kV đến dưới 110kV.
            </Button>
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
                            name: 'Cấp điện áp từ 110 kV trở lên',
                            TT: '1.1',
                        },
                        {
                            id: 2,
                            name: 'a) Giờ bình thường',
                            stars: 1.536,
                            TT: '',
                        },
                        {
                            id: 3,
                            name: 'b) Giờ thấp điểm',
                            stars: 970,
                            TT: '',
                        },
                        {
                            id: 4,
                            name: 'c) Giờ cao điểm',
                            stars: 2.759,
                            TT: '',
                        },
                        {
                            id: 5,
                            name: 'Cấp điện áp từ 22 kV đến dưới 110 kV',
                            TT: '1.2',
                        },
                        {
                            id: 6,
                            name: 'a) Giờ bình thường',
                            stars: 1.555,
                            TT: '',
                        },
                        {
                            id: 7,
                            name: 'b) Giờ thấp điểm',
                            stars: 1.007,
                            TT: '',
                        },
                        {
                            id: 8,
                            name: 'c) Giờ cao điểm',
                            stars: 2.871,
                            TT: '',
                        },
                        {
                            id: 9,
                            name: 'Cấp điện áp từ 6 kV đến dưới 22 kV',
                            TT: '1.3',
                        },
                        {
                            id: 10,
                            name: 'a) Giờ bình thường',
                            stars: 1.611,
                            TT: '',
                        },
                        {
                            id: 11,
                            name: 'b) Giờ thấp điểm',
                            stars: 1.044,
                            TT: '',
                        },
                        {
                            id: 12,
                            name: 'c) Giờ cao điểm',
                            stars: 2.964,
                            TT: '',
                        },
                        {
                            id: 13,
                            name: 'Cấp điện áp dưới 6 kV',
                            TT: '1.4',
                        },
                        {
                            id: 14,
                            name: 'a) Giờ bình thường',
                            stars: 1.685,
                            TT: '',
                        },
                        {
                            id: 15,
                            name: 'b) Giờ thấp điểm',
                            stars: 1.100,
                            TT: '',
                        },
                        {
                            id: 16,
                            name: 'c) Giờ cao điểm',
                            stars: 3076,
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