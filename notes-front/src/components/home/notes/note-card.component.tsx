import { Grid, Card, CardContent, Typography, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import React, { Component } from 'react'
import userService from "./../../../services/user.service"

interface NoteCardProps {
    note: any;
}

interface NoteCardState {
    _id: string;
    title: string;
    content: string;
    author: string;
    isOpen: boolean;
}

export class NoteCard extends Component<NoteCardProps, NoteCardState> {
    constructor(props: NoteCardProps) {
        super(props);
        this.state = {
            _id: this.props.note._id,
            title: this.props.note.title,
            content: this.props.note.content,
            author: this.props.note.author,
            isOpen: false
        }
        this.handleUpdate = this.handleUpdate.bind(this);
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
        const {_id, title, content, author} = this.state;
        userService.updateUserNotes({_id, title, content, author})
        .then(
            () => {
                window.location.reload();
            }
        );
    }
 
    public render() {
        const {note} = this.props;
        return (
            <div className="container">
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="nowrap"
                >
                    <Grid item>
                        <Card>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {note.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <strong>Content : </strong>{note.content}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                       <strong>Author : </strong> {note.author}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                       <strong>ID : </strong> {note._id}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={this.handleUpdate}>
                                        Update
                                    </Button>
                                </CardActions>
                            </Card>

                            <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.isOpen}>

                                <DialogTitle id="customized-dialog-title">
                                   Update Note: {note.title}
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
                                            {note.author}
                                        </Typography>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button autoFocus onClick={this.handleClose} color="secondary">
                                            Cancel
                                        </Button>
                                        <Button type="submit" autoFocus color="primary">
                                            Update
                                        </Button>
                                    </DialogActions>
                                </form>
                            </Dialog>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}