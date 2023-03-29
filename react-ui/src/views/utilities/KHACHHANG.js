import * as React from 'react';
import './App.css';

import PropTypes from 'prop-types';
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
} from '@mui/x-data-grid-generator';
import { style } from '@mui/system';
// document.getElementsByClassName("MuiDataGrid-main")[0].style.display=none;


const initialRows = [
    {
        id: 1,
        name: "Nguyen Van A",
        sdt: "0966220566",
        cccd: "158496543",
        address: "Cao Lo"
        // dateCreated: randomCreatedDate(),
        // lastLogin: randomUpdatedDate(),
    },
    {
        id: 2,
        name: "Nguyen Van B",
        sdt: "0966220566",
        cccd: "158496543",
        address: "Cao Lo"
        // dateCreated: randomCreatedDate(),
        // lastLogin: randomUpdatedDate(),
    },
    {
        id: 3,
        name: "Nguyen Van C",
        sdt: "0966220566",
        cccd: "158496543",
        address: "Cao Lo"
        // dateCreated: randomCreatedDate(),
        // lastLogin: randomUpdatedDate(),
    },
    {
        id: 4,
        name: "Nguyen Van D",
        sdt: "0966220566",
        cccd: "158496543",
        address: "Cao Lo"
        // dateCreated: randomCreatedDate(),
        // lastLogin: randomUpdatedDate(),
    },
    {
        id: 5,
        name: "Nguyen Van E",
        sdt: "0966220566",
        cccd: "158496543",
        address: "Cao Lo"
        // dateCreated: randomCreatedDate(),
        // lastLogin: randomUpdatedDate(),
    },
    {
        id: 6,
        name: "Nguyen Van G",
        sdt: "0966220566",
        cccd: "158496543",
        address: "Cao Lo"
        // dateCreated: randomCreatedDate(),
        // lastLogin: randomUpdatedDate(),
    },

];

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        //  khi click vao nut them hien ra form dien thong tin de them du lieu
        //keywork add laf form create reactjs
        //nhap du lieu them va luu 
        //khi luu du lieu se chay ajax them du lieu ben t3 (thang tai)

        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'id' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" >
                THÊM KHÁCH HÀNG
            </Button>
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

function Typography() {
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
        {
            field: 'id',
            headerName: 'ID',
            width: 180,
            editable: true
        },
        {
            field: 'name',
            headerName: 'Tên Khách Hàng',
            type: 'String',
            editable: true
        },
        {
            field: 'sdt',
            headerName: 'Số Điện Thoại',
            type: 'string',
            width: 180,
            editable: true,
        },
        {
            field: 'cccd',
            headerName: 'Số CCCD',
            type: 'string',
            width: 220,
            editable: true,
        },
        {
            field: 'address',
            headerName: 'Địa Chỉ',
            type: 'string',
            width: 220,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
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
export default Typography;



