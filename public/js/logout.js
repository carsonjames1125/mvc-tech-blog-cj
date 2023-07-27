const logoutHand = async () => {
    const response = await fetch ('.api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/');
        alert('Log out successful!')
    } else {
        alert ('Log out could not be completed at this time. Try again later!')
    }
};

document.querySelector('#logout').addEventListener('click', logoutHand);