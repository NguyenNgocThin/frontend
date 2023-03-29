import * as React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGridPro,
    GridToolbarContainer,
    GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import {
    randomCreatedDate,
    randomTraderName,
    randomUpdatedDate,
    randomId,
    randomInt,
    randomQuantity,
    randomUserName,
    randomStatusOptions,
    randomEmail,
    randomAddress,
} from '@mui/x-data-grid-generator';
import { randomNumberBetween } from '@mui/x-data-grid/utils/utils';

const initialRows = [
    {
        id: randomQuantity(),
        ky: '2/2023',
        tungay: '01/02/2023',
        denngay: '28/02/2023',
        chisodau: '00083',
        bac: '1',
    },
    {
        id: randomQuantity(),
        ky: '2/2023',
        tungay: '01/02/2023',
        denngay: '28/02/2023',
        chisodau: '00123',
        bac: '2',
    },
    {
        id: randomQuantity(),
        ky: '2/2023',
        tungay: '01/02/2023',
        denngay: '28/02/2023',
        chisodau: '00153',
        bac: '3',
    },
    {
        id: randomQuantity(),
        ky: '2/2023',
        tungay: '01/02/2023',
        denngay: '28/02/2023',
        chisodau: '00203',
        bac: '4',
    },
    {
        id: randomQuantity(),
        ky: '2/2023',
        tungay: '01/02/2023',
        denngay: '28/02/2023',
        chisodau: '00233',
        bac: '4',
    },
    {
        id: randomQuantity(),
        ky: '2/2023',
        tungay: '01/02/2023',
        denngay: '28/02/2023',
        chisodau: '00408',
        bac: '5',
    },
];

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" >
                Thêm Hoá đơn
            </Button>
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

export default function FullFeaturedCrudGrid() {
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'id', headerName: 'Mã hóa đơn', width: 155, editable: false },
        { field: 'ky', headerName: 'Kỳ', width: 155, editable: false },
        { field: 'tungay', headerName: 'Từ ngày', width: 160, editable: false },
        { field: 'denngay', headerName: 'Đến ngày', width: 160, editable: false },
        { field: 'chisodau', headerName: 'Chỉ số đầu', width: 160, editable: true },
        { field: 'bac', headerName: 'Bậc', width: 150, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Tác vụ',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGridPro
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </Box>
    );
}