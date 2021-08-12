import React from 'react';
import * as alertReducer from '../../../redux/alerts/alert.reducer';
import {useSelector} from "react-redux";

let Alert = () => {
    let alertInfo = useSelector((state) => {
        return state[alertReducer.alertFeatureKey];
    });

    let {messages} = alertInfo;

    return (
        <React.Fragment>
            {
                messages.length > 0 ?
                    <React.Fragment>
                        <div className={`alert alert-${messages[0].color} alert-dismissible m-2 fixed-top animated slideInDown`}>
                            <button className="close"><i className="fa fa-times-circle"/></button>
                            {
                                messages.map(alert => {
                                    return (
                                        <div key={alert.id}>
                                            <small className="font-weight-bold">{alert.message}</small><br/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </React.Fragment> : null
            }
        </React.Fragment>
    )
};
export default Alert;
