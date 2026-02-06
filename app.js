// Base API URL
const API_BASE = 'https://jsonplaceholder.typicode.com';

// Get output element
const output = document.getElementById('output');

// Show loading state
function showLoading() {
    output.innerHTML = '<div class="loading">⏳ Loading data...</div>';
}

// Show error
function showError(error) {
    output.innerHTML = `
        <div class="error">
            <h3>❌ Error</h3>
            <p>${error.message}</p>
        </div>
    `;
}

// Fetch users from API
async function fetchUsers() {
    showLoading();
    
    try {
        const response = await axios.get(`${API_BASE}/users`);
        const users = response.data;
        
        let html = '<div class="results"><h2>👥 Users</h2>';
        users.forEach(user => {
            html += `
                <div class="user-card">
                    <h3>${user.name}</h3>
                    <p><strong>Username:</strong> ${user.username}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>Website:</strong> ${user.website}</p>
                    <p><strong>Company:</strong> ${user.company.name}</p>
                </div>
            `;
        });
        html += '</div>';
        
        output.innerHTML = html;
    } catch (error) {
        showError(error);
    }
}

// Fetch posts from API
async function fetchPosts() {
    showLoading();
    
    try {
        const response = await axios.get(`${API_BASE}/posts`, {
            params: {
                _limit: 10 // Limit to 10 posts
            }
        });
        const posts = response.data;
        
        let html = '<div class="results"><h2>📝 Posts</h2>';
        posts.forEach(post => {
            html += `
                <div class="user-card">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <p><strong>Post ID:</strong> ${post.id} | <strong>User ID:</strong> ${post.userId}</p>
                </div>
            `;
        });
        html += '</div>';
        
        output.innerHTML = html;
    } catch (error) {
        showError(error);
    }
}

// Fetch todos from API
async function fetchTodos() {
    showLoading();
    
    try {
        const response = await axios.get(`${API_BASE}/todos`, {
            params: {
                _limit: 15 // Limit to 15 todos
            }
        });
        const todos = response.data;
        
        let html = '<div class="results"><h2>✅ Todos</h2>';
        todos.forEach(todo => {
            const status = todo.completed ? '✅' : '⬜';
            html += `
                <div class="user-card">
                    <h3>${status} ${todo.title}</h3>
                    <p><strong>Status:</strong> ${todo.completed ? 'Completed' : 'Pending'}</p>
                    <p><strong>Todo ID:</strong> ${todo.id} | <strong>User ID:</strong> ${todo.userId}</p>
                </div>
            `;
        });
        html += '</div>';
        
        output.innerHTML = html;
    } catch (error) {
        showError(error);
    }
}

// Axios interceptors for logging
axios.interceptors.request.use(
    config => {
        console.log('📤 Request:', config.method.toUpperCase(), config.url);
        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        console.log('📥 Response:', response.status, response.statusText);
        return response;
    },
    error => {
        console.error('Response error:', error);
        return Promise.reject(error);
    }
);
