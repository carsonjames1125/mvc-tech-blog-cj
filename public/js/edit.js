const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];


// how the user is going to edit the post

const editPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;

    const content = document.querySelector('textarea[name="post-content"]').value;

    const response = await fetch(`/api/post/$${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            postId: id,
            title,
            content,
        }),
        headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert('Error occured!');
    }
};


document.querySelector('edit-form').addEventListener('submit', editPost);