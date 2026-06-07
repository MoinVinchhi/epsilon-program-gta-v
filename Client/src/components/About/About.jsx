import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../usetheamContext';
import pic1 from '../../assets/images/epsilon_house.jpg'
import { truthStages, improvementTips } from '../content.js';

const AboutUs = () => {
  const { theme } = useTheme();

  const containerBgColor = theme === 'blue' ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700' : 'bg-gradient-to-r from-gray-800 via-gray-900 to-black';
  const overlayColor = theme === 'blue' ? 'bg-blue-light bg-opacity-50' : 'bg-gray-900 bg-opacity-50';
  const sectionBgColor = theme === 'blue' ? 'bg-blue-primary-bg' : 'bg-dark-primary-bg';
  const textPrimaryColor = theme === 'blue' ? 'text-blue-text-blue': 'text-dark-text-blue';
  const textSecondaryColor = theme === 'blue' ? 'text-blue-text-dark' : 'text-dark-text-dark';
  const buttonBgColor = theme === 'blue' ? 'bg-green-500' : 'bg-yellow-500';
  const buttonHoverBgColor = theme === 'blue' ? 'hover:bg-green-600' : 'hover:bg-yellow-600';

  return (
    <div className='profileContainer relative flex justify-end p-10 min-h-screen'>
        <h1 className='text-6xl text-left absolute top-18 left-12 text-white m-0 p-0'>ABOUT</h1>
    <div className='z-[5] profilePart flex justify-end p-10 ml-[25vw] min-h-screen'>
      <div className='fixed left-0 top-30 flex flex-col p-16'>
      </div> 
      <div className={`relative overflow-hidden min-h-screen page-background opacity-95`}>
        {/* Background Image */}
    
          <div className={`absolute inset-0 ${overlayColor}`}></div> {/* Overlay for better text visibility */}
        
        {/* Main Content */}
        <div className={`relative z-10 p-6 md:p-12 `}>
          {/* Header Section */}
          <header className="text-center">
            <heading>
            <motion.h1
              className={`text-3xl font-bold mb-4 ${textPrimaryColor}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 7 }}
              transition={{ duration: 6 }}
            >
              About the Epsilon Program
            </motion.h1>
            </heading>
          </header>

          {/* Core Values Section */}
          <section className={`my-6 border ${containerBgColor}`}>
            <motion.div
              className={`p-1 rounded-lg shadow-lg mx-auto max-w-4xl ${sectionBgColor}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className='flex flex-center justify-center items-center'>
                <div>
              <h2 className={`font-semibold mb-4 text-center ${textSecondaryColor}`}>Core Values</h2>
              <p className={`${textPrimaryColor}`}>
                At the heart of the Epsilon Program are our core values: Truth, Enlightenment, and Unity. We strive to uncover the hidden truths of existence, seek enlightenment through our practices, and unite individuals who are on a similar spiritual journey. These values guide our actions and interactions within our community.
              </p>
              </div>
           
              <img className="w-[48%] h-[100%] max-w object-cover rounded shadow-md border-1 border-white " src={pic1} alt="pic1" />
              </div>
            </motion.div>
          </section>

          {/* Beliefs and Practices */}
          <section className={`my-12 border ${containerBgColor}`}>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Beliefs */}
              <motion.div
                className={`p-8 rounded-lg shadow-lg flex-1 ${sectionBgColor}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 className={`text-4xl font-semibold mb-4 ${textSecondaryColor}`}>Our Beliefs</h2>
                <p className={`text-lg ${textPrimaryColor}`}>
                  The Epsilon Program is a unique spiritual movement dedicated to uncovering the profound truths of the universe. We believe in a higher state of existence that transcends the material world. Our teachings guide members towards enlightenment through a blend of esoteric knowledge, mystical practices, and a deep connection with the cosmic energies.
                </p>
              </motion.div>
              
              {/* Practices */}
              <motion.div
                className={`p-8 rounded-lg shadow-lg flex-1 ${sectionBgColor}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 className={`text-4xl font-semibold mb-4 ${textSecondaryColor}`}>Our Practices</h2>
                <p className={`text-lg ${textPrimaryColor}`}>
                  Our practices involve a range of rituals and ceremonies designed to elevate consciousness and foster spiritual growth. From meditative exercises to cosmic rituals, each practice is aimed at aligning our members with the universal energies and achieving higher states of awareness.
                </p>
              </motion.div>
            </div>
          </section>

          {/* History and Testimonials */}
          <section className={`my-12 border ${containerBgColor}`}>
            <motion.div
              className={`p-8 rounded-lg shadow-lg mx-auto max-w-4xl ${sectionBgColor}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h2 className={`text-4xl font-semibold mb-4 text-center ${textSecondaryColor}`}>Our History</h2>
              <p className={`text-lg ${textPrimaryColor} mb-8`}>
                The Epsilon Program was founded in the heart of Los Santos by the enigmatic leader Kifflom. What began as a small group of seekers has grown into a vibrant community of individuals dedicated to exploring the mysteries of the universe. Our history is rich with stories of spiritual revelations and cosmic insights, guiding us on our path to enlightenment.
              </p>
              <h2 className={`text-3xl font-semibold mb-4 text-center ${textSecondaryColor}`}>Member Testimonials</h2>
              <div className="space-y-4">
                <blockquote className={`p-4 rounded-lg shadow-md ${sectionBgColor} `}>
                  <p className={`italic ${textSecondaryColor} `}>
                    "Joining the Epsilon Program has been a transformative experience. The teachings and community support have opened my eyes to new perspectives and helped me find inner peace."
                  </p>
                  <footer className={`mt-2 text-right ${textPrimaryColor}`}>— Alex M.</footer>
                </blockquote>
                <blockquote className={`p-4 rounded-lg shadow-md ${sectionBgColor}`}>
                <p className={`italic ${textSecondaryColor} `}>
                "The Epsilon Program's rituals and practices have deepened my understanding of the universe. The sense of belonging and purpose I've found here is unparalleled."
                  </p>
                  <footer className={`mt-2 text-right ${textPrimaryColor}`}>— Jordan R.</footer>
                </blockquote>
              </div>
            </motion.div>
          </section>

          {/* Call-to-Action */}
          <section className={`my-12 border ${containerBgColor}`}>
            <motion.button
              className={`text-white px-8 py-4 rounded-lg shadow-md ${buttonBgColor} ${buttonHoverBgColor}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Us
            </motion.button>
            <p className={`mt-4 ${textPrimaryColor}`}>
              Interested in learning more? <a href="/contact" className={`text-orange-400 hover:underline`}>Contact us</a> for more information or to schedule a personal consultation.
            </p>
          </section>

          <div className="bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold text-center mb-12 animate-fadeIn">Epsilon Program Truth Stages</h1>
            <img src="https://th.bing.com/th/id/OIP.1x4BrvT1YrcYtFAWGQHhyQHaEK?rs=1&pid=ImgDetMain" alt="img" className="object-cover w-full h-48 rounded-t-lg mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {truthStages.map((stage) => (
                <div key={stage.id} className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 animate-slideUp">
                  <img src={stage.image} alt={stage.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">{stage.name}</h2>
                  <p className="text-lg mb-4">{stage.description}</p>
                  <ul className="list-disc pl-5 mb-4">
                    {stage.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                  <div className="text-right">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full">{stage.difficulty}</span>
                  </div>
                </div>
              ))}
            </div>
    </div>

    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 animate-fadeIn">Improvement Tips</h1>
      <div className="space-y-8">
        {improvementTips.map((category, index) => (
          <div key={index} className="bg-gray-900 shadow-lg rounded-lg overflow-hidden animate-fadeIn">
            <h2 className="text-2xl font-semibold p-4 bg-blue-500 text-white">{category.category}</h2>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {category.tips.map((tip, i) => (
                <div key={i} className="bg-gray-900 border border-gray-200 rounded-lg p-4 flex flex-col items-start">
                  <img src={tip.image} alt={tip.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                  <p className="text-white mb-4">{tip.description}</p>
                  <ul className="list-disc pl-5 space-y-2">
                    {tip.actions.map((action, j) => (
                      <li key={j} className="text-white">{action}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
      </div>
    </div>
        {/* vertical */}
        <div className='absolute top-0 left-0 w-screen h-screen opacity-5 flex'>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
            <div className='w-[0.5px]  ml-5 bg-white h-screen'></div>
        </div>

        {/* horizontal */}
        <div className='absolute top-0 left-0 w-screen h-screen opacity-5 flex flex-col'>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
          <div className='w-screen  mt-5 bg-white h-[0.5px]'></div>
        </div>
    </div>
  );
};

export default AboutUs;
