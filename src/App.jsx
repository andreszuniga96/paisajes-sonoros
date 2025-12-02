import React, { useState, useEffect } from 'react';
import { Leaf, Music, Brain, Calendar, MapPin, Instagram, CheckCircle, ArrowRight, Activity, Globe, Menu, X, Camera, Mail, Download, Share2, Users, Phone, Star, MessageCircle } from 'lucide-react';

// --- IMPORTAR FIREBASE ---
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot, query } from "firebase/firestore";

// --- CONFIGURACIÓN DE FIREBASE (¡PEGA TUS DATOS AQUÍ!) ---
// Copia esto de tu consola de Firebase > Configuración del Proyecto
const firebaseConfig = {
  apiKey: "AIzaSyC7N04xewN_Tk3gDWvDZqxuYoIIXWbhWqA",
  authDomain: "bioexpo-registro.firebaseapp.com",
  projectId: "bioexpo-registro",
  storageBucket: "bioexpo-registro.firebasestorage.app",
  messagingSenderId: "775413309376",
  appId: "1:775413309376:web:21ef55574259ad32b0f225",
  measurementId: "G-5SQ9TM1KXS"
};

// Inicializar Firebase solo si hay configuración (para evitar errores en visualización si no se pone)
let db;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (e) {
  console.warn("Firebase no configurado aún o error en init");
}

// --- Assets Mapping ---
const assets = {
  poster: "WhatsApp Image 2025-11-30 at 7.48.47 PM.jpeg",
  franciscoLogo: "WhatsApp Image 2025-11-30 at 7.50.03 PM.jpeg",
  franciscoBio: "WhatsApp Image 2025-11-30 at 8.27.25 PM.png",
  tianYao: "WhatsApp Image 2025-11-30 at 8.21.36 PM.jpeg",
  espeletia: "ESPELETIA STUDIO Logo Blanco.png",
  triskra: "WhatsApp Image 2025-11-30 at 8.21.36 PM (1).jpeg",
  impulsoVerde: "LOGO PNG. BLANCO.png",
  terapiaIndividual: "WhatsApp Image 2025-11-30 at 10.29.50 PM.png",
  videoPaisaje: "VID-20251130-WA0047.mp4",
  omarLopez: "WhatsApp Image 2025-12-01 at 7.19.36 AM.jpeg",
  corponarino: "logo t.png",
  impulso: "WhatsApp Image 2025-11-30 at 8.38.25 PM.jpeg",
  grupo: "WhatsApp Image 2025-12-01 at 7.15.18 AM.jpeg",
  bioexpo: "Captura de pantalla 2025-12-01 075548.png",
  cuantic: "WhatsApp Image 2025-12-01 at 9.50.59 PM.jpeg",
  open:"WhatsApp Image 2025-12-01 at 10.08.34 AM.jpeg",
  // Imágenes de la galería
  mountain: "WhatsApp Image 2025-11-30 at 8.15.26 PM (5).jpeg",
  toucan: "WhatsApp Image 2025-11-30 at 8.15.26 PM (3).jpeg",
  lakeAerial: "WhatsApp Image 2025-11-30 at 8.15.26 PM.jpeg",
  lakeCrater: "WhatsApp Image 2025-11-30 at 8.15.26 PM (1).jpeg",
  flowerRed: "WhatsApp Image 2025-11-30 at 8.15.26 PM (2).jpeg",
  flowerOrange: "WhatsApp Image 2025-11-30 at 8.15.26 PM (6).jpeg"
};

const ODSBadge = ({ number, title, color }) => (
  <div className="flex flex-col items-center p-3 transition-transform hover:scale-105 group cursor-default">
    <div className={`w-14 h-14 md:w-16 md:h-16 ${color} text-white font-bold text-xl md:text-2xl flex items-center justify-center rounded shadow-lg mb-2 group-hover:shadow-xl transition-all`}>
      {number}
    </div>
    <span className="text-[10px] md:text-xs text-center font-bold text-gray-600 max-w-[100px] group-hover:text-teal-700 transition-colors">{title}</span>
  </div>
);

const SponsorLogo = ({ src, alt, className = "", isText = false, text = "" }) => (
  <div className="flex items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all h-24 w-full border border-gray-100 group relative">
    {isText ? (
      <span className="text-sm md:text-lg font-bold text-gray-500 group-hover:text-teal-600 transition-colors text-center leading-tight">{text}</span>
    ) : (
      <img src={src} alt={alt} className={`max-h-16 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 ${className}`} onError={(e) => e.target.style.display = 'none'} />
    )}
  </div>
);

const DigitalTicket = ({ data }) => (
  <div id="ticket-digital" className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xl max-w-sm mx-auto transform transition-all hover:scale-[1.02] relative my-4">
    <div className="bg-teal-900 p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src={assets.lakeAerial} alt="Texture" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 text-center">
        <p className="text-teal-300 text-[10px] font-bold tracking-widest uppercase mb-1">Invitación Oficial</p>
        <h3 className="text-white text-xl font-bold font-serif">Paisajes Sonoros</h3>
        <p className="text-white/80 text-xs mt-1">La Música de las Plantas</p>
      </div>
    </div>
    <div className="p-6 relative">
      <div className="space-y-4 text-center">
        <div>
          <p className="text-[10px] text-gray-400 uppercase font-bold">Asistente</p>
          <p className="text-lg font-bold text-gray-800">{data.name}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-100 py-4">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Fecha</p>
            <p className="text-sm font-semibold text-teal-700">{data.schedule.split(' - ')[0]}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Hora</p>
            <p className="text-sm font-semibold text-teal-700">{data.schedule.split(' - ')[1]}</p>
          </div>
        </div>
        <div>
          <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Lugar</p>
          <p className="text-sm text-gray-600">Casa Museo Taminango</p>
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStep, setFormStep] = useState('input');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', schedule: 'Martes 2 Dic - 10:30 a.m.' });
  const [occupancy, setOccupancy] = useState({});

  // Configuración de Aforo Inicial (Los que ya están inscritos manualmente)
  const manualOccupancy = {
    'Jueves 4 Dic - 10:30 a.m.': 30, // Ya hay 30 inscritos
    'Miércoles 3 Dic - 4:30 p.m.':20, // Ya hay 20 inscritos
    'Miércoles 3 Dic - 6:30 p.m.':20, // Ya hay 20 inscritos
  };
  const MAX_CAPACITY = 50;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // --- ESCUCHA EN TIEMPO REAL DE FIREBASE ---
    if (db) {
      const q = query(collection(db, "registrations"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const counts = {};
        querySnapshot.forEach((doc) => {
          const sched = doc.data().schedule;
          counts[sched] = (counts[sched] || 0) + 1;
        });
        setOccupancy(counts);
      });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        unsubscribe();
      };
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcular cupos restantes
  const getRemainingSpots = (scheduleOption) => {
    const dbCount = occupancy[scheduleOption] || 0;
    const manualCount = manualOccupancy[scheduleOption] || 0;
    const totalUsed = dbCount + manualCount;
    return Math.max(0, MAX_CAPACITY - totalUsed);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStep('loading');

    // Validación final de aforo antes de guardar
    if (getRemainingSpots(formData.schedule) <= 0) {
      alert("Lo sentimos, este horario se acaba de llenar.");
      setFormStep('input');
      return;
    }

    try {
      if (db) {
        // Guardar en Firebase
        await addDoc(collection(db, "registrations"), {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          schedule: formData.schedule,
          timestamp: new Date()
        });
        setFormStep('success');
      } else {
        // Fallback si no hay DB configurada (solo simulación visual)
        console.warn("DB no configurada, simulando éxito");
        setTimeout(() => setFormStep('success'), 1500);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      setFormStep('error');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setFormStep('input');
      setFormData({ name: '', email: '', phone: '', schedule: 'Martes 2 Dic - 10:30 a.m.' });
    }, 300);
  };

  // Lista de Horarios
  const schedules = [
    "Martes 2 Dic - 10:30 a.m.",
    "Martes 2 Dic - 3:30 p.m.",
    "Miércoles 3 Dic - 10:30 a.m.",
    "Miércoles 3 Dic - 4:30 p.m.",
    "Miércoles 3 Dic - 6:30 p.m.",
    "Jueves 4 Dic - 10:30 a.m.",
    "Jueves 4 Dic - 4:30 p.m.",
    "Jueves 4 Dic - 6:30 p.m.",
    "Viernes 5 Dic - 9:00 a.m.",
    "Viernes 5 Dic - 11:30 a.m."
  ];

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen selection:bg-teal-200 selection:text-teal-900 overflow-x-hidden">
      
      {/* --- Navigation --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group">
             <img src={assets.franciscoLogo} alt="Francisco Lagos Luna" className="h-10 w-auto md:h-12 object-contain" />
          </a>
          
          <div className="hidden md:flex gap-6 text-sm font-semibold tracking-wide text-gray-600 items-center">
            {['Inicio', 'Experiencia', 'Servicios', 'Bio'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-teal-600 transition-colors text-[10px] lg:text-xs uppercase tracking-widest">
                {item}
              </a>
            ))}
            <button onClick={() => setShowModal(true)} className="bg-teal-600 text-white px-5 py-2 rounded-full font-bold hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-500/30 transform hover:-translate-y-0.5 text-[10px] lg:text-xs uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-3 h-3" />
              Inscribirse
            </button>
          </div>

          <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
           <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col gap-4 border-t border-gray-100 h-screen z-50">
              {['Inicio', 'Experiencia', 'Servicios', 'Bio'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-600 font-medium py-3 border-b border-gray-100 text-lg" onClick={() => setMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
            <button onClick={() => { setShowModal(true); setMobileMenuOpen(false); }} className="bg-teal-600 text-white px-6 py-4 rounded-lg font-bold w-full text-lg mt-4">
              Inscribirse Ahora
            </button>
           </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section id="inicio" className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={assets.mountain} alt="Montaña Background" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-100/80 backdrop-blur text-teal-800 rounded-full text-[10px] font-bold tracking-widest uppercase border border-teal-200 shadow-sm animate-fade-in-up">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
                BioExpo 2025
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-teal-950 leading-tight tracking-tight">
                PAISAJES <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">SONOROS</span>
              </h1>
              
              <h2 className="text-lg md:text-xl lg:text-2xl text-gray-600 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                La música de las plantas. Una experiencia sensorial donde la bioelectricidad de la naturaleza se convierte en arte.
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button onClick={() => setShowModal(true)} className="px-8 py-4 bg-teal-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:bg-teal-700 transition-all flex items-center justify-center gap-2 group transform hover:scale-105">
                  Vivir la Experiencia
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="https://www.instagram.com/franciscolagosluna?igsh=MWp5a2IxZThqbXFoYQ%3D%3D" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white text-teal-800 border-2 border-teal-50 rounded-xl font-bold hover:bg-teal-50 hover:border-teal-200 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                  <Instagram className="w-5 h-5" />
                  Ver Trailer
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-gray-500 font-medium pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-500" />
                  2 - 5 Diciembre
                </div>
                <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-500" />
                  Casa Taminango, Pasto
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative perspective-1000 mt-8 lg:mt-0 px-8 lg:px-0">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-[8px] border-white transform rotate-y-6 hover:rotate-y-0 transition-transform duration-700 ease-out group">
                <img src={assets.poster} alt="Afiche Paisajes Sonoros" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Experience Section --- */}
      <section id="experiencia" className="py-20 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-teal-600 font-bold tracking-widest text-xs uppercase">¿Qué vas a vivir?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">Un Viaje Sensorial Único</h2>
            <p className="text-base md:text-lg text-gray-600">
              Fusionamos sonido, ciencia y naturaleza. Un recorrido inmersivo por el Pacífico, los Andes y la Amazonía que transforma tu forma de escuchar la vida.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-gray-50 hover:bg-teal-50 transition-colors duration-300 border border-transparent hover:border-teal-100">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-teal-600 group-hover:text-teal-700 group-hover:scale-110 transition-all">
                <Music className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Estaciones Inmersivas</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Audio profesional y auriculares inalámbricos para transportarte a los ecosistemas de Nariño sin salir de la sala.
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-gray-50 hover:bg-emerald-50 transition-colors duration-300 border border-transparent hover:border-emerald-100">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-emerald-600 group-hover:text-emerald-700 group-hover:scale-110 transition-all">
                <Brain className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Neurociencia Aplicada</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Entiende cómo tu cerebro responde a los sonidos naturales y por qué la naturaleza es la mejor terapia.
              </p>
            </div>
            <div className="group p-8 rounded-3xl bg-lime-900 text-white relative overflow-hidden shadow-lg">
              <img src={assets.flowerRed} alt="Flor" className="absolute inset-0 w-full h-full object-cover opacity-20 scale-125" />
              <div className="absolute inset-0 bg-gradient-to-t from-lime-900 to-transparent"></div>
              <div className="w-14 h-14 bg-white/10 backdrop-blur rounded-2xl shadow-sm flex items-center justify-center mb-6 relative z-10 text-lime-300 border border-white/20">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10 text-white">Música de las Plantas</h3>
              <p className="text-lime-100 relative z-10 text-sm md:text-base">
                Un concierto en vivo generado por la bioelectricidad de las plantas, acompañadas por músicos y terapeutas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: Why is it important? (Video Background) --- */}
      <section className="py-24 relative overflow-hidden flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
            <source src={assets.videoPaisaje} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-teal-900/70 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-teal-200 text-xs font-bold tracking-widest uppercase mb-4">Bienestar & Ciencia</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Lo que escuchamos transforma la mente
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-left mb-10 bg-white/10 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
            <div>
              <h4 className="text-xl font-bold text-teal-300 mb-4">Los paisajes sonoros naturales:</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400" /> Regulan el sistema nervioso</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400" /> Reducen el estrés (Cortisol)</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400" /> Aumentan la concentración</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-teal-300 mb-4">&nbsp;</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400" /> Equilibran las emociones</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400" /> Activan ondas de calma y creatividad</li>
              </ul>
            </div>
          </div>
          <p className="text-lg md:text-xl font-light italic opacity-90">
            "Volver a escuchar a la naturaleza es un acto de bienestar personal y un compromiso con la preservación de la vida. Lo que protegemos transforma el futuro."
          </p>
        </div>
      </section>

      {/* --- Gallery Section --- */}
      <section id="galeria" className="py-20 bg-slate-900 relative">
         <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
              <div className="max-w-xl">
                <span className="text-teal-400 font-bold tracking-widest text-xs uppercase">Nuestros Protagonistas</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Paisajes Vivos de Nariño</h2>
                <p className="text-slate-300 mt-4 text-sm md:text-base">
                  Cada sonido que escucharás proviene de estos ecosistemas reales. Fauna vibrante, lagunas sagradas y flora que canta.
                </p>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs md:text-sm">
                <Camera className="w-4 h-4" />
                <span>Fotografía: Francisco Lagos & Colaboradores</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {/* 1. Tucán */}
               <div className="group relative overflow-hidden rounded-2xl aspect-square md:row-span-2 md:aspect-auto cursor-pointer">
                  <img src={assets.toucan} alt="Tucán" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                     <p className="text-white font-bold text-sm">Fauna del Pacífico</p>
                  </div>
               </div>
               <div className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"><img src={assets.lakeAerial} alt="Laguna Verde" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>
               <div className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"><img src={assets.flowerRed} alt="Flor Roja" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>
               <div className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"><img src={assets.flowerOrange} alt="Flor Naranja" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>
               <div className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"><img src={assets.lakeCrater} alt="Laguna Cráter" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>
               <div className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer md:col-span-1"><img src={assets.mountain} alt="Montaña" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>
            </div>
         </div>
      </section>

      {/* --- SERVICES SECTION (Actualizada) --- */}
      <section id="servicios" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-bold tracking-widest text-xs uppercase">Más allá del evento</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Servicios Terapéuticos</h2>
          </div>

          <div className="flex flex-col gap-12">
            
            {/* Servicio 1: Terapia Individual */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row">
               <div className="md:w-5/12 relative min-h-[300px]">
                 <img src={assets.terapiaIndividual} alt="Terapia Individual" className="absolute inset-0 w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent flex items-end p-8">
                   <h3 className="text-white text-2xl font-bold">Vivir es Vibrar</h3>
                 </div>
               </div>
               <div className="md:w-7/12 p-8 lg:p-12 flex flex-col justify-center">
                 <div className="flex items-center gap-2 text-teal-600 mb-4">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold uppercase text-xs tracking-wider">Método Sonora</span>
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">Terapia Individual</h3>
                 <p className="text-gray-600 mb-6 leading-relaxed">
                   La música, la respiración rítmica y la visualización trabajan juntas para entrenar tu atención. Tu energía enfocada se convierte en movimiento para transformar tus metas en logros.
                 </p>
                 <a 
                   href="https://wa.me/573206586727?text=Hola%20Francisco,%20me%20interesa%20agendar%20una%20terapia%20individual." 
                   target="_blank" 
                   rel="noreferrer" 
                   className="inline-flex items-center justify-center gap-2 bg-teal-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-500/30 w-full md:w-auto"
                 >
                   <Phone className="w-4 h-4" />
                   Agendar Cita (+57 320 658 6727)
                 </a>
                 <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                    <MapPin className="w-4 h-4" />
                    Carrera 39 # 20-24, Av. Los Estudiantes
                 </div>
               </div>
            </div>

            {/* Servicio 2: Musicoterapia Grupal (Sección Independiente Omar López) */}
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl overflow-hidden shadow-xl text-white flex flex-col md:flex-row-reverse">
               <div className="md:w-5/12 relative min-h-[300px] group">
                 <img src={assets.omarLopez} alt="Musicoterapia Grupal - Omar López" className="absolute inset-0 w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-l from-transparent to-purple-900/90"></div>
               </div>
               <div className="md:w-7/12 p-8 lg:p-12 flex flex-col justify-center relative z-10">
                 <div className="flex items-center gap-2 text-purple-300 mb-4">
                    <Users className="w-5 h-5" />
                    <span className="font-bold uppercase text-xs tracking-wider">Conexión Colectiva</span>
                 </div>
                 <h3 className="text-2xl font-bold mb-2">Musicoterapia Grupal</h3>
                 <p className="text-purple-200 text-sm mb-4">Dirigido por el Musicoterapeuta Omar López. Licenciado en Música. Máster en Musicoterapia. Medicina Tradicional China</p>
                 <p className="text-indigo-100 leading-relaxed mb-8">
                   Espacios de conexión donde el sonido sana, integra y fortalece equipos o comunidades. Ideal para empresas y grupos de bienestar que buscan armonía y resiliencia a través de la música.
                 </p>
                 <a 
                   href="https://wa.me/573117762785?text=Hola,%20me%20interesa%20información%20sobre%20musicoterapia%20grupal." 
                   target="_blank" 
                   rel="noreferrer" 
                   className="inline-flex items-center justify-center gap-2 bg-white text-indigo-900 py-3 px-6 rounded-xl font-bold hover:bg-indigo-50 transition-all w-full md:w-auto"
                 >
                   <MessageCircle className="w-4 h-4" />
                   Contactar a Omar (+57 311 776 2785)
                 </a>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CREDITS SECTION (Actualizada) --- */}
      <section id="creditos" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Equipo de Creación</h2>
            <p className="text-slate-500 mt-2">Las mentes y corazones detrás de la experiencia</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Columna 1 */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h4 className="text-teal-600 font-bold uppercase text-xs tracking-widest mb-2">Dirección y Neuromúsica</h4>
                <p className="text-xl font-bold text-slate-800">Francisco Lagos Luna</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h4 className="text-teal-600 font-bold uppercase text-xs tracking-widest mb-2">Producción Musical</h4>
                <p className="text-xl font-bold text-slate-800">Rafael Lasso</p>
                <p className="text-sm text-slate-500">Espeletia Estudio</p>
              </div>
            </div>

            {/* Columna 2 */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h4 className="text-teal-600 font-bold uppercase text-xs tracking-widest mb-2">Producción Visual & Foto</h4>
                <p className="text-xl font-bold text-slate-800">Pablo Villota</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h4 className="text-teal-600 font-bold uppercase text-xs tracking-widest mb-2">Visuales Inmersivos</h4>
                <p className="text-xl font-bold text-slate-800">Cristian Ramírez</p>
                <p className="text-sm text-slate-500">CRISRRA VJ</p>
              </div>
            </div>

            {/* Columna 3 - Equipo Musicoterapéutico */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:row-span-2">
              <h4 className="text-teal-600 font-bold uppercase text-xs tracking-widest mb-4">Equipo Musicoterapéutico</h4>
              <ul className="space-y-3 text-sm text-slate-700">
                <li><strong className="block text-slate-900">Director Musical:</strong> Musicoterapeuta Omar López</li>
                <li><strong className="block text-slate-900">Cantante:</strong> Musicoterapeuta Consuelo López</li>
                <li><strong className="block text-slate-900">Neuromúsico:</strong> Musicoterapeuta Francisco Lagos</li>
                <li><strong className="block text-slate-900">Chelo:</strong> Musicoterapeuta Gilberto Trujillo</li>
                <li><strong className="block text-slate-900">Mandolina y guitarra:</strong> Nicolás López</li>
              </ul>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="text-teal-600 font-bold uppercase text-xs tracking-widest mb-2">Aliado Ambiental</h4>
                <p className="font-bold text-slate-800">Fundación Impulso Verde Kuaspue</p>
                <p className="text-xs text-slate-500">La música de las plantas</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Strategic Impact & ODS --- */}
      <section id="impacto" className="py-20 bg-teal-50 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-teal-600" />
                <span className="font-bold tracking-wider text-teal-600 uppercase text-xs md:text-sm">Alineación Estratégica</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-teal-900 leading-snug">
                Más que arte, es desarrollo sostenible y salud pública.
              </h2>
              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed text-justify">
                Paisajes Sonoros se alinea con los <strong>Planes de Desarrollo Municipal y Departamental</strong>, fortaleciendo el tejido social a través de la cultura.
              </p>
              
              <div className="bg-white p-6 rounded-xl border border-teal-100 shadow-sm">
                <h4 className="font-bold text-teal-700 mb-2 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Impacto Comprobado
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">✔ Regulación sistema nervioso</li>
                  <li className="flex items-center gap-2">✔ Reducción del cortisol</li>
                  <li className="flex items-center gap-2">✔ Aumento concentración</li>
                  <li className="flex items-center gap-2">✔ Activación creatividad</li>
                </ul>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-white rounded-3xl p-8 shadow-xl border-t-4 border-teal-500">
                <h3 className="text-center font-bold text-gray-900 mb-8">Objetivos de Desarrollo Sostenible</h3>
                <div className="grid grid-cols-2 gap-6">
                  <ODSBadge number="3" title="Salud y Bienestar" color="bg-[#4C9F38]" />
                  <ODSBadge number="4" title="Educación de Calidad" color="bg-[#C5192D]" />
                  <ODSBadge number="11" title="Ciudades Sostenibles" color="bg-[#FD9D24]" />
                  <ODSBadge number="15" title="Vida de Ecosistemas" color="bg-[#56C02B]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Bio Section --- */}
      <section id="bio" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
             <div className="md:w-5/12 relative group w-full">
                <div className="absolute inset-0 bg-teal-600 rounded-2xl transform rotate-6 opacity-20 group-hover:rotate-3 transition-transform duration-500"></div>
                <img src={assets.franciscoBio} alt="Francisco Lagos Bio" className="relative rounded-2xl shadow-lg w-full object-cover z-10" />
             </div>
             <div className="md:w-7/12 space-y-6 w-full">
               <h3 className="text-emerald-600 font-bold uppercase tracking-widest text-xs md:text-sm">¿Quién está detrás?</h3>
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Francisco Lagos Luna</h2>
               <p className="text-lg md:text-xl text-teal-800 font-medium">
                 Ingeniero Sanitario y Ambiental | Musicoterapeuta | Neuromúsico
               </p>
               <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                 <p>
                   Soy un intérprete de charango y explorador del sonido como herramienta terapéutica. He llevado la musicoterapia a países como <strong>Ecuador, Perú, México, India y Estados Unidos</strong>.
                 </p>
                 <p>
                   Mi misión es colaborar con expertos en salud y arte para acompañar procesos de crecimiento personal desde la vibración y la consciencia sonora.
                 </p>
               </div>
               
               <a href="https://www.instagram.com/franciscolagosluna?igsh=MWp5a2IxZThqbXFoYQ%3D%3D" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-teal-600 font-bold hover:text-teal-800 transition-colors mt-4 group">
                 <span className="p-2 bg-teal-100 rounded-full group-hover:bg-teal-200 transition-colors">
                   <Instagram className="w-5 h-5" />
                 </span>
                 Sígueme en Instagram
               </a>
             </div>
          </div>
        </div>
      </section>

      {/* --- Sponsors --- */}
      <section id="aliados" className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-2xl font-bold mb-12">Nuestros Aliados</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <SponsorLogo src={assets.bioexpo} alt="BioExpo Brand" />
            <SponsorLogo src={assets.corponarino} alt="Corponarino Brand" />
            <SponsorLogo src={assets.impulsoVerde} alt="Impulso Verde" className="bg-teal-600 p-1 rounded" />
            <SponsorLogo src={assets.franciscoLogo} alt="Francisco Lagos Brand" />
            <SponsorLogo src={assets.espeletia} alt="Espeletia Studio" className="bg-black/90 p-2 rounded" />
            <SponsorLogo src={assets.tianYao} alt="Tian Yao" />
            <SponsorLogo src={assets.triskra} alt="Triskra VJ" className="bg-black p-2 rounded" />
            <SponsorLogo src={assets.impulso} alt="Impulso" className="bg-teal-600 p-1 rounded" />
            <SponsorLogo src={assets.grupo} alt="Grupo Brand" />
            <SponsorLogo src={assets.open} alt="Open" />
            <SponsorLogo src={assets.cuantic} alt="Open" />
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-950 text-white py-8 border-t border-slate-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h4 className="font-bold text-teal-500">Paisajes Sonoros</h4>
            <p className="text-slate-500 text-xs">Bioexpo 2025 | Pasto, Nariño</p>
          </div>
          <div className="text-slate-600 text-xs text-center md:text-right">
            <p>&copy; 2025 Francisco Lagos Luna.</p>
          </div>
        </div>
      </footer>

      {/* --- Registration Modal --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
            
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-white text-center relative shrink-0">
              <button onClick={closeModal} className="absolute top-4 right-4 bg-white/20 p-1 rounded-full hover:bg-white/40 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold">Reserva tu Cupo</h3>
              <p className="text-teal-100 text-sm mt-1">Vive la experiencia sonora en la Casona Taminango</p>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar grow">
              
              {formStep === 'input' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Nombre Completo</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-teal-500 focus:bg-white outline-none transition-all" placeholder="Tu nombre aquí" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Correo Electrónico</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-teal-500 focus:bg-white outline-none transition-all" placeholder="tucorreo@ejemplo.com" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">WhatsApp</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-teal-500 focus:bg-white outline-none transition-all" placeholder="+57 300..." />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 ml-1">Horario Preferido</label>
                    <div className="relative">
                      <select name="schedule" value={formData.schedule} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-teal-500 focus:bg-white outline-none transition-all appearance-none cursor-pointer">
                        {schedules.map(time => {
                          const remaining = getRemainingSpots(time);
                          return (
                            <option key={time} value={time} disabled={remaining <= 0}>
                              {time} {remaining <= 0 ? '(AGOTADO)' : remaining < 10 ? `(¡Solo ${remaining} cupos!)` : ''}
                            </option>
                          );
                        })}
                      </select>
                      <Calendar className="absolute right-4 top-3.5 text-gray-400 pointer-events-none w-5 h-5" />
                    </div>
                    {/* Alerta de Aforo */}
                    <div className={`text-xs font-bold mt-1 ${getRemainingSpots(formData.schedule) < 10 ? 'text-red-500' : 'text-teal-600'}`}>
                       {getRemainingSpots(formData.schedule) <= 0 ? 'Este horario está completo.' : `Quedan ${getRemainingSpots(formData.schedule)} cupos disponibles.`}
                    </div>
                  </div>

                  <button type="submit" disabled={getRemainingSpots(formData.schedule) <= 0} className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-teal-700 hover:shadow-teal-500/40 transform hover:-translate-y-1 transition-all mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Confirmar Invitación
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-2">
                    *Al registrarte aseguras tu ticket digital y quedas en nuestra lista oficial.
                  </p>
                </form>
              )}

              {formStep === 'loading' && (
                <div className="flex flex-col items-center justify-center py-12 space-y-6">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-teal-600 animate-pulse" />
                    </div>
                  </div>
                  <p className="text-gray-500 font-medium animate-pulse">Registrando tu asistencia...</p>
                </div>
              )}

              {formStep === 'success' && (
                <div className="text-center animate-fade-in pb-4">
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-4 bg-green-50 py-2 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-bold text-sm">¡Registro Exitoso!</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-700 mb-4">Esta es tu entrada oficial:</h3>
                  <div className="mb-6"><DigitalTicket data={formData} /></div>
                  <div className="flex gap-2 justify-center mb-6">
                     <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">
                        <Download className="w-4 h-4" /> Guardar Imagen
                     </button>
                  </div>
                  
                  <p className="text-xs text-gray-400 mb-4">
                    Por favor guarda esta imagen. Debido al alto tráfico, el correo de confirmación podría tardar unos minutos. Tu nombre ya está en la lista de ingreso.
                  </p>

                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-5 shadow-sm text-left">
                    <div className="flex items-start gap-4">
                      <div className="bg-white p-2 rounded-full shadow-sm shrink-0">
                        <Instagram className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-purple-900 text-sm">¡No te vayas aún!</h4>
                        <p className="text-xs text-purple-700 mt-1 mb-3">Sígueme en Instagram para ver el "detrás de cámaras".</p>
                        <a href="https://www.instagram.com/franciscolagosluna?igsh=MWp5a2IxZThqbXFoYQ%3D%3D" target="_blank" rel="noreferrer" className="inline-block text-center bg-purple-600 text-white text-xs font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors shadow-purple-200 shadow-lg w-full sm:w-auto">
                          Ver Contenido Exclusivo
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {formStep === 'error' && (
                <div className="text-center py-12">
                   <p className="text-red-600 font-bold">Ocurrió un error al enviar tu registro.</p>
                   <p className="text-gray-500 text-sm mt-2">Por favor intenta de nuevo o escríbenos al WhatsApp.</p>
                   <button onClick={() => setFormStep('input')} className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg">Intentar de nuevo</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes scale-up { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-scale-up { animation: scale-up 0.3s ease-out forwards; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};

export default App;