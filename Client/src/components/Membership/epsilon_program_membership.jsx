import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../../creatContext";
import { useTheme } from "../../usetheamContext";
import Swal from "sweetalert2";
import axios from "axios";

const HoverCard = ({ title, description, image }) => {
  return (
    <div className="max-w-2xl rounded overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          className="w-full object-cover transition-transform duration-300 transform hover:scale-110"
          src={image}
          alt={title}
        />
      </div>
      <div className="px-6 py-4 bg-white">
        <div className="font-bold text-xl mb-2 text-gray-800">{title}</div>
        <p className="text-gray-700 text-base h-0 opacity-0 transition-all duration-300 overflow-hidden group-hover:h-auto group-hover:opacity-100">
          {description}
        </p>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-200 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md max-h-[80vh] relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="font-bold mb-4 text-cyan-800 text-xl">{title}</h2>
        <div className="flex-1 overflow-y-auto p-4">
          {content.map((goal, index) => (
            <div key={index} className="mb-2">
              <p className="text-blue-900">{goal}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const goals = [
  "Goal 1: Embrace the Epsilon teachings.",
  "Goal 2: Connect with like-minded individuals.",
  "Goal 3: Participate in exclusive events.",
  "Goal 4: Seek personal guidance from Cris Formage.",
  "Goal 5: Engage with our content regularly.",
  "Goal 6: Explore the universe's deepest truths.",
  "Goal 7: Attend masterclasses and workshops.",
  "Goal 8: Contribute to our community's growth.",
  "Goal 9: Share your experiences and insights.",
  "Goal 10: Support fellow members on their journey.",
  "Goal 11: Stay informed about program updates.",
  "Goal 12: Reflect on your personal progress and achievements.",
];

const teachings = {
  CoreBeliefs: [
    {
      Belief: "Transcendence Through Technology",
      Principle:
        "Members should embrace technological advancements as a path to spiritual and personal evolution.",
    },
    {
      Belief: "The Cosmic Order",
      Principle:
        "Members are encouraged to align their lives with the cosmic forces and seek harmony with the universe’s natural rhythms.",
    },
    {
      Belief: "The Illusion of Materialism",
      Principle:
        "Followers should focus on inner growth and detachment from materialistic pursuits to achieve higher consciousness.",
    },
    {
      Belief: "Unity of Mind and Body",
      Principle:
        "Members are encouraged to practice meditation, physical exercises, and mental training to harmonize their entire being.",
    },
    {
      Belief: "The Epsilon Code",
      Principle:
        "Adherence to the Epsilon Code is seen as essential for personal and spiritual development.",
    },
  ],
  PhilosophicalInsights: [
    {
      Insight: "The Infinite Digital Horizon",
      Description:
        "Cris Formage speaks of the 'Infinite Digital Horizon,' a metaphor for the limitless potential of the human mind when augmented by technology. He believes that by embracing digital evolution, one can achieve a state of perpetual growth and enlightenment.",
    },
    {
      Insight: "The Mirage of Success",
      Description:
        "Formage critiques traditional notions of success as mere illusions designed to divert individuals from true spiritual fulfillment. He argues that societal pressures and materialistic goals are distractions from the deeper journey of self-discovery and cosmic alignment.",
    },
    {
      Insight: "Cosmic Synchronicity",
      Description:
        "Formage emphasizes the concept of 'Cosmic Synchronicity,' where human actions are in perfect harmony with universal energies. He teaches that by understanding and aligning with these cosmic rhythms, individuals can achieve a higher state of being and purpose.",
    },
    {
      Insight: "The Digital Awakening",
      Description:
        "According to Formage, the 'Digital Awakening' is a critical phase where individuals become aware of their interconnectedness through technology. He sees this awakening as a crucial step toward achieving collective enlightenment and transcending conventional limitations.",
    },
    {
      Insight: "The Path of Self-Actualization",
      Description:
        "Formage advocates for the 'Path of Self-Actualization,' a journey where individuals strive to realize their fullest potential through a blend of self-discipline, technological integration, and spiritual practices. He believes that this path leads to ultimate fulfillment and enlightenment.",
    },
  ],
};

// Component for displaying membership tier information
const MembershipTier = ({
  tier,
  benefits,
  profileLink,
  newsLink,
  whatYouCanDo,
  message,
  onCancelMembership,
}) => {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [auth] = useAuth();

  const containerBgColor = theme === "blue" ? "bg-blue-100" : "bg-gray-900";
  const textPrimary = theme === "blue" ? "text-blue-900" : "text-gray-100";
  const textSecondary = theme === "blue" ? "text-blue-700" : "text-gray-300";

  const [News, setNews] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/news")
      .then((response) => {
        const sortedNews = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setNews(sortedNews || []);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const displayNews = News.slice(0, 3);

  return (
    <div
      className={`min-h-screen ${containerBgColor} ${textPrimary} py-12 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w mx-auto p-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-2">Congratulations!</h1>
          <p className={`text-xl ${textSecondary}`}>
            Thank you for choosing Epsilon Program {tier} Membership
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center mb-12">
          <img
            className="w-64 h-64 object-cover rounded-full border-4 border-gray-300 shadow-lg mb-6 md:mb-0 md:mr-6"
            src="https://i.ytimg.com/vi/4pPNTzlfxsk/maxresdefault.jpg"
            alt="Membership"
          />

          <Card
            title="Daily Enlightenment Tip: The Power of the Number 157"
            icon="🔮"
          >
            <p>
              Did you know that the number 157 holds mystical powers that can
              unlock the deepest secrets of the cosmos? Embrace this number by
              incorporating it into your daily life. Try setting your alarm to
              15:07 or making a wish when you see the number 157. The universe
              might just align in your favor!
            </p>
          </Card>
        </div>

        {tier === "1" && (
          <div className="block grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-18">
            <Card title="Exclusive Content: Cosmic Beginner's Guide" icon="🌌">
              <p className="mb-4">
                Welcome to the first tier of enlightenment! Explore our Cosmic
                Beginner's Guide to start your journey.
              </p>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Explore Now
              </a>
            </Card>
          </div>
        )}

        {tier === "2" && (
          <div className="block grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-18">
            <Card title="Special Ritual: The Great Cosmic Stretch" icon="🧘‍♂️">
              <p className="text-lg font-medium mb-4">
                To align your energies with the universe, perform the Great
                Cosmic Stretch:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Stand in a comfortable position: Preferably in your living
                  room, surrounded by any Epsilon Program memorabilia.
                </li>
                <li>
                  Extend your arms: Reach out as if trying to touch the edge of
                  the universe.
                </li>
                <li>
                  Breathe deeply: Inhale the cosmic energy and exhale any
                  negativity.
                </li>
                <li>
                  Repeat three times: For added effect, chant "Kifflom!" with
                  each stretch.
                </li>
                <li>Feel the cosmic vibes flow through you!</li>
              </ul>
            </Card>

            <Card
              title='Exclusive Content: "The Hidden Wisdom of Epsilon"'
              icon="📚"
            >
              <p className="mb-4">
                Check out our latest video featuring Cris Formage as he delves
                into the enigmatic teachings of the Epsilon Program. In this
                episode, Cris unveils the secret behind the number 157 and its
                profound connection to extraterrestrial enlightenment.
              </p>
              <p className="mb-4">
                <strong>Video Title:</strong> The Hidden Wisdom of Epsilon
                <br />
                <strong>Description:</strong> Join Cris Formage as he explores
                the cosmic significance of the number 157 and its role in
                unlocking higher consciousness.
              </p>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Watch Video Now
              </a>
            </Card>
          </div>
        )}

        {tier === "3" && (
          <div className="block grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-18">
            <Card title="Upcoming Event: The Enlightenment Gala" icon="🌟">
              <p className="mb-4">
                Prepare for an evening of virtual ceremonies, cosmic
                discussions, and interactive enlightenment exercises at the
                Epsilon Program's Enlightenment Gala. This is your chance to
                embrace the universe and connect with fellow members.
              </p>
              <p>
                Don your finest ceremonial robe and get ready for an
                unforgettable experience!
              </p>
            </Card>

            <Card title="Advanced Ritual: The Cosmic Alignment" icon="🌌">
              <p className="mb-4">
                Experience a profound cosmic alignment with our advanced ritual.
                This exclusive event offers deep meditative practices and
                powerful cosmic insights.
              </p>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Learn More
              </a>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card title={`${tier} Membership Benefits`}>
            <ul className="list-disc pl-6 space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </Card>

          <Card title="What You Can Do">
            <p>{whatYouCanDo}</p>
          </Card>

          <Card title="You are happy, you just don't know it">
            <p>From: The 12 principles of Kifflom</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Learn More
            </button>
          </Card>
        </div>

        <div className="block grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card title="News and Updates">
            <p className="mb-2">
              Stay informed about the latest developments in the {tier} program,
              including new content, events, and initiatives.
            </p>
            <button
              onClick={() => setShowNews(!showNews)}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {showNews ? "Hide News" : "Show News"}
            </button>
            {showNews && (
              <div className="mt-4 p-4 border rounded bg-black shadow-md">
                <div
                  className={`flex flex-col items-center justify-center min-h-screen p-8`}
                >
                  <h1 className="font-bold mb-10">Epsilon News</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {displayNews.map((card, index) => (
                      <div key={index} className="group">
                        <HoverCard {...card} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>

          <Card title={`Your ${tier} Profile`}>
            <div className="flex flex-row justify-center p-12">
              <div>
                <p className="mb-2">
                  View your membership details, track your progress, and access
                  exclusive content through your {tier} profile.
                </p>
                <a
                  href={profileLink}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View Profile
                </a>
              </div>
              <img
                className="h-80 rounded-lg object-cover"
                src={auth.image || "https://via.placeholder.com/150"}
                alt={auth.username}
              />
            </div>
          </Card>

          <Card title="Message from Cris Formage">
            <p>{message}</p>
          </Card>
        </div>

        <div className="text-center mt-12">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            onClick={onCancelMembership}
          >
            Cancel Membership
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="The 12 Goals of the Epsilon Program"
        content={goals}
      />
    </div>
  );
};

const Card = ({ title, children, icon }) => {
  const { theme } = useTheme();
  const cardBg = theme === "blue" ? "bg-white" : "bg-gray-800";
  const cardHover = theme === "blue" ? "hover:bg-blue-50" : "hover:bg-gray-700";

  return (
    <div
      className={`${cardBg} ${cardHover} rounded-lg shadow-lg p-6 transition duration-300 transform hover:-translate-y-1`}
    >
      <h2 className=" font-semibold mb-4 flex items-center">
        {icon && <span className="mr-3 text-3xl">{icon}</span>}
      </h2>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
};
// MembershipLayout component that uses MembershipTier and handles membership state
const MembershipLayout = () => {
  const { membership_id } = useParams();
  const membershipTier = membershipTiers[membership_id];
  const [cancellationMessage, setCancellationMessage] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("auth"));
    if (storedAuth) {
      setAuth(storedAuth);
    }
  }, [setAuth]);

  if (!membershipTier) {
    return <div>Invalid membership ID</div>;
  }

  const handleCancelMembership = async () => {
    try {
      const response = await fetch("http://localhost:5000/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: auth.username }),
      });

      if (response.ok) {
        await Swal.fire({
          title: "Are you sure?",
          text: "Your membership will be cancled and your money will not refunded.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, cancel the membership!",
          cancelButtonText: "Back!",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            const updatedAuth = { ...auth, membership_id: null };
            setAuth(updatedAuth);
            localStorage.setItem("auth", JSON.stringify(updatedAuth));
            navigate("/membership", { replace: true });

            Swal.fire("Your membership has been cancelled.", ".", "success");
          }
        });
      } else {
        setCancellationMessage(
          "Failed to cancel membership. Please try again later."
        );
        await Swal.fire({
          title: "Error!",
          text: "Failed to cancel membership. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error cancelling membership:", error);
      setCancellationMessage(
        "Failed to cancel membership. Please try again later."
      );
      await Swal.fire({
        title: "Error!",
        text: "Failed to cancel membership. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const { theme } = useTheme();
  const containerBgColor =
    theme === "blue" ? "bg-blue-primary-bg" : "bg-dark-primary-bg";
  const textPrimary =
    theme === "blue" ? "text-blue-text-light" : "text-dark-text-light";
  const overlay = theme === "blue" ? "bg-blue-overlay" : "bg-dark-overlay";

  return (
    <div
      className={`min-h-screen ${containerBgColor} ${textPrimary} page-background opacity-75 ${overlay} p-10`}
    >
      {auth.username && <h1>Welcome, {auth.username}</h1>}
      {cancellationMessage ? (
        <div className="bg-red-100 text-red-700 p-6 mb-10 rounded-lg">
          {cancellationMessage}
        </div>
      ) : (
        <MembershipTier
          {...membershipTier}
          onCancelMembership={handleCancelMembership}
        />
      )}

      <section className={`col ${containerBgColor} ${textPrimary} gap-4`}>
        <div className={`flex flex-col text-4xl`}>
          About the Epsilon Program
          <p className={`mb-6 text-white text-2xl m-7`}>
            The Epsilon Program is a fictional religious cult in the Grand Theft
            Auto series. Founded by Cris Formage, the program is known for its
            mysterious teachings, often revolving around the number 157,
            extraterrestrial life, and unconventional spiritual practices. As a
            member, you will explore the deepest truths of the universe and
            connect with like-minded individuals.
          </p>
        </div>
        <div className={`column`}>
          <p className={`mb-6 text-white text-2xl m-7`}>
            Members are encouraged to embrace the Epsilon teachings and
            participate in various activities to deepen their understanding.
            Your membership grants you access to exclusive content, personalized
            guidance, and a supportive community dedicated to exploring the
            unknown.
          </p>
        </div>
      </section>
    </div>
  );
};

const membershipTiers = {
  1: {
    tier: "Epsilon Enthusiast",
    introduction:
      "Welcome to the Epsilon Enthusiast tier! Begin your journey of enlightenment with us.",
    benefits: [
      "Exclusive Content: Access to essential Epsilon Program materials.",
      "Personal Guidance: Guidance from Cris Formage.",
      "Private Invitations: Attend Enthusiast-exclusive events.",
    ],
    whatYouCanDo: [
      "Engage with content and explore the Epsilon Program.",
      "Connect with other Enthusiasts.",
      "Seek occasional guidance from Cris Formage.",
    ],
    profileLink: "#",
    newsLink: "#",
    message: "Your adventure as an Enthusiast starts here.",
    teachings: [
      {
        Belief: "Transcendence Through Technology",
        Principle: "Embrace technology for personal evolution.",
      },
    ],
  },
  2: {
    tier: "Epsilon Evangelist",
    introduction:
      "As an Epsilon Evangelist, deepen your insights and enjoy enhanced opportunities.",
    benefits: [
      "Advanced Content: Deeper and more advanced Epsilon materials.",
      "Priority Invitations: Priority access to special events.",
    ],
    whatYouCanDo: [
      "Delve into advanced content beyond the Enthusiast level.",
      "Attend special events with priority access.",
    ],
    profileLink: "#",
    newsLink: "#",
    message: "You’re on a higher path, Evangelist. Embrace your expanded role.",
    teachings: [
      {
        Insight: "The Mirage of Success",
        Description:
          "Critiques conventional success as a distraction from true fulfillment.",
      },
      {
        Insight: "Cosmic Synchronicity",
        Description:
          "Align your actions with cosmic energies for higher purpose.",
      },
    ],
  },
  3: {
    tier: "Epsilon Visionary",
    introduction:
      "Welcome to the Epsilon Visionary tier, where unparalleled access and opportunities await.",
    benefits: [
      "Masterclasses: Exclusive sessions led by Cris Formage.",
      "Personalized Mentorship: One-on-one guidance from our leader.",
      "VIP Access: Access to all events, including secret gatherings.",
    ],
    whatYouCanDo: [
      "Participate in exclusive masterclasses.",
      "Receive direct mentorship for advanced insights.",
      "Attend all VIP events and private gatherings.",
    ],
    profileLink: "#",
    newsLink: "#",
    message:
      "As a Visionary, you are a crucial part of our inner circle. Your journey continues with profound opportunities.",
    teachings: [
      {
        Insight: "The Infinite Digital Horizon",
        Description:
          "The limitless potential of the human mind through technology.",
      },
      {
        Insight: "The Digital Awakening",
        Description:
          "Awareness of interconnectedness through technology for collective enlightenment.",
      },
      {
        Belief: "Unity of Mind and Body",
        Principle:
          "Harmonize your mind and body through spiritual and physical practices.",
      },
    ],
  },
};

export default MembershipLayout;
