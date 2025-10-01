<template>
  <div class="page-container">
    <div class="container">
      <h1 class="title">به پروژه من خوش آمدید</h1>

      <!-- Inline SVG for the animated rabbit -->
      <div class="rabbit-container">
        <svg viewBox="0 0 100 100" class="rabbit-svg">
          <g>
            <!-- Body -->
            <ellipse cx="50" cy="70" rx="30" ry="20" fill="#a78bfa"/>
            <!-- Head -->
            <circle cx="75" cy="55" r="15" fill="#a78bfa"/>
            <!-- Ears -->
            <ellipse cx="70" cy="35" rx="5" ry="15" fill="#a78bfa" transform="rotate(-20 70 35)"/>
            <ellipse cx="80" cy="35" rx="5" ry="15" fill="#a78bfa" transform="rotate(20 80 35)"/>
            <!-- Eye -->
            <circle cx="78" cy="53" r="2" fill="white"/>
            <!-- Tail -->
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
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles for the index page */
.page-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #ede9fe; /* Light purple background */
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.container {
  text-align: center;
  background-color: white;
  padding: 50px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}


.title {
  font-size: 2.5rem;
  color: #5a4bcf; /* A nice shade of purple */
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

.rabbit-container {
  width: 150px;
  margin: 20px auto;
}

.rabbit-svg {
  width: 100%;
  animation: hop 0.8s infinite ease-in-out;
}

@keyframes hop {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.navigation {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: white;
}

.btn-primary {
  background-color: #7c3aed; /* Vibrant purple */
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.3);
}

.btn-primary:hover {
  background-color: #6d28d9;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
}

.btn-secondary {
  background-color: #a78bfa; /* Lighter purple */
  box-shadow: 0 4px 14px rgba(167, 139, 250, 0.3);
}

.btn-secondary:hover {
  background-color: #8b5cf6;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(167, 139, 250, 0.4);
}
</style>