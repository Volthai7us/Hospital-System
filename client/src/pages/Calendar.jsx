import '../output.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const date = new Date();

let currentDay = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();


const sqlDateToJsDate = (sqlDate) => {
    var sqlDateArr1 = sqlDate.split("-");
    var sYear = sqlDateArr1[0];
    var sMonth = (Number(sqlDateArr1[1]) - 1).toString();
    var other = sqlDateArr1[2].split("T");
    var sDay = other[0];
    var sqlDateArr2 = other[1].split(":");
    var sHour = sqlDateArr2[0];
    var sMinute = sqlDateArr2[1];
    var sSecond = sqlDateArr2[2].split(".")[0];
    var jsDate = new Date(sYear,sMonth,sDay,sHour,sMinute,sSecond);
    
    return jsDate;
}

const firstDayOfMonth = new Date(year, month, 1).getDay();
const lastDayOfMonth = new Date(year, month + 1, 0);
const dayCount = 1;

const Day = ({ day, month, year, appointments }) => {
    return (
        day != currentDay || month != date.getMonth() || year != date.getFullYear() ? (
        <td class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
            <div class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                <div class="top h-5 w-full mb-4 ">
                    <span class="text-gray-500 text-sm"> {day} </span>
                </div>
                {
                    appointments.map((appointment, i) => {
                        const dateCurr = sqlDateToJsDate(appointment.Tarih)
                        if(appointment.Tarih.split("T")[0] == year + "-" + (month + 1) + "-" + day) {
                            return (
                                <div class="event bg-red-400 text-white rounded p-1 text-sm mb-1">
                                    <span class="event-name text-white"> {appointment.Isim + " " + appointment.Soyisim} </span>
                                    <span class="time text-white"> {dateCurr.toTimeString().split(":")[0] + ":00"} </span>
                            </div>
                            )
                        }
                    })
                    
                }
            </div>  
        </td>
        ) : (
            <td class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 border-4 border-black w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
            <div class="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                <div class="top h-5 w-full mb-4 ">
                    <span class="text-gray-500 text-sm"> {day} </span>
                </div>

                {
                    appointments.map((appointment, i) => {
                        if(appointment.Tarih == year + "-" + (month + 1) + "-" + day) {
                            return (
                                <div class="event bg-red-400 text-white rounded p-1 text-sm mb-1">
                                    <span class="event-name text-white"> {appointment.Isim + " " + appointment.Soyisim} </span>
                                    <span class="time text-white"> 12:00~14:00 </span>
                            </div>
                            )
                        }
                    })
                }
            </div>  
        </td>
        )
    )
}

const Appointments = ({id, setUserType}) => {
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState([])

    useEffect(() => {
		axios.get('http://localhost:4000/doctors/appointments?id=' + id)
			.then(res => {
				setAppointment(res.data[0])
                console.log(res.data[0])
			})
			.catch(err => {
				console.log(err)
			})
	}, [])
    

    if(appointment.length === 0) {
        return (
            <div class="container mx-auto mt-10">
                <div class="m-16 text-3xl flex justify-center"> 
                    <h1> No Appointment has found </h1>
                </div>
                <div class="wrapper bg-white rounded shadow w-full ">
                <div class="header flex justify-between border-b p-2">
                    <span class="text-lg font-bold">
                    {year} {monthNames[month]} {currentDay}
                    </span>
                </div>
                
                </div>
            </div>
        )
    }

    const Logout = () => {
        setUserType(null)
		sessionStorage.removeItem('token')
		sessionStorage.removeItem('userType')
        navigate('/')
    }

	return (
        
		<div class="container mx-auto mt-10 flex ">
            <div class="bg-slate-100 col-start-1 -ml-[1rem] pl-[3rem] pr-[1rem] mr-[1rem] col-span-1 pt-8 shadow-[10px_5px_5px_-5px_rgba(0,0,0,0.2)]">
            <ul class="flex flex-col justify-between">
                <li class="">
                    <a class="flex flex-col items-center p-4 hover:bg-slate-200 hover:cursor-pointer" href='/'>
                        <img class="w-8" src="https://cdn-icons-png.flaticon.com/512/1255/1255477.png" alt="" />
                        <h1 class="text-xs"> Dashboard </h1>
                    </a>
                </li>
                <li>
                    <a href='/Calendar' class="flex flex-col items-center p-4 hover:bg-slate-200 hover:cursor-pointer">  
                        <img class="w-8" src="https://cdn-icons-png.flaticon.com/512/1250/1250620.png" alt="" />
                        <span class="text-xs"> Calendar </span>
                    </a>
                </li>
                <li>
                    <a href='/Clients' class="flex flex-col items-center p-4 hover:bg-slate-200 hover:cursor-pointer">
                        <img class="w-8" src="https://cdn-icons-png.flaticon.com/512/1230/1230170.png" alt="" />
                        <h1 class="text-xs"> Clients </h1>
                    </a>
                </li>
                <li class="flex flex-col items-center p-4 hover:bg-slate-200 hover:cursor-pointer">
                    <img class="w-8" src="https://cdn-icons-png.flaticon.com/512/482/482636.png" alt="" />
                    <h1 class="text-xs"> Profile </h1>
                </li>
                <li class="flex flex-col items-center p-4 hover:bg-slate-200 hover:cursor-pointer" onClick={Logout}>
                    <img class="w-8" src="https://cdn-icons-png.flaticon.com/512/1243/1243950.png" alt="" />
                    <h1 class="text-xs"> Log out </h1>
                </li>
                
            </ul>
        </div>
            <div class="wrapper bg-white rounded shadow w-full mx-16 mb-16">
            <div class="header flex justify-between border-b p-2">
                <span class="text-lg font-bold">
                {year} {monthNames[month]} {currentDay}
                </span>
            </div>
            <table class="w-full">
                <thead>
                <tr>
                    {
                        dayNames.map((day, i) => (
                            <th key={i} class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                                <span class="xl:block lg:block md:block sm:block hidden">{day}</span>
                                <span class="xl:hidden lg:hidden md:hidden sm:hidden block">{dayNamesShort[i]}</span>
                            </th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                <tr class="text-center h-20">
                    {
                        Array.from({ length: 7 }).map((_, i) => (
                            i >= firstDayOfMonth - 1 ? 
                            <Day key={i} day={i - firstDayOfMonth + 2} month={month} year={year} appointments={appointment}/>
                            :
                            <td class="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300"> </td>
                        ))
                    }
                </tr>
                <tr class="text-center h-20">
                    {
                        Array.from({ length: 7 }).map((_, i) => (
                            <Day key={i} day={i - firstDayOfMonth + 1 + 8} month={month} year={year} appointments={appointment}/>
                        ))
                    }
                </tr>
                <tr class="text-center h-20">
                    {
                        Array.from({ length: 7 }).map((_, i) => (
                            <Day key={i} day={i - firstDayOfMonth + 1 + 15} month={month} year={year} appointments={appointment}/>
                        ))
                    }
                </tr>
                <tr class="text-center h-20">
                    {
                        Array.from({ length: 7 }).map((_, i) => (
                            <Day key={i} day={i - firstDayOfMonth + 1 + 22} month={month} year={year} appointments={appointment}/>
                        ))
                    }
                </tr>
                <tr class="text-center h-20">
                    {
                        Array.from({ length: 31 - 21 - firstDayOfMonth }).map((_, i) => (
                            <Day key={i} day={i - firstDayOfMonth + 2 + 28} month={month} year={year} appointments={appointment}/>
                        ))
                    }
                </tr>
                </tbody>
            </table>
            </div>
        </div>
	)
}

export default Appointments
