<template>
  <div>
    <header class="header">
      <div class="logo">
        طراحی سایت و کامپیوتر
      </div>
      <nav>
        <ul>
          <li><a href="#">خانه</a></li>
          <li><a href="#">طراحی سایت</a></li>
          <li><a href="#">پشتیبانی سایت</a></li>
          <li><a href="#">درباره ما</a></li>
          <li><a href="#">تماس با ما</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <h1>به وبسایت ما خوش آمدید</h1>
    </main>
  </div>
</template>

<style>
body {
  font-family: sans-serif;
  margin: 0;
  direction: rtl;
  background-color: #f4f0f8; /* Light purple background */
}

.header {
  background: linear-gradient(to right, #8A2BE2, #4B0082); /* Purple gradient */
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

nav li {
  margin-right: 1.5rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

main {
  padding: 2rem;
  text-align: center;
  color: #333;
}

h1 {
    color: #4B0082; /* Dark Purple */
}
</style>