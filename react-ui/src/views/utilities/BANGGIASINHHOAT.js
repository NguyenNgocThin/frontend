import * as React from 'react';
import './App.css';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import SetIcon from '@mui/icons-material/MultipleStop';

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
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


// var request = require('request');




// const options = ['Bậc 1', 'Bậc 2', 'Bậc 3', 'Bậc 4', 'Bậc 5'];
function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [valuedatetime, setValue] = React.useState(dayjs('2023-04-04'));
    const [checked, setChecked] = React.useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const handleClick = () => {
    };
    // const ref = useRef(null);
    const Add = (event) => {
     
       var mabac=document.getElementById("mabac").value;
       var tenbac=document.getElementById("tenbac").value;
       var tusokw=document.getElementById("tusokw").value;
       var densokw=document.getElementById("densokw").value;
       var dongia=document.getElementById("dongia").value;
      var ngayapdung=JSON.parse(JSON.stringify({valuedatetime}));
    //    var trangthai=document.getElementById("checkstatus").checked;
        var trangthai=JSON.parse(JSON.stringify({checked}));
    //    console.log({checked});
    var day=new Date(ngayapdung.valuedatetime)
       console.log(day);
    //    console.log(trangthai.checked);
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
            'url': 'https://44.193.210.107/api/v1/giadien/add',
            'headers': {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token.access_token
            },
            body: JSON.stringify({
              "mabac":mabac,
              "tenbac":tenbac,
              "tusokw":tusokw,
              "densokw":densokw,
              "dongia":parseInt(dongia),
            //   "ngayapdung":{valuedatetime},
              "ngayapdung":day,
              "trangthai":trangthai.checked,
            //   "trangthai":trangthai
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
            <Button onClick={handleOpen}>Thêm Giá Điện</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h3" component="h2" textAlign={'center'}>
                        Nhập thông tin giá điện mới
                    </Typography>

                    <TextField variant='outlined' label="Mã Bậc" id="mabac" sx={{ marginTop: 2, height: 60, width: '100%' }} />
                    <TextField variant='outlined' label="Tên Bậc" id="tenbac" sx={{ height: 60, width: '100%' }} />
                    <TextField variant='outlined' label="Từ Số Kw" id="tusokw" sx={{ height: 60, width: '100%' }} />
                    <TextField variant='outlined' label="Đến Số Kw" id="densokw" sx={{ height: 60, width: '100%' }} />
                    <TextField variant='outlined' label="Đơn Giá" id="dongia" sx={{ height: 60, width: '100%' }} />

                    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ height: 60, width: '100%' }}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker
                                label="Ngày Áp Dụng"
                                value={valuedatetime}
                                onChange={(newValue) => setValue(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <text>Trạng thái hoạt động</text>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    {/* <input onClick={handleChange} id="checkstatus" checked={checked} type="checkbox" /> */}
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
        // console.log(error)
        if (error){throw new Error(error);} 
        const token=JSON.parse(response.body);
        //gọi api 
        var optionss = {
          'method': 'GET',
          'url': 'https://44.193.210.107/api/v1/giadien',
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
    const handleSetClick = (id) => () => {
        // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        const updatedRow = rows.find((row) => row.id === id);
        console.log(updatedRow)
        if(updatedRow.trangthai===false){
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
                'url': 'https://44.193.210.107/api/v1/giadien/active?id='+updatedRow.id,
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token.access_token
                },
                };
                request(options, function (error, response)
                 {
                      if (error) throw new Error(error);
                      console.log(response.body)
                });})
        }else{
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
                'url': 'https://44.193.210.107/api/v1/giadien/deactivate?id='+updatedRow.id,
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token.access_token
                },
                };
                request(options, function (error, response)
                 {
                      if (error) throw new Error(error);
                      console.log(response.body)
                });})
        }
        
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
        console.log(foundRow);
        // console.log(updatedRow);
        if (foundRow) {
            if(
                updatedRow.mabac!==foundRow.mabac||
                updatedRow.tenbac!==foundRow.tenbac||
                updatedRow.tusokw!==foundRow.tusokw||
                updatedRow.dongia!==foundRow.dongia||
                updatedRow.ngayapdung!==foundRow.ngayapdung||
                updatedRow.trangthai!==foundRow.trangthai
                ){
            if(foundRow.trangthai===false){
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
                        //   if (error) throw new Error(error);
                            var request = require('request');
                            var options = {
                                    'method': 'PUT',
                                    'url': 'https://44.193.210.107/api/v1/giadien/update',
                                    'headers': {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer '+token.access_token
                                    },
                            body: JSON.stringify({
                                "id": foundRow.id,
                                "mabac": foundRow.mabac,
                                "tenbac": foundRow.tenbac,
                                "tusokw": foundRow.tusokw,
                                "densokw": foundRow.densokw,
                                "dongia":foundRow.dongia,
                                "ngayapdung":foundRow.ngayapdung,
                                "trangthai":foundRow.trangthai
                            })
                            };
                            request(options, function (error, response) {
                            if (error) throw new Error(error);
                            console.log(response.body);
                            });
                });
                console.log("Sua Thanh Cong")
            }else{
               console.log("Chuyen trang thai thanh False truoc khi sua")
            }
            
        }
        }
    }, [rows, updatedRowId]);
    

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
            field: 'mabac',
            headerName: 'Mã Bậc',
            width: 180,
            editable: true
        },
        {
            field: 'tenbac',
            headerName: 'Tên Bậc',
            editable: true
        },
        {
            field: 'tusokw',
            headerName: 'Từ Số Kw',
            width: 180,
            editable: true,
        },
        {
            field: 'densokw',
            headerName: 'Đến Số Kw',
            width: 220,
            editable: true,
        },
        {
            field: 'dongia',
            headerName: 'Đơn Giá',
            width: 220,
            editable: true,
        },
        {
            field: 'ngayapdung',
            headerName: 'Ngày Áp Dụng',
            format:"YYYY-MM-DD",
            // type: "date",
            width: 220,
            editable: true,
        },
        {
            field: 'trangthai',
            headerName: 'Trạng Thái',
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
                        icon={<SetIcon />}
                        label="Set"
                        onClick={handleSetClick(id)}
                        color="inherit"
                    
                    />
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




