import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, Container } from '@mui/material';
import React, { Component } from 'react';
import auth from "./../../services/auth.service";
import userService from "../../services/user.service";
import { NoteCard } from './notes/note-card.component';

interface HomeProp {}
interface HomeState {
    notes  : Note[];
    title: string;
    content: string;
    author: string;
    isOpen: boolean;
    currentUser: any;
}

interface Note {
    title  : string;
    content: string;
    author : string;
}

export class Home extends Component<HomeProp,HomeState>{
    constructor(props: HomeProp) {
        super(props);
        this.state = {
            notes  : [],
            title: "",
            content: "",
            author: "",
            isOpen: false,
            currentUser: undefined
        }
    }

    componentWillMount() {   
        const user = auth.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user
            },
            () => {
                const {email} = this.state.currentUser;
                this.setState({author: email});
            });
        }
        userService.getUserNotes()
        .then(
            (data) => {
                if(data) {
                    this.setState({
                        notes: data
                    });
                }
            }
        );
    }

    private handleUpdate = () => {
        this.handleOpen();
    }

    private sendUpdate = () => {
        this.handleClose();
    }

    private handleClose = () => {
        this.setState({isOpen: false});
    }

    private handleOpen = () => {
        this.setState({isOpen: true});
    }

    public setTitle = (value: string) => {
        this.setState({title: value});
    }

    public setContent = (value: string) => {
        this.setState({content: value});
    }

    private handleSubmit = () => {
        const {title, content, author} = this.state;
        userService.newUserNotes({title, content, author}).then(
            () => {
                window.location.reload();
            }
        )
    }

    public render(): React.ReactNode {
        const {notes} = this.state;
        const {email} = this.state.currentUser;
        return(
            <div>
                <Container maxWidth="xs">
                    <Grid 
                        container 
                        justifyContent="space-between"
                        spacing={24}
                        padding={2.5}>
                        <Grid item>  
                        <h2>
                            Home
                        </h2>                      
                        </Grid>
                        <Grid item>                        
                            <Button
                                variant   = "contained"
                                color     = "primary"
                                type      = "submit"
                                onClick={this.handleOpen}
                                >
                                + New
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="left" spacing={5}>
                                {notes.map((note) => (
                                    <Grid key={note.title} item>
                                        <NoteCard key={note.title} note={note}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>

                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.isOpen}>

                    <DialogTitle id="customized-dialog-title">
                        New note
                    </DialogTitle>

                    <form onSubmit = {this.handleSubmit}>
                        <DialogContent dividers>
                            <Typography>
                                <strong>
                                    Title
                                </strong>
                            </Typography>
                            <TextField
                                type        = "text"
                                placeholder = "Title"
                                fullWidth
                                name     = "title"
                                variant  = "outlined"
                                value    = {this.state.title}
                                onChange = {e => this.setTitle(e.target.value)}
                                required
                                autoFocus
                                />
                            <Typography gutterBottom>
                                <strong>
                                    Content
                                </strong>
                            </Typography>
                            <TextField
                                type        = "text"
                                placeholder = "Content"
                                fullWidth
                                name     = "content"
                                variant  = "outlined"
                                value    = {this.state.content}
                                onChange = {e => this.setContent(e.target.value)}
                                required
                                autoFocus
                                />
                            <Typography gutterBottom>
                                <strong>
                                    Author
                                </strong>
                            </Typography>
                            <Typography gutterBottom>
                                {email}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={this.handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" autoFocus color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

            </div>
        );
    }
}
