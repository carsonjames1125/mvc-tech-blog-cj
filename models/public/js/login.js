const lginFormHand = async (event) => {
    event.preventDefault();
        
        const usernameElement = document.querySelector('#username-login');
        const passwordElement = document.querySelector('#password-login');
        

        const response = await fetch ('/api/user.login', {
            method: 'POST',
            body: JSON.stringify({
                username: usernameElement.value,
                password: passwordElement.value,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Error occured!')
        }
};

document.querySelector('#login-form').addEventListener('submit', lginFormHand);