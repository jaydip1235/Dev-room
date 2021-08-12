import React , {useState}from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";
import * as profileActions from '../../../redux/profiles/profile.actions';

let AddExperience = () => {
    let dispatch = useDispatch();
    let history = useHistory();

    let [experience , setExperience] = useState({
        title : '',
        company : '',
        location : '',
        from : '',
        to : '',
        current : '',
        description : ''
    });

    let updateInput = (e) => {
        if(e.target.type === 'checkbox'){
            setExperience({
                ...experience,
                [e.target.name] : e.target.checked
            });
        }
        else{
            setExperience({
                ...experience,
                [e.target.name] : e.target.value
            });
        }
    };

    let submitAddExperience = (e) => {
        e.preventDefault();
        dispatch(profileActions.addExperience(experience , history));
    };

    return (
        <React.Fragment>
            {/*<pre>{JSON.stringify(experience)}</pre>*/}
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal">
                                <i className="fa fa-user-tie"/>
                                {' '} Add Experience
                            </p>
                            <p>Add your Company or Internship Experience</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <form onSubmit={submitAddExperience}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-light-grey text-teal">Title</span>
                                    </div>
                                    <input
                                        required
                                        name="title"
                                        value={experience.title}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Title"/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-light-grey text-teal">Company</span>
                                    </div>
                                    <input
                                        required
                                        name="company"
                                        value={experience.company}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Company"/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-light-grey text-teal">Location</span>
                                    </div>
                                    <input
                                        required
                                        name="location"
                                        value={experience.location}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Location"/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-light-grey text-teal">From Date</span>
                                    </div>
                                    <input
                                        required
                                        name="from"
                                        value={experience.from}
                                        onChange={updateInput}
                                        type="date" className="form-control"/>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        name="current"
                                         disabled={"true" ? experience.to!=="" : "false"}
                                        
                                        value={experience.current}
                                        onChange={updateInput}
                                        className="form-check-input" type="checkbox" id="defaultCheck1"/>
                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                            Current
                                        </label>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-light-grey text-teal">To Date</span>
                                    </div>
                                    <input
                                        required
                                        name="to"
                                        value={experience.to}
                                        onChange={updateInput}
                                        type="date" className="form-control"
                                        disabled={experience.current}/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-light-grey text-teal">Description</span>
                                    </div>
                                    <textarea
                                        required
                                        name="description"
                                        value={experience.description}
                                        onChange={updateInput}
                                        rows="3" className="form-control" placeholder="Description"
                                        style={{height:"100px", width:"100px",resize: "none"}}/>
                                </div>
                                <div>
                                    <input type="submit" value="add experience" className="btn btn-teal btn-sm"/>
                                    <Link to="/profiles/dashboard" className="btn bg-light-grey btn-sm">Back</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};
export default AddExperience;
