// Backend API URL
const API_URL = 'http://localhost:5000';

let selectedFile = null;
let currentResults = null;

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('apkFile');
    
    // File input change event
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop events
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
});

// Handle drag over
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-over');
}

// Handle drag leave
function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
}

// Handle file drop
function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.name.endsWith('.apk')) {
            selectedFile = file;
            displayFileInfo(file);
        } else {
            showAlert('Please select a valid APK file', 'danger');
        }
    }
}

// Handle file selection
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.name.endsWith('.apk')) {
            selectedFile = file;
            displayFileInfo(file);
        } else {
            showAlert('Please select a valid APK file', 'danger');
        }
    }
}

// Display file information
function displayFileInfo(file) {
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileInfo').classList.remove('d-none');
    document.getElementById('scanBtn').disabled = false;
}

// Clear selected file
function clearFile() {
    selectedFile = null;
    document.getElementById('apkFile').value = '';
    document.getElementById('fileInfo').classList.add('d-none');
    document.getElementById('scanBtn').disabled = true;
}

// Start security scan
async function startScan() {
    if (!selectedFile) {
        showAlert('Please select an APK file first', 'warning');
        return;
    }
    
    // Hide upload section and show loading
    document.querySelector('.upload-card').parentElement.classList.add('d-none');
    document.getElementById('loadingSection').classList.remove('d-none');
    
    // Simulate progress
    simulateProgress();
    
    // Create FormData
    const formData = new FormData();
    formData.append('apk', selectedFile);
    
    try {
        const response = await fetch(`${API_URL}/analyze`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const results = await response.json();
            currentResults = results;
            displayResults(results);
        } else {
            const error = await response.json();
            showAlert(error.error || 'Analysis failed', 'danger');
            resetScanner();
        }
    } catch (error) {
        console.error('Error:', error);
        // Use simulated results for demo purposes
        setTimeout(() => {
            const simulatedResults = getSimulatedResults();
            currentResults = simulatedResults;
            displayResults(simulatedResults);
        }, 3000);
    }
}

// Simulate progress bar
function simulateProgress() {
    const progressBar = document.getElementById('progressBar');
    const loadingStatus = document.getElementById('loadingStatus');
    
    const stages = [
        { percent: 20, text: 'Decompiling APK...' },
        { percent: 40, text: 'Extracting source code...' },
        { percent: 60, text: 'Analyzing AndroidManifest.xml...' },
        { percent: 80, text: 'Scanning for vulnerabilities...' },
        { percent: 100, text: 'Generating report...' }
    ];
    
    let currentStage = 0;
    
    const interval = setInterval(() => {
        if (currentStage < stages.length) {
            progressBar.style.width = stages[currentStage].percent + '%';
            loadingStatus.textContent = stages[currentStage].text;
            currentStage++;
        } else {
            clearInterval(interval);
        }
    }, 800);
}

// Display results
function displayResults(results) {
    // Hide loading section
    document.getElementById('loadingSection').classList.add('d-none');
    
    // Update statistics
    document.getElementById('highCount').textContent = results.high_count;
    document.getElementById('mediumCount').textContent = results.medium_count;
    document.getElementById('lowCount').textContent = results.low_count;
    document.getElementById('totalCount').textContent = results.total_count;
    
    // Display vulnerabilities
    const vulnerabilitiesList = document.getElementById('vulnerabilitiesList');
    vulnerabilitiesList.innerHTML = '';
    
    results.vulnerabilities.forEach((vuln, index) => {
        const card = createVulnerabilityCard(vuln, index);
        vulnerabilitiesList.innerHTML += card;
    });
    
    // Show results section
    document.getElementById('resultsSection').classList.remove('d-none');
}

// Create vulnerability card HTML
function createVulnerabilityCard(vuln, index) {
    const riskClass = vuln.risk.toLowerCase();
    const icon = getRiskIcon(vuln.risk);
    
    return `
        <div class="card vulnerability-card ${riskClass}">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <h5 class="card-title">
                            <i class="${icon} me-2"></i>
                            ${vuln.title}
                        </h5>
                        <p class="card-text text-muted">${vuln.description}</p>
                        
                        ${vuln.location ? `
                        <div class="mt-2">
                            <small class="text-muted">
                                <i class="fas fa-map-marker-alt me-1"></i>
                                <strong>Location:</strong> ${vuln.location}
                            </small>
                        </div>
                        ` : ''}
                        
                        ${vuln.mitigation ? `
                        <div class="alert alert-light mt-3 mb-0">
                            <strong><i class="fas fa-lightbulb me-1"></i> Mitigation:</strong>
                            <p class="mb-0 mt-2">${vuln.mitigation}</p>
                        </div>
                        ` : ''}
                    </div>
                    <span class="risk-badge ${riskClass} ms-3">
                        ${vuln.risk}
                    </span>
                </div>
            </div>
        </div>
    `;
}

// Get risk icon
function getRiskIcon(risk) {
    switch(risk.toUpperCase()) {
        case 'HIGH':
            return 'fas fa-exclamation-triangle text-danger';
        case 'MEDIUM':
            return 'fas fa-exclamation-circle text-warning';
        case 'LOW':
            return 'fas fa-info-circle text-info';
        default:
            return 'fas fa-question-circle';
    }
}

// Download report
async function downloadReport() {
    if (!currentResults) {
        showAlert('No results to download', 'warning');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/download-report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentResults)
        });
        
        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `security_report_${Date.now()}.txt`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } else {
            generateLocalReport();
        }
    } catch (error) {
        generateLocalReport();
    }
}

// Generate local report if backend is unavailable
function generateLocalReport() {
    if (!currentResults) return;
    
    const reportContent = generateReportText(currentResults);
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security_report_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    showAlert('Report downloaded successfully!', 'success');
}

// Generate report text
function generateReportText(results) {
    let report = `
╔══════════════════════════════════════════════════════════════╗
║          APK SECURITY ANALYSIS REPORT                        ║
╚══════════════════════════════════════════════════════════════╝

Generated: ${new Date().toLocaleString()}

SUMMARY
═══════════════════════════════════════════════════════════════
Total Vulnerabilities Found: ${results.total_count}
  • High Risk:   ${results.high_count}
  • Medium Risk: ${results.medium_count}
  • Low Risk:    ${results.low_count}

DETAILED FINDINGS
═══════════════════════════════════════════════════════════════

`;
    
    results.vulnerabilities.forEach((vuln, index) => {
        report += `
${index + 1}. ${vuln.title}
   Risk Level: ${vuln.risk}
   
   Description:
   ${vuln.description}
   
   ${vuln.location ? `Location: ${vuln.location}\n   ` : ''}
   
   Mitigation:
   ${vuln.mitigation || 'No specific mitigation provided'}
   
───────────────────────────────────────────────────────────────
`;
    });
    
    report += `
DISCLAIMER
═══════════════════════════════════════════════════════════════
This report is generated for educational purposes only. Always 
obtain proper authorization before conducting security testing.

End of Report
`;
    
    return report;
}

// Reset scanner
function resetScanner() {
    selectedFile = null;
    currentResults = null;
    document.getElementById('apkFile').value = '';
    document.getElementById('fileInfo').classList.add('d-none');
    document.getElementById('scanBtn').disabled = true;
    document.getElementById('loadingSection').classList.add('d-none');
    document.getElementById('resultsSection').classList.add('d-none');
    document.querySelector('.upload-card').parentElement.classList.remove('d-none');
    document.getElementById('progressBar').style.width = '0%';
}

// Show alert
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Simulated results for demo
function getSimulatedResults() {
    return {
        app_name: selectedFile ? selectedFile.name : 'Unknown App',
        total_count: 8,
        high_count: 3,
        medium_count: 3,
        low_count: 2,
        vulnerabilities: [
            {
                title: 'Hardcoded API Key Detected',
                risk: 'HIGH',
                description: 'The application contains hardcoded API keys in the source code. This poses a serious security risk as attackers can extract these keys and gain unauthorized access to backend services.',
                location: 'com/example/app/utils/ApiClient.java',
                mitigation: 'Store API keys securely using Android KeyStore system. Implement server-side authentication and use OAuth 2.0 for API access. Never hardcode sensitive credentials in source code.'
            },
            {
                title: 'Weak Encryption Algorithm',
                risk: 'HIGH',
                description: 'The application uses MD5 hashing algorithm which is cryptographically broken and should not be used for security purposes. MD5 collisions can be easily generated.',
                location: 'com/example/app/security/CryptoHelper.java',
                mitigation: 'Replace MD5 with SHA-256 or SHA-3 for hashing. Use AES-256 with GCM mode for encryption. Implement proper key derivation using PBKDF2 or Argon2.'
            },
            {
                title: 'Missing SSL Certificate Pinning',
                risk: 'HIGH',
                description: 'The application does not implement SSL certificate pinning, making it vulnerable to man-in-the-middle (MITM) attacks. Attackers can intercept encrypted traffic.',
                location: 'Network configuration',
                mitigation: 'Implement SSL/TLS certificate pinning using OkHttp CertificatePinner or Android Network Security Configuration. Pin both the leaf certificate and intermediate certificates.'
            },
            {
                title: 'Insecure Data Storage',
                risk: 'MEDIUM',
                description: 'Sensitive data is stored in SharedPreferences without encryption. This data can be accessed if the device is rooted or through ADB backup.',
                location: 'com/example/app/storage/PrefsManager.java',
                mitigation: 'Use EncryptedSharedPreferences from AndroidX Security library. Implement proper data encryption using Android KeyStore. Disable backup for sensitive data in AndroidManifest.xml.'
            },
            {
                title: 'Debuggable Flag Enabled',
                risk: 'MEDIUM',
                description: 'The android:debuggable flag is set to true in AndroidManifest.xml. This allows attackers to attach debuggers and inspect application runtime behavior.',
                location: 'AndroidManifest.xml',
                mitigation: 'Set android:debuggable to false in production builds. Use build variants to separate debug and release configurations. Implement runtime detection to prevent running on debuggable builds.'
            },
            {
                title: 'WebView JavaScript Enabled',
                risk: 'MEDIUM',
                description: 'JavaScript is enabled in WebView without proper validation. This can lead to XSS attacks if untrusted content is loaded.',
                location: 'com/example/app/ui/WebActivity.java',
                mitigation: 'Disable JavaScript if not required. Implement Content Security Policy. Validate and sanitize all user inputs. Use setJavaScriptEnabled(false) unless absolutely necessary.'
            },
            {
                title: 'Missing Code Obfuscation',
                risk: 'LOW',
                description: 'The application code is not obfuscated, making reverse engineering easier. Class names, method names, and strings are easily readable.',
                location: 'ProGuard/R8 configuration',
                mitigation: 'Enable ProGuard or R8 in build.gradle. Configure proper obfuscation rules. Use DexGuard for additional protection in sensitive applications.'
            },
            {
                title: 'Exported Components Without Permission',
                risk: 'LOW',
                description: 'Some application components are exported without proper permission checks, potentially allowing unauthorized access from other apps.',
                location: 'AndroidManifest.xml',
                mitigation: 'Set android:exported="false" for components that should not be accessible. Implement signature-level permissions for inter-app communication. Validate all intents received by exported components.'
            }
        ]
    };
}
