"use client";

import { motion } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'
import StaggerContainer, { staggerItem } from '@/components/StaggerContainer'
import styles from './Team.module.css'

const team = [
  {
    name: 'Allen Chen',
    role: 'Co-founder',
    photo: '/assets/team/allen.png',
    email: 'allen@landexsystems.com',
    bio: 'Allen graduated from MIT in 2026 with a degree in mechanical engineering, where he worked on robotics. He works on Landex to build software for the physical world of construction, which almost no tools touch today.',
  },
  {
    name: 'Auddithio Nag',
    role: 'Co-founder',
    photo: '/assets/team/auddi.png',
    email: 'auddi@landexsystems.com',
    bio: 'Auddithio earned his CS masters at Stanford in 2026, with research in machine learning and geospatial analysis spanning satellite flood prediction and medical imaging. He works on Landex because reading a construction site from sensor data is the same problem as his past work on 3D scene understanding.',
  },
  {
    name: 'Beckett Devoe',
    role: 'Co-founder',
    photo: '/assets/team/beckett.png',
    email: 'beckett@landexsystems.com',
    bio: 'Beckett graduated from MIT in 2026 studying AI and decision making, and built computer vision models for the physical world, from shellfish health at MIT Sea Grant to ocean research in Norway. He works on Landex to point those same tools at the things people build.',
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
          </div>
        </AnimateIn>
        <StaggerContainer className={styles.grid} stagger={0.08}>
          {team.map((person) => (
            <motion.div key={person.name} className={styles.card} variants={staggerItem}>
              <div className={styles.avatar}>
                <img
                  src={person.photo}
                  alt={person.name}
                  className={styles.avatarImage}
                />
              </div>
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
