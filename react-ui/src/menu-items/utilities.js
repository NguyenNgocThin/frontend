// assets
import { IconUsers, IconBolt, IconFileInvoice, IconReceipt2, IconZoomMoney, IconKey } from '@tabler/icons';

// constant
const icons = {
    IconUsers,
    IconBolt,
    IconFileInvoice,
    IconReceipt2,
    IconZoomMoney,
    IconKey
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: '',
    type: 'group',
    children: [
        {
            id: 'util-qltk',
            title: 'Quản Lý Tài Khoản',
            type: 'item',
            url: '/utils/util-qltk',
            icon: icons.IconKey,
            breadcrumbs: false
        },
        {
            id: 'util-qlkh',
            title: 'Quản Lý Khách Hàng',
            type: 'item',
            url: '/utils/util-qlkh',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'util-qldk',
            title: 'Quản Lý Điện Kế',
            type: 'item',
            url: '/utils/util-qldk',
            icon: icons.IconBolt,
            breadcrumbs: false
        },
        {
            id: 'util-qlhd',
            title: 'Quản Lý Hóa Đơn',
            type: 'item',
            url: '/utils/util-qlhd',
            icon: icons.IconFileInvoice,
            breadcrumbs: false
        },
        {
            id: 'icons',
            title: 'Bảng Đơn Giá Điện',
            type: 'collapse',
            icon: icons.IconReceipt2,
            children: [
                {
                    id: 'banggiamoi',
                    title: 'Bảng Giá Điện Mới',
                    type: 'item',
                    url: '/icons/banggiamoi',
                    breadcrumbs: false
                },
                {
                    id: 'banggiacu',
                    title: 'Bảng Giá Điện Cũ',
                    type: 'item',
                    url: '/icons/banggiacu',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'util-tiendien',
            title: 'Tính tiền điện',
            type: 'item',
            url: '/utils/util-tiendien',
            icon: icons.IconZoomMoney,
            breadcrumbs: false
        }
    ]
};

export default utilities;
