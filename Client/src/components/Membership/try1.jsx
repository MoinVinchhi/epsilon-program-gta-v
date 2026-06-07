import './try.css'

import React from 'react'

const Try1 = () => {
  return (
   
<div class="container">
    <div class="codrops-top clearfix">
    <h1 className="text-4xl font-bold mb-8 text-center">HI Congratulations</h1>

        <span class="righ text-2xl">On choosing Epsilon Program Membership</span>
        
    </div>

    <section class=" col-2 ss-style-triangles">
    <h1 className="text-4xl font-bold mb-8 text-center">{tier} Membership Benefits</h1>

        <div class="column text">
        {/* <h1 className="text-4xl font-bold mb-8 text-center">Epsilon Program Membership</h1> */}
        <ul className="list-disc pl-6 text-muted mb-6">
        {benefits.map((benefit, index) => (
          <li key={index} className="mb-2">{benefit}</li>
        ))}
      </ul>
        </div>
        <div class="column">
        <h1 className="text-4xl font-bold mb-8 text-center">Your {tier} Profile</h1>
        <p>View your membership details, track your progress, and access exclusive content through your {tier} profile.</p>
        <a href={profileLink} className="text-highlight hover:text-accent">View Profile</a>


        </div>
    </section>
    
  <section class="color">
  <h1 className="text-4xl font-bold mb-8 text-center">News and Updates</h1>
  <p className="mb-6">Stay informed about the latest developments in the {tier} program, including new content, events, and initiatives.</p>

    
  </section>

  <section class="col-3 ss-style-doublediagonal">
    <div class="column">
    <ul className="list-none pl-0 mb-6">
          <li>
            <a href={newsLink} className="text-highlight hover:text-accent">
              <i className="fas fa-newspaper mr-2" />
              {tier} Newsletter
            </a>
          </li>
        </ul>
    </div>    
  </section>


  <section class="col-2 ss-style-halfcircle">
    <div class="column">
    Message from Cris Formage
    </div>
    <div class="column text">
    {message}
    </div>
  </section>

  <section class="color ss-style-bigtriangle">

  </section>
  <svg id="bigTriangleColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 102" preserveAspectRatio="none">
        <path d="M0 0 L50 100 L100 0 Z" />
      </svg>
  <section class="col-3">
    <div class="column">
    <button
          className="bg-highlight hover:bg-accent text-primary-bg font-bold py-2 px-4 rounded-lg transition-all"
          onClick={onCancelMembership}
        >
          Cancel Membership
        </button>
    </div>
    <div class="column">

    </div>
  </section>
  <svg id="curveUpColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 100 C 20 0 50 0 100 100 Z"/>
      </svg>
  <section class="col-2 color ss-style-curvedown">
    <div class="column">

    </div>
    <div class="column text">

    </div>
  </section>
  <svg id="curveDownColor" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 0 C 50 100 80 100 100 0 Z"/>
      </svg>
  <section class="col-2">
   
  </section>
  <section class="col-2 color ss-style-multitriangles">
    <div class="column text">

    </div>
    <div class="column">

    </div>
  </section>
  <section class="col-2">

  </section>
  <section class="col-2 color ss-style-roundedsplit">
    <div class="column">

    </div>
    <div class="column text">

    </div>
  </section>
  <section class="col-3 ss-style-invertedrounded">
    <div class="column">


    </div>
    <div class="column">

      <p></p>
    </div>
    <div class="column">


    </div>
  </section>
  <section class="col-2 color ss-style-boxes">
    <div class="column text">

    </div>
    <div class="column">

    </div>
  </section>
  <section>

  </section>
  <section class="col-3 color ss-style-zigzag">
    <div class="column">


    </div>
    <div class="column">


    </div>
    <div class="column">


    </div>
  </section>
  <section class="col-2">
    <div class="column text">

    </div>
    <div class="column">

    </div>
  </section>
  <section class="color ss-style-roundedges">

  </section>
  <section class="col-3 ss-style-slit">
    <div class="column">
    About the Epsilon Program
    <p className="mb-6">
          The Epsilon Program is a fictional religious cult in the Grand Theft Auto series. Founded by Cris Formage, the program is known for its mysterious teachings, often revolving around the number 157, extraterrestrial life, and unconventional spiritual practices. As a member, you will explore the deepest truths of the universe and connect with like-minded individuals.
        </p>
    </div>
    <div class="column">
    <p className="mb-6">
          Members are encouraged to donate generously, attend exclusive events, and participate in various rituals to advance their spiritual enlightenment. The program promises profound personal growth, eternal salvation, and a deeper understanding of the cosmos.
        </p>
        <p className="mb-6">
          As you progress through the membership tiers, you'll gain access to more exclusive content, personalized guidance from Cris Formage, and invitations to high-level ceremonies. Embrace the path to enlightenment and join the ranks of the enlightened today!
        </p>

    </div>
  </section>
  <svg id="bigHalfCircle" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 100 C40 0 60 0 100 100 Z"/>
      </svg>
  <section class="col-2 color">
    <div class="column text">

    </div>
    <div class="column">

    </div>
  </section>



  <svg id="bigTriangleShadow" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path id="trianglePath1" d="M0 0 L50 100 L100 0 Z" />
        <path id="trianglePath2" d="M50 100 L100 40 L100 0 Z" />
      </svg>
  <section>

  </section>
  <section class="color col-3 ss-style-inczigzag">
    <div class="column">


    </div>
    <div class="column">


    </div>
    <div class="column">

      <p></p>
    </div>
  </section>
  <section class="col-2">
    <div class="column text">

    </div>
    <div class="column">

    </div>
  </section>
  <section class="color ss-style-castle">
    <h2> </h2>
    <p></p>
  </section>
  <svg id="slit" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path id="slitPath2" d="M50 100 C49 80 47 0 40 0 L47 0 Z" />
        <path id="slitPath3" d="M50 100 C51 80 53 0 60 0 L53 0 Z" />
        <path id="slitPath1" d="M47 0 L50 100 L53 0 Z" />
      </svg>
  <section class="col-3 ss-style-foldedcorner">
    <div class="column">


    </div>
    <div class="column">


    </div>
    <div class="column">


    </div>
  </section>
  <section class="color col-3 ss-style-dots">
    <div class="column">


    </div>
    <div class="column">


    </div>
    <div class="column">

      <p></p>
    </div>
  </section>
  <section class="col-2 color ss-style-doubleline">
    <div class="column text">

    </div>
    <div class="column">

    </div>
  </section>
  <section class="color ss-style-cross">

  </section>
  <section class="color col-3">
    <div class="column">


    </div>
    <div class="column">


    </div>
    <div class="column">


    </div>
  </section>
  <svg id="stamp" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 0 Q 2.5 40 5 0 
             Q 7.5 40 10 0
             Q 12.5 40 15 0
             Q 17.5 40 20 0
             Q 22.5 40 25 0
             Q 27.5 40 30 0
             Q 32.5 40 35 0
             Q 37.5 40 40 0
             Q 42.5 40 45 0
             Q 47.5 40 50 0 
             Q 52.5 40 55 0
             Q 57.5 40 60 0
             Q 62.5 40 65 0
             Q 67.5 40 70 0
             Q 72.5 40 75 0
             Q 77.5 40 80 0
             Q 82.5 40 85 0
             Q 87.5 40 90 0
             Q 92.5 40 95 0
             Q 97.5 40 100 0 Z">
        </path>
      </svg>
  <section class="col-2">
    <div class="column text">

    </div>
    <div class="column">

    </div>
  </section>
  <svg id="clouds" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M-5 100 Q 0 20 5 100 Z
             M0 100 Q 5 0 10 100
             M5 100 Q 10 30 15 100
             M10 100 Q 15 10 20 100
             M15 100 Q 20 30 25 100
             M20 100 Q 25 -10 30 100
             M25 100 Q 30 10 35 100
             M30 100 Q 35 30 40 100
             M35 100 Q 40 10 45 100
             M40 100 Q 45 50 50 100
             M45 100 Q 50 20 55 100
             M50 100 Q 55 40 60 100
             M55 100 Q 60 60 65 100
             M60 100 Q 65 50 70 100
             M65 100 Q 70 20 75 100
             M70 100 Q 75 45 80 100
             M75 100 Q 80 30 85 100
             M80 100 Q 85 20 90 100
             M85 100 Q 90 50 95 100
             M90 100 Q 95 25 100 100
             M95 100 Q 100 15 105 100 Z">
        </path>
      </svg>
  <section class="related">

  </section>
</div>

  )
}

export default Try1

