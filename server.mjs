import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import geoip from "geoip-lite"
import UAParser from "ua-parser-js"

const app = express()
app.use(cors())
app.use(express.json({ limit: "10mb" }))

const PORT = process.env.PORT || 3001
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "dev-secret-change-me"
const MONGODB_URI = process.env.MONGODB_URI

const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10)

const analyticsSchema = new mongoose.Schema({
  path: String,
  referrer: String,
  country: String,
  browser: String,
  device: String,
  os: String,
  timestamp: { type: Date, default: Date.now },
})

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  tags: [String],
  image: String,
  liveUrl: String,
  githubUrl: String,
  featured: { type: Boolean, default: false },
  order: Number,
  createdAt: { type: Date, default: Date.now },
})

const skillSchema = new mongoose.Schema({
  name: String,
  icon: String,
  proficiency: Number,
  category: String,
  order: Number,
})

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  startDate: String,
  endDate: String,
  description: [String],
  order: Number,
})

const certificationSchema = new mongoose.Schema({
  title: String,
  issuer: String,
  date: String,
  url: String,
  order: Number,
})

const settingSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: mongoose.Schema.Types.Mixed,
})

const Analytics = mongoose.model("Analytics", analyticsSchema)
const Project = mongoose.model("Project", projectSchema)
const Skill = mongoose.model("Skill", skillSchema)
const Experience = mongoose.model("Experience", experienceSchema)
const Certification = mongoose.model("Certification", certificationSchema)
const Setting = mongoose.model("Setting", settingSchema)

function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  try {
    req.user = jwt.verify(header.split(" ")[1], JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: "Invalid token" })
  }
}

async function seedData() {
  const projectCount = await Project.countDocuments()
  if (projectCount > 0) return

  await Project.insertMany([
    {
      title: "Dictionary Web App",
      description: "Built using Flask and integrated a Dictionary API to fetch meanings and related information quickly.",
      category: "Full Stack",
      tags: ["Flask", "API", "Python"],
      liveUrl: "https://dictionary-python-app-rp4x.onrender.com",
      githubUrl: "https://github.com/MahithaSagiraju/dictionary-python-app",
      featured: true,
      order: 1,
    },
    {
      title: "Weather App",
      description: "Fetches real-time weather data and displays it in a clean, responsive UI with smooth interactions.",
      category: "Web",
      tags: ["HTML", "CSS", "JS", "API"],
      githubUrl: "https://github.com/MahithaSagiraju/Syntecxhub_Weather_app",
      order: 2,
    },
  ])

  await Skill.insertMany([
    { name: "HTML • CSS • JavaScript", icon: "🌐", proficiency: 88, category: "Frontend", order: 1 },
    { name: "Python • Flask", icon: "🐍", proficiency: 74, category: "Backend", order: 2 },
    { name: "AI Tools", icon: "🤖", proficiency: 70, category: "AI", order: 3 },
    { name: "Data Visualization", icon: "📊", proficiency: 66, category: "Tools", order: 4 },
    { name: "Version Control (Git)", icon: "🔧", proficiency: 76, category: "Tools", order: 5 },
    { name: "Critical Thinking • Leadership", icon: "🧠", proficiency: 82, category: "Soft Skills", order: 6 },
  ])

  await Experience.insertMany([
    {
      company: "Alfido Tech",
      role: "Frontend Developer Intern",
      startDate: "2025",
      endDate: "2025",
      description: [
        "Developed responsive web pages using HTML, CSS, and JavaScript.",
        "Improved UI/UX and fixed bugs based on feedback.",
      ],
      order: 1,
    },
    {
      company: "Averixis Solutions",
      role: "AI Intern",
      startDate: "2025",
      endDate: "2025",
      description: [
        "Worked on AI/ML concepts and small prototype implementations.",
        "Explored datasets and supported model experimentation.",
      ],
      order: 2,
    },
    {
      company: "SyntexHub",
      role: "Frontend Intern",
      startDate: "2026",
      endDate: "Present",
      description: [
        "Built UI components and collaborated on layout and styling.",
        "Focused on clean design, responsiveness, and accessibility.",
      ],
      order: 3,
    },
  ])

  await Certification.insertMany([
    {
      title: "NPTEL — Artificial Intelligence",
      issuer: "NPTEL",
      date: "2024",
      url: "",
      order: 1,
    },
    {
      title: "HackerRank — Java (Basic)",
      issuer: "HackerRank",
      date: "2024",
      url: "",
      order: 2,
    },
  ])

  await Setting.insertMany([
    { key: "name", value: "Sagiraju Mahitha" },
    { key: "title", value: "AI Engineer & Full Stack Developer" },
    { key: "bio", value: "Computer Science student passionate about AI and full stack development. I enjoy building responsive web applications and working with real-world APIs." },
    { key: "location", value: "India" },
    { key: "email", value: "mahithachaitriya01@gmail.com" },
    { key: "linkedin", value: "https://linkedin.com/in/mahitha-sagiraju-bab928316" },
    { key: "github", value: "https://github.com/MahithaSagiraju" },
    { key: "resumeUrl", value: "https://drive.google.com/file/d/15VjoioirMSlcgL6btWU7Ub_dW0zni4n0/view" },
    { key: "avatar", value: "" },
    { key: "education", value: [
      { degree: "B.Tech CSE", institution: "JNTUA College", period: "2023–2027", score: "CGPA: 8.0", description: "Focused on core CS fundamentals, web development, and AI basics." },
      { degree: "Intermediate", institution: "Narayana Junior College", period: "", score: "97.2%", description: "Strong foundation in mathematics and analytical thinking." },
      { degree: "SSC", institution: "SHGVS School", period: "", score: "99%", description: "Consistent performance with disciplined learning habits." },
    ] },
    { key: "aboutHighlights", value: [
      { label: "Location", value: "India" },
      { label: "Frontend", value: "HTML • CSS • JS" },
      { label: "CGPA (B.Tech)", value: "8.0" },
    ] },
    { key: "values", value: [
      "Clean UI, good spacing, and accessible design",
      "Writing readable code and improving it step-by-step",
      "Learning by building and sharing projects",
    ] },
  ])

  console.log("Seed data inserted")
}

// Auth routes
app.post("/api/cms/login", async (req, res) => {
  const { password } = req.body
  const valid = await bcrypt.compare(password, hashedPassword)
  if (!valid) return res.status(401).json({ error: "Invalid password" })
  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" })
  res.json({ token })
})

app.get("/api/cms/verify", authMiddleware, (req, res) => {
  res.json({ valid: true })
})

// Dashboard
app.get("/api/cms/dashboard", authMiddleware, async (req, res) => {
  const [projects, skills, experiences, certifications, visits] = await Promise.all([
    Project.countDocuments(),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Certification.countDocuments(),
    Analytics.countDocuments(),
  ])
  res.json({ projects, skills, experiences, certifications, visits })
})

// Generic CRUD factory
function crudRoutes(model, path) {
  app.get(`/api${path}`, async (req, res) => {
    const items = await model.find().sort({ order: 1 })
    res.json(items)
  })

  app.get(`/api/cms${path}`, authMiddleware, async (req, res) => {
    const items = await model.find().sort({ order: 1 })
    res.json(items)
  })

  app.post(`/api/cms${path}`, authMiddleware, async (req, res) => {
    const item = await model.create(req.body)
    res.json(item)
  })

  app.put(`/api/cms${path}/:id`, authMiddleware, async (req, res) => {
    const item = await model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(item)
  })

  app.delete(`/api/cms${path}/:id`, authMiddleware, async (req, res) => {
    await model.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  })
}

crudRoutes(Project, "/projects")
crudRoutes(Skill, "/skills")
crudRoutes(Experience, "/experiences")
crudRoutes(Certification, "/certifications")

// Settings
app.get("/api/cms/settings", authMiddleware, async (req, res) => {
  const settings = await Setting.find()
  const map = {}
  for (const s of settings) map[s.key] = s.value
  res.json(map)
})

app.put("/api/cms/settings", authMiddleware, async (req, res) => {
  for (const [key, value] of Object.entries(req.body)) {
    await Setting.findOneAndUpdate({ key }, { value }, { upsert: true })
  }
  res.json({ success: true })
})

app.get("/api/settings/public", async (req, res) => {
  const settings = await Setting.find()
  const map = {}
  for (const s of settings) map[s.key] = s.value
  res.json(map)
})

// Upload
app.post("/api/cms/upload", authMiddleware, async (req, res) => {
  res.json({ url: req.body.image })
})

// Analytics tracking
app.post("/api/analytics", async (req, res) => {
  try {
    const { path, referrer } = req.body
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip
    const geo = geoip.lookup(ip)
    const ua = new UAParser(req.headers["user-agent"])
    const browser = ua.getBrowser().name || "Unknown"
    const os = ua.getOS().name || "Unknown"
    const device = ua.getDevice().type || "desktop"

    await Analytics.create({
      path,
      referrer: referrer || "direct",
      country: geo?.country || "Unknown",
      browser,
      device: device === "mobile" ? "mobile" : device === "tablet" ? "tablet" : "desktop",
      os,
    })
    res.json({ success: true })
  } catch {
    res.json({ success: true })
  }
})

// Admin analytics auth
app.post("/api/admin/login", async (req, res) => {
  const { password } = req.body
  const valid = await bcrypt.compare(password, hashedPassword)
  if (!valid) return res.status(401).json({ error: "Invalid password" })
  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "7d" })
  res.json({ token })
})

app.get("/api/admin/stats", authMiddleware, async (req, res) => {
  const total = await Analytics.countDocuments()
  const today = await Analytics.countDocuments({
    timestamp: { $gte: new Date().setHours(0, 0, 0, 0) },
  })
  const uniquePaths = await Analytics.distinct("path")
  const uniqueCountries = await Analytics.distinct("country")

  const last7Days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const start = new Date(d.setHours(0, 0, 0, 0))
    const end = new Date(d.setHours(23, 59, 59, 999))
    const count = await Analytics.countDocuments({ timestamp: { $gte: start, $lte: end } })
    last7Days.push({ date: start.toISOString().split("T")[0], count })
  }

  const devices = await Analytics.aggregate([
    { $group: { _id: "$device", count: { $sum: 1 } } },
  ])

  const browsers = await Analytics.aggregate([
    { $group: { _id: "$browser", count: { $sum: 1 } } },
  ])

  const countries = await Analytics.aggregate([
    { $group: { _id: "$country", count: { $sum: 1 } } },
  ])

  const sources = await Analytics.aggregate([
    { $group: { _id: "$referrer", count: { $sum: 1 } } },
  ])

  res.json({
    total,
    today,
    pages: uniquePaths.length,
    countriesCount: uniqueCountries.length,
    last7Days,
    devices: devices.map((d) => ({ name: d._id, value: d.count })),
    browsers: browsers.map((b) => ({ name: b._id, value: b.count })),
    countries: countries.map((c) => ({ name: c._id, value: c.count })),
    sources: sources.map((s) => ({ name: s._id, value: s.count })),
  })
})

app.get("/api/admin/visits", authMiddleware, async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 20
  const skip = (page - 1) * limit
  const [visits, total] = await Promise.all([
    Analytics.find().sort({ timestamp: -1 }).skip(skip).limit(limit),
    Analytics.countDocuments(),
  ])
  res.json({ visits, total, page, totalPages: Math.ceil(total / limit) })
})

app.delete("/api/admin/visits/:id", authMiddleware, async (req, res) => {
  await Analytics.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})

app.get("/api/admin/export", authMiddleware, async (req, res) => {
  const visits = await Analytics.find().sort({ timestamp: -1 }).lean()
  const header = "path,referrer,country,browser,device,os,timestamp\n"
  const rows = visits.map((v) =>
    `"${v.path}","${v.referrer}","${v.country}","${v.browser}","${v.device}","${v.os}","${v.timestamp}"`
  ).join("\n")
  res.setHeader("Content-Type", "text/csv")
  res.setHeader("Content-Disposition", "attachment; filename=visits.csv")
  res.send(header + rows)
})

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

async function start() {
  try {
    if (MONGODB_URI) {
      await mongoose.connect(MONGODB_URI)
      console.log("MongoDB connected")
      await seedData()
    } else {
      console.log("No MONGODB_URI set — running without database")
    }
  } catch (err) {
    console.error("MongoDB connection error:", err.message)
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

start()
