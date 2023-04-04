import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CalculateIcon from '@mui/icons-material/Calculate';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
    useGridApiRef
} from '@mui/x-data-grid-pro';
import { borderRadius } from '@material-ui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#e3f2fd',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function DatePickerValue() {
    const [value, setValue] = React.useState(dayjs('2023-04-04'));
    const [color, setColor] = React.useState('primary');
    const apiRef = useGridApiRef();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Button
                color={color}
                size="small"
                onClick={(event) => {
                    event.stopPropagation();
                    setColor((current) => (current === 'primary' ? 'secondary' : 'primary'));
                    apiRef.current.showColumnMenu('default');
                }}
            >
                Nhập các thông số:
            </Button>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker label="Từ ngày" defaultValue={dayjs('2023-04-04')} sx={{ marginLeft: '1.8rem', marginRight: '1.8rem' }} />
                    <DatePicker
                        label="Đến ngày"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <div>

            </div>
            <TextField
                label="Tổng điện năng tiêu thụ"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '31ch', marginLeft: '1.7rem', marginTop: '2rem' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">kWh</InputAdornment>,
                }}
            />
            <br></br>
            <TextField
                label="Số hộ dùng điện "
                id="outlined-start-adornment"
                sx={{ m: 1, width: '31ch', marginLeft: '1.7rem', marginTop: '1.6rem' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">hộ</InputAdornment>,
                }}
            />
            <br></br>
            <FormControl sx={{ m: 1, minWidth: 120, marginLeft: '1.7rem', marginTop: '1rem' }} size="small">
                <InputLabel id="demo-select-small">Loại điện</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={5}>Sản xuất</MenuItem>
                    <MenuItem value={10}>Hành chính</MenuItem>
                    <MenuItem value={20}>Sản xuất</MenuItem>
                    <MenuItem value={30}>Sinh hoạt</MenuItem>
                </Select>
            </FormControl>
            <br></br>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Hỗ trợ COVID đợt 4" sx={{ marginLeft: '1rem', marginTop: '.7rem' }} />
            <br></br>

            <Button variant="contained" startIcon={<CalculateIcon />} sx={{ width: '31ch', marginLeft: '1.5rem', marginTop: '.2rem' }}>Tính toán
            </Button>
            <Typography id="modal-modal-description" color={'#000'} marginLeft={'1.5rem'} sx={{ mt: 2 }}>
                Tiền điện chưa thuế :  <br></br>
                Thuế GTGT (10%) tiền điện :
            </Typography>
            <Typography id="modal-modal-title" variant="h5" color={'#E91E63'} component="h2" align='left' marginLeft={'1.5rem'} marginTop={'.5rem'}>
                Tổng cộng tiền thanh toán (đồng) :
            </Typography>
            <div>
                <Button onClick={handleOpen} sx={{ marginLeft: '.9rem', marginTop: '1rem' }}>In hóa đơn</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                            HÓA ĐƠN GIÁ TRỊ GIA TĂNG (TIỀN ĐIỆN)
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Khách hàng :  <br></br>
                            Địa chỉ : <br></br>
                            Mục đích sử dụng điện : <br></br>
                            Số hộ sử dụng điện : <br></br>
                            Hệ số nhân : <br></br>
                        </Typography>
                        <br></br>
                        <Typography id="modal-modal-title" variant="h6" component="h2" align='left'>
                            Điện năng tiêu thụ
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Kỳ hóa đơn :  <br></br>
                            SỐ CÔNG TƠ  |  CHỈ SỐ MỚI  |  CHỈ SỐ CŨ  |  ĐIỆN NĂNG TIÊU THỤ <br></br>
                            <br></br>
                        </Typography>
                        <Typography id="modal-modal-title" variant="h6" component="h2" align='left'>
                            Tổng số tiền thanh toán
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            BẬC TIÊU THỤ  |  ĐƠN GIÁ (ĐỒNG/KWH) |  SẢN LƯỢNG (KWH)  |  THÀNH TIỀN (ĐỒNG) <br></br>
                            BẬC 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| <br></br>
                            BẬC 2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| <br></br>
                            BẬC 3 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| <br></br>
                            BẬC 4 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| <br></br>
                            BẬC 5 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| <br></br>
                            BẬC 6 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| <br></br>
                        </Typography>
                        <Typography id="modal-modal-title" variant="h6" component="h2" align='left'>
                            Tổng điện năng tiêu thụ (kWh)<br></br>
                            Tổng tiền điện chưa thuế (đồng)<br></br>
                            Thuế suất GTGT <br></br>
                            Thuế GTGT (đồng) <br></br>
                            Tổng số tiền thanh toán (đồng) <br></br>
                            Bằng chữ :  <br></br>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </LocalizationProvider>
    );
}