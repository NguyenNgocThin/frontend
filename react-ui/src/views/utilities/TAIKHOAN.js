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
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
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

    const Add = () => {
     
        var ma_kh=document.getElementById("ma_kh").value;
        var ten_kh=document.getElementById("ten_kh").value;
        var dia_chi=document.getElementById("dia_chi").value;
        var dt=document.getElementById("dt").value;
        var cmnd=document.getElementById("cmnd").value;

    var request = require('request');
      var optionslogin = {
        'method': 'POST',
        'url': 'https://44.193.210.107/api/v1/auth/login',
        'headers': {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": "root",
          "password": "root"
        })
      };

      request(optionslogin, function (error, response) {
        if (error) throw new Error(error);
        const token=JSON.parse(response.body);
        var options = {
            'method': 'POST',
            'url': 'https://44.193.210.107/api/v1/taikhoan/add',
            'headers': {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token.access_token
            },
            body: JSON.stringify({
              "ma_kh":ma_kh,
              "ten_kh":ten_kh,
              "dia_chi":dia_chi,
              "dt":dt,
              "cmnd":cmnd
            })
          
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
          });
        
      });
        setOpen(false)};

    return (
        <GridToolbarContainer>
            <Button onClick={handleOpen}>Thêm Tài khoản</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h3" component="h2" textAlign={'center'}>
                        Nhập thông tin tài khoản
                    </Typography>
                    <TextField variant='outlined' label="Username" name="makh" sx={{ height: 60, width: '100%', marginTop: '1.2rem' }} />
                    <TextField variant='outlined' label="Email" sx={{ height: 60, width: '100%' }} />
                    <TextField variant='outlined' label="Mật khẩu" type='password' sx={{ height: 60, width: '100%' }} />
                    <TextField variant='outlined' label="Họ và Tên" sx={{ height: 60, width: '100%', marginTop: 2 }} />
                    <TextField variant='outlined' label="Tuổi" type='number' sx={{ height: 60, width: '100%', marginTop: 2 }} />
                    <FormControl sx={{ minWidth: 120, marginTop: '1rem' }} size="small">
                        <InputLabel id="demo-select-small">Chức vụ</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={5}>Root</MenuItem>
                            <MenuItem value={10}>Admin</MenuItem>
                            <MenuItem value={20}>User</MenuItem>
                        </Select>
                    </FormControl>
                    <br></br>
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