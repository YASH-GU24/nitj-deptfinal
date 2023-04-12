import React from 'react'
import { useParams } from 'react-router-dom';
import { SERVER_URL } from '../../config/server';

function PersonalDetails({ edit, data }) {
    const tablehead = ['Name', 'Designation', 'Department', 'Qualification', 'Address', 'Phone', 'Email ID', 'Fax'];
    const feild = ['name', 'designation', 'department', 'education_qualification'];
    const address = ['address1', 'address2', 'city', 'pin', 'state']
    const Phone = data['address']['phone']
    const Fax = data['address']['fax']
    const dept = useParams()?.dept;
    const id = useParams()?.id;
    var token = "";
    if(document.cookie){
        var initialArr = document.cookie.split(';');
        if(initialArr.length){
            var values = initialArr.find(cookie => cookie.trim().startsWith('session='));

            if(values){
                token = values.split('=')[1];
            }
        }
    }

    const departments = {
        "it": "Information Technology",
        "cse": "Computer Science and Engineering",
        "bt": "Bio Technology",
        "ce": "Civil Engineering",
        "ch": "Chemical Engineering",
        "ec": "Electronics And Communication Engineering",
        "ee": "Electrical And Electronics Engineering",
        "ice": "Instrumentation And Control Engineering",
        "me": "Mechanical Engineering",
        "ipe": "Industrial And Production Enginnering",
        "math": "Mathematics",
        "phy": "Physics",
        "tt": "Textile Technology",
        "hum": "Humanities",
        "cy": "Chemistry"
    }
    return (
        <div>
            {
                edit ? <div className="mt-10 sm:mt-0 shadow-md border-2 rounded">
                    <div className="">
                        <div className="mt-5 md:mt-0">
                            <form action={`${SERVER_URL}/dept/${dept}/Faculty/${id}/${token}`} method='POST'>
                                <div className="overflow-hidden sm:rounded-md">
                                    <div className="bg-white px-4 py-5 sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            {
                                                feild?.map((item, i) => {
                                                    return (
                                                        <div key={i} className="col-span-6 sm:col-span-3">
                                                            <label htmlhtmlFor="last-name" className="block uppercase text-sm font-medium text-gray-700 px-1">{item}</label>
                                                            <textarea type="text" name={item} className="appearance-none bg-white py-2 px-3 mt-1 block border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:border-2 sm:text-sm"></textarea>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="grid grid-cols-6 gap-6 mt-4">
                                            {
                                                address?.map((item, i) => {
                                                    return (
                                                        <div key={i} className="col-span-6 sm:col-span-3">
                                                            <label htmlhtmlFor="last-name" className="block uppercase text-sm font-medium text-gray-700 px-1">{item}</label>
                                                            <textarea type="text" name={item} className="appearance-none bg-white py-2 px-3 mt-1 block border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:border-2 sm:text-sm"></textarea>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className='grid grid-cols-6 gap-6 mt-4'>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlhtmlFor="last-name" className="block uppercase text-sm font-medium text-gray-700 px-1">Phone</label>
                                                <textarea type="text" className="appearance-none bg-white py-2 px-3 mt-1 block border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:border-2 sm:text-sm"></textarea>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlhtmlFor="last-name" className="block uppercase text-sm font-medium text-gray-700 px-1">Fax</label>
                                                <textarea type="text" className="appearance-none bg-white py-2 px-3 mt-1 block border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:border-2 sm:text-sm"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex px-3 w-full justify-end">
                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 active:translate-y-[2px] hover:shadow-xl">
                                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md">
                                            Submit
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> :
                    <div>
                        <table>
                            <tbody>
                                {
                                    feild.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="w-48 align-top font-bold pr-4 pl-2 py-2">{tablehead[i]}</td>
                                                <td className="align-top font-bold pr-4 pl-2 py-2">:</td>
                                                <td className='align-top pr-4 pl-2 py-2'>
                                                    {
                                                        item === "education_qualification" ?
                                                            <div>
                                                                {
                                                                    data[item].map((Item, j) => {
                                                                        return (
                                                                            Item['degree'] != null && <div key={j}>
                                                                                <span className='font-semibold mx-1'>{Item['degree']}</span>
                                                                                <span className='mx-1'>{Item['field']}</span>
                                                                                <span>({Item['clg']})</span>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div> : item === "department" ? departments[data[item]] : data[item]
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td className="w-48 align-top font-bold pr-4 pl-2 py-2">Address</td>
                                    <td className="align-top font-bold pr-4 pl-2 py-2">:</td>
                                    <td className='align-top pr-4 pl-2 py-2'>
                                        {
                                            address.map((item, i) => {
                                                return <span className='mx-1' key={i}>{data['address'][item]}</span>
                                            })
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-48 align-top font-bold pr-4 pl-2 py-2">Phone</td>
                                    <td className="align-top font-bold pr-4 pl-2 py-2">:</td>
                                    <td className='align-top pr-4 pl-2 py-2'>{Phone}</td>
                                </tr>
                                <tr>
                                    <td className="w-48 align-top font-bold pr-4 pl-2 py-2">Fax</td>
                                    <td className="align-top font-bold pr-4 pl-2 py-2">:</td>
                                    <td className='align-top pr-4 pl-2 py-2'>{Fax}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
}

export default PersonalDetails
