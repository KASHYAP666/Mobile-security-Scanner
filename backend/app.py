"""
APK Security Scanner - Flask Backend
Educational tool for mobile app security testing
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json
from datetime import datetime
from analyzer import APKAnalyzer
from report_generator import ReportGenerator

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
REPORTS_FOLDER = 'reports'
DECOMPILED_FOLDER = 'decompiled'
ALLOWED_EXTENSIONS = {'apk'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB max file size

# Create necessary directories
for folder in [UPLOAD_FOLDER, REPORTS_FOLDER, DECOMPILED_FOLDER]:
    os.makedirs(folder, exist_ok=True)

def allowed_file(filename):
    """Check if file has allowed extension"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    """API health check"""
    return jsonify({
        'status': 'running',
        'message': 'APK Security Scanner API',
        'version': '1.0',
        'endpoints': {
            '/analyze': 'POST - Upload and analyze APK',
            '/download-report': 'POST - Download analysis report'
        }
    })

@app.route('/analyze', methods=['POST'])
def analyze_apk():
    """
    Analyze uploaded APK file for security vulnerabilities
    """
    try:
        # Check if file was uploaded
        if 'apk' not in request.files:
            return jsonify({'error': 'No APK file provided'}), 400
        
        file = request.files['apk']
        
        # Check if file is valid
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only APK files are allowed'}), 400
        
        # Save uploaded file
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        safe_filename = f"{timestamp}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], safe_filename)
        file.save(filepath)
        
        print(f"[+] APK file saved: {filepath}")
        
        # Initialize analyzer
        analyzer = APKAnalyzer(filepath, DECOMPILED_FOLDER)
        
        # Perform analysis
        print("[+] Starting security analysis...")
        results = analyzer.analyze()
        
        # Add metadata
        results['app_name'] = filename
        results['analysis_date'] = datetime.now().isoformat()
        
        # Save results
        results_file = os.path.join(REPORTS_FOLDER, f"{timestamp}_results.json")
        with open(results_file, 'w') as f:
            json.dump(results, f, indent=2)
        
        print(f"[+] Analysis complete. Found {results['total_count']} issues")
        
        return jsonify(results), 200
    
    except Exception as e:
        print(f"[-] Error during analysis: {str(e)}")
        return jsonify({'error': f'Analysis failed: {str(e)}'}), 500

@app.route('/download-report', methods=['POST'])
def download_report():
    """
    Generate and download security report
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Generate report
        generator = ReportGenerator(data)
        report_path = generator.generate_text_report(REPORTS_FOLDER)
        
        # Send file
        return send_file(
            report_path,
            as_attachment=True,
            download_name=f"security_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
        )
    
    except Exception as e:
        print(f"[-] Error generating report: {str(e)}")
        return jsonify({'error': f'Report generation failed: {str(e)}'}), 500

@app.route('/tools-check', methods=['GET'])
def check_tools():
    """
    Check if required tools are installed
    """
    tools_status = {
        'apktool': check_tool_installed('apktool'),
        'jadx': check_tool_installed('jadx'),
        'java': check_tool_installed('java')
    }
    
    return jsonify(tools_status)

def check_tool_installed(tool_name):
    """Check if a command-line tool is installed"""
    import subprocess
    try:
        subprocess.run([tool_name, '--version'], 
                      capture_output=True, 
                      timeout=5)
        return True
    except:
        return False

if __name__ == '__main__':
    print("=" * 60)
    print("APK Security Scanner - Backend Server")
    print("=" * 60)
    print(f"Upload folder: {UPLOAD_FOLDER}")
    print(f"Reports folder: {REPORTS_FOLDER}")
    print(f"Decompiled folder: {DECOMPILED_FOLDER}")
    print("=" * 60)
    print("Starting server on http://localhost:5000")
    print("=" * 60)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
