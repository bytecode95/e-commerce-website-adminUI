import SouthEastIcon from '@mui/icons-material/SouthEast';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import PeopleIcon from '@mui/icons-material/People';
import Shop2Icon from '@mui/icons-material/Shop2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import instance from "../../service/axiosOrder.js";
import {useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import * as React from 'react';

const chartSetting = {
    yAxis: [
        {
            label: 'rainfall (mm)',
        },
    ],
    width: 800,
    height: 450,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'rotate(-90deg) translate(0px, -20px)',
        },
    },
};
const dataset = [
    {
        london: 59,
        month: 'Jan',
    },
    {
        london: 50,
        month: 'Fev',
    },
    {
        london: 47,
        month: 'Mar',
    },
    {
        london: 54,
        month: 'Apr',
    },
    {
        london: 57,
        month: 'May',
    },
    {
        london: 60,
        month: 'June',
    },
    {
        london: 59,
        month: 'July',
    },
    {
        london: 65,
        month: 'Aug',
    },
    {
        london: 51,
        month: 'Sept',
    },
    {
        london: 60,
        month: 'Oct',
    },
    {
        london: 67,
        month: 'Nov',
    },
    {
        london: 61,
        month: 'Dec',
    },
];

const columns = [
    { id: 'id', label: 'Order Id', minWidth: 170 },
    { id: 'username', label: 'Username', minWidth: 100 },
    {
        id: 'date',
        label: 'Order Date',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'amount',
        label: 'Total Amount',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'address',
        label: 'Shipping Address',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
];









const valueFormatter = (value) => `${value}mm`;

export default function Dashboard(){

    useEffect(() => {
        getTopOrderItems();
        getorderDetails();
    }, []);

    const [details, setDetails] = useState([]);
    //console.log(details);
    const[orders, setOrders] = useState([])





    //to calculate the total quantity each product wise
    const piechartData = details.reduce((result, item) => {
        //const productId = item.product_id;
        const quantity = item.quantity;
        const productName = item.pro_name;

        // If productId doesn't exist in the result, initialize it with quantity,
        // otherwise, add quantity to the existing total
        if (!result[productName]) {
            result[productName] = quantity;
        } else {
            result[productName] += quantity;
        }

        return result;
    }, {});
    //console.log(piechartData);

    const chartData = [];

    for (const productName in piechartData) {
        if (Object.hasOwnProperty.call(piechartData, productName)) {
            const quantity = piechartData[productName];
            const newItem = {

                value: quantity,
                label: `${productName}`,
            };
            chartData.push(newItem);
        }
    }

    //console.log(chartData);


    const getTopOrderItems = ()=>{
        instance.get('/order/admincharts')
            .then(function (response) {
                // handle success
                //console.log(response.data);
                setDetails(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    const getorderDetails = ()=>{
        instance.get('/order/orderanalysis')
            .then(function (response) {
                // handle success
                //console.log(response.data);
                setOrders(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };






    return(
        <>
            <h3 className="mb-4 title">Dashboard</h3>
            <div className="d-flex flex-wrap  justify-content-between align-items-center gap-3">
                <div style={{backgroundColor:'#76d300'}} className="d-flex justify-content-between align-items-end shadow-lg p-3 roudned-3">
                    <div>
                        <p >Customers</p>
                        <span><PeopleIcon/></span>
                        <h4 className="mb-0 ">$1100</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6>
                            <SouthEastIcon /> 32%
                        </h6>
                        <p className="mb-0 ">Compared To August 2023</p>
                    </div>
                </div>
                <div style={{backgroundColor:'#e22137'}} className="d-flex justify-content-between align-items-end shadow-lg p-3 roudned-3">
                    <div>
                        <p >Orders</p>
                        <span><Shop2Icon/></span>
                        <h4 className="mb-0 ">$1100</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 >
                            <SouthEastIcon /> 32%
                        </h6>
                        <p className="mb-0 ">Compared To August 2023</p>
                    </div>
                </div>
                <div style={{backgroundColor:'#b800d8'}} className="d-flex justify-content-between align-items-end shadow-lg p-3 roudned-3">
                    <div>
                        <p >Delivery</p>
                        <span><LocalShippingIcon/></span>
                        <h4 className="mb-0 ">$1100</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 >
                            <SouthEastIcon /> 32%
                        </h6>
                        <p className="mb-0">Compared To August 2023</p>
                    </div>
                </div>
                <div style={{backgroundColor:'#f9ad02'}} className="d-flex justify-content-between align-items-end shadow-lg p-3 roudned-3">
                    <div>
                        <p >Total Profit</p>
                        <span><MonetizationOnIcon/></span>
                        <h4 className="mb-0 ">$1100</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 >
                            <SouthEastIcon /> 32%
                        </h6>
                        <p className="mb-0 ">Compared To August 2023</p>
                    </div>
                </div>
            </div>
            <h3 className="text-center mt-5">Sales Statics</h3>
            <div className="mt-4 d-flex align-items-center shadow justify-content-center">

                <div>
                    <BarChart
                        dataset={dataset}
                        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                        series={[
                            { dataKey: 'london', label: 'Sales', valueFormatter },

                        ]}
                        {...chartSetting}
                    />
                </div>

                <div className="w-25 mt-3 shadow">
                    <PieChart
                        series={[
                            {
                                data: chartData.slice(0,4),
                            },
                        ]}
                        width={500}
                        height={300}
                    />
                </div>

            </div>
            <h3 className="mb-3 mt-3 text-center">Recent Orders</h3>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((val, index) => {
                                    return (
                                        <TableRow style={{textAlign:'center'}} hover role="checkbox"  key={index}>
                                            <TableCell id={columns.id}>{val.order_id}</TableCell>
                                            <TableCell id={columns.username}>{val.username}</TableCell>
                                            <TableCell id={columns.date}>{val.order_date}</TableCell>
                                            <TableCell id={columns.amount}>{val.total_amount}</TableCell>
                                            <TableCell id={columns.address}>{val.shipping_address}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination

                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </>


    )
}