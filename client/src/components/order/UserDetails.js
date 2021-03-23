import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import {
    getUserLastNames, getUserAddresses,
    getUserCityes, getUserPhoneNumbers,
    getUserRegiones, getUserFirstNames, getOrders
} from "../../functions/admin";
import { useSelector } from "react-redux";
import Header from '../../components/nav/Header';

const UserDetails = () => {
    const [firstNames, setFirstNames] = useState([]);
    const [lastNames, setLastNames] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [cityes, setCityes] = useState([]);
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [regiones, setRegiones] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadUserFirstNames();
        loadUserPhoneNumbers();
        loadUserLastNames();
        loadUseraddresses();
        loadUserRegiones();
        loadUserCityes();
        // eslint-disable-next-line
    }, []);

    const showDetailsInTable = () => (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">User ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">City</th>
                    <th scope="col">Begion</th>
                    <th scope="col">Address</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> <b>{firstNames.map((user) => (<div><th>{user._id}</th><br/></div>))}</b></td>
                    <td>{firstNames.map((f) => (<div><th>{f.firstName}</th><br /></div>))}</td>
                    <td>{lastNames.map((l) => (<div><th>{l.lastName}</th><br /></div>))}</td>
                    <td>{phoneNumbers.map((p) => (<div><th>{p.phoneNumber}</th><br /></div>))}</td>
                    <td>{cityes.map((c) => (<div><th>{c.city}</th><br /></div>))}</td>
                    <td>{regiones.map((r) => (<div><th>{r.region}</th><br /></div>))}</td>
                    <td>{addresses.map((a) => (<div><th>{a.address}</th><br /></div>))}</td>
                </tr>
            </tbody>
        </table>
    );

    const loadUserFirstNames = () =>
        getUserFirstNames(user.token).then((res) => {
            setFirstNames(res.data);
        });

    const loadUserRegiones = () =>
        getUserRegiones(user.token).then((res) => {
            setRegiones(res.data);
        });

    const loadUserPhoneNumbers = () =>
        getUserPhoneNumbers(user.token).then((res) => {
            setPhoneNumbers(res.data);
        });

    const loadUserCityes = () =>
        getUserCityes(user.token).then((res) => {
            setCityes(res.data);
        });

    const loadUseraddresses = () =>
        getUserAddresses(user.token).then((res) => {
            setAddresses(res.data);
        });

    const loadUserLastNames = () =>
        getUserLastNames(user.token).then((res) => {
            setLastNames(res.data);
        });

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>

                    <div className="col-md-10">
                        <h4>User Details</h4>
                        {showDetailsInTable()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDetails;