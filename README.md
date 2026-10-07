# CareerRadar

> A React job-discovery prototype for exploring remote job listings from the [Jobicy API](https://jobicy.com/jobs-rss-feed).
<img width="924" height="406" alt="image" src="https://github.com/user-attachments/assets/6feb22de-8c24-4ed5-b9ee-d7250550bf61" />

## Table of Contents

- [Who It's For](#who-its-for)
- [Current Prototype](#current-prototype)
- [Planned Work](#planned-work)
- [Tech Stack](#tech-stack)
- [Data Source](#data-source)
- [Run Locally](#run-locally)
- [How the Project Was Set Up](#how-the-project-was-set-up)
- [Project Structure](#project-structure)
- [Project Team](#project-team)

## Who It's For

CareerRadar is designed for people exploring job opportunities or planning their next career move:

- **Students and recent graduates:** internships, graduate programmes, and entry-level roles
- **Early-career professionals:** roles that match their skills and experience
- **Career changers:** exploring a new field and the skills employers ask for
- **Freelancers and experienced professionals:** remote work and new roles

The prototype focuses on remote listings, so the opportunities shown depend on Jobicy's coverage.

## Current Prototype

- **Home page:** keyword search and recent listings
- **Jobs page:** filters for industry, experience level, and job type
- **Job cards:** available listing details, plus save controls
- **About page:** describes the project
- **Loading, empty-results, and error states** for job searches

> [!NOTE]
> - The **Job Details** screen is a **UI mockup** with sample content. It is not yet connected to individual API listings.
> - **Saved jobs** are held in frontend state and are not kept between visits.

## Planned Work

These are roadmap items, not features of the current prototype:

- [ ] Flask REST API and PostgreSQL database
- [ ] User accounts and persistent saved jobs
- [ ] Application tracking and a personal dashboard
- [ ] Skills profiles and skill-gap recommendations

## Tech Stack

- React and JavaScript
- React Router
- CSS
- Vite
- Jobicy Remote Jobs API

## Data Source

The app requests up to 20 remote jobs from `https://jobicy.com/api/v2/remote-jobs` and passes the search term as a tag. The public endpoint needs no API key. Listings depend on the API and your network being available.

## Run Locally

```bash
git clone https://github.com/ziza-kariuki/Group4Project_CareerRadar.git
cd Group4Project_CareerRadar
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```bash
npm run build
```

## How the Project Was Set Up

For reference, the project was created with these commands. **You don't need to run them** if you cloned the repo, since `npm install` above already installs everything.

```bash
# Create the Vite + React project
npm create vite@latest

# Add client-side routing
npm install react-router-dom
```

## Project Structure

```text
src/
  components/  Reusable interface components
  pages/       Home, Jobs, Job Details, and About screens
  services/    Job API requests and data formatting
  hooks/       Job-loading state and search behavior
  styles/      Global and page styles
```

## Project Team

- Gabriel Cosmas: Services folder, skills.py, users.py
- Okech Martin: alerts.py, applications.py, auth.py, career.py, dashboard.py, jobs.py, matches.py, profile.py
- Edwin Lude: application.py, career_goal.py, education.py, experience.py, job.py
- Teddy Learamo: All database schema/relationships
- Ziza Kariuki: job_alert.py, notification.py, profile.py, saved_job.py, skill.py, user.py
