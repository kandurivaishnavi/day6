const DataService = (function() {
    // Private functions
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch data from ${url}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async function fetchPosts() {
        try {
            const posts = await fetchData('https://jsonplaceholder.typicode.com/posts');
            displayPosts(posts);
        } catch (error) {
            displayError('Failed to fetch posts.');
        }
    }

    async function fetchTodos() {
        try {
            const todos = await fetchData('https://jsonplaceholder.typicode.com/todos');
            displayTodos(todos);
        } catch (error) {
            displayError('Failed to fetch todos.');
        }
    }

    function displayPosts(posts) {
        const postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <hr>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    function displayTodos(todos) {
        const todosContainer = document.getElementById('todos');
        todosContainer.innerHTML = '';
        todos.forEach(todo => {
            const todoElement = document.createElement('div');
            todoElement.innerHTML = `
                <h2>${todo.title}</h2>
                <p>Completed: ${todo.completed}</p>
                <hr>
            `;
            todosContainer.appendChild(todoElement);
        });
    }

    function displayError(message) {
        const errorElement = document.createElement('div');
        errorElement.textContent = message;
        document.body.appendChild(errorElement);
    }

    // Public API
    return {
        fetchPosts,
        fetchTodos
    };
})();

// Event listeners for buttons
document.getElementById('Posts').addEventListener('click', DataService.fetchPosts);
document.getElementById('Todos').addEventListener('click', DataService.fetchTodos);
