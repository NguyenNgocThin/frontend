import * as React from 'react';
import './App.css';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';


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


var request = require('request');




// const options = ['Bậc 1', 'Bậc 2', 'Bậc 3', 'Bậc 4', 'Bậc 5'];
function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
   
    // const [value, setValue] = React.useState(dayjs('2023-04-04'));

    // const [value1, setValue1] = React.useState(options[0]);
    const [inputValue1, setInputValue1] = React.useState('');
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
            'url': 'https://44.193.210.107/api/v1/khachhang/add',
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
            <Button onClick={handleOpen}>Thêm Khách Hàng</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h3" component="h2" textAlign={'center'}>
                        Nhập thông khách hàng mới
                    </Typography>

                    <TextField variant='outlined' label="Mã khách hàng" name="ma_kh" id="ma_kh" sx={{ marginTop: 2, height: 60, width: '100%' }} />
                    <TextField variant='outlined' label="Tên khách hàng" name="ten_kh" id="ten_kh" sx={{ height: 60, width: '100%' }} />
                    <TextField variant='outlined' label="Số điện thoại" name="dt" id="dt" sx={{ height: 60, width: '100%' }} />
                    <TextField variant='outlined' label="Số căn cước" name="cmnd" id="cmnd" sx={{ height: 60, width: '100%' }} />
                    <TextField variant='outlined' label="Địa chỉ" name="dia_chi" id="dia_chi" sx={{ height: 60, width: '100%' }} />
                    

                    <Button onClick={Add} sx={{ marginTop: '2rem', marginLeft: '25%', height: 50, width: '50%', bgcolor: '#ede7f6', border: '1px solid #000' }}>Thêm</Button>
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
  
       

    const [rows, setRows] = React.useState([]);
      
    function fetchDataFromServer() {
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
 //gọi api 
        var optionss = {
          'method': 'GET',
          'url': 'https://44.193.210.107/api/v1/khachhang',
          'headers': {
            'Authorization': 'Bearer '+token.access_token
          }
        };
  
        request(optionss, function (error, response) {
          if (error) throw new Error(error);
          const data=JSON.parse(response.body);
          setRows(data.data); // cập nhật dữ liệu cho Grid
        });
      });
    }
  
    // lấy dữ liệu khi component được render
    React.useEffect(() => {
      fetchDataFromServer();
    }, []);
  
    const [updatedRowId, setUpdatedRowId] = React.useState(null);
    const [updatedRow, setUpdatedRow] = React.useState({});
    const [rowModesModel, setRowModesModel] = React.useState({});
    // const [rowss, setRowss] = React.useState([]);
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
        const updatedRow = rows.find((row) => row.id === id);
        setUpdatedRow(updatedRow);
        setUpdatedRowId(id);
        setRows((prevRows) => {
            const index = prevRows.findIndex((row) => row.id === id);
            const newRows = [...prevRows];
            newRows[index] = updatedRow;
            return newRows;
        });

    };
    React.useEffect(() => {
        const foundRow = rows.find((row) => row.id === updatedRowId);
        // console.log(updatedRow.id);
        // console.log(foundRow.id);
        
        if (foundRow) {
            if(updatedRow.id!==foundRow.id||
                updatedRow.ma_kh!==foundRow.ma_kh||
                updatedRow.ten_kh!==foundRow.ten_kh||
                updatedRow.dia_chi!==foundRow.dia_chi||
                updatedRow.dt!==foundRow.dt||
                updatedRow.cmnd!==foundRow.cmnd
                ){
            console.log(foundRow);
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
              var request = require('request');
                  var options = {
                'method': 'PUT',
                'url': 'https://44.193.210.107/api/v1/khachhang/update',
                  'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token.access_token
                  },
                  body: JSON.stringify({
                    "id": foundRow.id,
                    "ma_kh": foundRow.ma_kh,
                    "ten_kh": foundRow.ten_kh,
                    "dia_chi": foundRow.dia_chi,
                    "dt": foundRow.dt,
                    "cmnd":foundRow.cmnd
                  })
                  };
              request(options, function (error, response) {
              if (error) throw new Error(error);
              console.log(response.body);
              });
            });
        }
        }
    }, [rows, updatedRowId]);
    
    const handleDeleteClick = (id) => () => {
        console.log(id);
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
  
        var request = require('request');
            var options = {
            'method': 'DELETE',
            'url': 'https://44.193.210.107/api/v1/khachhang/delete/'+id,
            'headers': {
                'Authorization': 'Bearer '+token.access_token
            }
            };
        request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        });
      });
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
            field: 'ma_kh',
            headerName: 'ID',
            width: 180,
            editable: true
        },
        {
            field: 'ten_kh',
            headerName: 'Tên Khách Hàng',
            // type: 'String',
            editable: true
        },
        {
            field: 'dt',
            headerName: 'Số Điện Thoại',
            // type: 'string',
            width: 180,
            editable: true,
        },
        {
            field: 'cmnd',
            headerName: 'Số CCCD',
            // type: 'string',
            width: 220,
            editable: true,
        },
        {
            field: 'dia_chi',
            headerName: 'Địa Chỉ',
            // type: 'string',
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




