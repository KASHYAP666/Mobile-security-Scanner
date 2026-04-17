# Installation Guide

## Prerequisites

### System Requirements
- Operating System: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)
- Python: 3.8 or higher
- Node.js: 14.0 or higher (optional, for frontend development)
- Disk Space: Minimum 2GB free space
- RAM: Minimum 4GB (8GB recommended)

### Required Software

1. **Python 3.8+**
   - Download from: https://www.python.org/downloads/
   - Ensure pip is installed

2. **Java Development Kit (JDK) 8+**
   - Required for APKTool
   - Download from: https://www.oracle.com/java/technologies/downloads/

3. **APKTool** (Optional but recommended)
   - Download: https://ibotpeaches.github.io/Apktool/
   - Place in system PATH

4. **JADX** (Optional but recommended)
   - Download: https://github.com/skylot/jadx/releases
   - Extract and add to PATH

## Installation Steps

### Step 1: Clone or Download Project

```bash
# If you have the project as ZIP
unzip mobile-security-scanner.zip
cd mobile-security-scanner

# Or if using git
git clone <repository-url>
cd mobile-security-scanner
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

### Step 3: Verify Installation

```bash
# Check Python packages
pip list

# You should see:
# Flask==3.0.0
# flask-cors==4.0.0
# Werkzeug==3.0.1
```

### Step 4: Test APKTool Installation (Optional)

```bash
# Check if apktool is installed
apktool --version

# If not found, download and install:
# 1. Download wrapper script and jar
# 2. Make executable (Linux/Mac): chmod +x apktool
# 3. Move to /usr/local/bin or add to PATH
```

### Step 5: Test JADX Installation (Optional)

```bash
# Check if jadx is installed
jadx --version

# If not found:
# 1. Download latest release from GitHub
# 2. Extract to desired location
# 3. Add bin/ directory to PATH
```

## Running the Application

### Start Backend Server

```bash
# Make sure you're in the backend directory
cd backend

# Activate virtual environment (if not already active)
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Run Flask server
python app.py

# You should see:
# * Running on http://0.0.0.0:5000
```

### Open Frontend

```bash
# Open another terminal
# Navigate to frontend directory
cd frontend

# Option 1: Open directly in browser
# Simply open index.html in your web browser

# Option 2: Use a local server (recommended)
# Python 3:
python -m http.server 8000

# Then open: http://localhost:8000
```

### Access Application

Open your web browser and navigate to:
- Frontend: http://localhost:8000 (or open index.html directly)
- Backend API: http://localhost:5000

## Troubleshooting

### Issue: Port 5000 Already in Use

**Solution:**
```bash
# Change port in app.py
# Find line: app.run(debug=True, host='0.0.0.0', port=5000)
# Change to: app.run(debug=True, host='0.0.0.0', port=5001)

# Also update frontend/script.js
# Change: const API_URL = 'http://localhost:5000';
# To: const API_URL = 'http://localhost:5001';
```

### Issue: CORS Errors

**Solution:**
Ensure flask-cors is installed:
```bash
pip install flask-cors
```

### Issue: APKTool Not Found

**Solution:**
The application will work in simulation mode without APKTool. For full functionality:

1. Download APKTool:
   ```bash
   wget https://raw.githubusercontent.com/iBotPeaches/Apktool/master/scripts/linux/apktool
   wget https://bitbucket.org/iBotPeaches/apktool/downloads/apktool_2.9.0.jar
   chmod +x apktool
   sudo mv apktool apktool_2.9.0.jar /usr/local/bin/
   ```

2. Test installation:
   ```bash
   apktool --version
   ```

### Issue: Import Errors

**Solution:**
```bash
# Reinstall dependencies
pip uninstall -r requirements.txt -y
pip install -r requirements.txt
```

### Issue: Permission Denied

**Solution:**
```bash
# On Linux/Mac, ensure proper permissions
chmod -R 755 backend/
chmod +x backend/app.py
```

## Configuration

### Backend Configuration

Edit `backend/app.py` to customize:

```python
# Maximum upload file size (in bytes)
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB

# Upload folder
UPLOAD_FOLDER = 'uploads'

# Reports folder
REPORTS_FOLDER = 'reports'
```

### Frontend Configuration

Edit `frontend/script.js` to customize:

```javascript
// Backend API URL
const API_URL = 'http://localhost:5000';

// Add your customizations
```

## Verification

### Test Backend

```bash
curl http://localhost:5000/
```

Expected output:
```json
{
  "status": "running",
  "message": "APK Security Scanner API",
  "version": "1.0"
}
```

### Test Frontend

1. Open http://localhost:8000 in browser
2. You should see the upload interface
3. Try uploading a sample APK file

## Next Steps

1. Read USAGE.md for how to use the application
2. Review security best practices
3. Prepare test APK files (use only authorized files)
4. Explore the analysis results

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the documentation
3. Check system requirements
4. Verify all dependencies are installed

---

**Important:** This tool is for educational purposes only. Always obtain proper authorization before testing any application.
