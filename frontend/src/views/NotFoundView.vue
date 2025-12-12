<template>
  <div class="error-page">
    <div class="error-content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <router-link to="/" class="btn btn-primary">Go to Home</router-link>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
}

.error-content {
  text-align: center;
  padding: 2rem;
}

.error-content h1 {
  font-size: 6rem;
  color: var(--primary-color);
  margin-bottom: 0;
}

.error-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.error-content p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}
</style>
