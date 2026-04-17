# APK Security Scanner
## Mobile App Security Testing using APK Reverse Engineering with Web-Based Scanner

![Project Status](https://img.shields.io/badge/status-educational-blue)
![Python Version](https://img.shields.io/badge/python-3.8%2B-green)
![License](https://img.shields.io/badge/license-Educational-orange)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Requirements](#system-requirements)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Security Checks](#security-checks)
- [Documentation](#documentation)
- [Screenshots](#screenshots)
- [Educational Purpose](#educational-purpose)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

APK Security Scanner is a comprehensive educational tool designed to teach mobile application security concepts through automated vulnerability analysis of Android APK files. The project combines reverse engineering techniques with modern web technologies to provide an intuitive platform for security testing and learning.

### Key Highlights

- **Web-based Interface**: User-friendly dashboard for uploading and analyzing APK files
- **Automated Analysis**: Identifies 8+ common security vulnerabilities automatically
- **Detailed Reports**: Generates comprehensive security reports with mitigation strategies
- **Educational Focus**: Includes detailed explanations of each vulnerability and fix
- **No Installation Required**: Can run in simulation mode without external tools

---

## ✨ Features

### Core Functionality

- ✅ **APK Upload & Processing**: Drag-and-drop or browse to upload APK files (up to 100MB)
- ✅ **Reverse Engineering**: Decompiles APK using APKTool and JADX
- ✅ **Security Analysis**: Performs static analysis to identify vulnerabilities
- ✅ **Risk Classification**: Categories findings as HIGH, MEDIUM, or LOW risk
- ✅ **Visual Dashboard**: Displays results in an intuitive, color-coded interface
- ✅ **Report Generation**: Creates downloadable text reports with full details
- ✅ **Simulation Mode**: Works without external tools for demonstration

### Security Checks

1. **Hardcoded Secrets Detection** - Identifies API keys, passwords, tokens in code
2. **Weak Cryptography Analysis** - Detects use of MD5, DES, weak algorithms
3. **SSL/TLS Security** - Checks for certificate pinning and secure communications
4. **Data Storage Security** - Identifies insecure SharedPreferences and file storage
5. **Manifest Analysis** - Reviews permissions, debuggable flag, exported components
6. **Code Obfuscation** - Checks for ProGuard/R8 implementation
7. **WebView Security** - Identifies unsafe JavaScript configurations
8. **Component Exposure** - Finds improperly exported Android components

---

## 💻 System Requirements

### Minimum Requirements

- **OS**: Windows 10/11, macOS 10.15+, Ubuntu 20.04+
- **Python**: 3.8 or higher
- **RAM**: 4GB (8GB recommended)
- **Disk Space**: 2GB free space
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

### Optional Tools (for full functionality)

- **Java JDK 8+**: Required for APKTool
- **APKTool 2.6+**: For APK decompilation
- **JADX**: For Java source code generation

---

## 🚀 Quick Start

### Installation

```bash
# Clone or download the project
cd mobile-security-scanner

# Install Python dependencies
cd backend
pip install -r requirements.txt

# Start backend server
python app.py
```

### Running the Application

```bash
# Terminal 1: Backend Server
cd backend
python app.py
# Server runs on http://localhost:5000

# Terminal 2: Frontend (optional local server)
cd frontend
python -m http.server 8000
# Open http://localhost:8000 in browser
```

### Using the Tool

1. Open the web interface in your browser
2. Upload an APK file (drag-and-drop or browse)
3. Click "Start Security Scan"
4. Wait for analysis to complete (10-60 seconds)
5. Review results in the dashboard
6. Download comprehensive report

---

## 📁 Project Structure

```
mobile-security-scanner/
│
├── frontend/                  # Web interface
│   ├── index.html            # Main HTML page
│   ├── style.css             # Styling and animations
│   └── script.js             # Frontend logic
│
├── backend/                   # Flask server
│   ├── app.py                # Main Flask application
│   ├── analyzer.py           # APK analysis module
│   ├── report_generator.py   # Report generation
│   ├── requirements.txt      # Python dependencies
│   ├── uploads/              # Uploaded APK files
│   ├── reports/              # Generated reports
│   └── decompiled/           # Decompiled APK contents
│
├── docs/                      # Documentation
│   ├── COMPLETE_PROJECT_REPORT.md
│   ├── INSTALLATION.md
│   ├── USAGE.md
│   └── README.md
│
└── demo/                      # Demo files
    └── sample_vulnerabilities.txt
```

---

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations
- **Bootstrap 5**: Responsive grid and components
- **JavaScript (Vanilla)**: Client-side logic
- **Font Awesome**: Icon library

### Backend
- **Python 3.8+**: Core programming language
- **Flask 3.0**: Web framework
- **Flask-CORS**: Cross-origin resource sharing
- **Werkzeug**: WSGI utilities

### Analysis Tools
- **APKTool**: APK decompilation
- **JADX**: Java decompiler
- **Python zipfile**: ZIP extraction
- **XML parser**: Manifest analysis
- **Regex**: Pattern matching

---

## 🔍 Security Checks

### Critical (HIGH Risk)

| Vulnerability | Description | Impact |
|--------------|-------------|---------|
| **Hardcoded API Keys** | Credentials embedded in code | Unauthorized API access, data breach |
| **Weak Encryption** | MD5, SHA1, DES usage | Data can be decrypted |
| **No SSL Pinning** | Missing certificate validation | Man-in-the-middle attacks |

### Important (MEDIUM Risk)

| Vulnerability | Description | Impact |
|--------------|-------------|---------|
| **Insecure Storage** | Unencrypted SharedPreferences | Data accessible on rooted devices |
| **Debug Mode** | Debuggable flag enabled | Runtime inspection possible |
| **WebView Risks** | Unsafe JavaScript configuration | XSS attacks |

### Advisory (LOW Risk)

| Vulnerability | Description | Impact |
|--------------|-------------|---------|
| **No Obfuscation** | Code easily readable | Easier reverse engineering |
| **Exported Components** | Components accessible to other apps | Potential unauthorized access |

---

## 📚 Documentation

### Complete Documentation Set

1. **[COMPLETE_PROJECT_REPORT.md](docs/COMPLETE_PROJECT_REPORT.md)**
   - Full academic project report
   - Detailed methodology and implementation
   - Case studies and vulnerability analysis
   - 50+ pages of comprehensive documentation

2. **[INSTALLATION.md](docs/INSTALLATION.md)**
   - Step-by-step installation guide
   - Prerequisites and dependencies
   - Troubleshooting common issues
   - Configuration options

3. **[USAGE.md](docs/USAGE.md)**
   - How to use the application
   - Understanding results
   - Best practices for testing
   - Tips and tricks

---

## 📸 Screenshots

### Upload Interface
- Clean, modern design with drag-and-drop
- File validation and progress indication
- Responsive layout for all devices

### Analysis Dashboard
- Color-coded risk statistics
- Detailed vulnerability cards
- Expandable descriptions and mitigations
- Professional report generation

### Results Display
- Clear categorization by risk level
- Code locations and explanations
- Actionable remediation steps
- Download functionality

---

## 🎓 Educational Purpose

### This Project is Ideal For:

**Students**
- Learning mobile security concepts
- Understanding reverse engineering
- Practicing security testing
- Building portfolio projects

**Developers**
- Learning secure coding practices
- Understanding common vulnerabilities
- Improving app security
- Compliance with security standards

**Security Enthusiasts**
- Hands-on security testing experience
- Understanding attack vectors
- Learning defensive techniques
- Exploring security tools

**Educators**
- Teaching security concepts
- Demonstrating real-world vulnerabilities
- Interactive learning platform
- Assessment and evaluation

### Learning Outcomes

After working with this project, you will understand:
- Android application architecture
- APK file structure and contents
- Reverse engineering techniques
- Common mobile security vulnerabilities
- Static analysis methodologies
- Secure coding best practices
- Risk assessment and mitigation

---

## ⚠️ Important Disclaimers

### Legal and Ethical Use

**AUTHORIZED TESTING ONLY**
- Only test applications you own or have explicit permission to analyze
- Obtain written authorization before testing third-party applications
- Respect intellectual property and privacy laws
- Follow responsible disclosure practices

**EDUCATIONAL PURPOSE**
- This tool is designed for learning and education
- Not for malicious use or unauthorized access
- Findings should be used to improve security, not exploit vulnerabilities
- Users are responsible for their actions

**NO WARRANTY**
- Tool provided "as-is" without guarantees
- Results may contain false positives
- Not a replacement for professional security audits
- Always verify findings manually

---

## 🔧 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Change port in backend/app.py
app.run(debug=True, host='0.0.0.0', port=5001)
```

**CORS Errors**
```bash
# Ensure flask-cors is installed
pip install flask-cors
```

**APKTool Not Found**
- Application works in simulation mode without APKTool
- Install APKTool for full functionality
- See INSTALLATION.md for details

**Upload Failures**
- Check file size (max 100MB)
- Verify .apk file extension
- Ensure backend server is running
- Check browser console for errors

---

## 🤝 Contributing

This is an educational project. Contributions are welcome for:
- Additional security checks
- Improved vulnerability descriptions
- Better UI/UX enhancements
- Documentation improvements
- Bug fixes and optimizations

---

## 📄 License

This project is released for educational purposes. Please use responsibly and ethically.

**Academic Use:** Permitted with proper attribution  
**Commercial Use:** Not permitted without authorization  
**Modification:** Permitted for learning purposes  
**Distribution:** Permitted with this notice intact  

---

## 📧 Contact & Support

For questions, issues, or educational inquiries:
- Review the documentation in `docs/` folder
- Check troubleshooting sections
- Verify system requirements
- Ensure proper installation

---

## 🙏 Acknowledgments

- OWASP Mobile Security Project
- Android Security Best Practices
- APKTool and JADX developers
- Open source security community

---

## 🔮 Future Enhancements

- Dynamic analysis capabilities
- iOS application support
- Machine learning-based detection
- CI/CD integration
- Multi-language support
- PDF report generation
- Database for historical analysis
- User authentication system

---

**Remember**: With great power comes great responsibility. Use this tool ethically and legally to make the mobile ecosystem more secure.

---

*Last Updated: March 2026*
