"use client";

import { motion } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'
import StaggerContainer, { staggerItem } from '@/components/StaggerContainer'
import EmailLink from '@/components/EmailLink/EmailLink'
import { TEAM_ADDRESS_LABEL, type ContactUser } from '@/lib/contact'
import styles from './Team.module.css'

const team: { name: string; role: string; photo: string; user: ContactUser }[] = [
  {
    name: 'Allen Chen',
    role: 'Co-founder',
    photo: '/assets/team/allen.png',
    user: 'allen',
  },
  {
    name: 'Auddithio Nag',
    role: 'Co-founder',
    photo: '/assets/team/auddi.png',
    user: 'auddi',
  },
  {
    name: 'Beckett Devoe',
    role: 'Co-founder',
    photo: '/assets/team/beckett.png',
    user: 'beckett',
  },
]

function Team() {
  return (
    <section id="team" className={styles.section}>
      <div className={styles.container}>
        <AnimateIn>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Team</span>
            <h2 className={styles.title}>
              The people building Landex.
            </h2>
            <p className={styles.subtitle}>
              A small team turning scans into models and answers, with enough time on real projects to know what a scan leaves out.
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
              <EmailLink className={styles.cardEmail} topic="hello" to={person.user}>
                Email {person.name.split(' ')[0]}
              </EmailLink>
            </motion.div>
          ))}
        </StaggerContainer>
        <AnimateIn delay={0.1}>
          <p className={styles.reach}>
            Reach any of us at <span className={styles.reachAddress}>{TEAM_ADDRESS_LABEL}</span>
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Team
