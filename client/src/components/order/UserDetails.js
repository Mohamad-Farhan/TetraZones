import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import {
    getUserLastNames, getUserAddresses,
    getUserCityes, getUserPhoneNumbers,
    getUserRegiones, getUserFirstNames
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
        <table className="table caption-top">
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
                    <th> <b>{firstNames.map((user) => (<div>{user._id}</div>))}</b></th>
                    <th>{firstNames.map((f) => (<div>{f.firstName}<br /></div>))}</th>
                    <th>{lastNames.map((l) => (<div>{l.lastName}<br /></div>))}</th>
                    <th>{phoneNumbers.map((p) => (<div>{p.phoneNumber}<br /></div>))}</th>
                    <th>{cityes.map((c) => (<div>{c.city}<br /></div>))}</th>
                    <th>{regiones.map((r) => (<div>{r.region}<br /></div>))}</th>
                    <th>{addresses.map((a) => (<div>{a.address}<br /></div>))}</th>
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