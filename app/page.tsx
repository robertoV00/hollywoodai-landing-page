import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPen,
  faBarsStaggered,
  faMobile,
  faShield,
  faHandsHoldingCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import LoginModal from "@/components/modals/LoginModal";

export default function Home() {
  return (
    <>
      <nav>
        <a href="#">
          <Image
            src="/assets/logo-dark.png"
            alt="HollywoodAI Logo"
            width={150}
            height={50}
            className="nav__logo"
          />
        </a>
        <div className="nav__links">
          <a href="#" className="nav__link">About</a>
          <a href="#" className="nav__link">Features</a>
          <a href="#" className="nav__link">How it works</a>
          <a href="#" className="nav__link">Privacy policy</a>
        </div>
        <LoginModal />
      </nav>

      {/* Hero */}
      <header>
        <div className="row header__row">
          <div className="header__widget">
            <span className="header__widget__title">Meet HollywoodAI</span>
            <span className="header__widget__emoji"> ⏺ </span>
            <span className="header__widget__description">
              Unleash the Power of AI
            </span>
          </div>
          <h1 className="header__title">
            Ultimate AI <br />
            Summariser
            <Image 
              src="/assets/bolt.svg" 
              alt="Bolt icon" 
              width={24} 
              height={24} 
              className="header__title__icon"
            />
          </h1>
          <p className="header__paragraph">
            All-in-one platform to watch your favourite movies in minutes using AI.
          </p>
          <a className="header__button">
            <div className="header__button__iconWrapper">
              <FontAwesomeIcon icon={faPlay} className="header__button__icon" />
            </div>
            <span className="header__button__text">
              See how it works &nbsp;
            </span>
          </a>
        </div>
        <svg
          className="header__svg"
          width="1440"
          height="105"
          viewBox="0 0 1440 105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0C240 68.7147 480 103.072 720 103.072C960 103.072 1200 68.7147 1440 0V104.113H0V0Z"
          ></path>
        </svg>
      </header>

      {/* Features */}
      <section id="features">
        <div className="container">
          <div className="row features__row">
            <h1 className="features__title">
              The future of AI.
            </h1>
            <div className="features__para">
              HollywoodAI is designed to help you enjoy high-quality summaries instantly, without breaking a sweat.
            </div>
            <div className="features__list">
              <div className="feature">
                <div className="feature__iconWrapper">
                  <FontAwesomeIcon icon={faPen} className="feature__icon" />
                </div>
                <div className="feature__text">
                  <h4 className="feature__text__title">
                    AI Generated Summaries
                  </h4>
                  <p className="feature__text__para">
                    Save time with summaries of the world's best movies.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="feature__iconWrapper">
                  <FontAwesomeIcon icon={faCirclePlay} className="feature__icon" />
                </div>
                <div className="feature__text">
                  <h4 className="feature__text__title">
                    Read or Listen
                  </h4>
                  <p className="feature__text__para">
                    Switch between reading and listening modes seamlessly.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="feature__iconWrapper">
                  <FontAwesomeIcon icon={faBarsStaggered} className="feature__icon" />
                </div>
                <div className="feature__text">
                  <h4 className="feature__text__title">
                    Find Your Next Flick
                  </h4>
                  <p className="feature__text__para">
                    Explore our movie lists and personalized recommendations.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="feature__iconWrapper">
                  <FontAwesomeIcon icon={faMobile} className="feature__icon" />
                </div>
                <div className="feature__text">
                  <h4 className="feature__text__title">
                    Multi Platform Access
                  </h4>
                  <p className="feature__text__para">
                    Enjoy your favourite movies on any device.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="feature__iconWrapper">
                  <FontAwesomeIcon icon={faShield} className="feature__icon" />
                </div>
                <div className="feature__text">
                  <h4 className="feature__text__title">
                    Payment Gateways
                  </h4>
                  <p className="feature__text__para">
                    We securely process all card payments.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="feature__iconWrapper">
                  <FontAwesomeIcon icon={faHandsHoldingCircle} className="feature__icon" />
                </div>
                <div className="feature__text">
                  <h4 className="feature__text__title">
                    Eco-Friendly Option
                  </h4>
                  <p className="feature__text__para">
                    HollywoodAI donates 10% of profits to charities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section id="summary">
        <div className="container">
          <div className="row summary__row">
            <div className="summary__text">
              <div className="summary__widget">
                <span className="summary__widget__title">The future of entertainment</span>
                <span className="summary__widget__emoji"> ⏺ </span>
                <span className="summary__widget__description">
                  AI
                </span>
              </div>
              <h2 className="summary__title">
                Say goodbye to 2 hour movies.
              </h2>
              <p className="summary__para">
                HollywoodAI is designed to help you get high-quality summaries of your favourite movies instantly, without breaking a sweat. With our intuitive interface and powerful features, you can easily digest any movie in just minutes instead of hours.
              </p>
            </div>
            <figure className="summary__figure">
              <Image
                src="/assets/summary.png"
                alt="Summary illustration"
                width={500}
                height={300}
                className="summary__figure__img"
              />
              <span className="summary__figure__caption1">
                Search. Summarise. Repeat.
              </span>
              <span className="summary__figure__caption2">
                Powered by AI
              </span>
            </figure>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="steps">
        <div className="container">
          <div className="row steps__row">
            <h2 className="steps__title">
              So, how does it work?
            </h2>
            <div className="steps__list">
              <div className="step-divider"></div>
              <div className="step">
                <div className="step__number">
                  <span>1</span>
                </div>
                <div className="step__para">
                  Browse through our wide selection of the world's most popular movies
                </div>
              </div>
              <div className="step">
                <div className="step__number">
                  <span>2</span>
                </div>
                <div className="step__para">
                  Simply select a movie you'd like to have summarised and let our AI algorithms do the rest.
                </div>
              </div>
              <div className="step">
                <div className="step__number">
                  <span>3</span>
                </div>
                <div className="step__para">
                  Take a couple of minutes to read and listen to the summary. And you're done!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        <div className="container">
          <div className="row testimonials__row">
            <div className="testimonials__widget">
              <span className="testimonials__widget__title">Testimonials</span>
              <span className="testimonials__widget__emoji">⏺</span>
              <span className="testimonials__widget__description">
                TrustPilot
              </span>
            </div>
            <h2 className="testimonials__title">
              What our members say.
            </h2>
            <div className="testimonials__list">
              <div className="testimonial">
                <Image
                  src="/assets/testimonial-1.png"
                  alt="Olivia Chapman"
                  width={100}
                  height={100}
                  className="testimonial__img"
                />
                <span className="testimonial__name">
                  Olivia Chapman
                </span>
                <span className="testimonial__occupation">
                  Student
                </span>
                <p className="testimonial__para">
                  "Hollywood AI made big promises and delivered on them! Absolutely cannot live without this tool!"
                </p>
              </div>
              <div className="testimonial">
                <Image
                  src="/assets/testimonial-2.png"
                  alt="Eric Fisherman"
                  width={100}
                  height={100}
                  className="testimonial__img"
                />
                <span className="testimonial__name">
                  Eric Fisherman
                </span>
                <span className="testimonial__occupation">
                  Professor
                </span>
                <p className="testimonial__para">
                  "Definitely worth the purchase if you are a busy person who stills want to keep up with the latest movies"
                </p>
              </div>
              <div className="testimonial">
                <Image
                  src="/assets/testimonial-3.png"
                  alt="Anisong Silkum"
                  width={100}
                  height={100}
                  className="testimonial__img"
                />
                <span className="testimonial__name">
                  Anisong Silkum
                </span>
                <span className="testimonial__occupation">
                  Student
                </span>
                <p className="testimonial__para">
                  "The summaries provide a really great overview of the movies. It's also very easy to use. 5/5!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <section id="cta">
          <svg className="cta__svg" preserveAspectRatio="none" width="1440" height="86" viewBox="0 0 1440 86" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 85.662C240 29.1253 480 0.857 720 0.857C960 0.857 1200 29.1253 1440 85.662V0H0V85.662Z"></path>
          </svg>
          <div className="container">
            <div className="row cta__row">
              <p className="cta__widget">
                <span className="cta__widget__logo">HollywoodAI</span>
                Endless benefits, one subscription.
              </p>
              <h2 className="cta__title">
                Start your free trial.
              </h2>
              <p className="cta__para">
                Enjoy your favourite movies in minutes by letting AI do the work for you.
              </p>
              <button className="cta__button">
                <span className="cta__button__text">
                  Join HollywoodAI
                </span>
                <Image
                  src="/assets/bolt.svg"
                  alt="Bolt icon"
                  width={24}
                  height={24}
                  className="cta__button__icon"
                />
              </button>
            </div>
          </div>
        </section>
        <section id="links">
          <div className="links__container">
            <Image
              src="/assets/logo-light.png"
              alt="HollywoodAI Logo"
              width={150}
              height={50}
              className="links__logo"
            />
            <div className="links__list">
              <a className="links__link" href="#">
                <FontAwesomeIcon icon={faInstagram} className="links__link__icon" />
                <span className="links__link__text">
                  Instagram
                </span>
              </a>
              <a className="links__link" href="#">
                <FontAwesomeIcon icon={faTwitter} className="links__link__icon" />
                <span className="links__link__text">
                  Twitter
                </span>
              </a>
              <a className="links__link" href="#">
                <FontAwesomeIcon icon={faFacebook} className="links__link__icon" />
                <span className="links__link__text">
                  Facebook
                </span>
              </a>
              <a className="links__link" href="#">
                <FontAwesomeIcon icon={faTiktok} className="links__link__icon" />
                <span className="links__link__text">
                  Tiktok
                </span>
              </a>
            </div>
          </div>
        </section>
        <section id="copyright">
          <div className="copyright__container">
            <form action="" className="copyright__form">
              <input
                type="text"
                className="copyright__form__input"
                placeholder="Enter your email"
              />
              <button type="button" className="copyright__form__button">
                Subscribe
              </button>
            </form>
            <span className="copyright__text">
              2024 Copyright © Hollywood AI
            </span>
          </div>
        </section>
      </footer>
    </>
  );
}