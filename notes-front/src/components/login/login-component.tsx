import React from 'react';
import { Link } from 'react-router-dom';
import "./login.css";
import auth from "../../services/auth.service"
import { Grid, Typography, Paper, TextField, Button } from '@mui/material';


interface LoginState {
    email: string;
    password: string;
}

export class Login extends React.Component<any, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    private setEmail(e: string): void {
        this.setState({
            email: e
        })
    }

    private setPassword(e: string): void {
        this.setState({
            password: e
        })
    }

    private handleSubmit = async (e: any) => {
        e.preventDefault();
        const {email, password} = this.state;
        await auth.login({email, password})
        .then(
            () => {
              this.props.history.push("/");
              window.location.reload();
            }
        );
    }

    public render(): JSX.Element {
        return(
            <div>
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
                                                    onChange = {e => this.setPassword(e.target.value)}
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
                                    <Link to="/signup">
                                        Register
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
