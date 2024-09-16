import React, { useState, useEffect } from 'react';
import './Home.css';
import logo from './images/skinology-logo.jpg';
import Nlp from './Nlp'; 
import Cnn from './Cnn'; 
import UploadImageModal from './cnnUpload'; 

function Home() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showNlp, setShowNlp] = useState(false);
    const [showCnn, setShowCnn] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false); // New state for the upload modal

    const handleAnalyzeClick = () => {
        setShowNlp(true);
      };
    
      const handleLiveCameraClick = () => {
        setShowCnn(true);
      };
    
      const handleUploadImageClick = () => {
        setShowUploadModal(true); // Open the image upload modal
      };
  
    return (
        <div id="wrapper">
            <header id="header">
                <div className="logo">
                    <img id="header-img" src={logo} alt="skinology logo" width="200px" />
                </div>
                <nav id="nav-bar">
                    <ul>
                        <li><a className="nav-link" href="#Home">Home</a></li>
                        <li><a className="nav-link" onClick={handleLiveCameraClick}>Live Scan</a></li>
                        <li><a className="nav-link" onClick={handleUploadImageClick}>Upload Image</a></li>
                        <li><a className="nav-link" onClick={handleAnalyzeClick}>Analyze Skin</a></li>
                     </ul>
                </nav>
            </header>
            <main>
                <section id="Home" className="home-bg">
                    <div className="container">
                        <h1 className="home-title">
                            <span className="title-text">Skinology</span>
                        </h1>
                        <h3 className="home-subtitle">
                            <span className="subtitle-text">Find Your True Skin</span>
                        </h3>
                        <p className="info">
                        Our web app is designed to simplify your skincare journey by harnessing the power
            of advanced technology. Using machine learning and artificial intelligence, we analyze
            your unique skin characteristics to recommend the most effective skincare products and
            routines tailored to your needs. Whether you're dealing with acne, dryness, aging, or other
            skin concerns, our app provides personalized insights to help you achieve healthier, more radiant
            skin.
             </p>
                        <a className="button" href="#Shop">Explore!</a>
                    </div>
                </section>
                {/* <section id="Shop" className="default-grey">
                    <div className="container">
                        <h2 className="section-title">Featured Items</h2>
                        <div className="flex-products">
                            <div className="grid">
                                <img className="product" aria-hidden="true" src={product1} alt="Face lotion" />
                                <p className="product-name">Moisture Boost Cleanser</p>
                                <p className="product-price">$6.70</p>
                            </div>
                            <div className="grid">
                                <img className="product" aria-hidden="true" src={product2} alt="Lotion with pump" />
                                <p className="product-name">Vitamin C Toner</p>
                                <p className="product-price">$11.30</p>
                            </div>
                            <div className="grid">
                                <img className="product" aria-hidden="true" src={product3} alt="Lotion tube" />
                                <p className="product-name">Snail Night Mask</p>
                                <p className="product-price">$9.99</p>
                            </div>
                        </div>
                    </div>
                </section> */}
                {/* <section id="About" className="default-grey">
                    <div className="container">
                        <h2 className="section-title">Our Philosophy</h2>
                        <p className="section-description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi animi earum assumenda veritatis magni similique, suscipit, ducimus quidem a, veniam illo dolore laborum consectetur et nulla porro eius iusto quasi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quo suscipit unde quidem ex ullam odio enim, hic officia deleniti illo, laboriosam dolor vero quaerat placeat reprehenderit quas. Id, sit. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Odit incidunt maiores quaerat ipsam illum illo eveniet vel atque accusantium quae totam explicabo, provident distinctio iste? Officia saepe molestias illo ratione.
                        </p>
                        <div className="video-wrap">
                            <iframe
                                id="video"
                                height="360"
                                src="https://www.youtube.com/embed/OxPlCkTKhzY"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </section>
                <section id="Contact" className="default-reverse">
                    <div className="contact-info">
                        <div className="grid">
                            <a className="link" href="#"><p>FAQ</p></a>
                            <a className="link" href="#"><p>Shipping & Returns</p></a>
                            <a className="link" href="#"><p>Store Policy</p></a>
                        </div>
                        <div className="grid">
                            <p>Skinology</p>
                            <p>Tel 123-456-7890</p>
                            <p>Email info@skinology.com</p>
                            <div className="sns">
                                <a className="link" href="#"><p className="sr-only">Skinology Facebook</p><i className="fab fa-facebook" aria-hidden="true"></i></a>
                                <a className="link" href="#"><p className="sr-only">Skinology Twitter</p><i className="fab fa-twitter" aria-hidden="true"></i></a>
                                <a className="link" href="#"><p className="sr-only">Skinology Youtube</p><i className="fab fa-youtube" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <div className="grid">
                            <p>Subscribe to Skinology Newsletter</p>
                            <form
                                className="contact-form"
                                id="form"
                                action="https://www.freecodecamp.com/email-submit">
                                <label className="sr-only" htmlFor="email">Email</label>
                                <input name="email" type="email" className="form-control" id="email" placeholder="Email" required />
                                <button type="submit" id="submit" className="submit">Join</button>
                            </form>
                        </div>
                    </div>
                </section> */}
            </main>
                 {showNlp && <Nlp isOpen={true} onClose={() => setShowNlp(false)} />}
      {showCnn && <Cnn isOpen={true} onClose={() => setShowCnn(false)} />}
      {showUploadModal && <UploadImageModal isOpen={true} onClose={() => setShowUploadModal(false)} />} {/* New upload modal */}
   
        </div>
    );
}

export default Home;
