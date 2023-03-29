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
} from '@mui/x-data-grid-generator';
import { randomNumberBetween } from '@mui/x-data-grid/utils/utils';

const initialRows = [
    {
        id: randomQuantity(),
        username: randomUserName(),
        name: randomTraderName(),
        mail: randomEmail(),
        age: 25,
        role: 'Root',
        status: 'Active',
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: randomQuantity(),
        username: randomUserName(),
        name: randomTraderName(),
        mail: randomEmail(),
        age: 36,
        role: 'Admin',
        status: 'Active',
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: randomQuantity(),
        username: randomUserName(),
        name: randomTraderName(),
        mail: randomEmail(),
        age: 19,
        role: 'Admin',
        status: 'Active',
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: randomQuantity(),
        username: randomUserName(),
        name: randomTraderName(),
        mail: randomEmail(),
        age: 28,
        role: 'User',
        status: 'Active',
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: randomQuantity(),
        username: randomUserName(),
        name: randomTraderName(),
        mail: randomEmail(),
        age: 23,
        role: 'User',
        status: 'Suspended',
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: randomQuantity(),
        username: randomUserName(),
        name: randomTraderName(),
        mail: randomEmail(),
        age: 23,
        role: 'User',
        status: 'Active',
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: randomQuantity(),
        username: randomUserName(),
        name: randomTraderName(),
        mail: randomEmail(),
        age: 28,
        role: 'User',
        status: 'Suspended',
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: randomQuantity(),
        username: randomUserName(),
        name: randomTraderName(),
        mail: randomEmail(),
        age: 22,
        role: 'User',
        status: 'Active',
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
    {
        id: randomQuantity(),
        username: randomUserName(),
        name: randomTraderName(),
        mail: randomEmail(),
        age: 25,
        role: 'User',
        status: 'Active',
        dateCreated: randomCreatedDate(),
        lastLogin: randomUpdatedDate(),
    },
];

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" >
                Thêm Tài Khoản
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
        { field: 'id', headerName: 'ID', width: 100, editable: false },
        { field: 'username', headerName: 'Username', width: 140, editable: true },
        { field: 'name', headerName: 'Họ và Tên', width: 140, editable: true },
        { field: 'mail', headerName: 'Email', width: 130, editable: true },
        { field: 'age', headerName: 'Tuổi', type: 'number', editable: true },
        { field: 'role', headerName: 'Chức vụ', width: 100, editable: false },
        { field: 'status', headerName: 'Trạng thái', width: 100, editable: false },
        {
            field: 'dateCreated',
            headerName: 'Ngày tạo',
            type: 'date',
            width: 110,
            editable: false,
        },
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