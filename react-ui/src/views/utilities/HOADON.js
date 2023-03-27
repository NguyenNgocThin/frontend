import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@material-ui/styles';
import { Box, Card, Grid } from '@material-ui/core';

// project imports
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import { gridSpacing } from '../../store/constant';

//===============================|| SHADOW BOX ||===============================//

const ShadowBox = ({ shadow }) => (
    <Card sx={{ mb: 3, boxShadow: shadow }}>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 4.5,
                bgcolor: 'primary.light',
                color: 'grey.800'
            }}
        >
            <Box sx={{ color: 'inherit' }}>boxShadow: {shadow}</Box>
        </Box>
    </Card>
);

ShadowBox.propTypes = {
    shadow: PropTypes.string.isRequired
};

// ============================|| UTILITIES SHADOW ||============================ //

const UtilitiesShadow = () => (
    <MainCard title="Quản lý hóa đơn">
        <Grid container spacing={gridSpacing}></Grid>
    </MainCard>
);

export default UtilitiesShadow;