class UserService {
    public async getUserNotes() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const { email } = user;
        var requestOptions = {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-access-token": user.accessToken
            },
            body: JSON.stringify({ email })
        };
        return fetch("http://localhost:4001/notes", requestOptions)
            .then(response => response.json())
            .then(result => result);
    }

    public async newUserNotes(note: any) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        var requestOptions = {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-access-token": user.accessToken
            },
            body: JSON.stringify(note)
        };
        return fetch("http://localhost:4001/notes/new", requestOptions)
            .then(response => response.json())
            .then(result => result);
    }

    public async updateUserNotes(note: any) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        var requestOptions = {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-access-token": user.accessToken
            },
            body: JSON.stringify(note)
        };
        return fetch("http://localhost:4001/notes/update", requestOptions);
    }
}

export default new UserService();