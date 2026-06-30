"use client";

import { motion } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'
import StaggerContainer, { staggerItem } from '@/components/StaggerContainer'
import styles from './Team.module.css'

const team = [
  {
    name: 'Allen Chen',
    role: 'Co-founder',
    initials: 'AC',
    email: 'allen@landexsystems.com',
    bio: 'Allen studied at MIT, where he worked on 3D capture and computer vision, and now builds the systems that turn scans, walkthroughs, and drone footage into something a project team can check against. He works in construction because he wants to influence the built world, the part of life everyone lives inside but almost no one gets to shape.',
  },
  {
    name: 'Auddithio Nag',
    role: 'Co-founder',
    initials: 'AN',
    email: 'auddi@landexsystems.com',
    bio: 'Auddithio earned his computer science masters at Stanford, with a background in machine learning and geospatial analysis spanning satellite flood prediction to medical imaging. Construction goes hand in hand with his past research on understanding 3D scenes, turning raw sensor data into a structured read of what is actually there.',
  },
  {
    name: 'Beckett Devoe',
    role: 'Co-founder',
    initials: 'BD',
    email: 'beckett@landexsystems.com',
    bio: 'Beckett studied AI and decision making at MIT and spent years building computer vision models for the physical world, from shellfish health at MIT Sea Grant to ocean research in Norway. Like Allen, he works in construction to influence the built world, taking the same tools he aimed at the natural world and pointing them at the things people make.',
  },
]

function Team() {
  return (
    <section id="team" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Who we are</span>
            <h2 className={styles.title}>
              The people building Landex.
            </h2>
            <p className={styles.subtitle}>
              A small team that has spent enough time around real projects to know where the record breaks down.
            </p>
            <p className={styles.lede}>
              Backed by <strong>Keel Ventures</strong>, building and operating out of New York City. Three founders out of MIT and Stanford, working full time on closing the gap between what gets drawn and what gets built.
            </p>
          </div>
        </AnimateIn>
        <StaggerContainer className={styles.grid} stagger={0.08}>
          {team.map((person) => (
            <motion.div key={person.name} className={styles.card} variants={staggerItem}>
              <div className={styles.avatar}>{person.initials}</div>
              <h3 className={styles.cardName}>{person.name}</h3>
              <span className={styles.cardRole}>{person.role}</span>
              <p className={styles.cardBio}>{person.bio}</p>
              <a className={styles.cardEmail} href={`mailto:${person.email}`}>
                {person.email}
              </a>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

export default Team
