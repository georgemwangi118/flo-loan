import React,{useState, useEffect} from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import './slider.css';
import { useContent, whatsappUrl } from '../content/useContent';

const Slider: React.FC = () => {
    const { slides, general } = useContent();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 30000);
        return () => clearInterval(interval);
    }, [slides.length]);

  const handleWhatsAppClick = () => {
    window.open(whatsappUrl(general.whatsappNumber, general.whatsappMessage), "_blank");
  };

  const goToSlide = (index: number) => setCurrent(index);

  if (!slides.length) return null;

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
                backgroundImage: `url("${slide.image}")`,
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
        className=" md:flex absolute top-[65%] left-4 transform -translate-y-1/2 z-30 bg-[#FFD700] p-2 rounded-full hover:bg-white"
        onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
      >
        <ChevronLeft size={28} />
      </button>
      <button
        className=" md:flex absolute top-[65%] right-4 transform -translate-y-1/2 z-30 bg-[#FFD700]  p-2 rounded-full hover:bg-white"
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
