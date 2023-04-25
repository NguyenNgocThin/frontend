import * as React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Switch from '@mui/material/Switch';
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
import { Paper, TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const initialRows = [
    {
        id: randomQuantity(),
        idkh: randomQuantity(),
        ngaysx: '10/10/2010',
        mota: randomAddress(),
        status: 'Active',
        dateCreated: randomCreatedDate(),
    },
    {
        id: randomQuantity(),
        idkh: randomQuantity(),
        ngaysx: '10/10/2010',
        mota: randomAddress(),
        status: 'Active',
        dateCreated: randomCreatedDate(),
    },
    {
        id: randomQuantity(),
        idkh: randomQuantity(),
        ngaysx: '10/10/2010',
        mota: randomAddress(),
        status: 'Active',
        dateCreated: randomCreatedDate(),
    },
    {
        id: randomQuantity(),
        idkh: randomQuantity(),
        ngaysx: '10/10/2010',
        role: 'User',
        mota: randomAddress(),
        status: 'Suspended',
        dateCreated: randomCreatedDate(),
    },
    {
        id: randomQuantity(),
        idkh: randomQuantity(),
        ngaysx: '10/10/2010',
        role: 'User',
        mota: randomAddress(),
        status: 'Active',
        dateCreated: randomCreatedDate(),
    },
    {
        id: randomQuantity(),
        idkh: randomQuantity(),
        ngaysx: '10/10/2010',
        role: 'User',
        mota: randomAddress(),
        status: 'Active',
        dateCreated: randomCreatedDate(),
    },
];

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState(dayjs('2023-04-04'));
    const [checked, setChecked] = React.useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const handleClick = () => {
    };

    return (
        <GridToolbarContainer>
            <Button onClick={handleOpen}>Thêm Điện Kế</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h3" component="h2" textAlign={'center'}>
                        Nhập thông tin điện kế mới
                    </Typography>

                    <TextField variant='outlined' label="Mã Điện Kế" name="madk" sx={{ marginTop: 2, height: 60, width: '100%' }} />
                    <TextField variant='outlined' label="Mã Khách Hàng" name="makh" sx={{ height: 60, width: '100%' }} />

                    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ height: 60, width: '100%' }}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                                label="Ngày sản xuất"
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ height: 60, width: '100%' }}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                                label="Ngày tạo"
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <TextField variant='outlined' label="Mô tả" name="mota" sx={{ height: 60, width: '100%', marginTop: 2 }} />
                    <text>Trạng thái hoạt động</text>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Button onClick={handleClose} sx={{ marginTop: '2rem', marginLeft: '25%', height: 50, width: '50%', bgcolor: '#ede7f6', border: '1px solid #000' }}>Thêm</Button>
                </Box>
            </Modal>
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
        { field: 'id', headerName: 'Mã điện kế', width: 145, editable: false },
        { field: 'idkh', headerName: 'Mã khách hàng', width: 145, editable: false },
        {
            field: 'ngaysx',
            headerName: 'Ngày sản xuất',
            width: 140,
            editable: false,
        },
        {
            field: 'dateCreated',
            headerName: 'Ngày tạo',
            type: 'date',
            width: 140,
            editable: false,
        },
        { field: 'mota', headerName: 'Mô tả', width: 200, editable: true },
        { field: 'status', headerName: 'Trạng thái', width: 150, editable: true },
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