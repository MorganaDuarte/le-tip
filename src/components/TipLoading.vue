<template>
  <div class="header-section">
    <div class="header-banner">
      <h1 class="header-banner__title">Carregando as cotações</h1>
      <div class="spinner"></div>
    </div>
  </div>
</template>

<style scoped>
.header-section {
  text-align: center;
  margin-bottom: 3rem;
  margin-top: 1rem;
}

.header-banner {
  background-color: #e1f1ca;
  border-radius: 16px;
  padding: 1.2rem 0;
  max-width: 1300px;
  margin: 0 auto 3rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.header-banner__title {
  color: #13164e;
  font-weight: 700;
  font-size: 1.5rem;
}

.spinner {
  width: 22px;
  height: 22px;
  border: 3px solid #13164e;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
