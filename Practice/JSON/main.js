async function createPost(data) {
    fetch("https://localhost:5000/posts", {
        method: "POST",
        body: JSON.stringify(data),
    })
}

createPost({
    id:"3",
    title:"Post 3",
    body:"This is post 3",
})

async function updatePosts(id, data) {
    fetch(`https://localhost:5000/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    })
}

updatePosts("3", {
    title:"Post 3 Updated",
    body:"This is post 3 updated",
})

