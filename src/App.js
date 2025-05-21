import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Button, Container, Grid, Paper, Card, CardContent, CardActions, CardMedia, IconButton, Box, Link, Avatar, Chip, TextField } from '@mui/material';
// Removed PaletteMode as it's not strictly needed when hardcoding mode
import { 
    Menu as MenuIcon, Code, Brush, Storage, Cloud, Mail, GitHub, LinkedIn, Twitter, ArrowUpward, Send, Download,
    PhoneIphone, Api, DeveloperMode, AccountTree, Speed, Palette, Build, Storefront, Email // Added Storefront & Email icons
} from '@mui/icons-material';
import sahilImage from "./myImage.png"; // Adjust path as needed


// CV Data: Sahil Dhiman
const personalInfo = {
    name: "Sahil Dhiman",
    title: "Experienced Software Developer",
    email: "dhimansahil96@gmail.com",
    linkedin: "https://linkedin.com/in/sahil-dhiman-84267120b",
    github: "https://github.com/sahildhiman96", // User should update with actual GitHub
    twitter: "#", // User can update
    resumeLink: "/sahilCV.pdf" // Assuming CV will be named this and in public folder
};

const heroData = {
    name: personalInfo.name,
    avatarText: "SD",
    titles: ["iOS Developer", "React Native Developer", "Mobile Solutions Architect", "Creative Problem Solver"],
    tagline: "Building high-performance iOS and cross-platform mobile applications with a focus on intuitive user experiences and scalable solutions."
};

const aboutData = {
    greeting: "Hello there! I'm Sahil.",
    summary: `An experienced Software Developer with 6 years of proven expertise in building and maintaining high-performance iOS and cross-platform mobile applications. Proficient in Swift, Objective-C, SwiftUI, and React Native, I have a strong focus on crafting intuitive user experiences and scalable mobile solutions. I'm adept at writing clean, maintainable code, integrating third-party services, and optimizing app performance. Known as a reliable team player who enjoys solving complex problems and mentoring peers.`,
    experienceHighlights: `Throughout my career at companies like Infostride Technology, Rapidsofts, and The Brihaspati Infotech, I've had the opportunity to lead development efforts, mentor junior developers, manage testing procedures, and collaborate directly with clients to deliver tailored solutions. I've also independently developed and published iOS applications.`,
    achievements: [
        "Employee of the Month - Infostride",
        "Selected for Client Site Visit to Chennai for Gluedin platform project consultation."
    ],
    education: "MCA in Computer Science & Engineering from Govt PG College Dharamshala (2019) and BCA from Maharan Partap College (2016).",
    hobbies: "In my free time, I enjoy dancing, playing games, listening to music, and trekking."
};

const projectsData = [
  {
    title: "Radioly - Live Radio Streaming",
    description: "Native iOS app for live radio stations with filtering, in-app purchases, and offline listening via Core Data.",
    image: "https://placehold.co/600x400/3B82F6/FFFFFF?text=Radioly", // Blue, White text
    tags: ["Swift", "REST APIs", "In-App Purchase", "Core Data"],
    liveLink: "https://apps.apple.com/in/app/fm-radio-am-fm-radio-tuner/id1440995773", 
    sourceLink: "#",
  },
  {
    title: "Gluedin - Short Video Platform",
    description: "Enhanced video/image content creation with sticker/text overlays. Improved app performance and speed.",
    image: "https://placehold.co/600x400/A855F7/FFFFFF?text=Gluedin", // Purple, White text
    tags: ["iOS", "React Native", "Performance Opt."],
    liveLink: "https://apps.apple.com/in/app/gluedin-video-community/id1622464243", 
    sourceLink: "#",
  },
  {
    title: "Libaoo - Book Reading App",
    description: "Native iOS eBook reader with offline sync, dark/light themes, and subscription-based access.",
    image: "https://placehold.co/600x400/F97316/FFFFFF?text=Libaoo", // Orange, White text
    tags: ["Swift (UIKit)", "API Integration", "Offline Sync"],
    liveLink: "https://apps.apple.com/us/app/libaoo/id1616321949", 
    sourceLink: "#",
  },
  {
    title: "MapBuzz - Dating App",
    description: "Location-based dating app with swipe UI, Firebase chat, and Twilio video/audio calls.",
    image: "https://placehold.co/600x400/EC4899/FFFFFF?text=MapBuzz", // Pink, White text
    tags: ["Objective-C", "Swift", "Firebase", "Twilio"],
    liveLink: "https://apps.apple.com/in/app/mapbuzz/id956545196", 
    sourceLink: "#",
  },
  {
    title: "Vibe by Lauren Stallwood",
    description: "Fitness app with workout subscriptions, progress tracking, video tutorials, and chat features.",
    image: "https://placehold.co/600x400/D946EF/FFFFFF?text=Vibe+Lauren", // Fuchsia, White text
    tags: ["Swift (UIKit)", "Firebase", "UI/UX"],
    liveLink: "https://apps.apple.com/in/app/vibe-by-lauren-stallwood/id1605149740", 
    sourceLink: "#",
  },
  {
    title: "Rinnai-Central",
    description: "Official Rinnai app for managing and controlling compatible Rinnai smart appliances.",
    image: "https://placehold.co/600x400/3B82F6/FFFFFF?text=Rinnai-Central", // Blue, White text
    tags: ["iOS", "Swift", "IoT", "Appliance Control"],
    liveLink: "https://apps.apple.com/us/app/rinnai-central/id6444321202",
    sourceLink: "#",
  },
  {
    title: "Ready Stretch Daily",
    description: "Wellness app guiding users through daily stretching routines for flexibility and well-being.",
    image: "https://placehold.co/600x400/14B8A6/FFFFFF?text=Ready+Stretch", // Teal, White text
    tags: ["iOS", "Swift", "Fitness", "Wellness"],
    liveLink: "https://apps.apple.com/us/app/ready-stretch-daily/id1621458075",
    sourceLink: "#",
  },
  {
    title: "NCFit Athlete",
    description: "Official NCFit app for athletes to access workouts, track progress, and connect with the community.",
    image: "https://placehold.co/600x400/111827/F3F4F6?text=NCFit", // Dark Gray, Light text
    tags: ["iOS", "Swift", "Fitness", "Workout Tracking"],
    liveLink: "https://apps.apple.com/us/app/ncfit-athlete/id1543459683",
    sourceLink: "#",
  },
  {
    title: "NonStop Radio",
    description: "FM Radio streaming application providing access to a wide variety of radio stations.",
    image: "https://placehold.co/600x400/3B82F6/FFFFFF?text=NonStop+Radio", // Blue, White text (similar to Radioly)
    tags: ["iOS", "Swift", "Audio Streaming"],
    liveLink: "https://apps.apple.com/in/app/fm-radio-am-fm-radio-tuner/id6478802029",
    sourceLink: "#",
  }
];


const skillsData = [
  { name: "Swift", icon: <Code className="text-orange-500" />, level: 95 },
  { name: "Objective-C", icon: <Code className="text-blue-500" />, level: 90 },
  { name: "SwiftUI", icon: <Palette className="text-blue-600" />, level: 85 },
  { name: "React Native", icon: <PhoneIphone className="text-sky-500" />, level: 80 },
  { name: "Core Data", icon: <Storage className="text-gray-700" />, level: 90 },
  { name: "Firebase", icon: <Cloud className="text-yellow-500" />, level: 85 },
  { name: "RESTful APIs", icon: <Api className="text-green-500" />, level: 90 },
  { name: "Performance Opt.", icon: <Speed className="text-red-500" />, level: 88 },
  { name: "UI/UX Design", icon: <Brush className="text-pink-500" />, level: 85 },
  { name: "Auto Layout", icon: <Build className="text-gray-500" />, level: 90 },
  { name: "Xcode", icon: <DeveloperMode className="text-indigo-700" />, level: 95 },
  { name: "Git", icon: <GitHub className="text-gray-300" />, level: 95 }, // Using GitHub icon for Git
  { name: "MVVM/MVC", icon: <AccountTree className="text-purple-600" />, level: 90 },
  { name: "Agile/Scrum", icon: <DeveloperMode className="text-teal-500" />, level: 85 },
];

// Helper function for smooth scrolling
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Theme Configuration - Fixed to Dark Mode
const getDesignTokens = () => ({
  palette: {
    mode: 'dark', 
    primary: { main: '#0891B2' }, 
    secondary: { main: '#67E8F9' }, 
    background: {
      default: '#111827', 
      paper: '#1F2937', 
    },
    text: {
      primary: '#F3F4F6', 
      secondary: '#9CA3AF', 
    },
    success: { main: '#10B981' }, 
    error: { main: '#EF4444' }, 
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '3.0rem', letterSpacing: '-0.05em', '@media (min-width:900px)': { fontSize: '3.5rem' } },
    h2: { fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-0.04em', '@media (min-width:900px)': { fontSize: '2.5rem' } },
    h3: { fontWeight: 600, fontSize: '1.8rem', '@media (min-width:900px)': { fontSize: '2rem' } },
    h4: { fontWeight: 600, fontSize: '1.4rem', '@media (min-width:900px)': { fontSize: '1.5rem' } },
    body1: { fontSize: '1.0rem', lineHeight: 1.7, '@media (min-width:900px)': { fontSize: '1.1rem' } },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '10px 20px',
          fontWeight: 600,
        },
        containedPrimary: {
          color: '#ffffff', 
          '&:hover': {
            backgroundColor: '#065f73', 
            boxShadow: '0px 0px 15px #0891B255', 
          },
        },
        outlinedPrimary: {
           borderColor: '#0891B2', 
           color: '#0891B2', 
          '&:hover': {
            backgroundColor: 'rgba(8, 145, 178, 0.1)', 
            borderColor: '#0e7490', 
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.7)', 
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(17, 24, 39, 0.85)', 
          boxShadow: 'none',
          borderBottom: '1px solid #374151', 
        },
      },
    },
    MuiChip: {
        styleOverrides: {
            root: ({theme}) => ({ 
                backgroundColor: theme.palette.secondary.main, // Using secondary for chips for better contrast
                color: theme.palette.background.default, 
                fontWeight: 'bold',
            }),
        }
    }
  },
});


// Navbar Component - Removed mode and toggleColorMode props
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = ['About', 'Skills', 'Projects', 'Contact'];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="fixed" component="nav" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', cursor: 'pointer', color: 'primary.main' }} onClick={() => scrollToSection('hero')}>
            {personalInfo.name}
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: 'text.primary', margin: '0 8px' }} onClick={() => scrollToSection(item.toLowerCase())}>
                {item}
              </Button>
            ))}
            {/* <Button variant="outlined" sx={{ marginLeft: '16px' }} href={personalInfo.resumeLink} target="_blank" startIcon={<Download />}>
              CV
            </Button> */}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' }, color: 'text.primary', ml: 'auto' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
      {mobileOpen && (
        <Paper sx={{ display: { md: 'none' }, position: 'absolute', top: '64px', left:0, right:0, zIndex: 1200, background: 'background.paper' }}>
          {navItems.map((item) => (
            <Button key={item} fullWidth sx={{ color: 'text.primary', justifyContent: 'center', paddingY: '12px' }} onClick={() => { scrollToSection(item.toLowerCase()); setMobileOpen(false); }}>
              {item}
            </Button>
          ))}
          {/* <Box sx={{ p: 2 }}>
            <Button fullWidth variant="outlined" href={personalInfo.resumeLink} target="_blank" startIcon={<Download />}>
              CV
            </Button>
          </Box> */}
        </Paper>
      )}
    </AppBar>
  );
};

// Hero Section
const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const titles = useMemo(() => heroData.titles, []);
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeoutId;

    if (isDeleting) {
      if (charIndex > 0) {
        timeoutId = setTimeout(() => {
          setTypedText(currentTitle.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50); 
      } else {
        setIsDeleting(false);
        setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
      }
    } else {
      if (charIndex < currentTitle.length) {
        timeoutId = setTimeout(() => {
          setTypedText(currentTitle.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100); 
      } else {
        timeoutId = setTimeout(() => setIsDeleting(true), 2000); 
      }
    }
    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, titleIndex, titles]);
  
  return (
    <Box id="hero" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pt: { xs: 12, md: 0 }, background: (theme) => `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`}}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Avatar 
          alt={heroData.name} 
          src={`https://placehold.co/200x200/0891B2/F3F4F6?text=${heroData.avatarText}`} 
          sx={{ width: 150, height: 150, margin: '0 auto 24px auto', border: '4px solid', borderColor: 'primary.main', fontSize: '4rem' }} 
        />
        <Typography variant="h1" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
          Hi, I'm {heroData.name}
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'primary.main', minHeight: '3rem', fontWeight: 'medium' }}>
          {typedText}
          <Box component="span" sx={{ animation: 'blink 1s step-end infinite', color: 'inherit', ml: 0.5 }}>|</Box>
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '700px', margin: '24px auto' }}>
          {heroData.tagline}
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="primary" size="large" sx={{ marginRight: 2 }} onClick={() => scrollToSection('projects')}>
            View My Work
          </Button>
          <Button variant="outlined" color="primary" size="large" onClick={() => scrollToSection('contact')}>
            Get In Touch
          </Button>
        </Box>
      </Container>
      <style>
        {`
          @keyframes blink {
            from, to { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </Box>
  );
};

// Section Title Component
const SectionTitle = ({ title, subtitle }) => (
  <Box textAlign="center" mb={6}>
    <Typography variant="h2" component="h2" gutterBottom sx={{ color: 'text.primary' }}>
      {title}
    </Typography>
    {subtitle && <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '600px', margin: '0 auto' }}>
      {subtitle}
    </Typography>}
    <Box sx={{ height: '4px', width: '80px', backgroundColor: 'primary.main', margin: '16px auto 0', borderRadius: '2px' }} />
  </Box>
);

// About Section
const About = () => (
  <Box id="about" component="section" sx={{ py: {xs: 8, md: 12}, backgroundColor: 'background.paper' }}>
    <Container maxWidth="lg">
      <SectionTitle title="About Me" />
      <Grid container spacing={4} alignItems="center"> 
        <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
           <Avatar 
            alt={personalInfo.name + " - Profile"} 
            src={sahilImage} 
            sx={{ 
                width: {xs: 200, md: 300}, 
                height: {xs:200, md:300}, 
                margin: '0 auto', 
                borderRadius: '12px', 
                boxShadow: (theme) => `0 10px 25px -5px ${theme.palette.primary.main}33, 0 8px 10px -6px ${theme.palette.primary.main}2A` 
            }} 
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" gutterBottom sx={{ color: 'text.primary', fontWeight: 'medium' }}> 
            {aboutData.greeting}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            {aboutData.summary}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            {aboutData.experienceHighlights}
          </Typography>
          <Typography variant="h6" sx={{ color: 'primary.main', mt:3, mb: 1 }}>Key Achievements:</Typography>
          <Box component="ul" sx={{ color: 'text.secondary', pl: 2.5, mb:2, listStyleType: '"✓ "' }}> 
            {aboutData.achievements.map((ach, index) => <Box component="li" key={index} sx={{ mb: 0.5 }}><Typography variant="body1" component="span">{ach}</Typography></Box>)}
          </Box>
           <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
            <strong>Education:</strong> {aboutData.education}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            <strong>Hobbies:</strong> {aboutData.hobbies}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

// Skills Section
const Skills = () => (
  <Box id="skills" component="section" sx={{ py: {xs: 8, md: 12}, backgroundColor: 'background.default' }}>
    <Container maxWidth="lg">
      <SectionTitle title="My Skills" subtitle="Technologies and tools I'm proficient with." />
      <Grid container spacing={3} justifyContent="center">
        {skillsData.map((skill) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={skill.name}>
            <Paper 
                elevation={2} 
                sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    backgroundColor: 'background.paper', 
                    borderRadius: '12px', 
                    height: '100%', 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:hover': { 
                        transform: 'scale(1.05) translateY(-3px)', 
                        transition: 'transform 0.2s ease-out', 
                        boxShadow: (theme) => `0 0 25px ${theme.palette.primary.main}77` 
                    } 
                }}
            >
              <Box sx={{ fontSize: '3rem', color: 'primary.main', mb: 1 }}>{skill.icon}</Box>
              <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 'medium' }}>{skill.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

// Projects Section
const Projects = () => (
  <Box id="projects" component="section" sx={{ py: {xs: 8, md: 12}, backgroundColor: 'background.paper' }}>
    <Container maxWidth="lg">
      <SectionTitle title="My Projects" subtitle="A selection of my work. Click on 'App Store' to view them live." />
      <Grid container spacing={4}>
        {projectsData.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'background.default' }}>
              <CardMedia
                component="img"
                height="200" 
                image={project.image}
                alt={project.title}
                sx={{ borderBottom: '3px solid', borderColor: 'primary.main', objectFit: 'cover' }} 
                onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src=`https://placehold.co/600x400/374151/9CA3AF?text=Image+Not+Found`; 
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div" sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '80px' /* Adjust as needed for consistent card text height */ }}>
                  {project.description}
                </Typography>
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                  {project.tags.map(tag => <Chip key={tag} label={tag} size="small" />)}
                </Box>
              </CardContent>
              <CardActions sx={{ padding: '16px', borderTop: '1px solid', borderColor: '#374151', justifyContent: 'space-between' }}>
                <Button 
                    size="small" 
                    variant="contained" 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer" // Good practice for target="_blank"
                    disabled={project.liveLink === "#"}
                    startIcon={<Storefront />} 
                >
                  App Store
                </Button>
                {/* <Button 
                    size="small" 
                    variant="outlined" 
                    href={project.sourceLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    disabled={project.sourceLink === "#"}
                    startIcon={<Code />}
                >
                  Source
                </Button> */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

// Contact Section
const Contact = () => {
  const handleSendEmail = () => {
    const subject = encodeURIComponent("Portfolio Contact Inquiry");
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}`;
  };

  return (
    <Box id="contact" component="section" sx={{ py: {xs: 8, md: 12}, backgroundColor: 'background.default' }}>
      <Container maxWidth="md">
        <SectionTitle title="Get In Touch" subtitle="Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities." />
        <Paper elevation={3} sx={{ p: {xs:3, md:5}, borderRadius: '12px', backgroundColor: 'background.paper', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: 'text.primary', mb: 1 }}>
            Interested in collaborating?
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            Click the button below to send me an email directly.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            startIcon={<Email />} // Changed icon to Email
            onClick={handleSendEmail}
          >
            Send Email
          </Button>
        </Paper>
        <Box textAlign="center" mt={6}>
          <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>Or connect with me:</Typography>
          <IconButton href={personalInfo.github} target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main', '&:hover': {color: 'secondary.main'}, mx: 1 }}><GitHub fontSize="large" /></IconButton>
          <IconButton href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main', '&:hover': {color: 'secondary.main'}, mx: 1 }}><LinkedIn fontSize="large" /></IconButton>
          <IconButton href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.main', '&:hover': {color: 'secondary.main'}, mx: 1 }}><Twitter fontSize="large" /></IconButton>
          <IconButton href={`mailto:${personalInfo.email}`} sx={{ color: 'primary.main', '&:hover': {color: 'secondary.main'}, mx: 1 }}><Mail fontSize="large" /></IconButton>
        </Box>
      </Container>
    </Box>
  );
};

// Footer Component
const Footer = () => (
  <Box component="footer" sx={{ py: 4, backgroundColor: 'background.paper', borderTop: '1px solid', borderColor: '#374151' }}>
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        Designed & Built by {personalInfo.name} &copy; {new Date().getFullYear()}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{mt: 0.5}}>
        Powered by React & MUI
      </Typography>
    </Container>
  </Box>
);

// Scroll to Top Button
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <IconButton
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'primary.main',
          color: (theme) => theme.palette.getContrastText(theme.palette.primary.main), 
          '&:hover': {
            backgroundColor: 'primary.dark', 
          },
          zIndex: 1300, 
          boxShadow: 3, 
        }}
      >
        <ArrowUpward />
      </IconButton>
    )
  );
};


// Main App Component
export default function App() {
  const theme = useMemo(() => createTheme(getDesignTokens()), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar /> 
        <Toolbar /> 
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Box>
        <Footer />
        <ScrollToTopButton />
      </Box>
    </ThemeProvider>
  );
}
