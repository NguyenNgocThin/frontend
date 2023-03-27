import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Card } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';

// style constant
const useStyles = makeStyles((theme) => ({
    frame: {
        height: 'calc(100vh - 210px)',
        border: '1px solid',
        borderColor: theme.palette.primary.light
    }
}));

//============================|| MATERIAL ICONS ||============================//

const MaterialIcons = () => (
    <MainCard title="Bảng giá điện cũ">
        <Card sx={{ overflow: 'hidden' }}></Card>
    </MainCard>
);

export default MaterialIcons;

