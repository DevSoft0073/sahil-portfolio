import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Button, Container, Grid, Paper, Card, CardContent, CardActions, CardMedia, IconButton, Box, Link, Avatar, Chip, TextField, GlobalStyles, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material'; // Added Stack
import { PaletteMode } from '@mui/material';
import {
  Brightness4, Brightness7, Menu as MenuIcon, Code, Brush, Storage, Cloud, Mail, GitHub, LinkedIn, Twitter, ArrowUpward, Send, Download,
  PhoneIphone, Api, DeveloperMode, AccountTree, Speed, Palette, Build, StarBorder,
  Home, Person, Work, DesignServices, ContactMail, RadioButtonUnchecked, RadioButtonChecked
} from '@mui/icons-material';

import { loadSlim } from "tsparticles-slim"; // For smaller bundle size
import Particles from "react-tsparticles";

// CV Data: Sahil Dhiman
const personalInfo = {
  name: "Sahil Dhiman",
  title: "Experienced Software Developer",
  email: "dhimansahil96@gmail.com",
  linkedin: "https://linkedin.com/in/sahil-dhiman-84267120b",
  github: "https://github.com/sahildhiman96",
  twitter: "#",
  resumeLink: "/sahil_dhiman_cv.pdf"
};

const heroData = {
  name: personalInfo.name,
  avatarText: "SD",
  titles: ["iOS Developer", "React Native Expert", "Mobile Solutions Architect", "Innovative Coder"],
  tagline: "Crafting cutting-edge mobile experiences with a passion for performance, aesthetics, and user-centric design."
};

const aboutData = {
  greeting: "Hello! I'm Sahil Dhiman.",
  summary: `A seasoned Software Developer with 6 years of dedication to building and refining high-impact iOS and cross-platform mobile applications. My expertise spans Swift, Objective-C, SwiftUI, and React Native, driven by a commitment to intuitive user interfaces and robust, scalable solutions. I excel in clean coding practices, seamless third-party integrations, and meticulous app performance optimization. As a collaborative team member, I thrive on tackling complex challenges and guiding fellow developers.`,
  experienceHighlights: `My journey includes pivotal roles at Infostride Technology, Rapidsofts, and The Brihaspati Infotech, where I've spearheaded development projects, mentored talent, overseen quality assurance, and forged strong client relationships to deliver bespoke solutions. I've also successfully launched independent iOS applications.`,
  achievements: [
    "Employee of the Month - Infostride",
    "Key contributor in client site visit (Chennai) for Gluedin platform strategy."
  ],
  education: "Master of Computer Applications (MCA) from Govt PG College Dharamshala (2019) and Bachelor of Computer Applications (BCA) from Maharana Pratap College (2016).",
  hobbies: "Beyond coding, I find joy in dancing, gaming, music, and trekking through nature."
};

const projectsData = [
  { id: "proj1", title: "Radioly - Live Radio Streaming", description: "Native iOS app for live radio, filterable by language/country. Features IAP, ads, Core Data for offline mode, and dynamic light/dark UI.", image: `https://placehold.co/600x400/0891b2/0f172a?text=Radioly`, tags: ["Swift", "REST APIs", "IAP", "Core Data"], liveLink: "#", sourceLink: "#" },
  { id: "proj2", title: "Gluedin - Social Video Platform", description: "Enhanced iOS & React Native app with creative sticker/text overlays. Boosted performance for faster load times. Key role in Chennai client consultation.", image: `https://placehold.co/600x400/c026d3/0f172a?text=Gluedin`, tags: ["iOS", "React Native", "Performance"], liveLink: "#", sourceLink: "#" },
  { id: "proj3", title: "Libaoo - eBook Reader", description: "Native iOS eBook app with browsing, reading, and bookmarking. Implemented offline sync, theme modes, and subscription payments.", image: `https://placehold.co/600x400/7c3aed/0f172a?text=Libaoo`, tags: ["Swift (UIKit)", "API", "Offline Sync"], liveLink: "#", sourceLink: "#" },
  { id: "proj4", title: "MapBuzz - Location Dating App", description: "Location-based dating app with swipe UI. Socket.IO for real time chat, Twilio video/audio calls. Bridged Objective-C & Swift.", image: `https://placehold.co/600x400/ea580c/0f172a?text=MapBuzz`, tags: ["Objective-C", "Swift", "Firebase", "Twilio"], liveLink: "#", sourceLink: "#" },
  { id: "proj5", title: "Laurenstallwood - Fitness App", description: "Subscription-based fitness app with workout packages, progress tracking, video tutorials, chat, and push notifications. Rich UI/UX focus.", image: `https://placehold.co/600x400/059669/0f172a?text=FitnessApp`, tags: ["Swift (UIKit)", "Firebase", "UI/UX"], liveLink: "#", sourceLink: "#" }
];

const skillsData = [
  { name: "Swift", icon: <Code sx={{ color: '#f05138' }} />, level: 95 },
  { name: "Objective-C", icon: <Code sx={{ color: '#007aff' }} />, level: 90 },
  { name: "SwiftUI", icon: <Palette sx={{ color: '#00a9e0' }} />, level: 85 },
  { name: "React Native", icon: <PhoneIphone sx={{ color: '#61dafb' }} />, level: 80 },
  { name: "Core Data", icon: <Storage sx={{ color: '#767676' }} />, level: 90 },
  { name: "Firebase", icon: <Cloud sx={{ color: '#ffca28' }} />, level: 85 },
  { name: "RESTful APIs", icon: <Api sx={{ color: '#4caf50' }} />, level: 90 },
  { name: "Performance", icon: <Speed sx={{ color: '#f44336' }} />, level: 88 },
  { name: "UI/UX Principles", icon: <Brush sx={{ color: '#e91e63' }} />, level: 85 },
  { name: "Auto Layout", icon: <Build sx={{ color: '#9e9e9e' }} />, level: 90 },
  { name: "Xcode", icon: <DeveloperMode sx={{ color: '#3f51b5' }} />, level: 95 },
  { name: "Git", icon: <Code sx={{ color: '#f44336' }} />, level: 95 },
  { name: "MVVM/MVC", icon: <AccountTree sx={{ color: '#9c27b0' }} />, level: 90 },
  { name: "Agile/Scrum", icon: <DeveloperMode sx={{ color: '#009688' }} />, level: 85 },
];

const sections = [
  { id: 'hero', name: 'Home', icon: <Home /> },
  { id: 'about', name: 'About', icon: <Person /> },
  { id: 'skills', name: 'Skills', icon: <DesignServices /> },
  { id: 'projects', name: 'Projects', icon: <Work /> },
  { id: 'contact', name: 'Contact', icon: <ContactMail /> }
];

// Theme Configuration
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
        primary: { main: '#00bcd4' },
        secondary: { main: '#ff4081' },
        background: {
          default: '#10101a',
          paper: 'rgba(26, 26, 38, 0.85)', // Slightly more opaque for better readability
        },
        text: {
          primary: '#f0f0f0', // Slightly brighter primary text
          secondary: '#c0c0c0', // Slightly brighter secondary text
        },
        divider: 'rgba(224, 224, 224, 0.15)', // Slightly more visible divider
      }
      : {
        primary: { main: '#009688' },
        secondary: { main: '#e91e63' },
        background: {
          default: '#f5f5f5',
          paper: 'rgba(255, 255, 255, 0.9)', // Slightly more opaque for better readability
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#666666',
        },
        divider: 'rgba(0, 0, 0, 0.15)',
      }),
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', letterSpacing: '0.02em' },
    h2: { fontWeight: 600, fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '0.01em' },
    h3: { fontWeight: 600, fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' },
    h4: { fontWeight: 500, fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' },
    body1: { fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 1.7, fontWeight: 400 },
    button: { fontWeight: 600, textTransform: 'none' }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: '16px', // More rounded
          boxShadow: theme.palette.mode === 'dark' ? '0px 12px 35px -12px rgba(0,188,212,0.25)' : '0px 12px 35px -12px rgba(0,0,0,0.12)',
          padding: theme.spacing(3, 4), // Default padding for Paper
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: 'transparent',
          boxShadow: 'none',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: `1px solid ${theme.palette.divider}`, // Add subtle border to cards
          borderRadius: '12px', // Consistent rounding
        }),
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 25px',
          transition: 'all 0.3s ease-in-out',
        },
        containedPrimary: ({ theme }) => ({
          color: theme.palette.mode === 'dark' ? '#10101a' : '#fff',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#00acc1' : '#00796b',
            boxShadow: `0 6px 16px ${theme.palette.primary.main}55`,
            transform: 'translateY(-2px)',
          },
        }),
        outlinedPrimary: ({ theme }) => ({
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: `${theme.palette.primary.main}1A`, // Lighter background on hover
            borderColor: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
            transform: 'translateY(-2px)',
          },
        }),
      },
    },
    MuiAppBar: { // Updated AppBar styling
      styleOverrides: {
        root: ({ ownerState, theme }) => ({ // ownerState can be used if we pass custom props
          position: 'fixed',
          transition: 'background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          // Initial state (transparent at top) handled by scroll listener
          boxShadow: 'none',
          // Default to transparent, scroll listener will add background
          backgroundColor: 'transparent',
          borderBottom: 'none', // Remove initial border
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: `${theme.palette.primary.main}26`, // Slightly less transparent
          color: theme.palette.primary.main,
          fontWeight: '500',
          borderRadius: '6px',
          border: `1px solid ${theme.palette.primary.main}40`, // Subtler border
        }),
      }
    },
  },
});

// Particle Background Component (remains the same)
const ParticleBackground = ({ mode }) => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);
  const particleOptions = useMemo(() => ({ /* ... particle options from previous version ... */
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" }, onClick: { enable: true, mode: "push" }, resize: true },
      modes: { grab: { distance: 140, links: { opacity: 1 } }, push: { quantity: 2 }, remove: { quantity: 2 } }
    },
    particles: {
      color: { value: mode === 'dark' ? "#555555" : "#aaaaaa" },
      links: { color: mode === 'dark' ? "#444444" : "#bbbbbb", distance: 150, enable: true, opacity: 0.4, width: 1 },
      collisions: { enable: false },
      move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 1, straight: false },
      number: { density: { enable: true, area: 800 }, value: 50 },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), [mode]);
  return (<Particles id="tsparticles" init={particlesInit} options={particleOptions} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />);
};

// Scroll to section helper
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Side Dot Navigation (remains mostly the same)
const SideNavDots = ({ currentSection }) => { // Removed setCurrentSection as it's handled by observer
  return (
    <Box sx={{ position: 'fixed', top: '50%', right: '20px', transform: 'translateY(-50%)', zIndex: 1100, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', gap: '10px' }}>
      {sections.map(section => (
        <IconButton key={section.id} size="small" onClick={() => scrollToSection(section.id)}
          sx={{ padding: '4px', transition: 'all 0.3s ease', backgroundColor: currentSection === section.id ? 'primary.main' : 'rgba(120,120,120,0.3)', border: currentSection === section.id ? `1px solid ${theme.palette.primary.dark || theme.palette.primary.main}` : `1px solid rgba(180,180,180,0.3)`, '&:hover': { backgroundColor: theme.palette.primary.light || theme.palette.primary.main, transform: 'scale(1.2)' } }} >
          {currentSection === section.id ?
            <RadioButtonChecked sx={{ fontSize: '14px', color: theme.palette.getContrastText(theme.palette.primary.main) }} /> :
            <RadioButtonUnchecked sx={{ fontSize: '14px', color: theme.palette.mode === 'dark' ? 'rgba(224,224,224,0.7)' : 'rgba(33,33,33,0.7)' }} />
          }
        </IconButton>
      ))}
    </Box>
  );
};

// Navbar Component - Updated
const Navbar = ({ mode, toggleColorMode, onMenuClick, isScrolled }) => {
  return (
    <AppBar
      position="fixed"
      component="nav"
      sx={{
        // Apply styles based on isScrolled state
        backgroundColor: isScrolled ? (mode === 'dark' ? 'rgba(16, 16, 26, 0.7)' : 'rgba(245, 245, 245, 0.7)') : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? (theme.palette.mode === 'dark' ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)') : 'none',
        borderBottom: isScrolled ? `1px solid ${theme.palette.divider}` : 'none',
        transition: 'background-color 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-bottom 0.3s ease-in-out',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: 'primary.main', cursor: 'pointer', transition: 'color 0.3s' }} onClick={() => scrollToSection('hero')}>
            {personalInfo.name.split(' ')[0]}
            <span style={{ color: isScrolled || mode === 'dark' ? theme.palette.text.primary : theme.palette.primary.dark, transition: 'color 0.3s' }}>.</span>
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {sections.map((section) => (
              <Button key={section.id} sx={{ color: 'text.primary', mx: 1, '&:hover': { color: 'primary.main' } }} onClick={() => scrollToSection(section.id)}>
                {section.name}
              </Button>
            ))}
            {/* <Button variant="outlined" sx={{ ml: 2 }} href={personalInfo.resumeLink} target="_blank" startIcon={<Download />}>
              Resume
            </Button> */}
          </Box>
          {/* <IconButton onClick={toggleColorMode} sx={{ color: 'text.primary', ml: { xs: 0, md: 1 } }}>
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton> */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={onMenuClick}
            sx={{ display: { md: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// Section Wrapper
const SectionWrapper = ({ id, children, sx }) => (
  <Box id={id} component="section" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: { xs: 8, md: 10 }, pt: { xs: 'calc(64px + 32px)', md: 'calc(64px + 48px)' }, position: 'relative', overflow: 'hidden', ...sx }} >
    {children}
  </Box>
);

// Hero Section (remains the same)
const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const titles = useMemo(() => heroData.titles, []);
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => { /* ... typing animation logic ... */
    const currentTitle = titles[titleIndex]; let timeoutId;
    if (isDeleting) {
      if (charIndex > 0) { timeoutId = setTimeout(() => { setTypedText(currentTitle.substring(0, charIndex - 1)); setCharIndex(charIndex - 1); }, 50); } else { setIsDeleting(false); setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length); setCharIndex(0); }
    } else { if (charIndex < currentTitle.length) { timeoutId = setTimeout(() => { setTypedText(currentTitle.substring(0, charIndex + 1)); setCharIndex(charIndex + 1); }, 100); } else { timeoutId = setTimeout(() => setIsDeleting(true), 2000); } }
    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, titleIndex, titles]);
  return (<SectionWrapper id="hero"> <Container maxWidth="md" sx={{ textAlign: 'center', zIndex: 1 }}> <Avatar alt={heroData.name} src={`https://placehold.co/200x200/${theme.palette.primary.main.substring(1)}/${theme.palette.background.default.substring(1)}?text=${heroData.avatarText}&font=Montserrat`} sx={{ width: 150, height: 150, margin: '0 auto 24px auto', fontSize: '4rem', border: `4px solid ${theme.palette.primary.main}` }} /> <Typography variant="h1" component="h1" gutterBottom sx={{ color: 'text.primary' }}> {heroData.name} </Typography> <Typography variant="h4" component="p" sx={{ color: 'primary.main', minHeight: '3rem', mb: 2, fontWeight: 500 }}> I'm a <span style={{ color: theme.palette.secondary.main }}>{typedText}</span> <Box component="span" sx={{ animation: 'blink 1s infinite', color: 'inherit', ml: '2px' }}>|</Box> </Typography> <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '600px', margin: '0 auto 32px auto' }}> {heroData.tagline} </Typography> <Box> <Button variant="contained" color="primary" size="large" sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }} onClick={() => scrollToSection('projects')}> View Projects </Button> <Button variant="outlined" color="primary" size="large" onClick={() => scrollToSection('contact')}> Contact Me </Button> </Box> </Container> <style>{` @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } } `}</style> </SectionWrapper>);
};

// Section Title Component
const FullPageSectionTitle = ({ title }) => (
  <Box textAlign="center" mb={{ xs: 4, md: 6 }} sx={{ zIndex: 1 }}> {/* Reduced bottom margin */}
    <Typography variant="h2" component="h2" sx={{ color: 'text.primary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
      {title}
    </Typography>
    <Box sx={{ height: '3px', width: '60px', backgroundColor: 'primary.main', margin: '16px auto 0', borderRadius: '2px' }} />
  </Box>
);

// About Section - Updated UI
const About = () => (
  <SectionWrapper id="about">
    <Container maxWidth="lg" sx={{ zIndex: 1 }}>
      <FullPageSectionTitle title="About Me" />
      <Paper sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}> {/* Centered text for summary */}
        <Avatar
          alt={personalInfo.name + " - Profile"}
          src={`https://placehold.co/300x300/${theme.palette.primary.main.substring(1)}/${theme.palette.background.default.substring(1)}?text=Sahil&font=Montserrat`}
          sx={{ width: { xs: 150, md: 200 }, height: { xs: 150, md: 200 }, margin: '0 auto 24px auto', border: `4px solid ${theme.palette.primary.main}` }}
        />
        <Typography variant="h4" gutterBottom sx={{ color: 'text.primary', fontWeight: 600 }}>
          {aboutData.greeting}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, maxWidth: '800px', margin: '0 auto 24px auto', textAlign: 'left' }}>
          {aboutData.summary}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, maxWidth: '800px', margin: '0 auto 24px auto', textAlign: 'left' }}>
          {aboutData.experienceHighlights}
        </Typography>

        <Box sx={{ maxWidth: '800px', margin: '0 auto 24px auto', textAlign: 'left' }}>
          <Typography variant="h6" sx={{ color: 'primary.main', mt: 3, mb: 1.5, fontWeight: 500 }}>Key Achievements:</Typography>
          <List dense sx={{ pl: 0 }}>
            {aboutData.achievements.map((ach, index) =>
              <ListItem key={index} disablePadding sx={{ pb: 0.5 }}>
                <ListItemIcon sx={{ minWidth: '36px', color: 'secondary.main' }}><StarBorder /></ListItemIcon>
                <ListItemText primary={ach} primaryTypographyProps={{ variant: 'body1', color: 'text.secondary' }} />
              </ListItem>
            )}
          </List>
        </Box>

        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 3, maxWidth: '800px', margin: '24px auto 12px auto', textAlign: 'left' }}>
          <strong>Education:</strong> {aboutData.education}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
          <strong>Hobbies:</strong> {aboutData.hobbies}
        </Typography>
      </Paper>
    </Container>
  </SectionWrapper>
);

// Skills Section (remains the same)
const Skills = () => (<SectionWrapper id="skills"> <Container maxWidth="md" sx={{ zIndex: 1 }}> <FullPageSectionTitle title="My Skills" /> <Paper sx={{ p: { xs: 2, md: 4 } }}> <Grid container spacing={3} justifyContent="center"> {skillsData.map((skill) => (<Grid item xs={4} sm={3} md={2.4} key={skill.name} sx={{ textAlign: 'center' }}> <Box sx={{ fontSize: { xs: '2.5rem', sm: '3rem' }, mb: 1, color: skill.icon.props.sx.color || 'primary.main' }}>{skill.icon}</Box> <Typography variant="caption" component="p" sx={{ color: 'text.primary', fontWeight: 500 }}>{skill.name}</Typography> </Grid>))} </Grid> </Paper> </Container> </SectionWrapper>);

// Projects Section - Removed Source Code button
const Projects = () => (
  <SectionWrapper id="projects">
    <Container maxWidth="lg" sx={{ zIndex: 1 }}>
      <FullPageSectionTitle title="My Projects" />
      <Grid container spacing={4}>
        {projectsData.map((project) => (
          <Grid width={'100%'} item xs={12} sm={6} md={4} key={project.id}>
            <Paper sx={{ overflow: 'hidden', height: '100%' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={project.image}
                  alt={project.title}
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/757575/212121?text=Error&font=Montserrat`; }}
                />
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}> {/* Increased padding */}
                  <Typography gutterBottom variant="h5" component="h3" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}> {/* Increased gap */}
                    {project.tags.slice(0, 3).map(tag => <Chip key={tag} label={tag} size="small" />)}
                  </Box>
                </CardContent>
                <CardActions sx={{ padding: '12px 20px', justifyContent: 'flex-start', borderTop: `1px solid ${theme.palette.divider}` }}> {/* Align button to start */}
                  <Button size="small" variant="contained" href={project.liveLink} target="_blank" disabled={project.liveLink === "#"}>
                    View Live
                  </Button>
                  {/* Source Code Button Removed */}
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>

    </Container>
  </SectionWrapper>
);

// Contact Section (remains the same)
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' }); const [isSubmitting, setIsSubmitting] = useState(false); const [submitStatus, setSubmitStatus] = useState(null);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => { e.preventDefault(); setIsSubmitting(true); setSubmitStatus(null); try { await new Promise(resolve => setTimeout(resolve, 1500)); console.log("Form data submitted:", formData); setSubmitStatus('success'); setFormData({ name: '', email: '', message: '' }); } catch (error) { console.error("Form submission error:", error); setSubmitStatus('error'); } finally { setIsSubmitting(false); } };
  return (<SectionWrapper id="contact"> <Container maxWidth="md" sx={{ zIndex: 1 }}> <FullPageSectionTitle title="Contact Me" /> <Paper sx={{ p: { xs: 3, md: 4 } }}> <form onSubmit={handleSubmit}> <Grid container spacing={2.5}> <Grid item xs={12} sm={6}> <TextField fullWidth label="Your Name" name="name" variant="filled" value={formData.name} onChange={handleChange} required InputLabelProps={{ sx: { color: 'text.secondary' } }} sx={{ input: { color: 'text.primary' } }} /> </Grid> <Grid item xs={12} sm={6}> <TextField fullWidth label="Your Email" name="email" type="email" variant="filled" value={formData.email} onChange={handleChange} required InputLabelProps={{ sx: { color: 'text.secondary' } }} sx={{ input: { color: 'text.primary' } }} /> </Grid> <Grid item xs={12}> <TextField fullWidth label="Your Message" name="message" variant="filled" multiline rows={4} value={formData.message} onChange={handleChange} required InputLabelProps={{ sx: { color: 'text.secondary' } }} sx={{ textarea: { color: 'text.primary' } }} /> </Grid> <Grid item xs={12} sx={{ textAlign: 'center', mt: 1 }}> <Button type="submit" variant="contained" color="primary" size="large" endIcon={<Send />} disabled={isSubmitting}> {isSubmitting ? 'Sending...' : 'Send Message'} </Button> </Grid> </Grid> </form> {submitStatus === 'success' && (<Typography color="success.main" sx={{ mt: 2, textAlign: 'center' }}>Message sent! I'll reply soon.</Typography>)} {submitStatus === 'error' && (<Typography color="error.main" sx={{ mt: 2, textAlign: 'center' }}>Error sending. Please try again.</Typography>)} </Paper> <Box textAlign="center" mt={5}> <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>Find me on:</Typography> <IconButton component={Link} href={personalInfo.github} target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, mx: 1 }}><GitHub sx={{ fontSize: '1.8rem' }} /></IconButton> <IconButton component={Link} href={personalInfo.linkedin} target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, mx: 1 }}><LinkedIn sx={{ fontSize: '1.8rem' }} /></IconButton> <IconButton component={Link} href={`mailto:${personalInfo.email}`} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, mx: 1 }}><Mail sx={{ fontSize: '1.8rem' }} /></IconButton> </Box> </Container> </SectionWrapper>);
};

// Footer Component (remains the same)
const Footer = () => (<Box component="footer" sx={{ py: 3, backgroundColor: 'transparent', textAlign: 'center', position: 'relative', zIndex: 1 }}> <Typography variant="body2" color="text.secondary"> &copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved. </Typography> <Typography variant="caption" color="text.secondary"> Inspired by Manish Kumar's Portfolio Design. </Typography> </Box>);

// Main App Component
let theme;

export default function App() {
  const [mode, setMode] = useState('dark');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(sections[0].id);
  const [isScrolled, setIsScrolled] = useState(false); // For Navbar style change

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('portfolio-theme-mode-v3', newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    const storedMode = localStorage.getItem('portfolio-theme-mode-v3');
    if (storedMode) { setMode(storedMode); }
    else { const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; setMode(prefersDarkMode ? 'dark' : 'light'); }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change style if scrolled more than 50px
    };
    window.addEventListener('scroll', handleScroll);

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };
    const observerCallback = (entries) => { entries.forEach(entry => { if (entry.isIntersecting) { setCurrentSection(entry.target.id); } }); };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentSectionElements = sections.map(section => document.getElementById(section.id)).filter(el => el);
    currentSectionElements.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      currentSectionElements.forEach(el => { if (el) observer.unobserve(el); });
    };
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ParticleBackground mode={mode} />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <Navbar mode={mode} toggleColorMode={colorMode.toggleColorMode} onMenuClick={handleDrawerToggle} isScrolled={isScrolled} /> {/* Pass isScrolled */}
        <Drawer
          variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, backgroundColor: 'background.default' }, }} >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}> {personalInfo.name.split(' ')[0]}. </Typography>
            <List>
              {sections.map((section) => (
                <ListItem key={section.name} disablePadding>
                  <ListItemButton onClick={() => { scrollToSection(section.id); setMobileOpen(false); }}>
                    <ListItemIcon sx={{ color: 'text.primary', minWidth: '40px' }}>{section.icon}</ListItemIcon>
                    <ListItemText primary={section.name} sx={{ color: 'text.primary' }} />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem disablePadding>
                <ListItemButton component="a" href={personalInfo.resumeLink} target="_blank">
                  <ListItemIcon sx={{ color: 'text.primary', minWidth: '40px' }}><Download /></ListItemIcon>
                  <ListItemText primary="Resume" sx={{ color: 'text.primary' }} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <SideNavDots currentSection={currentSection} />

        <Box component="main" sx={{ flexGrow: 1, overflowX: 'hidden' }}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
