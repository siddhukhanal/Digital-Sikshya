import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Web Design Fundamentals',
    description: 'Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. This course will guide you through the process of creating visually appealing and user-friendly websites.',
    instructor: 'John Smith',
    price: 49.99,
    rating: 4.8,
    students: 15420,
    images: [
      'https://picsum.photos/seed/web1/600/400',
      'https://picsum.photos/seed/web2/600/400',
      'https://picsum.photos/seed/web3/600/400'
    ],
    category: 'Design',
    level: 'Beginner',
    duration: '4 Weeks',
    lessons: 15,
    curriculum: [
      {
        id: '01',
        title: 'Introduction to HTML',
        lessons: [
          { id: '01', title: 'Understanding HTML Tags', duration: '45 Mins' },
          { id: '02', title: 'HTML Structure and Elements', duration: '1 Hour' },
          { id: '03', title: 'Working with Forms and Inputs', duration: '45 Mins' }
        ]
      },
      {
        id: '02',
        title: 'Styling with CSS',
        lessons: [
          { id: '01', title: 'Introduction to CSS Selectors', duration: '1 Hour' },
          { id: '02', title: 'Box Model and Layouts', duration: '1 Hour' },
          { id: '03', title: 'Flexbox and Grid Essentials', duration: '1 Hour' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'UI/UX Design',
    description: 'Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.',
    instructor: 'Emily Johnson',
    price: 84.99,
    rating: 4.9,
    students: 8200,
    images: [
      'https://picsum.photos/seed/ui1/600/400',
      'https://picsum.photos/seed/ui2/600/400',
      'https://picsum.photos/seed/ui3/600/400'
    ],
    category: 'Design',
    level: 'Intermediate',
    duration: '6 Weeks',
    lessons: 25,
    curriculum: [
      {
        id: '01',
        title: 'Introduction to UI/UX Design',
        lessons: [
          { id: '01', title: 'Understanding UI/UX Design Principles', duration: '45 Mins' },
          { id: '02', title: 'Importance of User-Centered Design', duration: '1 Hour' },
          { id: '03', title: 'The Role of UI/UX Designers in Product Development', duration: '45 Mins' }
        ]
      },
      {
        id: '02',
        title: 'User Research and Analysis',
        lessons: [
          { id: '01', title: 'Introduction to User Research Methods', duration: '1 Hour' },
          { id: '02', title: 'User Personas and User Journey Mapping', duration: '1 Hour' },
          { id: '03', title: 'Analyzing User Data and Surfacing Insights', duration: '1 Hour' }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Mobile App Development',
    description: 'Learn to build native mobile applications for iOS and Android using modern frameworks like React Native or Flutter. This course covers everything from UI design to backend integration.',
    instructor: 'David Wilson',
    price: 99.99,
    rating: 4.7,
    students: 5400,
    images: [
      'https://picsum.photos/seed/mobile1/600/400',
      'https://picsum.photos/seed/mobile2/600/400',
      'https://picsum.photos/seed/mobile3/600/400'
    ],
    category: 'Development',
    level: 'Intermediate',
    duration: '8 Weeks',
    lessons: 30,
    curriculum: [
      {
        id: '01',
        title: 'Introduction to Mobile Development',
        lessons: [
          { id: '01', title: 'Mobile Ecosystem Overview', duration: '45 Mins' },
          { id: '02', title: 'Setting Up Your Development Environment', duration: '1 Hour' }
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Graphic Design Masterclass',
    description: 'Unlock your creativity and master the tools of graphic design. Learn Adobe Photoshop, Illustrator, and InDesign to create stunning visual content for print and digital media.',
    instructor: 'Sarah Adams',
    price: 59.99,
    rating: 4.9,
    students: 12000,
    images: [
      'https://picsum.photos/seed/graphic1/600/400',
      'https://picsum.photos/seed/graphic2/600/400',
      'https://picsum.photos/seed/graphic3/600/400'
    ],
    category: 'Design',
    level: 'Beginner',
    duration: '10 Weeks',
    lessons: 40,
    curriculum: [
      {
        id: '01',
        title: 'Design Principles',
        lessons: [
          { id: '01', title: 'Color Theory', duration: '1 Hour' },
          { id: '02', title: 'Typography Basics', duration: '1 Hour' }
        ]
      }
    ]
  },
  {
    id: '5',
    title: 'Digital Marketing Strategy',
    description: 'Develop a comprehensive digital marketing strategy to grow your business. Learn SEO, SEM, social media marketing, email marketing, and analytics to drive traffic and conversions.',
    instructor: 'Michael Brown',
    price: 69.99,
    rating: 4.6,
    students: 9500,
    images: [
      'https://picsum.photos/seed/marketing1/600/400',
      'https://picsum.photos/seed/marketing2/600/400',
      'https://picsum.photos/seed/marketing3/600/400'
    ],
    category: 'Business',
    level: 'Beginner',
    duration: '5 Weeks',
    lessons: 20,
    curriculum: [
      {
        id: '01',
        title: 'Marketing Fundamentals',
        lessons: [
          { id: '01', title: 'Understanding Your Audience', duration: '1 Hour' },
          { id: '02', title: 'Content Strategy', duration: '1 Hour' }
        ]
      }
    ]
  },
  {
    id: '6',
    title: 'Full-Stack Web Development',
    description: 'Become a full-stack web developer by learning both frontend and backend technologies. Master React, Node.js, Express, and MongoDB to build scalable and modern web applications.',
    instructor: 'Robert Taylor',
    price: 129.99,
    rating: 4.9,
    students: 15000,
    images: [
      'https://picsum.photos/seed/fullstack1/600/400',
      'https://picsum.photos/seed/fullstack2/600/400',
      'https://picsum.photos/seed/fullstack3/600/400'
    ],
    category: 'Development',
    level: 'Advanced',
    duration: '12 Weeks',
    lessons: 60,
    curriculum: [
      {
        id: '01',
        title: 'Backend Development',
        lessons: [
          { id: '01', title: 'Introduction to Node.js', duration: '1 Hour' },
          { id: '02', title: 'Building APIs with Express', duration: '1 Hour' }
        ]
      }
    ]
  }
];
