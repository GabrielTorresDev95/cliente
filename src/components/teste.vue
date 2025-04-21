<template>
  <link rel="icon" href="data:," />
  <div class="flashcards-app">
    <div class="urgency-bar">
      <p>
        🚨 ÚLTIMAS VAGAS COM DESCONTO! PROMOÇÃO TERMINA EM
        <span class="countdown">{{ formattedCountdown }}</span>
      </p>
    </div>

    <header class="app-header">
      <div class="logo-container">
        <img
          src="@/assets/policiasembg.png"
          alt="Logo Polícia Federal"
          class="logo-img"
        />
      </div>

      <nav class="main-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link"
              >Método Comprovado</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">Resultados</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link login-btn"
              >ACESSAR AGORA</router-link
            >
          </li>
        </ul>
      </nav>
    </header>

    <main class="main-content">
      <section class="hero-section">
        <div class="hero-text">
          <h1 class="hero-title">{{ title }}</h1>
          <p class="hero-description">{{ description }}</p>
          <div class="benefits-list">
            <div class="benefit-item">✅ Aprovado ou seu dinheiro de volta</div>
            <div class="benefit-item">✅ +1.200 aprovados em 2023</div>
            <div class="benefit-item">✅ Atualizado para o último edital</div>
          </div>
          <button @click="scrollToCTA" class="cta-button pulse">
            QUERO SER APROVADO!
          </button>
          <div class="secure-payment">
            <img
              src="https://cdn-icons-png.flaticon.com/512/196/196578.png"
              alt="Pagamento seguro"
            />
            <span>Compra 100% segura</span>
          </div>
        </div>
        <div class="hero-image">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-flat-design-police-badge_23-2149344861.jpg"
            alt="Aprovado PF"
          />
        </div>
      </section>

      <section class="features-section">
        <h2 class="section-title">O MÉTODO QUE VAI TE LEVAR À APROVAÇÃO</h2>
        <p class="section-subtitle">
          Por que nossos alunos conseguem aprovação 3x mais rápido
        </p>

        <div class="flashcards-grid">
          <div class="flashcard">
            <div class="flashcard-icon">📚</div>
            <h3 class="flashcard-title">Conteúdo Direto ao Ponto</h3>
            <div class="flashcard-content">
              Foco exatamente no que cai na prova, sem enrolação. Resumos
              elaborados por especialistas.
            </div>
          </div>

          <div class="flashcard">
            <div class="flashcard-icon">🔄</div>
            <h3 class="flashcard-title">Revisão Sistemática</h3>
            <div class="flashcard-content">
              Sistema de repetição espaçada que faz você lembrar do conteúdo na
              hora da prova.
            </div>
          </div>

          <div class="flashcard">
            <div class="flashcard-icon">📱</div>
            <h3 class="flashcard-title">Acesso em Qualquer Lugar</h3>
            <div class="flashcard-content">
              Estude no celular, tablet ou computador, mesmo offline após
              baixar.
            </div>
          </div>
        </div>
      </section>

      <section class="stats-section">
        <div class="stat-item">
          <div class="stat-number">+1.200</div>
          <div class="stat-label">APROVADOS</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">92%</div>
          <div class="stat-label">DE APROVAÇÃO</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">4.8</div>
          <div class="stat-label">AVALIAÇÃO MÉDIA</div>
        </div>
      </section>

      <section class="video-section">
        <div class="video-container">
          <video
            :src="videoSrc"
            controls
            class="promo-video"
            poster="https://img.freepik.com/free-vector/police-officer-concept-illustration_114360-8523.jpg"
          ></video>
        </div>
        <div class="video-cta">
          <h3>ASSISTA E COMPROVE NOSSO MÉTODO</h3>
          <button @click="scrollToCTA" class="cta-button">
            QUERO FAZER PARTE!
          </button>
        </div>
      </section>

      <section class="testimonials-section">
        <h2 class="section-title">QUEM COMPROU RECOMENDA</h2>
        <p class="section-subtitle">Veja o que dizem nossos aprovados</p>

        <div class="testimonials-grid">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="testimonial-card"
          >
            <div class="testimonial-header">
              <img
                :src="testimonial.image"
                :alt="testimonial.name"
                class="testimonial-img"
              />
              <div>
                <div class="testimonial-name">{{ testimonial.name }}</div>
                <div class="testimonial-role">{{ testimonial.role }}</div>
                <div class="testimonial-rating">★★★★★</div>
              </div>
            </div>
            <p class="testimonial-text">{{ testimonial.text }}</p>
            <div class="testimonial-date">{{ testimonial.date }}</div>
          </div>
        </div>
      </section>

      <section class="offer-section">
        <div class="offer-badge">OFERTA ESPECIAL</div>
        <h2>OFERTA POR TEMPO LIMITADO</h2>
        <p>Adquira agora e garanta todos esses benefícios:</p>

        <ul class="offer-list">
          <li>✅ 1.200 Flashcards digitais</li>
          <li>✅ 12 meses de atualizações gratuitas</li>
          <li>✅ Acesso vitalício após compra</li>
          <li>✅ Bônus: 5 simulados completos</li>
          <li>✅ Bônus: Técnicas de memorização</li>
        </ul>

        <div class="price-container">
          <div class="old-price">De R$ 497,00</div>
          <div class="new-price">Por apenas 12x de R$25,77</div>
          <div class="cash-price">ou R$ 297,00 à vista</div>
        </div>

        <button @click="goToCheckout" class="cta-button pulse">
          QUERO GARANTIR MEU PACOTE!
        </button>

        <div class="guarantee-badge">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
            alt="Garantia"
          />
          <span>7 DIAS DE GARANTIA INCONDICIONAL</span>
        </div>
      </section>

      <section id="cta" class="cta-section">
        <h2 class="cta-title">NÃO DEIXE PARA DEPOIS!</h2>
        <p class="cta-subtitle">Sua aprovação começa aqui</p>

        <div class="cta-grid">
          <div class="cta-card">
            <h3>PACOTE COMPLETO PF</h3>
            <div class="cta-price">12X de R$25,77</div>
            <ul class="cta-features">
              <li>✔ Todos os flashcards PF</li>
              <li>✔ Atualizações por 1 ano</li>
              <li>✔ Bônus exclusivos</li>
              <li>✔ Suporte prioritário</li>
            </ul>
            <button @click="handleCheckout('pf')" class="cta-button">
              COMPRAR AGORA
            </button>
          </div>

          <div class="cta-card highlighted">
            <div class="popular-badge">MAIS POPULAR</div>
            <h3>PACOTE PF + PRF</h3>
            <div class="cta-price">12X de R$37,77</div>
            <ul class="cta-features">
              <li>✔ Todos os flashcards PF</li>
              <li>✔ Todos os flashcards PRF</li>
              <li>✔ Atualizações por 2 anos</li>
              <li>✔ Bônus premium</li>
            </ul>
            <button @click="handleCheckout('pf_prf')" class="cta-button">
              COMPRAR AGORA
            </button>

            <p class="secure-text">
              <img
                src="https://stc.pagseguro.uol.com.br/public/img/pagseguro-logo-horizontal.png"
                alt="PagSeguro"
                width="120"
              />
              <br />Pagamento 100% seguro
            </p>
          </div>
        </div>
      </section>
    </main>

    <div v-if="showPopup" class="offer-popup">
      <div class="popup-content">
        <button class="close-popup" @click="closePopup">×</button>
        <h3>ESPERE! OFERTA ESPECIAL PARA VOCÊ</h3>
        <p>Adicione agora e ganhe 15% de desconto + 3 bônus exclusivos!</p>
        <button @click="goToCheckout" class="cta-button">
          SIM, QUERO APROVEITAR!
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';

export default {
  name: 'FlashcardsPF',
  data() {
    return {
      title: 'FLASHCARDS PF - O MÉTODO DOS APROVADOS',
      description: 'O sistema de revisão que já aprovou mais de 1.200 candidatos na Polícia Federal',
      videoSrc: 'https://revisacards.com/wp-content/uploads/2023/11/Pacotes-TSE.mp4',
      testimonials: [
        {
          id: 1,
          name: 'Carlos Silva',
          role: 'Aprovado PF 2023',
          image: require('../assets/aluno1.png'),
          text: 'Comprei sem acreditar muito, mas os flashcards foram decisivos na minha aprovação. Revivia todo conteúdo em poucos minutos!',
          date: '2 semanas atrás'
        },
        // ... outros depoimentos ...
      ],
      showPopup: false,
      countdownInterval: null,
      loading: false,
      error: null,

      // Dados dos produtos
      products: {
        pfprf: {
          id: 'PFPRF001',
          name: 'Pacote PF + PRF - Flashcards',
          description: 'Pacote completo para Polícia Federal + Polícia Rodoviária Federal',
          price: 37.77,
          image: 'https://revisacards.com/wp-content/uploads/2023/11/pacote-pf-prf.jpg'
        },
        pf: {
          id: 'PF001',
          name: 'Pacote Completo PF - Flashcards',
          description: 'Pacote exclusivo para Polícia Federal',
          price: 25.77,
          image: 'https://revisacards.com/wp-content/uploads/2023/11/pacote-pf.jpg'
        }
      }
    };
  },
  mounted() {
    // Desativa o Armor no ambiente de desenvolvimento para evitar os erros 404
    if (process.env.NODE_ENV === 'development') {
      window.ARMOR_CONFIG = { disable: true };
    }

    setTimeout(() => {
      this.showPopup = true;
    }, 5000);

    this.startCountdown();
    window.addEventListener('mouseout', this.handleExitIntent);
  },
  beforeUnmount() {
    clearInterval(this.countdownInterval);
    window.removeEventListener('mouseout', this.handleExitIntent);
  },
  methods: {
    startCountdown() {
      let minutes = 30;
      let seconds = 0;

      this.countdownInterval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(this.countdownInterval);
            return;
          }
          minutes--;
          seconds = 59;
        } else {
          seconds--;
        }
      }, 1000);
    },
    handleExitIntent(e) {
      if (e.clientY < 0) {
        this.showPopup = true;
        window.removeEventListener('mouseout', this.handleExitIntent);
      }
    },
    closePopup() {
      this.showPopup = false;
    },
    scrollToCTA() {
      document.getElementById('cta').scrollIntoView({ behavior: 'smooth' });
    },

    async createPreference(product) {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch('http://localhost:3000/api/mercadopago/criar-preferencia-marketplace', { // ✅ URL CORRIGIDA PARA A ROTA ESPECÍFICA
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: [{
              title: product.name,
              quantity: 1,
              unit_price: product.price,
            }],
            sellerAccessToken: 'TEST-7353630849226387-040901-ff7869a5eb324d8c91aacf451fad9862-220014507',
            marketplaceFee: 0.10,
            payer: {
              email: "gabrielprofessor802@gmail.com",
            }
          })
        });


        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao criar preferência de pagamento');
        }

        const data = await response.json();

        // Verifique se temos um init_point válido
        if (!data.init_point && !data.sandbox_init_point) {
          throw new Error('URL de checkout não retornada pelo servidor');
        }

        // Redireciona para o checkout
        window.location.href = data.sandbox_init_point || data.init_point;

      } catch (err) {
        console.error('Erro detalhado:', err);
        this.error = err.message || 'Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente.';
        this.showPopup = true;
      } finally {
        this.loading = false;
      }
    },

    async handleCheckout(productCode) {
      console.log('handleCheckout chamado com:', productCode);
      if (productCode === 'pf') {
        await this.createPreference(this.products.pf);
      } else if (productCode === 'pf_prf') {
        await this.createPreference(this.products.pfprf);
      } else {
        console.error('Código de produto inválido:', productCode);
        this.error = 'Ocorreu um erro ao processar sua solicitação.';
        this.showPopup = true;
      }
    },
    async goToCheckout() {
      await this.createPreference(this.products.pfprf); // Função padrão
    },






    redirectToMercadoPago(checkoutUrl) {
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        this.error = 'URL de checkout inválida.';
        this.showPopup = true;
      }
    },

    async goToCheckoutPFPRF() {
      await this.createPreference(this.products.pfprf);
    },

    async goToCheckoutPF() {
      await this.createPreference(this.products.pf);
    },


    // Nova função para direcionar para a página de login
    irParaLogin() {
      this.$router.push('/login'); // Assumindo que sua rota para LoginUser se chama 'login'
    }
  }
}
</script>
<style scoped>
/* Estilos base */
.flashcards-app {
  font-family: 'Montserrat', sans-serif;
  background-color: #0a0a1a;
  color: #ffffff;
  min-height: 100vh;
  position: relative;
}

/* Barra de urgência */
.urgency-bar {
  background: linear-gradient(90deg, #ff0000, #ff6600);
  color: white;
  text-align: center;
  padding: 10px;
  font-weight: 700;
  font-size: 1.1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.urgency-bar .countdown {
  display: inline-block;
  background: #000;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 5px;
  animation: pulse 1s infinite;
}

/* Header */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background-color: rgba(0, 0, 0, 0.8);
  position: sticky;
  top: 38px;
  z-index: 999;
  backdrop-filter: blur(5px);
}

.logo-img {
  height: 100px;
  transition: transform 0.3s;
}

.logo-img:hover {
  transform: scale(1.05);
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 1.5rem;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 15px;
  border-radius: 5px;
  transition: all 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 153, 0, 0.2);
  color: #ff9900;
}

.login-btn {
  background: linear-gradient(90deg, #ff9900, #ff6600);
  color: #000 !important;
  font-weight: 700;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 153, 0, 0.4);
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 5%;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);
}

.hero-text {
  max-width: 600px;
}

.hero-title {
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(90deg, #ff9900, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #cccccc;
}

.benefits-list {
  margin: 2rem 0;
}

.benefit-item {
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

.hero-image img {
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: float 3s ease-in-out infinite;
}

.secure-payment {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #aaaaaa;
}

.secure-payment img {
  width: 20px;
  margin-right: 8px;
}

/* Features Section */
.features-section {
  padding: 4rem 5%;
  background-color: #1a1a2e;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #ff9900;
}

.section-subtitle {
  text-align: center;
  margin-bottom: 3rem;
  color: #cccccc;
  font-size: 1.2rem;
}

.flashcards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.flashcard {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s;
  border: 1px solid rgba(255, 153, 0, 0.2);
  backdrop-filter: blur(5px);
}

.flashcard:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border-color: #ff9900;
}

.flashcard-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.flashcard-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ff9900;
}

.flashcard-content {
  color: #dddddd;
  line-height: 1.6;
}

/* Stats Section */
.stats-section {
  display: flex;
  justify-content: space-around;
  padding: 3rem 5%;
  background: linear-gradient(90deg, #ff6600, #ff9900);
  color: #000;
  text-align: center;
}

.stat-item {
  padding: 1rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
}

.stat-label {
  font-size: 1.2rem;
  font-weight: 600;
}

/* Video Section */
.video-section {
  padding: 4rem 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0a0a1a;
}

.video-container {
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.promo-video {
  width: 100%;
  display: block;
}

.video-cta {
  text-align: center;
}

.video-cta h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #ff9900;
}

/* Testimonials Section */
.testimonials-section {
  padding: 4rem 5%;
  background-color: #1a1a2e;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s;
  border: 1px solid rgba(255, 153, 0, 0.2);
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.testimonial-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.testimonial-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
  border: 2px solid #ff9900;
}

.testimonial-name {
  font-weight: 700;
  color: #ff9900;
}

.testimonial-role {
  font-size: 0.9rem;
  color: #aaaaaa;
}

.testimonial-rating {
  color: #ffcc00;
  font-size: 0.9rem;
  margin-top: 3px;
}

.testimonial-text {
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.testimonial-date {
  font-size: 0.8rem;
  color: #777777;
}

/* Offer Section */
.offer-section {
  padding: 4rem 5%;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%);
  text-align: center;
  position: relative;
}

.offer-badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff0000;
  color: white;
  padding: 5px 20px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
  animation: pulse 1.5s infinite;
}

.offer-section h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #ff9900;
}

.offer-section p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.offer-list {
  text-align: left;
  max-width: 500px;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
}

.offer-list li {
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
}

.offer-list li:before {
  content: "→";
  position: absolute;
  left: 0;
  color: #ff9900;
}

.price-container {
  margin: 2rem 0;
}

.old-price {
  text-decoration: line-through;
  color: #aaaaaa;
  font-size: 1.2rem;
}

.new-price {
  font-size: 2rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0.5rem 0;
}

.cash-price {
  font-size: 1.2rem;
  color: #ff9900;
  font-weight: 600;
}

.guarantee-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
  color: #aaaaaa;
  font-size: 0.9rem;
}

.guarantee-badge img {
  width: 20px;
  margin-right: 8px;
}

/* CTA Section */
.cta-section {
  padding: 4rem 5%;
  background-color: #0a0a1a;
  text-align: center;
}

.cta-title {
  font-size: 2.5rem;
  color: #ff9900;
  margin-bottom: 0.5rem;
}

.cta-subtitle {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #cccccc;
}

.cta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.cta-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s;
  border: 1px solid rgba(255, 153, 0, 0.2);
  position: relative;
}

.cta-card.highlighted {
  border: 2px solid #ff9900;
  transform: scale(1.02);
}

.popular-badge {
  position: absolute;
  top: -15px;
  right: 20px;
  background: #ff9900;
  color: #000;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.8rem;
}

.cta-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #ff9900;
}

.cta-price {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.cta-features {
  text-align: left;
  margin-bottom: 2rem;
}

.cta-features li {
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
}

.cta-features li:before {
  content: "✔";
  position: absolute;
  left: 0;
  color: #ff9900;
}

.payment-methods {
  margin-top: 3rem;
}

.payment-methods img {
  max-width: 400px;
  opacity: 0.8;
}

/* Popup */
.offer-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
}

.popup-content {
  background: linear-gradient(135deg, #1a1a2e 0%, #0a0a1a 100%);
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  text-align: center;
  position: relative;
  border: 2px solid #ff9900;
  animation: popIn 0.5s;
}

.popup-content h3 {
  font-size: 1.8rem;
  color: #ff9900;
  margin-bottom: 1rem;
}

.popup-content p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.close-popup {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ffffff;
}

/* Botões */
.cta-button {
  background: linear-gradient(90deg, #ff9900, #ff6600);
  color: #000;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(255, 153, 0, 0.4);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 153, 0, 0.6);
}

.cta-button.pulse {
  animation: pulse 2s infinite;
}

/* Animações */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes popIn {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Responsivo */
@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    padding: 1rem;
  }
  
  .nav-list {
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 1rem;
    gap: 0.8rem;
  }
  
  .hero-section {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-text {
    margin-bottom: 2rem;
  }
  
  .hero-image img {
    max-width: 100%;
  }
  
  .stats-section {
    flex-direction: column;
    gap: 2rem;
  }
  
  .cta-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-card.highlighted {
    transform: none;
  }
}
</style>