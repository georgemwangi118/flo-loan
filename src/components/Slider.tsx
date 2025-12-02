import React,{useState, useEffect} from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import house from '../assets/house2.jpg';
import cx5 from '../assets/cars/cx-5-1.jpeg';
import hilux from '../assets/cars/hilux-black.jpg';
import handshake from '../assets/handshake.jpg';
import './slider.css';

const slides = [
  {
    id: 0,
    type: "intro",
    title: "Welcome to Firefly Loan Agency",
    subtitle:
      "We shine a light on smarter, better borrowing. We connect you with financing options tailored to your needs, offering quick, hassle-free loans with transparent terms, flexible repayment plans, and a customer-first approach. With Firefly, your financial goals shine—without slowing you down.",
    image: handshake,
  },
  {
    id: 1,
    image: cx5,
    title: "Asset Finance Loan",
    subtitle:"Invest in Your Dreams. Own the asset that will take you further"
  },
  {
    id: 2,
    image: hilux,
    title: "Logbook Loan",
    subtitle:"Get Vehicle Logbook Loan of up to Kes 5 million to keep you moving"
  },
  {
    id: 3,
    image: house,
    title: "Title deed Loan",
    subtitle:"Unlock the Value of Your Property with Our Title Deed Loans"
  },
];

const Slider: React.FC = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 30000);
        return () => clearInterval(interval);
    }, []);

  const handleWhatsAppClick = () => {
    const phone = "254707064524"; 
    const message = "Hello, I’d like to inquire about your loan services.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const goToSlide = (index: number) => setCurrent(index);

  return (
    <div className='font-serif relative w-full h-[400px] lg:h-[700px] overflow-hidden'>
      {slides.map((slide, index) => (
        <div
            key={slide.id}
            className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${index === current 
                ? "opacity-100 z-20 zoom-out-bg"
                : "opacity-0 z-10"
            }`}
            style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: window.innerHeight < 640 ? "top center" : "center",
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Overlay Layer */}
            <div className="absolute inset-0 bg-black/50"></div>
            <div
                className={`w-full h-full flex flex-col justify-center items-center text-white text-center px-4 ${
                    index === current ? "slide-up-content" : "slide-down-content"
                }`}
            >
                <h1 className="text-lg md:text-3xl font-medium mb-4">
                    {slide.title}
                </h1>
                <p className="text-sm md:text-md mb-6 max-w-xl">{slide.subtitle}</p>
                <button
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg "
                    onClick={handleWhatsAppClick}
                >
                    <MessageCircle size={20} />
                    Chat on WhatsApp
                </button>
            </div>
        </div>
      ))}
      
      {/** Arrows */}
      <button
        className="hidden md:flex absolute top-1/2 left-4 transform -translate-y-1/2 z-30 bg-[#FFD700] p-2 rounded-full hover:bg-white"
        onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
      >
        <ChevronLeft size={28} />
      </button>
      <button
        className="hidden md:flex absolute top-1/2 right-4 transform -translate-y-1/2 z-30 bg-[#FFD700]  p-2 rounded-full hover:bg-white"
        onClick={() => setCurrent((current + 1) % slides.length)}
      >
        <ChevronRight size={28} />
      </button>

      {/** Dots */}
      <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30'>
        {slides.map((_, index) => (
            <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                    index === current ? "bg-[#FFD700]" : "bg-white/50"
                }`}
                onClick={() => goToSlide(index)}
            />
        ))}
      </div>
    </div>
  )
}

export default Slider
