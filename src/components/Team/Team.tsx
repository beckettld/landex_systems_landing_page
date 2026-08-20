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
  },
  {
    name: 'Auddithio Nag',
    role: 'Co-founder',
    photo: '/assets/team/auddi.png',
    email: 'auddi@landexsystems.com',
  },
  {
    name: 'Beckett Devoe',
    role: 'Co-founder',
    photo: '/assets/team/beckett.png',
    email: 'beckett@landexsystems.com',
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
