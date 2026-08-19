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
    bio: 'Allen builds the pipeline that turns a raw capture into a labeled, connected building. He came up through robotics and mechanical engineering at MIT, and started Landex because almost no software touches the physical world of construction.',
  },
  {
    name: 'Auddithio Nag',
    role: 'Co-founder',
    photo: '/assets/team/auddi.png',
    email: 'auddi@landexsystems.com',
    bio: 'Auddithio builds the machine learning that reads a construction site from sensor data. He has shipped work on 3D scene understanding, satellite flood prediction and medical imaging, and did his CS master’s at Stanford — the same problem, pointed at buildings.',
  },
  {
    name: 'Beckett Devoe',
    role: 'Co-founder',
    photo: '/assets/team/beckett.png',
    email: 'beckett@landexsystems.com',
    bio: 'Beckett builds computer vision models for the physical world — shellfish health at MIT Sea Grant, ocean research in Norway, and now the things people build. He studied AI and decision making at MIT.',
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
