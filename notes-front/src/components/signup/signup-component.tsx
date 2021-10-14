import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../services/auth.service';

interface SignupState {
    first_name: string | null;
    last_name : string | null;
    email     : string | null;
    password  : string | null;
    spwd      : string | null;
}

export class Signup extends Component<any,SignupState>{
    constructor(props: any) {
        super(props);
        this.state = {
            first_name: "",
            last_name : "",
            email     : "",
            password  : "",
            spwd      : ""
        }
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    private setFirst(value: string): void {
        this.setState({
            first_name: value
        });
    }

    private setLast(value: string): void {
        this.setState({
            last_name: value
        });
    }

    private setEmail(value: string): void {
        this.setState({
            email: value
        });
    }

    private setFirstPassword(value: string): void {
        this.setState({
            password: value
        });
    }

    private setSecondPassword(value: string): void {
        this.setState({
            spwd: value
        });
    }

    private confirmPassword(): boolean {
        const {password, spwd} = this.state;
        if (spwd === password) {
            return true;
        } else {
            return false;
        }
    }

    private handleSubmit = async (e: any) => {
        e.preventDefault();
        if(this.confirmPassword()) {
            const {first_name, last_name, email, password} = this.state;
            auth.register({first_name, last_name, email, password})
            .then(
                () => {
                  this.props.history.push("/");
                  window.location.reload();
                }
            );
        } else {
            alert("Differents passwords");
        }
    }
    public render(): JSX.Element {
        return(
            <div className = "signup-wrapper">
                <Grid container spacing = {0} justifyContent = "center" direction = "row">
                    <Grid item>
                        <Grid
                            container
                            direction = "column"
                            justifyContent   = "center"
                            spacing   = {2}
                            className = "login-form"
                            >
                            <Paper
                                variant   = "elevation"
                                elevation = {2}
                                className = "login-background"
                                >
                                <Grid item>
                                    <Typography component = "h1" variant = "h5">
                                        Login
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <form onSubmit = {this.handleSubmit}>
                                        <Grid container direction = "column" spacing = {2}>
                                            <Grid item>
                                                <TextField
                                                    type        = "text"
                                                    placeholder = "Firstname"
                                                    fullWidth
                                                    name     = "first_name"
                                                    variant  = "outlined"
                                                    value    = {this.state.first_name}
                                                    onChange = {e => this.setFirst(e.target.value)}
                                                    required
                                                    autoFocus
                                                    />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    type        = "text"
                                                    placeholder = "Lastname"
                                                    fullWidth
                                                    name     = "last_name"
                                                    variant  = "outlined"
                                                    value    = {this.state.last_name}
                                                    onChange = {e => this.setLast(e.target.value)}
                                                    required
                                                    autoFocus
                                                    />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    type        = "email"
                                                    placeholder = "Email"
                                                    fullWidth
                                                    name     = "username"
                                                    variant  = "outlined"
                                                    value    = {this.state.email}
                                                    onChange = {e => this.setEmail(e.target.value)}
                                                    required
                                                    autoFocus
                                                    />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    type        = "password"
                                                    placeholder = "Password"
                                                    fullWidth
                                                    name     = "password"
                                                    variant  = "outlined"
                                                    value    = {this.state.password}
                                                    onChange = {e => this.setFirstPassword(e.target.value)}
                                                    required
                                                    />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    type        = "password"
                                                    placeholder = "Confirm Password"
                                                    fullWidth
                                                    name     = "spwd"
                                                    variant  = "outlined"
                                                    value    = {this.state.spwd}
                                                    onChange = {e => this.setSecondPassword(e.target.value)}
                                                    required
                                                    />
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    variant   = "contained"
                                                    color     = "primary"
                                                    type      = "submit"
                                                    className = "button-block"
                                                    >
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                                <Grid item>
                                    <Link to="/login">
                                        Login
                                    </Link>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

            </div>
        );
    }
}
