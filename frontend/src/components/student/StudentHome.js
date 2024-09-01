import React from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from './navbar';

import "../stylesheets/student/home.css"
import "../stylesheets/navbar.css"

const StudentHome = () => {

    const navigate = useNavigate();

    return (
        <div>
            <Navbar/>
            <div className="student-home">
            {/* <h1>Welcome, [Student Name]!</h1> */}

            {/* Quick Access Section */}
            <section className="quick-access">
                <button onClick={() => navigate('/courses')}>Enroll a New Course</button>
                <button onClick={() => navigate('/mycourses')}>Your Courses</button>
                <button onClick={() => navigate('/myBadges')}>Your Badges</button>
            </section>

            {/* What You Can Do Section */}
            <section className="what-you-can-do">
                <h2>What You Can Do on This Platform</h2>
                <p>
                    As a student, you have access to a wide range of features that will enhance your learning experience:
                </p>

                <h3>Enroll in Courses</h3>
                <p>
                    Browse through a variety of courses available on the platform. You can easily enroll in courses that interest you. 
                    Some courses are available for free, while others may require payment. Once enrolled, you will have unlimited access 
                    to the course content 24/7, allowing you to learn at your own pace and convenience.
                </p>

                <h3>Access Course Content Anytime</h3>
                <p>
                    Once enrolled, you can access course materials, including video lectures, PDFs, quizzes, and assignments, anytime you want. 
                    The platform is designed to be available 24/7, so you can study whenever it suits you best, even during late hours.
                </p>

                <h3>Participate in Quizzes</h3>
                <p>
                    Test your knowledge and track your progress by participating in quizzes that are part of each course. 
                    Quizzes are designed to reinforce your understanding of the course material and help you identify areas that may need 
                    further review. You can retake quizzes to improve your scores.
                </p>

                <h3>Earn Badges</h3>
                <p>
                    As you progress through your courses and complete certain milestones, you can earn badges that reflect your achievements. 
                    These badges are a great way to showcase your accomplishments and motivate yourself to keep learning. 
                    You can view all your earned badges in the "Your Badges" section.
                </p>

                <h3>Explore Free and Paid Courses</h3>
                <p>
                    The platform offers a mix of free and paid courses. You can explore and enroll in the free courses to enhance your skills 
                    without any cost. For more in-depth learning, consider enrolling in paid courses, which often come with additional resources 
                    and personalized support from instructors.
                </p>
            </section>

            {/* Support Section */}
            <section className="support">
                <h2>Need Help?</h2>
                <p>
                    If you encounter any issues or have questions, our support team is here to help you. 
                    You can reach out through the support section, where you'll find FAQs, tutorials, and a contact form to get in touch with us directly.
                </p>
                {/* <button onClick={() => navigateTo('/support')}>Get Support</button> */}
            </section>
        </div>
        </div>
    );
}

export default StudentHome;
