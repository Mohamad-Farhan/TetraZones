import React, { useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import Header from '../../components/nav/Header';

import { getUserQuestions } from "../../functions/admin";

const AlluserQuestions = () => {

    const [questions, setQuestions] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadUserQuestions();
        // eslint-disable-next-line
    }, []);

    const loadUserQuestions = () =>
        getUserQuestions(user.token).then((res) => {
            setQuestions(res.data);
        });


    const showQuestions = () => (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col"> Question</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><b>{questions.map((q) => (<div><th>{q.question}</th></div>))}</b></td>
                </tr>
            </tbody>
        </table>
    );

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>

                    <div className="col-md-10">
                        <h4>User Questions</h4>
                        {showQuestions()}
                    </div>
                </div>
            </div>
        </>
    )

}

export default AlluserQuestions;