# 🛡️ Web Vulnerability Scanner

An advanced web-based vulnerability scanning system that detects, analyzes, and prioritizes security risks in web applications using automated scanning, CVE correlation, and real-time threat intelligence.

---

## 🧠 System Architecture

```
          ┌───────────────┐
          │   Frontend    │
          │ (React/Next)  │
          └──────┬────────┘
                 │ API Request (/api/scan/[type])
                 ▼
          ┌───────────────┐
          │ Backend API   │
          │ (Node.js)     │
          └──────┬────────┘
                 │
     ┌───────────┼────────────┐
     ▼           ▼            ▼
┌─────────┐ ┌──────────┐ ┌────────────┐
│ CVE DB  │ │ Exploit  │ │ Scan APIs  │
│ (NVD)   │ │ DB       │ │ (External) │
└─────────┘ └──────────┘ └────────────┘
                 │
                 ▼
          ┌───────────────┐
          │  Response     │
          │ + Risk Score  │
          └───────────────┘
```

---

## 🚀 Features

* 🔍 Automated vulnerability detection (XSS, SQL Injection, etc.)
* 🧠 Intelligent CVE mapping using extracted software entities
* 📊 EPSS-based risk prioritization (for exploit likelihood)
* ⚡ Real-time scanning via optimized API pipeline
* 🛠️ Modular and customizable scan logic
* 🚨 Robust error handling for API failures and invalid inputs

---

## 🏗️ Tech Stack

**Frontend**

* React / Next.js
* TypeScript
* Tailwind CSS

**Backend**

* Node.js (API Routes)

**Security & Intelligence**

* CVE Databases (NVD)
* Exploit Intelligence (Exploit-DB, Vulners API)
* EPSS Scoring

---

## 📁 Project Structure

```
├── components/
│   └── vulnerability-checker.tsx
├── app/
│   └── api/scan/[type]/route.ts
├── public/
├── styles/
└── README.md
```

---

## ⚙️ Workflow

1. User inputs target (URL / application)
2. Frontend sends request → `/api/scan/[type]`
3. Backend processes request and calls external scan services
4. Results are enriched using CVE + exploit intelligence
5. Final output is displayed with risk insights

---

## 🧪 Supported Scans

* **XSS Scan** – Detects cross-site scripting vulnerabilities
* **SQL Injection Scan** – Identifies database injection flaws
* **Dependency Scan** – Finds vulnerable libraries

---

## 🛠️ Setup & Installation

```bash
git clone https://github.com/your-username/web-vulnerability-scanner.git
cd web-vulnerability-scanner
npm install
npm run dev
```

---

## ⚠️ Limitations

* Dependent on external scanning APIs
* Requires internet connectivity
* Accuracy may vary based on API responses

---

## 🚀 Future Enhancements

* 📊 Advanced vulnerability dashboard
* 🔐 User authentication system
* ⏳ Real-time scan progress indicator
* ⚡ API caching and rate limiting
* 🤖 AI-based vulnerability prediction

---

## 🤝 Contribution

1. Fork the repository
2. Create a branch (`feature/new-feature`)
3. Commit changes
4. Push and create a Pull Request

---

## 📌 Author

**Kashyap Nathoo**
Cybersecurity | Software Development

---

## ⭐ Support

If you found this useful, give it a ⭐ on GitHub!
