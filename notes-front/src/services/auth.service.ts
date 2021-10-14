class AuthService {
    public async login(credentials: any) {
        var requestOptions = {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
        };

        return fetch("http://localhost:4001/login", requestOptions)
        .then(response => response.json())
        .then((result) => {
            if(result.message && result.message === "Invalid Credentials") {
                return null;
            } else {
                return result;
            }
        })
        .then(
            (user) => {
                if(user !== null) {
                    localStorage.setItem("user",JSON.stringify(user));
                } else {
                    alert('Email ou Mot de passe incorrect');
                }
            }
        )
        .catch(
            (error) => {
                console.error(error);
            }
        );
    }
  
    logout() {
      localStorage.removeItem("user");
    }
  
    public async register(credentials: any) {
        var requestOptions = {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
            };
    
            return fetch("http://localhost:4001/register", requestOptions)
            .then(response => response.json())
            .then((result) => {
                if(result.message && result.message === "User Already Exist. Please Login") {
                    return null;
                } else {
                    return result;
                }
            })
            .then(
                (user) => {
                    if(user !== null) {
                        localStorage.setItem("user",JSON.stringify(user));
                    } else {
                        alert('Inscription impossible !');
                    }
                }
            )
            .catch(
                (error) => {
                    console.error(error);
                }
            );
    }
  
    getCurrentUser() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if(user.email) {
            return JSON.parse(localStorage.getItem('user') || '{}');
        } else {
            return null;
        }
    }
  }
  
  export default new AuthService();