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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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
import { border } from '@material-ui/system';
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
const options = ['Bậc 1', 'Bậc 2', 'Bậc 3', 'Bậc 4', 'Bậc 5'];
function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState(dayjs('2023-04-04'));

    const [value1, setValue1] = React.useState(options[0]);
    const [inputValue1, setInputValue1] = React.useState('');
    const handleClick = () => {
    };

    return (
        <GridToolbarContainer>
            <Button onClick={handleOpen}>Thêm Hóa đơn</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h3" component="h2" textAlign={'center'}>
                        Nhập thông tin hóa đơn mới
                    </Typography>
                    <TextField variant='outlined' label="Mã hóa đơn" name="mahd" sx={{ marginTop: 2, height: 60, width: '100%' }} />
                    <TextField variant='outlined' label="Kỳ" name="ky" sx={{ height: 60, width: '100%' }} />
                    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ height: 60, width: '100%' }}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                                label="Từ ngày"
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ height: 60, width: '100%' }}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                                label="Đến ngày"
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <TextField variant='outlined' label="Chỉ số đầu" name="chisodau" sx={{ marginTop: 2, width: '100%' }} />


                    {/* <div sx={{height: 60,width: '100%'}}>
                    <br />
                    <Autocomplete
                        value={value1}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                        inputValue={inputValue1}
                        onInputChange={(event, newInputValue1) => {
                        setInputValue1(newInputValue1);
                        }}
                        id="controllable-states-demo"
                        options={options}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Bậc" />}
                    />
                </div> */}

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