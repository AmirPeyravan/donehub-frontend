<template>
  <div class="page-container">

      <!-- SVG خرگوش -->
      <div class="rabbit-container">
        <svg viewBox="0 0 100 100" class="rabbit-svg">
          <g>
            <ellipse cx="50" cy="70" rx="30" ry="20" fill="#a78bfa"/>
            <circle cx="75" cy="55" r="15" fill="#a78bfa"/>
            <ellipse cx="70" cy="35" rx="5" ry="15" fill="#a78bfa" transform="rotate(-20 70 35)"/>
            <ellipse cx="80" cy="35" rx="5" ry="15" fill="#a78bfa" transform="rotate(20 80 35)"/>
            <circle cx="78" cy="53" r="2" fill="white"/>
            <circle cx="20" cy="65" r="8" fill="white"/>
          </g>
        </svg>
      </div>

      <nav class="navigation">
        <NuxtLink to="/dashboard">
          <button class="btn btn-primary">داشبورد</button>
        </NuxtLink>
        <NuxtLink to="/auth">
          <button class="btn btn-secondary">ورود و ثبت‌نام</button>
        </NuxtLink>
      </nav>
    </main>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  direction: rtl;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.logo {
  font-size: 1.6rem;
  font-weight: bold;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 1.2rem;
  margin: 0;
  padding: 0;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: all 0.3s;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* محتوای اصلی */
.page-container {
  min-height: 100vh;
}

.container {
  text-align: center;
  padding: 40px 20px;
}

.title {
  font-size: 2.2rem;
  color: #4B0082;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
}

/* خرگوش */
.rabbit-container {
  width: 140px;
  margin: 20px auto;
}

.rabbit-svg {
  width: 100%;
  animation: hop 0.9s infinite ease-in-out;
}

@keyframes hop {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

/* دکمه‌ها */
.navigation {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 25px;
}

.btn {
  border: none;
  padding: 12px 22px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  color: white;
}

.btn-primary {
  background-color: #7c3aed;
}

.btn-primary:hover {
  background-color: #6d28d9;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #a78bfa;
}

.btn-secondary:hover {
  background-color: #8b5cf6;
  transform: translateY(-2px);
}
</style>
